import { applyTemplate } from "@/lib/applyTemplate";
import { buildWhenContext, matchesSubtextWhen, type WhenContext } from "@/lib/matchesSubtextWhen";
import {
  calendarTemplateValues,
  type CalendarInstant,
  type CalendarTemplateValues,
} from "@/lib/panchanga";
import { numberedStepTitle } from "@/lib/stepTitle";
import { userConfigTemplateValues, type UserConfig } from "@/lib/userConfig";
import type { ResolvedStepAudio, ResolvedStepSubtext, ResolvedUpakarmaContent, ResolvedUpakarmaStep, StepAudio } from "@/types/upakarma";

type TemplateValues = ReturnType<typeof userConfigTemplateValues> &
  Partial<CalendarTemplateValues>;

function applyHtml(html: string | undefined, values: TemplateValues) {
  return html !== undefined ? applyTemplate(html, values) : undefined;
}

function resolveAudioTime(
  value: number | string | undefined,
  values: TemplateValues,
): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "number") return value;
  const parsed = Number(applyTemplate(value, values));
  return Number.isFinite(parsed) ? parsed : undefined;
}

function applyAudio(
  audio: StepAudio | undefined,
  config: UserConfig,
  values: TemplateValues,
): ResolvedStepAudio | undefined {
  if (!audio) return undefined;

  let resolved: ResolvedStepAudio = {
    ...audio,
    label: applyTemplate(audio.label, values),
    startTime: resolveAudioTime(audio.startTime, values),
    endTime: resolveAudioTime(audio.endTime, values),
  };

  if (audio.useJapaCount && config.japaCount !== "skip") {
    resolved = {
      ...resolved,
      repeat: config.japaCount === "yatha" ? "yatha" : config.japaCount,
    };
  }

  return resolved;
}

function isStepVisible(
  step: ResolvedUpakarmaStep,
  config: UserConfig,
  whenContext: WhenContext,
) {
  if (config.japaCount === "skip" && step.omitWhenSkipJapa) return false;
  return matchesSubtextWhen(step.when, whenContext);
}

function applySubtext(
  subtext: ResolvedStepSubtext,
  config: UserConfig,
  markdownHtml: Record<string, string>,
  values: TemplateValues,
): ResolvedStepSubtext {
  let textHtml = subtext.textHtml;
  if (subtext.textSrc) {
    const file = applyTemplate(subtext.textSrc, { country: config.country });
    textHtml = markdownHtml[file];
  }

  const { when: _when, ...rest } = subtext;

  return {
    ...rest,
    title: subtext.title !== undefined ? applyTemplate(subtext.title, values) : undefined,
    textHtml: applyHtml(textHtml, values),
    audio: applyAudio(subtext.audio, config, values),
  };
}

export function applyUserConfigToContent(
  content: ResolvedUpakarmaContent,
  config: UserConfig,
  calendarInstant: CalendarInstant | null = null,
): ResolvedUpakarmaContent {
  const values = {
    ...userConfigTemplateValues(config),
    ...calendarTemplateValues(config, calendarInstant),
  };
  const whenContext = buildWhenContext(config, values);
  const markdownHtml = content.markdownHtml ?? {};

  return {
    ...content,
    introductionHtml: applyTemplate(content.introductionHtml, values),
    setup: {
      ...content.setup,
      bodyHtml: applyTemplate(content.setup.bodyHtml, values),
    },
    steps: content.steps
      .filter((step) => isStepVisible(step, config, whenContext))
      .map((step, index) => {
        const { when: _when, ...stepRest } = step;
        return {
          ...stepRest,
          title: numberedStepTitle(index + 1, applyTemplate(step.title, values)),
          instruction: applyTemplate(step.instruction, values),
          informationHtml: applyHtml(step.informationHtml, values),
          subtexts: step.subtexts
            .filter((subtext) => matchesSubtextWhen(subtext.when, whenContext))
            .map((subtext) => applySubtext(subtext, config, markdownHtml, values)),
        };
      }),
  };
}
