"use client";

import { useEffect, useState } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { StepCard } from "@/components/StepCard";
import { TellMeMorePanel } from "@/components/TellMeMorePanel";
import type { UpakarmaStep } from "@/types/upakarma";

type UpakarmaContent = {
  title: string;
  subtitle: string;
  introduction: string;
  fullRecording: { src: string; label: string };
  steps: UpakarmaStep[];
};

type UpakarmaGuideProps = {
  content: UpakarmaContent;
};

export function UpakarmaGuide({ content }: UpakarmaGuideProps) {
  const { title, subtitle, introduction, fullRecording, steps } = content;
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);

  const activeStep = activeStepIndex !== null ? steps[activeStepIndex] : null;
  const panelOpen = activeStep !== null;

  useEffect(() => {
    if (!panelOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveStepIndex(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [panelOpen]);

  const handleTellMeMore = (index: number) => {
    setActiveStepIndex((current) => (current === index ? null : index));
  };

  return (
    <div className={`app-layout${panelOpen ? " app-layout--panel-open" : ""}`}>
      <div className="app-main">
        <main className="page">
          <header>
            <h1>{title}</h1>
            <p className="subtitle">{subtitle}</p>
          </header>

          <section className="intro">
            <p>{introduction}</p>
          </section>

          <section className="full-recording">
            <h2>Full Recording</h2>
            <AudioPlayer src={fullRecording.src} label={fullRecording.label} />
          </section>

          <section className="steps">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                step={step}
                fullRecordingSrc={fullRecording.src}
                isActive={activeStepIndex === index}
                onTellMeMore={() => handleTellMeMore(index)}
              />
            ))}
          </section>

          <footer>Yajur Veda Upakarma Guide</footer>
        </main>
      </div>

      {activeStep && (
        <TellMeMorePanel
          step={activeStep}
          onClose={() => setActiveStepIndex(null)}
        />
      )}
    </div>
  );
}
