/**
 * Shaka (amanta) panchanga for sankalpa placeholders.
 * Computed in the browser with @ishubhamx/panchangam-js (sunrise / udaya rule).
 *
 * Import from package subpaths — the main entry re-exports kundli code that uses Node `fs`.
 */

import { Observer } from "astronomy-engine";
import { getPanchangam } from "@ishubhamx/panchangam-js/dist/core/panchangam";
import { nakshatraNames } from "@ishubhamx/panchangam-js/dist/data/nakshatras";
import { tithiNames } from "@ishubhamx/panchangam-js/dist/data/tithis";
import { timezoneOffsetForLocation } from "@/lib/timezone";
import { tithiLabelFromTithi } from "@/lib/tithiLabel";
import { coordinatesForState } from "@/lib/locationData";
import { ritualTypeLabel, type RitualType, type UserConfig } from "@/lib/userConfig";

/** Sankalpa weekday names (0 = Sunday). */
const SANKALPA_VASARA = [
  "Ravivasara",
  "Induvasara",
  "Bhaumavasara",
  "Saumyavasara",
  "Guruvasara",
  "Shukravasara",
  "Sthiravasara",
] as const;

export type CalendarInstant = {
  date: Date;
  /** Minutes east of UTC. For the US this must be the current DST offset. */
  timezoneOffsetMinutes: number;
};

export type CalendarTemplateValues = {
  samvatsara: string;
  shakaYear: string;
  vasara: string;
  masa: string;
  paksha: string;
  tithi: string;
  tithiLabel: string;
  nakshatra: string;
  ritu: string;
  ayana: string;
  ayanaLabel: string;
  sunrise: string;
};

/** Locative form for sankalpa: replace the last "a" in ayana with "e" (e.g. Uttarayana → Uttarayane). */
export function ayanaLabelFromAyana(ayana: string) {
  const lastA = ayana.lastIndexOf("a");
  if (lastA === -1) return ayana;
  return `${ayana.slice(0, lastA)}e${ayana.slice(lastA + 1)}`;
}

function observerFor(config: UserConfig): Observer | null {
  if (config.latitude != null && config.longitude != null) {
    return new Observer(config.latitude, config.longitude, 0);
  }
  const centroid = coordinatesForState(config.country, config.state);
  if (!centroid) return null;
  return new Observer(centroid.latitude, centroid.longitude, 0);
}

function timezoneFor(instant: CalendarInstant): number {
  return instant.timezoneOffsetMinutes;
}

function tithiAtSunrise(
  sunrise: Date | null,
  tithiTransitions: { name: string; startTime: Date; endTime: Date }[] | undefined,
  tithiIndexZeroBased: number,
): string {
  if (sunrise && tithiTransitions?.length) {
    const atSunrise = tithiTransitions.find(
      (transition) =>
        transition.startTime.getTime() <= sunrise.getTime() &&
        sunrise.getTime() < transition.endTime.getTime(),
    );
    if (atSunrise) return atSunrise.name;
    return tithiTransitions[0].name;
  }
  return tithiNames[tithiIndexZeroBased] ?? String(tithiIndexZeroBased + 1);
}

function formatLocalTime(date: Date | null, timezoneOffsetMinutes: number): string | null {
  if (!date) return null;
  const localMs = date.getTime() + timezoneOffsetMinutes * 60_000;
  const local = new Date(localMs);
  const hours = local.getUTCHours();
  const minutes = local.getUTCMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
}

export function calendarInstantFromRitualDate(
  ritualDate: string,
  config: UserConfig,
  browserTimezoneOffsetMinutes: number,
): CalendarInstant {
  const timezoneOffsetMinutes = timezoneOffsetForLocation(
    config,
    ritualDate,
    browserTimezoneOffsetMinutes,
  );
  const [year, month, day] = ritualDate.split("-").map(Number);
  const date = new Date(
    Date.UTC(year, month - 1, day, 12, 0, 0) - timezoneOffsetMinutes * 60_000,
  );
  return { date, timezoneOffsetMinutes };
}

export function calendarTemplateValues(
  config: UserConfig,
  instant: CalendarInstant | null,
): Partial<CalendarTemplateValues> {
  try {
    return computeCalendarTemplateValues(config, instant);
  } catch {
    return {};
  }
}

export function calendarTemplateValuesForDisplay(
  config: UserConfig,
  instant: CalendarInstant | null,
): Partial<CalendarTemplateValues> {
  return computeCalendarTemplateValues(config, instant);
}

