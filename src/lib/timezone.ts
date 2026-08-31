import tzlookup from "tz-lookup";
import { coordinatesForState } from "@/lib/locationData";
import type { UserConfig } from "@/lib/userConfig";

function coordinatesForTimezone(config: UserConfig): { latitude: number; longitude: number } | null {
  if (config.latitude != null && config.longitude != null) {
    return { latitude: config.latitude, longitude: config.longitude };
  }
  if (config.country === "us" || config.country === "in") {
    return coordinatesForState(config.country, config.state);
  }
  return null;
}

/** Minutes east of UTC for the ritual date in the location's IANA timezone (DST-aware). */
export function offsetMinutesEastOfUtc(timeZone: string, ritualDate: string): number {
  const [year, month, day] = ritualDate.split("-").map(Number);
  const instant = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const utcDate = new Date(instant.toLocaleString("en-US", { timeZone: "UTC" }));
  const localDate = new Date(instant.toLocaleString("en-US", { timeZone }));
  return (localDate.getTime() - utcDate.getTime()) / 60_000;
}

export function ianaTimezoneForLocation(latitude: number, longitude: number): string {
  return tzlookup(latitude, longitude);
}

/** Panchanga timezone from geocoded coordinates, with country/browser fallbacks before geocoding. */
export function timezoneOffsetForLocation(
  config: UserConfig,
  ritualDate: string,
  browserTimezoneOffsetMinutes: number,
): number {
  const coords = coordinatesForTimezone(config);
  if (coords) {
    const timeZone = ianaTimezoneForLocation(coords.latitude, coords.longitude);
    return offsetMinutesEastOfUtc(timeZone, ritualDate);
  }
  if (config.country === "in") return 330;
  return browserTimezoneOffsetMinutes;
}
