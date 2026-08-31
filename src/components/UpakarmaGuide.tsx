"use client";

import { useEffect, useMemo, useState } from "react";
import { GuidePreferencesCard } from "@/components/GuidePreferencesCard";
import { PanchangaSummary } from "@/components/PanchangaSummary";
import { RitualSetupCard } from "@/components/RitualSetupCard";
import { StepCard } from "@/components/StepCard";
import { TellMeMorePanel } from "@/components/TellMeMorePanel";
import { applyUserConfigToContent } from "@/lib/applyUserConfig";
import { calendarInstantFromRitualDate, ritualTypeExplanationFromPanchanga } from "@/lib/panchanga";
import { RitualTypeInferenceNote } from "@/components/RitualTypeInferenceNote";
import {
  DEFAULT_USER_CONFIG,
  loadUserConfig,
  saveUserConfig,
  todayLocalDate,
  type RitualType,
  type UserConfig,
} from "@/lib/userConfig";
import type { ResolvedUpakarmaContent } from "@/types/upakarma";

type GuidePhase = "setup" | "guide";

type UpakarmaGuideProps = {
  contentByRitualType: Record<RitualType, ResolvedUpakarmaContent>;
};

export function UpakarmaGuide({ contentByRitualType }: UpakarmaGuideProps) {
  const [phase, setPhase] = useState<GuidePhase>("setup");
  const [userConfig, setUserConfig] = useState<UserConfig>(DEFAULT_USER_CONFIG);
  const [timezoneOffsetMinutes, setTimezoneOffsetMinutes] = useState(0);
  const baseContent = contentByRitualType[userConfig.ritualType];
  const calendarInstant = useMemo(() => {
    const ritualDate = userConfig.ritualDate || todayLocalDate();
    return calendarInstantFromRitualDate(ritualDate, userConfig, timezoneOffsetMinutes);
  }, [userConfig, timezoneOffsetMinutes]);
  const ritualInference = useMemo(
    () => ritualTypeExplanationFromPanchanga(userConfig, calendarInstant),
    [userConfig, calendarInstant],
  );
  const resolved = useMemo(
    () => applyUserConfigToContent(baseContent, userConfig, calendarInstant),
    [baseContent, userConfig, calendarInstant],
  );
  const { title, subtitle, introductionHtml, setup, fullRecording, steps } = resolved;
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);

  useEffect(() => {
    setActiveStepIndex(null);
  }, [userConfig.ritualType, phase]);

  useEffect(() => {
    const loaded = loadUserConfig();
    setUserConfig({ ...loaded, ritualDate: todayLocalDate() });
    setTimezoneOffsetMinutes(-new Date().getTimezoneOffset());
  }, []);

  const updateUserConfig = (next: UserConfig) => {
    setUserConfig(next);
    saveUserConfig(next);
  };

  const setupConfig = { ...userConfig, ritualDate: userConfig.ritualDate || todayLocalDate() };
  const setupCalendarInstant = useMemo(() => {
    if (!setupConfig.state.trim()) return null;
    return calendarInstantFromRitualDate(
      setupConfig.ritualDate,
      setupConfig,
      timezoneOffsetMinutes,
    );
  }, [setupConfig, timezoneOffsetMinutes]);

  const handleContinue = (next: UserConfig) => {
    updateUserConfig(next);
    setPhase("guide");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeStep = activeStepIndex !== null ? steps[activeStepIndex] : null;
  const panelOpen = Boolean(activeStep?.informationHtml);

  useEffect(() => {
    if (!panelOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveStepIndex(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [panelOpen]);

  const handleTellMeMore = (index: number) => {
    if (!steps[index]?.informationHtml) return;
    setActiveStepIndex((current) => (current === index ? null : index));
  };

  if (phase === "setup") {
    return (
      <div className="app-layout">
        <div className="app-main">
          <main className="page">
            <header>
              <h1>Yajur Veda Ritual Guide</h1>
              <p className="subtitle">Confirm today&apos;s panchanga for your location</p>
            </header>

            <RitualSetupCard
              config={setupConfig}
              calendarInstant={setupCalendarInstant}
              onConfigChange={updateUserConfig}
              onContinue={handleContinue}
            />

            <footer>Yajur Veda Upakarma Guide</footer>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={`app-layout${panelOpen ? " app-layout--panel-open" : ""}`}>
      <div className="app-main">
        <main className="page">
          <div className="guide-back">
            <button
              type="button"
              className="guide-back-button"
              onClick={() => {
                setPhase("setup");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Change ritual, date, or location
            </button>
          </div>

          <header>
            <h1>{title}</h1>
            <p className="subtitle">{subtitle}</p>
          </header>

          <section className="intro">
            <div
              className="intro-body rich-text"
              dangerouslySetInnerHTML={{ __html: introductionHtml }}
            />
          </section>

          <section className="setup" aria-labelledby="setup-heading">
            <h2 id="setup-heading">{setup.title}</h2>
            {ritualInference && ritualInference.ritualType === userConfig.ritualType && (
              <RitualTypeInferenceNote explanation={ritualInference} variant="guide" />
            )}
            <div
              className="setup-body rich-text"
              dangerouslySetInnerHTML={{ __html: setup.bodyHtml }}
            />
          </section>

          <GuidePreferencesCard config={userConfig} onChange={updateUserConfig} />

          <PanchangaSummary config={userConfig} calendarInstant={calendarInstant} />

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

      {activeStep?.informationHtml && (
        <TellMeMorePanel
          step={activeStep}
          onClose={() => setActiveStepIndex(null)}
        />
      )}
    </div>
  );
}
