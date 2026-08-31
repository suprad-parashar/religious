"use client";

import { useMemo } from "react";
import {
  calendarTemplateValuesForDisplay,
  type CalendarInstant,
  type CalendarTemplateValues,
} from "@/lib/panchanga";
import type { UserConfig } from "@/lib/userConfig";
import { formatLocationLabel, formatRitualDateLong, todayLocalDate } from "@/lib/userConfig";

type PanchangaSummaryProps = {
  config: UserConfig;
  calendarInstant: CalendarInstant | null;
  emptyMessage?: string;
  loadingMessage?: string;
};

const FIELDS: { key: keyof CalendarTemplateValues; label: string }[] = [
  { key: "samvatsara", label: "Samvatsara" },
  { key: "ayana", label: "Ayana" },
  { key: "ritu", label: "Ritu" },
  { key: "masa", label: "Masa" },
  { key: "paksha", label: "Paksha" },
  { key: "tithi", label: "Tithi (at sunrise)" },
];

function panchangaSummaryLine(config: UserConfig): string | null {
  if (!config.state.trim()) return null;
  const ritualDate = config.ritualDate || todayLocalDate();
  return `Panchanga at local sunrise on ${formatRitualDateLong(ritualDate)} in ${formatLocationLabel(config)}.`;
}

export function PanchangaSummary({
  config,
  calendarInstant,
  emptyMessage = "Location is needed to calculate panchanga.",
  loadingMessage = "Calculating panchanga…",
}: PanchangaSummaryProps) {
  const { values, error } = useMemo(() => {
    if (!calendarInstant) {
      return {
        values: {} as Partial<CalendarTemplateValues>,
        error: null as string | null,
      };
    }
    try {
      return {
        values: calendarTemplateValuesForDisplay(config, calendarInstant),
        error: null as string | null,
      };
    } catch (cause) {
      return {
        values: {} as Partial<CalendarTemplateValues>,
        error: cause instanceof Error ? cause.message : "Could not compute panchanga.",
      };
    }
  }, [config, calendarInstant]);

  const hasValues = FIELDS.every((field) => values[field.key]);
  const summaryLine = panchangaSummaryLine(config);

  return (
    <section className="panchanga-summary" aria-labelledby="panchanga-summary-heading">
      <h2 id="panchanga-summary-heading">Panchanga</h2>
      {summaryLine && hasValues && (
        <p className="panchanga-summary-hint">{summaryLine}</p>
      )}
      {!calendarInstant ? (
        <p className="panchanga-summary-empty">{loadingMessage}</p>
      ) : error ? (
        <p className="panchanga-summary-empty">{error}</p>
      ) : hasValues ? (
        <dl className="panchanga-summary-grid">
          {values.sunrise && (
            <div className="panchanga-summary-item">
              <dt>Sunrise</dt>
              <dd>{values.sunrise}</dd>
            </div>
          )}
          {FIELDS.map((field) => (
            <div key={field.key} className="panchanga-summary-item">
              <dt>{field.label}</dt>
              <dd>{values[field.key]}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="panchanga-summary-empty">{emptyMessage}</p>
      )}
    </section>
  );
}
