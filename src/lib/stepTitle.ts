const STEP_NUMBER_PREFIX = /^Step\s+\d+\s*—\s*/i;

/** Remove a leading "Step N —" if present (content authors omit step numbers). */
export function stripStepNumberPrefix(title: string) {
  return title.replace(STEP_NUMBER_PREFIX, "");
}

export function numberedStepTitle(stepNumber: number, title: string) {
  return `Step ${stepNumber} — ${stripStepNumberPrefix(title)}`;
}
