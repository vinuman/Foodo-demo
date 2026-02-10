import type { Metadata } from "next";

import { FoodSceneLoader } from "@/components/three/food-scene-loader";
import { getFoodModels } from "@/lib/foodo";

/**
 * 3D Food Showcase — Client-Side Rendering (CSR).
 *
 * The page itself is a Server Component that fetches model data from the
 * Foodo API (keeping the API key server-side). The R3F scene is loaded
 * client-side only via a dynamic import wrapper with `ssr: false` to
 * avoid WebGL errors during server rendering.
 */

export const metadata: Metadata = {
  title: "3D Food Showcase",
  description:
    "Explore interactive 3D food models with real-time lighting and camera controls.",
};

export default async function Food3DPage() {
  const models = await getFoodModels();

  if (models.length === 0) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">No 3D Models Available</h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          Unable to load food models. Please check the API configuration.
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="pb-8 pt-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          3D Food Showcase
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          Explore interactive 3D food models. Select a dish below, then drag to
          orbit, scroll to zoom, and right-click to pan.
        </p>
      </section>

      <FoodSceneLoader models={models} />
    </>
  );
}
