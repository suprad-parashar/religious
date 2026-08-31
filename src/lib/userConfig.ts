export const COUNTRY_OPTIONS = [
  { value: "us", label: "United States" },
  { value: "in", label: "India" },
] as const;

export type CountryCode = (typeof COUNTRY_OPTIONS)[number]["value"];
export type JapaCount = 27 | 54 | 108 | "yatha" | "skip";
export type RitualType = "upakarma" | "yagnopaveetam";

export type UserConfig = {
  country: CountryCode;
  state: string;
  city: string;
  ritualType: RitualType;
  japaCount: JapaCount;
  married: boolean;
  /** True when wearing Yagnopaveetam; false when wearing Uttariya instead. */
  wearsYagnopaveetam: boolean;
  /** Local civil date for panchanga, YYYY-MM-DD. */
  ritualDate: string;
  latitude?: number;
  longitude?: number;
};

export const DEFAULT_USER_CONFIG: UserConfig = {
  country: "us",
  state: "",
  city: "",
  ritualType: "upakarma",
  japaCount: 108,
  married: false,
  wearsYagnopaveetam: false,
  ritualDate: "",
};

export const RITUAL_TYPE_OPTIONS: { value: RitualType; label: string; hint: string }[] = [
  {
    value: "upakarma",
    label: "Sankshipta Upakarma Ceremony",
    hint: "Shortened annual Upakarma on Shravana Purnima",
  },
  {
    value: "yagnopaveetam",
    label: "Yagnopaveetam change",
    hint: "Changing the sacred thread on another day",
  },
];

export const DEFAULT_STATE_BY_COUNTRY: Record<CountryCode, string> = {
  us: "California",
  in: "Karnataka",
};

export const JAPA_OPTIONS: { value: JapaCount; label: string }[] = [
  { value: 27, label: "27" },
  { value: 54, label: "54" },
  { value: 108, label: "108" },
  { value: "yatha", label: "Yatha Sambhava (How much ever I can)" },
];

export function japaOptionsForRitual(ritualType: RitualType) {
  if (ritualType !== "upakarma") return [];
  return JAPA_OPTIONS;
}

export const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
] as const;

export const IN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Chandigarh",
  "Puducherry",
  "Jammu and Kashmir",
  "Ladakh",
] as const;

const STORAGE_KEY = "upakarma-user-config";

export function todayLocalDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isCountry(value: unknown): value is CountryCode {
  return COUNTRY_OPTIONS.some((option) => option.value === value);
}

function isJapaCount(value: unknown): value is JapaCount {
  return value === 27 || value === 54 || value === 108 || value === "yatha" || value === "skip";
}

function isRitualType(value: unknown): value is RitualType {
  return value === "upakarma" || value === "yagnopaveetam";
}

function inferCountryFromBrowserTimezone(): CountryCode {
  const offset = -new Date().getTimezoneOffset();
  return offset === 330 ? "in" : "us";
}

function withLocationDefaults(partial: Partial<UserConfig> = {}): UserConfig {
  const country = isCountry(partial.country)
    ? partial.country
    : inferCountryFromBrowserTimezone();
  const state =
    typeof partial.state === "string" && partial.state.trim()
      ? partial.state
      : DEFAULT_STATE_BY_COUNTRY[country];

  const ritualType = isRitualType(partial.ritualType)
    ? partial.ritualType
    : DEFAULT_USER_CONFIG.ritualType;
  let japaCount = isJapaCount(partial.japaCount)
    ? partial.japaCount
    : DEFAULT_USER_CONFIG.japaCount;
  if (ritualType === "upakarma" && japaCount === "skip") {
    japaCount = DEFAULT_USER_CONFIG.japaCount;
  }

  return {
    country,
    state,
    city: typeof partial.city === "string" ? partial.city : "",
    ritualType,
    japaCount,
    married: typeof partial.married === "boolean" ? partial.married : DEFAULT_USER_CONFIG.married,
    wearsYagnopaveetam:
      typeof partial.wearsYagnopaveetam === "boolean"
        ? partial.wearsYagnopaveetam
        : DEFAULT_USER_CONFIG.wearsYagnopaveetam,
    ritualDate: partial.ritualDate ?? todayLocalDate(),
    latitude: typeof partial.latitude === "number" ? partial.latitude : undefined,
    longitude: typeof partial.longitude === "number" ? partial.longitude : undefined,
  };
}

