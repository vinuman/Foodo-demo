export const MEALDB_BASE_URL =
  "https://www.themealdb.com/api/json/v1/1" as const;

export const FOODO_API_BASE_URL =
  process.env.FOODO_API_BASE_URL ?? "https://api.staging.sdk.thefoodo.com";

export const FOODO_API_KEY = process.env.FOODO_API_KEY ?? "";

export const FOODO_RESTAURANT_ID = process.env.FOODO_RESTAURANT_ID ?? "";
