"use client";

import dynamic from "next/dynamic";
import type { RitualType } from "@/lib/userConfig";
import type { ResolvedUpakarmaContent } from "@/types/upakarma";

const UpakarmaGuide = dynamic(
  () => import("@/components/UpakarmaGuide").then((mod) => mod.UpakarmaGuide),
  {
    ssr: false,
    loading: () => (
      <main className="page">
        <p>Loading guide…</p>
      </main>
    ),
  },
);

type HomeClientProps = {
  contentByRitualType: Record<RitualType, ResolvedUpakarmaContent>;
};

export function HomeClient({ contentByRitualType }: HomeClientProps) {
  return <UpakarmaGuide contentByRitualType={contentByRitualType} />;
}
