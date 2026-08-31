import type { RitualTypeExplanation } from "@/lib/panchanga";

type RitualTypeInferenceNoteProps = {
  explanation: RitualTypeExplanation;
  /** Setup screen before Continue vs guide after routing. */
  variant: "setup" | "guide";
};

export function RitualTypeInferenceNote({
  explanation,
  variant,
}: RitualTypeInferenceNoteProps) {
  return (
    <p className="ritual-type-inference">
      {variant === "setup" ? (
        <>
          Based on today&apos;s panchanga, continuing will open the{" "}
          <strong>{explanation.ritualTypeLabel}</strong> guide because {explanation.reason}.
        </>
      ) : (
        <>
          This guide is for <strong>{explanation.ritualTypeLabel}</strong> because{" "}
          {explanation.reason}.
        </>
      )}
    </p>
  );
}
