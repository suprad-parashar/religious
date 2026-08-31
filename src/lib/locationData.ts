export type Coordinates = { latitude: number; longitude: number };

export const US_STATE_COORDINATES: Record<string, Coordinates> = {
  Alabama: { latitude: 32.81, longitude: -86.79 },
  Alaska: { latitude: 64.07, longitude: -152.28 },
  Arizona: { latitude: 34.27, longitude: -111.66 },
  Arkansas: { latitude: 34.89, longitude: -92.44 },
  California: { latitude: 37.18, longitude: -119.47 },
  Colorado: { latitude: 39.0, longitude: -105.55 },
  Connecticut: { latitude: 41.62, longitude: -72.73 },
  Delaware: { latitude: 38.99, longitude: -75.51 },
  "District of Columbia": { latitude: 38.91, longitude: -77.04 },
  Florida: { latitude: 28.63, longitude: -82.45 },
  Georgia: { latitude: 32.64, longitude: -83.44 },
  Hawaii: { latitude: 20.29, longitude: -156.37 },
  Idaho: { latitude: 44.39, longitude: -114.66 },
  Illinois: { latitude: 40.04, longitude: -89.2 },
  Indiana: { latitude: 39.89, longitude: -86.28 },
  Iowa: { latitude: 42.08, longitude: -93.5 },
  Kansas: { latitude: 38.5, longitude: -98.38 },
  Kentucky: { latitude: 37.53, longitude: -85.3 },
  Louisiana: { latitude: 31.07, longitude: -92.0 },
  Maine: { latitude: 45.37, longitude: -69.24 },
  Maryland: { latitude: 39.05, longitude: -76.79 },
  Massachusetts: { latitude: 42.26, longitude: -71.81 },
  Michigan: { latitude: 44.35, longitude: -85.5 },
  Minnesota: { latitude: 46.28, longitude: -94.31 },
  Mississippi: { latitude: 32.74, longitude: -89.67 },
  Missouri: { latitude: 38.36, longitude: -92.46 },
  Montana: { latitude: 47.05, longitude: -109.63 },
  Nebraska: { latitude: 41.54, longitude: -99.8 },
  Nevada: { latitude: 39.33, longitude: -116.63 },
  "New Hampshire": { latitude: 43.68, longitude: -71.58 },
  "New Jersey": { latitude: 40.19, longitude: -74.67 },
  "New Mexico": { latitude: 34.41, longitude: -106.11 },
  "New York": { latitude: 42.95, longitude: -75.53 },
  "North Carolina": { latitude: 35.56, longitude: -79.39 },
  "North Dakota": { latitude: 47.45, longitude: -100.47 },
  Ohio: { latitude: 40.29, longitude: -82.79 },
  Oklahoma: { latitude: 35.59, longitude: -97.51 },
  Oregon: { latitude: 43.93, longitude: -120.56 },
  Pennsylvania: { latitude: 40.88, longitude: -77.8 },
  "Rhode Island": { latitude: 41.68, longitude: -71.51 },
  "South Carolina": { latitude: 33.92, longitude: -80.9 },
  "South Dakota": { latitude: 44.44, longitude: -100.23 },
  Tennessee: { latitude: 35.86, longitude: -86.35 },
  Texas: { latitude: 31.17, longitude: -100.08 },
  Utah: { latitude: 39.32, longitude: -111.68 },
  Vermont: { latitude: 44.07, longitude: -72.67 },
  Virginia: { latitude: 37.52, longitude: -78.85 },
  Washington: { latitude: 47.38, longitude: -120.45 },
  "West Virginia": { latitude: 38.64, longitude: -80.62 },
  Wisconsin: { latitude: 44.62, longitude: -89.99 },
  Wyoming: { latitude: 43.0, longitude: -107.55 },
};

export const IN_STATE_COORDINATES: Record<string, Coordinates> = {
  "Andhra Pradesh": { latitude: 15.91, longitude: 79.74 },
  "Arunachal Pradesh": { latitude: 28.22, longitude: 94.73 },
  Assam: { latitude: 26.2, longitude: 92.94 },
  Bihar: { latitude: 25.1, longitude: 85.31 },
  Chhattisgarh: { latitude: 21.28, longitude: 81.87 },
  Goa: { latitude: 15.3, longitude: 74.12 },
  Gujarat: { latitude: 22.26, longitude: 71.19 },
  Haryana: { latitude: 29.06, longitude: 76.08 },
  "Himachal Pradesh": { latitude: 31.1, longitude: 77.17 },
  Jharkhand: { latitude: 23.61, longitude: 85.28 },
  Karnataka: { latitude: 15.32, longitude: 75.71 },
  Kerala: { latitude: 10.85, longitude: 76.27 },
  "Madhya Pradesh": { latitude: 22.97, longitude: 78.66 },
  Maharashtra: { latitude: 19.75, longitude: 75.71 },
  Manipur: { latitude: 24.66, longitude: 93.91 },
  Meghalaya: { latitude: 25.47, longitude: 91.37 },
  Mizoram: { latitude: 23.16, longitude: 92.94 },
  Nagaland: { latitude: 26.16, longitude: 94.56 },
  Odisha: { latitude: 20.95, longitude: 85.1 },
  Punjab: { latitude: 31.15, longitude: 75.34 },
  Rajasthan: { latitude: 27.02, longitude: 74.22 },
  Sikkim: { latitude: 27.53, longitude: 88.51 },
  "Tamil Nadu": { latitude: 11.13, longitude: 78.66 },
  Telangana: { latitude: 18.11, longitude: 79.02 },
  Tripura: { latitude: 23.94, longitude: 91.99 },
  "Uttar Pradesh": { latitude: 26.85, longitude: 80.95 },
  Uttarakhand: { latitude: 30.07, longitude: 79.02 },
  "West Bengal": { latitude: 22.99, longitude: 87.85 },
  Delhi: { latitude: 28.61, longitude: 77.21 },
  Chandigarh: { latitude: 30.73, longitude: 76.78 },
  Puducherry: { latitude: 11.94, longitude: 79.81 },
  "Jammu and Kashmir": { latitude: 33.78, longitude: 76.58 },
  Ladakh: { latitude: 34.15, longitude: 77.58 },
};

