"use client";

import type { UpakarmaStep } from "@/types/upakarma";

const TELL_ME_MORE_SECTIONS: { key: keyof UpakarmaStep["tellMeMore"]; label: string }[] = [
  { key: "meaning", label: "Meaning" },
  { key: "symbolism", label: "Symbolism" },
  { key: "why", label: "Why" },
  { key: "background", label: "Background" },
  { key: "other", label: "Other notes" },
];

type TellMeMorePanelProps = {
  step: UpakarmaStep;
  onClose: () => void;
};

export function TellMeMorePanel({ step, onClose }: TellMeMorePanelProps) {
  return (
    <aside className="detail-panel" aria-label={`More about ${step.title}`}>
      <div className="detail-panel-header">
        <div>
          <p className="detail-panel-eyebrow">Deeper context</p>
          <h2>{step.title}</h2>
        </div>
        <button
          type="button"
          className="detail-panel-close"
          onClick={onClose}
          aria-label="Close details panel"
        >
          ×
        </button>
      </div>

      {step.explanation && (
        <div className="detail-panel-overview">
          <p className="section-label">Overview</p>
          <p className="section-text">{step.explanation}</p>
        </div>
      )}

      <div className="detail-panel-sections">
        {TELL_ME_MORE_SECTIONS.map(({ key, label }) => (
          <div key={key} className="detail-panel-section">
            <p className="section-label">{label}</p>
            <p className="section-text">{step.tellMeMore[key]}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