function normalizePanchangaName(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

/** Paksha + tithi for prose, except Purnima and Amavasya stand alone. */
export function formatTithiDisplay(tithi?: string, paksha?: string) {
  const tithiTrimmed = tithi?.trim() ?? "";
  if (!tithiTrimmed) return "this tithi";
  const tithiNorm = normalizePanchangaName(tithiTrimmed);
  if (tithiNorm === "purnima" || tithiNorm === "amavasya") {
    return tithiTrimmed;
  }
  const pakshaTrimmed = paksha?.trim();
  return pakshaTrimmed ? `${pakshaTrimmed} ${tithiTrimmed}` : tithiTrimmed;
}

/** Upakarma on Shravana Purnima; otherwise Yagnopaveetam change. */
export function explainRitualTypeFromPanchanga(
  masa?: string,
  tithi?: string,
  paksha?: string,
) {
  const masaNorm = normalizePanchangaName(masa ?? "");
  const tithiNorm = normalizePanchangaName(tithi ?? "");
  const isShravana = masaNorm === "shravana" || masaNorm.endsWith(" shravana");
  const isPurnima = tithiNorm === "purnima";

  if (isShravana && isPurnima) {
    return {
      ritualType: "upakarma" as const,
      reason: "today is Shravana Purnima",
    };
  }

  if (!isShravana && !isPurnima) {
    return {
      ritualType: "yagnopaveetam" as const,
      reason: "today is not Shravana Purnima",
    };
  }

  if (isShravana) {
    const tithiDisplay = formatTithiDisplay(tithi, paksha);
    return {
      ritualType: "yagnopaveetam" as const,
      reason: `today is in Shravana masa but the tithi is ${tithiDisplay}, not Purnima`,
    };
  }

  const masaDisplay = masa?.trim() || "this masa";
  return {
    ritualType: "yagnopaveetam" as const,
    reason: `today is Purnima but the masa is ${masaDisplay}, not Shravana`,
  };
}

export function ritualTypeFromPanchanga(masa?: string, tithi?: string): RitualType {
  return explainRitualTypeFromPanchanga(masa, tithi).ritualType;
}

export type RitualTypeExplanation = ReturnType<typeof explainRitualTypeFromPanchanga> & {
  ritualTypeLabel: string;
};

export function ritualTypeExplanationFromPanchanga(
  config: UserConfig,
  instant: CalendarInstant | null,
): RitualTypeExplanation | null {
  if (!instant) return null;
  const values = calendarTemplateValuesForDisplay(config, instant);
  if (!values.masa && !values.tithi) return null;
  const explanation = explainRitualTypeFromPanchanga(values.masa, values.tithi, values.paksha);
  return {
    ...explanation,
    ritualTypeLabel: ritualTypeLabel(explanation.ritualType),
  };
}

export function inferRitualTypeFromPanchanga(
  config: UserConfig,
  instant: CalendarInstant | null,
): RitualType {
  const values = calendarTemplateValuesForDisplay(config, instant);
  return explainRitualTypeFromPanchanga(values.masa, values.tithi, values.paksha).ritualType;
}

function computeCalendarTemplateValues(
  config: UserConfig,
  instant: CalendarInstant | null,
): Partial<CalendarTemplateValues> {
  if (!instant) return {};

  const observer = observerFor(config);
  if (!observer) return {};

  const tz = timezoneFor(instant);

  const panchanga = getPanchangam(instant.date, observer, {
    timezoneOffset: tz,
    calendarType: "amanta",
  });

  const masaName = panchanga.masa.isAdhika
    ? `Adhika ${panchanga.masa.name}`
    : panchanga.masa.name;

  const sunrise = formatLocalTime(panchanga.sunrise, tz);
  const tithi = tithiAtSunrise(panchanga.sunrise, panchanga.tithis, panchanga.tithi);

  return {
    samvatsara: panchanga.samvat.samvatsara,
    shakaYear: String(panchanga.samvat.shaka),
    vasara: SANKALPA_VASARA[panchanga.vara] ?? SANKALPA_VASARA[0],
    masa: masaName,
    paksha: panchanga.paksha,
    tithi,
    tithiLabel: tithiLabelFromTithi(tithi),
    nakshatra: nakshatraNames[panchanga.nakshatra] ?? String(panchanga.nakshatra),
    ritu: panchanga.ritu,
    ayana: panchanga.ayana,
    ayanaLabel: ayanaLabelFromAyana(panchanga.ayana),
    sunrise: sunrise ?? "",
  };
}
