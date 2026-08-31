import type { RitualType } from "@/lib/userConfig";
import type { UpakarmaContent } from "@/types/upakarma";
import { upakarmaContent } from "@/content/upakarma";
import { yagnopaveetamContent } from "@/content/yagnopaveetam";

export const ritualContentByType: Record<RitualType, UpakarmaContent> = {
  upakarma: upakarmaContent,
  yagnopaveetam: yagnopaveetamContent,
};
