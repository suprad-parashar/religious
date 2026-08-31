"use client";

import type {
  ResolvedStepSubtext,
  ResolvedUpakarmaStep,
  StepAudio,
} from "@/types/upakarma";
import { AudioPlayer } from "@/components/AudioPlayer";

type StepCardProps = {
  step: ResolvedUpakarmaStep;
  fullRecordingSrc: string;
  isActive: boolean;
  onTellMeMore: () => void;
};

function audioTime(value: number | string | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "number") return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function isPlayableAudio(audio?: StepAudio) {
  if (!audio) return false;
  const endTime = audioTime(audio.endTime);
  return Boolean(audio.src) || (endTime !== undefined && endTime > 0);
}

function StepAudioBlock({
  audio,
  fullRecordingSrc,
}: {
  audio: StepAudio;
  fullRecordingSrc: string;
}) {
  const src = audio.src || fullRecordingSrc;
      return (
    <AudioPlayer
      key={`${audio.label}-${String(audio.startTime)}-${String(audio.endTime)}-${String(audio.repeat ?? "")}`}
      src={src}
      label={audio.label}
      startTime={audioTime(audio.startTime)}
      endTime={audioTime(audio.endTime)}
      repeat={audio.repeat}
    />
  );
}

function SubtextBlock({
  subtext,
  fullRecordingSrc,
}: {
  subtext: ResolvedStepSubtext;
  fullRecordingSrc: string;
}) {
  const playable = isPlayableAudio(subtext.audio);

  if (!subtext.title && !subtext.textHtml && !playable) return null;

  return (
    <div className="subtext">
      {(subtext.title || subtext.textHtml) && (
        <div>
          <p className="section-label">{subtext.title || "Text"}</p>
          {subtext.textHtml && (
            <div
              className="subtext-text"
              dangerouslySetInnerHTML={{ __html: subtext.textHtml }}
            />
          )}
        </div>
      )}
      {playable && subtext.audio && (
        <StepAudioBlock audio={subtext.audio} fullRecordingSrc={fullRecordingSrc} />
      )}
    </div>
  );
}

export function StepCard({
  step,
  fullRecordingSrc,
  isActive,
  onTellMeMore,
}: StepCardProps) {
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
        {step.subtexts.length > 0 && (
          <div className="subtexts">
            {step.subtexts.map((subtext, index) => (
              <SubtextBlock
                key={`${step.title}-${index}`}
                subtext={subtext}
                fullRecordingSrc={fullRecordingSrc}
              />
            ))}
          </div>
        )}
        {step.informationHtml && (
          <button
            type="button"
            className={`tell-me-more-btn${isActive ? " tell-me-more-btn--active" : ""}`}
            aria-pressed={isActive}
            onClick={onTellMeMore}
          >
            Tell me more about this
          </button>
        )}
      </div>
    </article>
  );
}
