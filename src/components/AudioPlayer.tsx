"use client";

import { useEffect, useRef, useState } from "react";

type AudioPlayerProps = {
  src: string;
  label: string;
  startTime?: number;
  endTime?: number;
  repeat?: number | "yatha";
};

function normalizeRepeat(repeat?: number) {
  if (repeat === undefined || !Number.isFinite(repeat)) return 1;
  return Math.max(1, Math.floor(repeat));
}

function hasBoundedStart(startTime?: number) {
  return startTime !== undefined && startTime > 0;
}

function hasBoundedEnd(endTime?: number) {
  return endTime !== undefined && endTime > 0;
}

/** Browsers often seek a few ms past the requested time. */
const CLIP_BOUNDARY_EPSILON = 0.01;

function clampClipOffset(offset: number, clipLength: number) {
  if (clipLength <= 0) return 0;
  return Math.min(clipLength, Math.max(0, offset));
}

function atOrPastClipEnd(currentTime: number, clipEnd: number) {
  return clipEnd > 0 && currentTime >= clipEnd - CLIP_BOUNDARY_EPSILON;
}

function beforeClipStart(currentTime: number, clipStart: number) {
  return currentTime < clipStart - CLIP_BOUNDARY_EPSILON;
}

function formatClock(seconds: number) {
  const safe = Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
  const mins = Math.floor(safe / 60);
  const secs = Math.floor(safe % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function displayTimeFromParts(playIndex: number, clipPosition: number, clipLength: number) {
  return Math.max(0, (playIndex - 1) * clipLength + clipPosition);
}

function partsFromDisplayTime(displayTime: number, clipLength: number, totalPlays: number) {
  if (clipLength <= 0) {
    return { playIndex: 1, clipPosition: 0 };
  }
  const total = clipLength * totalPlays;
  const t = Math.min(total, Math.max(0, displayTime));
  if (t >= total) {
    return { playIndex: totalPlays, clipPosition: clipLength };
  }
  const playIndex = Math.min(totalPlays, Math.floor(t / clipLength) + 1);
  return {
    playIndex,
    clipPosition: t - (playIndex - 1) * clipLength,
  };
}

export function AudioPlayer({ src, label, startTime, endTime, repeat }: AudioPlayerProps) {
  const unbounded = repeat === "yatha";
  const totalPlays = unbounded ? 1 : normalizeRepeat(repeat);
  const isClipped = hasBoundedStart(startTime) || hasBoundedEnd(endTime);

  if (!isClipped && totalPlays <= 1 && !unbounded) {
    return (
      <div className="audio-block">
        <p className="label">{label}</p>
        <audio controls preload="metadata" src={src}>
          Your browser does not support audio playback.
        </audio>
      </div>
    );
  }

  return (
    <ClippedAudioPlayer
      src={src}
      label={label}
      startTime={startTime}
      endTime={endTime}
      repeat={unbounded ? "yatha" : totalPlays}
    />
  );
}

function ClippedAudioPlayer({ src, label, startTime, endTime, repeat }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekingRef = useRef(false);
  const playIndexRef = useRef(1);
  const unbounded = repeat === "yatha";
  const totalPlays = unbounded ? 1 : normalizeRepeat(repeat);
  const [mediaDuration, setMediaDuration] = useState(0);
  const [clipPosition, setClipPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playIndex, setPlayIndex] = useState(1);

  const clipStart = startTime !== undefined && startTime > 0 ? startTime : 0;
  const requestedEnd = hasBoundedEnd(endTime) ? endTime : undefined;
  const clipEnd =
    requestedEnd !== undefined
      ? mediaDuration > 0
        ? Math.min(requestedEnd, mediaDuration)
        : requestedEnd
      : mediaDuration;
  const clipLength = Math.max(0, clipEnd - clipStart);
  const combinedLength = clipLength * (unbounded ? 1 : totalPlays);
  const displayPosition = unbounded
    ? clipPosition
    : displayTimeFromParts(playIndex, clipPosition, clipLength);

  const boundsRef = useRef({
    clipStart,
    clipEnd,
    clipLength,
    totalPlays,
    unbounded,
  });
  boundsRef.current = { clipStart, clipEnd, clipLength, totalPlays, unbounded };

  const seekWithinClip = (offset: number) => {
    const audio = audioRef.current;
    const { clipStart: start, clipLength: length } = boundsRef.current;
    if (!audio || length <= 0) return;
    const clamped = clampClipOffset(offset, length);
    audio.currentTime = start + clamped;
    setClipPosition(clamped);
  };

  const applyDisplayPosition = (position: number) => {
    const audio = audioRef.current;
    const { clipLength: length, totalPlays: plays, unbounded: looping } = boundsRef.current;
    if (!audio || length <= 0) return;
    if (looping) {
      seekWithinClip(position);
      return;
    }
    const mapped = partsFromDisplayTime(position, length, plays);
    playIndexRef.current = mapped.playIndex;
    setPlayIndex(mapped.playIndex);
    seekWithinClip(mapped.clipPosition);
  };

  const finishAllPlays = () => {
    const audio = audioRef.current;
    const { clipStart: start, clipEnd: end, clipLength: length, totalPlays: plays } =
      boundsRef.current;
    if (!audio) return;
    audio.pause();
    playIndexRef.current = plays;
    setPlayIndex(plays);
    setClipPosition(length);
    if (end > 0) {
      audio.currentTime = Math.max(start, end);
    }
    setIsPlaying(false);
  };

  const restartClip = () => {
    const audio = audioRef.current;
    const { clipStart: start, unbounded: looping } = boundsRef.current;
    if (!audio) return;
    if (!looping) {
      playIndexRef.current += 1;
      setPlayIndex(playIndexRef.current);
    }
    audio.currentTime = start;
    setClipPosition(0);
  };

  const enforceClipBoundary = () => {
    const audio = audioRef.current;
    if (!audio || seekingRef.current) return;

    const { clipStart: start, clipEnd: end, clipLength: length, totalPlays: plays, unbounded: looping } =
      boundsRef.current;
    if (length <= 0) return;

    const currentTime = audio.currentTime;

    if (beforeClipStart(currentTime, start)) {
      audio.currentTime = start;
      setClipPosition(0);
      return;
    }

    if (!atOrPastClipEnd(currentTime, end)) {
      setClipPosition(Math.max(0, currentTime - start));
      return;
    }

    if (looping || playIndexRef.current < plays) {
      restartClip();
      if (!audio.paused) {
        void audio.play();
      }
      return;
    }

    finishAllPlays();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const resetToStart = () => {
      playIndexRef.current = 1;
      setPlayIndex(1);
      audio.currentTime = clipStart;
      setClipPosition(0);
    };

    const onLoaded = () => {
      setMediaDuration(audio.duration || 0);
      resetToStart();
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    if (audio.readyState >= 1) {
      onLoaded();
    }

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", enforceClipBoundary);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", enforceClipBoundary);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [src, clipStart, clipEnd, clipLength, totalPlays, unbounded]);

  useEffect(() => {
    if (!isPlaying) return;
    let frameId = 0;
    const tick = () => {
      enforceClipBoundary();
      frameId = window.requestAnimationFrame(tick);
    };
    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [isPlaying, clipStart, clipEnd, clipLength, totalPlays, unbounded]);

  const jumpToCount = (next: number) => {
    const audio = audioRef.current;
    const clamped = Math.max(1, unbounded ? next : Math.min(totalPlays, next));
    if (unbounded) {
      playIndexRef.current = clamped;
      setPlayIndex(clamped);
      if (audio) {
        audio.currentTime = clipStart;
        setClipPosition(0);
      }
    } else {
      applyDisplayPosition((clamped - 1) * clipLength);
    }
    if (isPlaying) {
      void audioRef.current?.play();
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      if (unbounded) {
        if (beforeClipStart(audio.currentTime, clipStart) || atOrPastClipEnd(audio.currentTime, clipEnd)) {
          audio.currentTime = clipStart;
          setClipPosition(0);
        }
        void audio.play();
        return;
      }
      const atCombinedEnd =
        playIndexRef.current >= totalPlays &&
        (atOrPastClipEnd(audio.currentTime, clipEnd) || clipPosition >= clipLength - CLIP_BOUNDARY_EPSILON);
      if (atCombinedEnd || beforeClipStart(audio.currentTime, clipStart)) {
        playIndexRef.current = 1;
        setPlayIndex(1);
        audio.currentTime = clipStart;
        setClipPosition(0);
      }
      void audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <div className="audio-block">
      <p className="label">{label}</p>
      <div className="clip-player">
        <button
          type="button"
          className={`clip-player-play${isPlaying ? " clip-player-play--active" : ""}`}
          aria-pressed={isPlaying}
          onClick={togglePlay}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <input
          type="range"
          className="clip-player-seek"
          min={0}
          max={combinedLength || 0}
          step={0.1}
          value={Math.min(displayPosition, combinedLength)}
          aria-label={`Seek ${label}`}
          disabled={combinedLength <= 0}
          onPointerDown={() => {
            seekingRef.current = true;
          }}
          onPointerUp={() => {
            seekingRef.current = false;
          }}
          onChange={(event) => {
            applyDisplayPosition(Number(event.target.value));
          }}
        />
        <span className="clip-player-time">
          {formatClock(displayPosition)} / {formatClock(combinedLength)}
        </span>
        {(totalPlays > 1 || unbounded) && (
          <RepeatCount
            playIndex={playIndex}
            totalPlays={unbounded ? null : totalPlays}
            onSelect={jumpToCount}
          />
        )}
      </div>
      <audio
        ref={audioRef}
        className="clip-player-source"
        preload="auto"
        src={src}
      >
        Your browser does not support audio playback.
      </audio>
    </div>
  );
}

function RepeatCount({
  playIndex,
  totalPlays,
  onSelect,
}: {
  playIndex: number;
  totalPlays: number | null;
  onSelect: (next: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const closedRef = useRef(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(playIndex));
  const unbounded = totalPlays === null;

  useEffect(() => {
    if (!editing) {
      setDraft(String(playIndex));
    }
  }, [playIndex, editing]);

  useEffect(() => {
    if (!editing) return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [editing]);

  const close = () => {
    closedRef.current = true;
    setEditing(false);
  };

  const cancel = () => {
    if (closedRef.current) return;
    close();
    setDraft(String(playIndex));
  };

  const commit = () => {
    if (closedRef.current) return;
    const parsed = Number.parseInt(draft, 10);
    close();
    if (!Number.isFinite(parsed)) {
      setDraft(String(playIndex));
      return;
    }
    const max = unbounded ? Number.MAX_SAFE_INTEGER : totalPlays;
    onSelect(Math.min(max, Math.max(1, parsed)));
  };

  return (
    <span className="clip-player-repeat">
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          className="clip-player-repeat-input"
          value={draft}
          aria-label={
            unbounded ? "Repeat count" : `Repeat count, 1 to ${totalPlays}`
          }
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              commit();
            } else if (event.key === "Escape") {
              event.preventDefault();
              cancel();
            }
          }}
        />
      ) : (
        <button
          type="button"
          className="clip-player-repeat-count"
          aria-label={
            unbounded
              ? `Repeat ${playIndex}. Click to jump to another count.`
              : `Repeat ${playIndex} of ${totalPlays}. Click to jump to another count.`
          }
          onClick={() => {
            closedRef.current = false;
            setDraft(String(playIndex));
            setEditing(true);
          }}
        >
          {playIndex}
        </button>
      )}
      {!unbounded && ` of ${totalPlays}`}
    </span>
  );
}
