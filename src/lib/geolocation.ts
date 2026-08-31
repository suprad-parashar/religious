import { coordinatesForState, matchListedState, US_STATE_COORDINATES } from "@/lib/locationData";
import {
  DEFAULT_STATE_BY_COUNTRY,
  IN_STATES,
  todayLocalDate,
  type CountryCode,
  type UserConfig,
} from "@/lib/userConfig";
import tzlookup from "tz-lookup";

type ReverseGeocode = {
  countryCode?: string;
  principalSubdivision?: string;
  city?: string;
  locality?: string;
};

export type DetectedLocation = Partial<
  Pick<UserConfig, "country" | "state" | "city" | "latitude" | "longitude">
>;

function readPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 12_000,
      maximumAge: 300_000,
    });
  });
}

async function reverseGeocode(latitude: number, longitude: number): Promise<ReverseGeocode> {
  const url = new URL("https://api.bigdatacloud.net/data/reverse-geocode-client");
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set("localityLanguage", "en");

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Reverse geocoding failed");
  }
  return (await response.json()) as ReverseGeocode;
}

function countryFromCode(code: string | undefined): CountryCode | null {
  if (code === "US") return "us";
  if (code === "IN") return "in";
  return null;
}

/** Guess country from browser timezone when GPS country is unknown. */
export function inferCountryFromBrowserTimezone(): CountryCode {
  const offset = -new Date().getTimezoneOffset();
  return offset === 330 ? "in" : "us";
}

export function defaultStateForCountry(country: CountryCode): string {
  return DEFAULT_STATE_BY_COUNTRY[country];
}

function inferCountryFromCoordinates(latitude: number, longitude: number): CountryCode | null {
  try {
    const timeZone = tzlookup(latitude, longitude);
    if (timeZone === "Asia/Kolkata") return "in";
    if (timeZone.startsWith("America/")) return "us";
  } catch {
    // tz-lookup failed for this coordinate.
  }
  return null;
}

/** Fill missing country/state using coordinates, browser timezone, and defaults. */
export function normalizeDetectedLocation(detected: DetectedLocation): DetectedLocation {
  let country = detected.country;
  if (
    !country &&
    detected.latitude != null &&
    detected.longitude != null
  ) {
    country =
      inferCountryFromCoordinates(detected.latitude, detected.longitude) ??
      inferCountryFromBrowserTimezone();
  }
  if (!country) {
    country = inferCountryFromBrowserTimezone();
  }

  const state = detected.state?.trim()
    ? detected.state
    : defaultStateForCountry(country);

  return { ...detected, country, state };
}

export function locationDefaultsFromBrowser(): DetectedLocation {
  const country = inferCountryFromBrowserTimezone();
  return { country, state: defaultStateForCountry(country) };
}

export async function getGeolocationPermissionState(): Promise<PermissionState | "unsupported"> {
  if (typeof navigator === "undefined" || !navigator.geolocation) return "unsupported";
  if (!navigator.permissions?.query) return "prompt";
  try {
    const status = await navigator.permissions.query({ name: "geolocation" });
    return status.state;
  } catch {
    return "prompt";
  }
}

/** Detect GPS location, or fall back to browser timezone defaults with geocoded coordinates. */
export async function resolveSetupLocation(config: UserConfig): Promise<{
  config: UserConfig;
  usedDefaults: boolean;
}> {
  const ritualDate = config.ritualDate || todayLocalDate();
  const base = { ...config, ritualDate };

  try {
    const detected = await detectUserLocation();
    const merged = { ...base, ...detected };
    if (merged.latitude != null && merged.longitude != null) {
      return { config: merged, usedDefaults: false };
    }
    const coords = await resolveCoordinates(merged, { force: true });
    return {
      config: coords ? { ...merged, ...coords } : merged,
      usedDefaults: false,
    };
  } catch {
    const defaults = locationDefaultsFromBrowser();
    const merged = { ...base, ...defaults };
    const coords = await resolveCoordinates(merged, { force: true });
    return {
      config: coords ? { ...merged, ...coords } : merged,
      usedDefaults: true,
    };
  }
}

