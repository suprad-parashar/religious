export type TemplateValues = Record<string, string | number | boolean>;

export type { SubtextWhen } from "@/lib/matchesSubtextWhen";
import type { SubtextWhen } from "@/lib/matchesSubtextWhen";

/** Typed-in string, a markdown file, or a markdown file with {{placeholders}}. */
export type RichText =
  | string
  | { type: "md"; src: string }
  | { type: "template"; src: string; values: TemplateValues };

export type UpakarmaSetup = {
  title: string;
  body: RichText;
};

export type ResolvedUpakarmaSetup = {
  title: string;
  bodyHtml: string;
};

export type StepAudio = {
  src: string;
  label: string;
  /** Number or `{{placeholder}}` resolved from user config and panchanga. */
  startTime?: number | string;
  endTime?: number | string;
  /** Play the clip this many times. Omit or 1 to play once. `"yatha"` loops until paused. */
  repeat?: number | "yatha";
  /** When true, `repeat` is taken from the user's japa count selection. */
  useJapaCount?: boolean;
};

/** Audio after templates and user config are applied. */
export type ResolvedStepAudio = {
  src: string;
  label: string;
  startTime?: number;
  endTime?: number;
  repeat?: number | "yatha";
  useJapaCount?: boolean;
};

export type StepSubtext = {
  title?: string;
  text?: RichText;
  audio?: StepAudio;
  /** Show only when context fields match (user config, panchanga, etc.). */
  when?: SubtextWhen;
};

/** Run several subtexts together when a condition matches. */
export type SubtextGroup = {
  when?: SubtextWhen;
  subtexts: StepSubtext[];
};

export type StepSubtextEntry = StepSubtext | SubtextGroup;

export type ResolvedStepSubtext = {
  title?: string;
  textHtml?: string;
  /** Markdown filename with {{placeholders}}, resolved on the client from markdownHtml. */
  textSrc?: string;
  audio?: StepAudio;
  when?: SubtextWhen;
};

export type UpakarmaStep = {
  title: string;
  instruction: string;
  /** Optional deeper context for the side panel. Omit to hide "Tell me more". */
  information?: RichText;
  /** Omit in Yagnopaveetam change when the user skips japa. */
  omitWhenSkipJapa?: boolean;
  /** Omit the entire step when context fields do not match (user config, panchanga, etc.). */
  when?: SubtextWhen;
  subtexts: StepSubtextEntry[];
};

export type ResolvedUpakarmaStep = Omit<UpakarmaStep, "subtexts" | "information"> & {
  informationHtml?: string;
  subtexts: ResolvedStepSubtext[];
};

export type UpakarmaContent = {
  title: string;
  subtitle: string;
  introduction: RichText;
  setup: UpakarmaSetup;
  fullRecording: { src: string; label: string };
  steps: UpakarmaStep[];
};

export type ResolvedUpakarmaContent = Omit<
  UpakarmaContent,
  "introduction" | "setup" | "steps"
> & {
  introductionHtml: string;
  setup: ResolvedUpakarmaSetup;
  steps: ResolvedUpakarmaStep[];
  markdownHtml: Record<string, string>;
};