/** Major cities per state/UT — used for dropdowns and approximate coordinates. */
export const IN_CITIES_BY_STATE: Record<string, readonly { name: string; coords: Coordinates }[]> = {
  "Andhra Pradesh": [
    { name: "Visakhapatnam", coords: { latitude: 17.69, longitude: 83.22 } },
    { name: "Vijayawada", coords: { latitude: 16.51, longitude: 80.65 } },
    { name: "Tirupati", coords: { latitude: 13.63, longitude: 79.42 } },
  ],
  "Arunachal Pradesh": [{ name: "Itanagar", coords: { latitude: 27.08, longitude: 93.6 } }],
  Assam: [
    { name: "Guwahati", coords: { latitude: 26.14, longitude: 91.74 } },
    { name: "Dibrugarh", coords: { latitude: 27.47, longitude: 94.91 } },
  ],
  Bihar: [
    { name: "Patna", coords: { latitude: 25.59, longitude: 85.14 } },
    { name: "Gaya", coords: { latitude: 24.79, longitude: 85.0 } },
  ],
  Chhattisgarh: [
    { name: "Raipur", coords: { latitude: 21.25, longitude: 81.63 } },
    { name: "Bhilai", coords: { latitude: 21.19, longitude: 81.35 } },
  ],
  Goa: [{ name: "Panaji", coords: { latitude: 15.49, longitude: 73.83 } }],
  Gujarat: [
    { name: "Ahmedabad", coords: { latitude: 23.02, longitude: 72.57 } },
    { name: "Surat", coords: { latitude: 21.17, longitude: 72.83 } },
    { name: "Vadodara", coords: { latitude: 22.31, longitude: 73.18 } },
  ],
  Haryana: [
    { name: "Gurugram", coords: { latitude: 28.46, longitude: 77.03 } },
    { name: "Faridabad", coords: { latitude: 28.41, longitude: 77.32 } },
  ],
  "Himachal Pradesh": [{ name: "Shimla", coords: { latitude: 31.1, longitude: 77.17 } }],
  Jharkhand: [
    { name: "Ranchi", coords: { latitude: 23.34, longitude: 85.31 } },
    { name: "Jamshedpur", coords: { latitude: 22.8, longitude: 86.18 } },
  ],
  Karnataka: [
    { name: "Bengaluru", coords: { latitude: 12.97, longitude: 77.59 } },
    { name: "Mysuru", coords: { latitude: 12.3, longitude: 76.65 } },
    { name: "Mangaluru", coords: { latitude: 12.91, longitude: 74.86 } },
    { name: "Hubballi", coords: { latitude: 15.36, longitude: 75.12 } },
  ],
  Kerala: [
    { name: "Thiruvananthapuram", coords: { latitude: 8.52, longitude: 76.94 } },
    { name: "Kochi", coords: { latitude: 9.93, longitude: 76.27 } },
    { name: "Kozhikode", coords: { latitude: 11.26, longitude: 75.78 } },
  ],
  "Madhya Pradesh": [
    { name: "Bhopal", coords: { latitude: 23.26, longitude: 77.41 } },
    { name: "Indore", coords: { latitude: 22.72, longitude: 75.86 } },
    { name: "Ujjain", coords: { latitude: 23.18, longitude: 75.77 } },
  ],
  Maharashtra: [
    { name: "Mumbai", coords: { latitude: 19.08, longitude: 72.88 } },
    { name: "Pune", coords: { latitude: 18.52, longitude: 73.86 } },
    { name: "Nagpur", coords: { latitude: 21.15, longitude: 79.09 } },
  ],
  Manipur: [{ name: "Imphal", coords: { latitude: 24.82, longitude: 93.94 } }],
  Meghalaya: [{ name: "Shillong", coords: { latitude: 25.58, longitude: 91.89 } }],
  Mizoram: [{ name: "Aizawl", coords: { latitude: 23.73, longitude: 92.72 } }],
  Nagaland: [{ name: "Kohima", coords: { latitude: 25.67, longitude: 94.11 } }],
  Odisha: [
    { name: "Bhubaneswar", coords: { latitude: 20.3, longitude: 85.82 } },
    { name: "Cuttack", coords: { latitude: 20.46, longitude: 85.88 } },
  ],
  Punjab: [
    { name: "Ludhiana", coords: { latitude: 30.9, longitude: 75.86 } },
    { name: "Amritsar", coords: { latitude: 31.63, longitude: 74.87 } },
    { name: "Chandigarh", coords: { latitude: 30.73, longitude: 76.78 } },
  ],
  Rajasthan: [
    { name: "Jaipur", coords: { latitude: 26.91, longitude: 75.79 } },
    { name: "Jodhpur", coords: { latitude: 26.24, longitude: 73.02 } },
    { name: "Udaipur", coords: { latitude: 24.59, longitude: 73.71 } },
  ],
  Sikkim: [{ name: "Gangtok", coords: { latitude: 27.33, longitude: 88.61 } }],
  "Tamil Nadu": [
    { name: "Chennai", coords: { latitude: 13.08, longitude: 80.27 } },
    { name: "Coimbatore", coords: { latitude: 11.02, longitude: 76.96 } },
    { name: "Madurai", coords: { latitude: 9.93, longitude: 78.12 } },
  ],
  Telangana: [
    { name: "Hyderabad", coords: { latitude: 17.39, longitude: 78.49 } },
    { name: "Warangal", coords: { latitude: 17.97, longitude: 79.59 } },
  ],
  Tripura: [{ name: "Agartala", coords: { latitude: 23.83, longitude: 91.28 } }],
  "Uttar Pradesh": [
    { name: "Lucknow", coords: { latitude: 26.85, longitude: 80.95 } },
    { name: "Kanpur", coords: { latitude: 26.45, longitude: 80.33 } },
    { name: "Varanasi", coords: { latitude: 25.32, longitude: 82.99 } },
    { name: "Noida", coords: { latitude: 28.54, longitude: 77.39 } },
  ],
  Uttarakhand: [
    { name: "Dehradun", coords: { latitude: 30.32, longitude: 78.03 } },
    { name: "Haridwar", coords: { latitude: 29.95, longitude: 78.16 } },
  ],
  "West Bengal": [
    { name: "Kolkata", coords: { latitude: 22.57, longitude: 88.36 } },
    { name: "Siliguri", coords: { latitude: 26.73, longitude: 88.4 } },
  ],
  Delhi: [{ name: "New Delhi", coords: { latitude: 28.61, longitude: 77.21 } }],
  Chandigarh: [{ name: "Chandigarh", coords: { latitude: 30.73, longitude: 76.78 } }],
  Puducherry: [{ name: "Puducherry", coords: { latitude: 11.94, longitude: 79.81 } }],
  "Jammu and Kashmir": [
    { name: "Srinagar", coords: { latitude: 34.08, longitude: 74.8 } },
    { name: "Jammu", coords: { latitude: 32.73, longitude: 74.86 } },
  ],
  Ladakh: [{ name: "Leh", coords: { latitude: 34.15, longitude: 77.58 } }],
};

