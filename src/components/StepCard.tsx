"use client";

import type { UpakarmaStep } from "@/types/upakarma";
import { AudioPlayer } from "@/components/AudioPlayer";

type StepCardProps = {
  step: UpakarmaStep;
  fullRecordingSrc: string;
  isActive: boolean;
  onTellMeMore: () => void;
};

export function StepCard({
  step,
  fullRecordingSrc,
  isActive,
  onTellMeMore,
}: StepCardProps) {
  const audioPlayer =
    step.audio.src ? (
      <AudioPlayer
        src={step.audio.src}
        label={step.audio.label}
        startTime={step.audio.startTime}
        endTime={step.audio.endTime}
      />
    ) : step.audio.startTime !== undefined &&
      step.audio.endTime !== undefined &&
      step.audio.endTime > 0 ? (
      <AudioPlayer
        src={fullRecordingSrc}
        label={step.audio.label}
        startTime={step.audio.startTime}
        endTime={step.audio.endTime}
      />
    ) : (
      <div className="audio-block">
        <p className="label">{step.audio.label}</p>
        <p className="audio-placeholder">
          Audio not yet added — set audio.src or startTime / endTime in upakarma.ts
        </p>
      </div>
    );

  return (
    <article className={`step${isActive ? " step--active" : ""}`}>
      <div className="step-header">
        <h2>{step.title}</h2>
      </div>
      <div className="step-body">
        <div>
          <p className="section-label">What to do</p>
          <p className="section-text">{step.instruction}</p>
        </div>
        {audioPlayer}
        <button
          type="button"
          className={`tell-me-more-btn${isActive ? " tell-me-more-btn--active" : ""}`}
          aria-pressed={isActive}
          onClick={onTellMeMore}
        >
          Tell me more about this
        </button>
      </div>
    </article>
  );
}
