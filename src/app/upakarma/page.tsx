import { HomeClient } from "@/components/HomeClient";
import { ritualContentByType } from "@/content/ritualContent";
import { resolveUpakarmaContent } from "@/content/resolveUpakarmaContent";
import type { RitualType } from "@/lib/userConfig";
import type { ResolvedUpakarmaContent } from "@/types/upakarma";

const resolvedContentByRitualType = Object.fromEntries(
  (Object.keys(ritualContentByType) as RitualType[]).map((ritualType) => [
    ritualType,
    resolveUpakarmaContent(ritualContentByType[ritualType]),
  ]),
) as Record<RitualType, ResolvedUpakarmaContent>;

export default function UpakarmaPage() {
  return <HomeClient contentByRitualType={resolvedContentByRitualType} />;
}
