import { mergeWhen, type SubtextWhen } from "@/lib/matchesSubtextWhen";
import type { StepSubtext, StepSubtextEntry, SubtextGroup } from "@/types/upakarma";

export function isSubtextGroup(entry: StepSubtextEntry): entry is SubtextGroup {
  return Array.isArray((entry as SubtextGroup).subtexts);
}

/** Expand grouped subtexts into a flat list with inherited `when` conditions. */
export function flattenSubtextEntries(
  entries: StepSubtextEntry[],
  inheritedWhen?: SubtextWhen,
): StepSubtext[] {
  const flat: StepSubtext[] = [];

  for (const entry of entries) {
    if (isSubtextGroup(entry)) {
      const groupWhen = mergeWhen(inheritedWhen, entry.when);
      flat.push(...flattenSubtextEntries(entry.subtexts, groupWhen));
      continue;
    }

    flat.push({
      ...entry,
      when: mergeWhen(inheritedWhen, entry.when),
    });
  }

  return flat;
}
