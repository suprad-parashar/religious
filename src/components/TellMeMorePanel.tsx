"use client";

import type { ResolvedUpakarmaStep } from "@/types/upakarma";

type TellMeMorePanelProps = {
  step: ResolvedUpakarmaStep;
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

      {step.informationHtml && (
        <div
          className="detail-panel-body rich-text"
          dangerouslySetInnerHTML={{ __html: step.informationHtml }}
        />
      )}
    </aside>
  );
}
