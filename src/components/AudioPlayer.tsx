"use client";

import { useEffect, useRef } from "react";

type AudioPlayerProps = {
  src: string;
  label: string;
  startTime?: number;
  endTime?: number;
};

export function AudioPlayer({ src, label, startTime, endTime }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || startTime === undefined || startTime <= 0) return;

    const onLoaded = () => {
      audio.currentTime = startTime;
    };
    const onTimeUpdate = () => {
      if (endTime !== undefined && endTime > 0 && audio.currentTime >= endTime) {
        audio.pause();
      }
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [src, startTime, endTime]);

  return (
    <div className="audio-block">
      <p className="label">{label}</p>
      <audio ref={audioRef} controls preload="metadata" src={src}>
        Your browser does not support audio playback.
      </audio>
    </div>
  );
}