export async function detectUserLocation(): Promise<DetectedLocation> {
  const position = await readPosition();
  const { latitude, longitude } = position.coords;
  const place = await reverseGeocode(latitude, longitude);
  const country = countryFromCode(place.countryCode);

  if (!country) {
    return normalizeDetectedLocation({ latitude, longitude });
  }

  const subdivision = place.principalSubdivision ?? "";
  const rawCity = place.city || place.locality || "";

  if (country === "us") {
    const state = matchListedState(subdivision, Object.keys(US_STATE_COORDINATES));
    return normalizeDetectedLocation({
      country,
      state,
      city: rawCity,
      latitude,
      longitude,
    });
  }

  const state = matchListedState(subdivision, IN_STATES);

  return normalizeDetectedLocation({
    country,
    state,
    city: rawCity,
    latitude,
    longitude,
  });
}

const COUNTRY_GEO_NAMES: Record<CountryCode, string> = {
  us: "United States",
  in: "India",
};

export function hasResolvableLocation(config: UserConfig): boolean {
  return (config.country === "us" || config.country === "in") && Boolean(config.state.trim());
}

export function locationNeedsGeocode(config: UserConfig): boolean {
  return (
    hasResolvableLocation(config) &&
    (config.latitude == null || config.longitude == null)
  );
}

async function geocodeWithBigDataCloud(
  query: string,
): Promise<{ latitude: number; longitude: number } | null> {
  const url = new URL("https://api.bigdatacloud.net/data/forward-geocode-client");
  url.searchParams.set("query", query);
  url.searchParams.set("localityLanguage", "en");

  const response = await fetch(url.toString());
  if (!response.ok) return null;

  const place = (await response.json()) as {
    latitude?: number;
    longitude?: number;
    status?: number;
  };
  if (place.status && place.status !== 200) return null;
  if (typeof place.latitude !== "number" || typeof place.longitude !== "number") {
    return null;
  }
  return { latitude: place.latitude, longitude: place.longitude };
}

async function geocodeWithNominatim(
  query: string,
): Promise<{ latitude: number; longitude: number } | null> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");

  const response = await fetch(url.toString(), {
    headers: { "User-Agent": "YajurVedaUpakarmaGuide/1.0 (religious ritual guide)" },
  });
  if (!response.ok) return null;

  const results = (await response.json()) as Array<{ lat?: string; lon?: string }>;
  const first = results[0];
  if (!first?.lat || !first?.lon) return null;

  const latitude = Number(first.lat);
  const longitude = Number(first.lon);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  return { latitude, longitude };
}

/** Turn a typed city + state + country into coordinates for panchanga. */
export async function geocodePlace(
  city: string,
  state: string,
  country: CountryCode,
): Promise<{ latitude: number; longitude: number } | null> {
  const query = [city.trim(), state.trim(), COUNTRY_GEO_NAMES[country]]
    .filter(Boolean)
    .join(", ");
  if (!query) return null;

  return (await geocodeWithBigDataCloud(query)) ?? (await geocodeWithNominatim(query));
}

/** Geocode typed location when coordinates are not already known (e.g. GPS). */
export async function resolveCoordinates(
  config: UserConfig,
  options?: { force?: boolean },
): Promise<{ latitude: number; longitude: number } | null> {
  if (!options?.force && config.latitude != null && config.longitude != null) {
    return { latitude: config.latitude, longitude: config.longitude };
  }
  if (!hasResolvableLocation(config)) return null;

  if (config.city.trim()) {
    const cityCoords = await geocodePlace(config.city, config.state, config.country);
    if (cityCoords) return cityCoords;
  }

  const stateCoords = await geocodePlace("", config.state, config.country);
  if (stateCoords) return stateCoords;

  const centroid = coordinatesForState(config.country, config.state);
  if (centroid) return centroid;

  return null;
}

export function locationFieldsChanged(previous: UserConfig, next: UserConfig): boolean {
  return (
    previous.country !== next.country ||
    previous.state.trim() !== next.state.trim() ||
    previous.city.trim() !== next.city.trim()
  );
}