export const US_CENTER: Coordinates = { latitude: 39.8283, longitude: -98.5795 };
export const IN_CENTER: Coordinates = { latitude: 23.18, longitude: 75.77 };

export function matchListedState(name: string, states: readonly string[]): string {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return "";
  const exact = states.find((state) => state.toLowerCase() === normalized);
  if (exact) return exact;
  const partial = states.find(
    (state) =>
      normalized.includes(state.toLowerCase()) || state.toLowerCase().includes(normalized),
  );
  return partial ?? "";
}

export function matchListedCity(
  name: string,
  cities: readonly { name: string }[],
): string {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return "";
  const exact = cities.find((city) => city.name.toLowerCase() === normalized);
  if (exact) return exact.name;
  const partial = cities.find(
    (city) =>
      normalized.includes(city.name.toLowerCase()) ||
      city.name.toLowerCase().includes(normalized),
  );
  return partial?.name ?? name.trim();
}

export function coordinatesForState(
  country: "us" | "in",
  state: string,
): Coordinates | null {
  if (!state.trim()) return null;
  if (country === "in") return IN_STATE_COORDINATES[state] ?? null;
  return US_STATE_COORDINATES[state] ?? null;
}

export function coordinatesForConfig(
  country: "us" | "in",
  state: string,
  city: string,
  precise?: Coordinates | null,
): Coordinates {
  if (precise) return precise;

  if (country === "in") {
    const cities = IN_CITIES_BY_STATE[state];
    const cityMatch = cities?.find((entry) => entry.name === city);
    if (cityMatch) return cityMatch.coords;
    if (state && IN_STATE_COORDINATES[state]) return IN_STATE_COORDINATES[state];
    return IN_CENTER;
  }

  if (state && US_STATE_COORDINATES[state]) return US_STATE_COORDINATES[state];
  return US_CENTER;
}
