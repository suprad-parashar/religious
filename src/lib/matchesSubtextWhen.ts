/** Match when a context field equals a value or is in a list. Multiple fields are ANDed. */
export type SubtextWhenValue = string | number | boolean;

export type SubtextWhen = Record<string, SubtextWhenValue | SubtextWhenValue[]>;

export type WhenContext = Record<string, string | number | boolean | undefined>;

function valuesMatch(actual: unknown, expected: SubtextWhenValue): boolean {
  if (actual === expected) return true;
  if (typeof actual === "number" && typeof expected === "string") {
    return String(actual) === expected;
  }
  if (typeof actual === "string" && typeof expected === "number") {
    return actual === String(expected);
  }
  return false;
}

function matchesAllowed(
  actual: unknown,
  expected: SubtextWhenValue | SubtextWhenValue[] | undefined,
): boolean {
  if (expected === undefined) return true;
  if (actual === undefined) return false;
  const allowed = Array.isArray(expected) ? expected : [expected];
  return allowed.some((candidate) => valuesMatch(actual, candidate));
}

export function mergeWhen(
  parent?: SubtextWhen,
  child?: SubtextWhen,
): SubtextWhen | undefined {
  if (!parent && !child) return undefined;
  return { ...parent, ...child };
}

/** Show a subtext when all `when` fields match the resolved user + panchanga context. */
export function matchesSubtextWhen(
  when: SubtextWhen | undefined,
  context: WhenContext,
): boolean {
  if (!when) return true;
  return Object.entries(when).every(([key, expected]) =>
    matchesAllowed(context[key], expected),
  );
}

export function buildWhenContext(
  config: Record<string, string | number | boolean | undefined>,
  values: Record<string, string | number | boolean | undefined>,
): WhenContext {
  // User config wins over display-oriented template values (e.g. japaCount "yatha" vs "yatha sambhava").
  return { ...values, ...config };
}
