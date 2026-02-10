import {
  FOODO_API_BASE_URL,
  FOODO_API_KEY,
  FOODO_RESTAURANT_ID,
} from "./constants";
import type { FoodoApiResponse, FoodoModel } from "./types";

/**
 * Fetch all 3D food models for the configured restaurant.
 *
 * This function must only be called from Server Components —
 * it uses environment variables that are not exposed to the client.
 */
export async function getFoodModels(): Promise<FoodoModel[]> {
  if (!FOODO_API_KEY) {
    console.warn("Foodo: FOODO_API_KEY is not set — returning empty models.");
    return [];
  }

  const url = `${FOODO_API_BASE_URL}/model/all?restaurantID=${FOODO_RESTAURANT_ID}`;

  const res = await fetch(url, {
    headers: { "x-api-key": FOODO_API_KEY },
    next: { revalidate: 3600 }, // cache models for 1 hour
  });

  if (!res.ok) {
    throw new Error(`Foodo: failed to fetch models (status ${res.status})`);
  }

  const json: FoodoApiResponse = await res.json();

  // Only return models that have a valid .glb path
  return json.data.rows.filter((m) => m.modelPath.glb);
}