export function loadUserConfig(): UserConfig {
  if (typeof window === "undefined") {
    return withLocationDefaults();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return withLocationDefaults();
    }
    const parsed = JSON.parse(raw) as Partial<UserConfig> & { skipJapa?: boolean };
    const japaCount =
      parsed.skipJapa === true
        ? "skip"
        : isJapaCount(parsed.japaCount)
          ? parsed.japaCount
          : DEFAULT_USER_CONFIG.japaCount;
    return withLocationDefaults({
      country: isCountry(parsed.country) ? parsed.country : undefined,
      state: typeof parsed.state === "string" ? parsed.state : "",
      city: typeof parsed.city === "string" ? parsed.city : "",
      ritualType: isRitualType(parsed.ritualType) ? parsed.ritualType : undefined,
      japaCount,
      married: typeof parsed.married === "boolean" ? parsed.married : undefined,
      wearsYagnopaveetam:
        typeof parsed.wearsYagnopaveetam === "boolean" ? parsed.wearsYagnopaveetam : undefined,
      latitude: typeof parsed.latitude === "number" ? parsed.latitude : undefined,
      longitude: typeof parsed.longitude === "number" ? parsed.longitude : undefined,
      ritualDate: todayLocalDate(),
    });
  } catch {
    return withLocationDefaults();
  }
}

export function hasSavedUserConfig(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) !== null;
}

export function saveUserConfig(config: UserConfig) {
  const { ritualDate: _ritualDate, ...persisted } = config;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
}

export function countryLabel(country: CountryCode) {
  return COUNTRY_OPTIONS.find((option) => option.value === country)?.label ?? country;
}

export function formatLocationLabel(config: UserConfig): string {
  const parts = [config.city.trim(), config.state.trim(), countryLabel(config.country)].filter(
    Boolean,
  );
  return parts.join(", ");
}

export function formatRitualDateLong(ritualDate: string): string {
  const [year, month, day] = ritualDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const monthName = date.toLocaleDateString("en-US", { month: "long" });
  return `${day} ${monthName}, ${year}`;
}

export function japaCountLabel(count: JapaCount) {
  if (count === "skip") return "";
  if (count === "yatha") return "as many times as you can";
  return `${count} times`;
}

/** Sankalpa phrase for the selected japa count (Sankhyaka). */
export function japaSankhyakaMantra(count: JapaCount): string {
  switch (count) {
    case 27:
      return "Sapta Vimshatihi Sankhyaka";
    case 54:
      return "Chatuh Panchashat Sankhyaka";
    case "yatha":
      return "Yatha Sambhava";
    case 108:
      return "Ashtottara Shatam Sankhyaka";
    default:
      return "";
  }
}

export function ritualTypeLabel(type: RitualType) {
  return RITUAL_TYPE_OPTIONS.find((option) => option.value === type)?.label ?? type;
}

export function marriedLabel(married: boolean) {
  return married ? "Married" : "Unmarried";
}

export function upperGarmentLabel(wearsYagnopaveetam: boolean) {
  return wearsYagnopaveetam ? "Yagnopaveetam" : "Uttariya";
}

export function userConfigTemplateValues(config: UserConfig) {
  return {
    country: countryLabel(config.country),
    countryCode: config.country,
    state: config.state.trim() || "{{state}}",
    city: config.city.trim() || "{{city}}",
    ritualType: config.ritualType,
    ritualTypeLabel: ritualTypeLabel(config.ritualType),
    married: config.married,
    marriedLabel: marriedLabel(config.married),
    wearsYagnopaveetam: config.wearsYagnopaveetam,
    upperGarment: upperGarmentLabel(config.wearsYagnopaveetam),
    upperGarmentLabel: upperGarmentLabel(config.wearsYagnopaveetam),
    japaCount:
      config.japaCount === "yatha"
        ? "yatha sambhava"
        : config.japaCount === "skip"
          ? ""
          : String(config.japaCount),
    japaCountLabel: japaCountLabel(config.japaCount),
    japaSankhyakaMantra: japaSankhyakaMantra(config.japaCount),
  };
}
