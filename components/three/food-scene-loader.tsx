"use client";

import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";
import type { FoodoModel } from "@/lib/types";

/**
 * Client-side wrapper that lazy-loads the R3F scene with `ssr: false`.
 *
 * `next/dynamic` with `ssr: false` must live in a Client Component —
 * it cannot be used directly in a Server Component (Next.js 16 restriction).
 * This thin wrapper exists solely to satisfy that constraint.
 */
const FoodScene = dynamic(() => import("./food-scene"), {
  ssr: false,
  loading: () => (
    <div className="space-y-6">
      <div className="flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-28 shrink-0 rounded-full" />
        ))}
      </div>
      <Skeleton className="aspect-square w-full rounded-2xl sm:aspect-4/3 lg:aspect-video" />
    </div>
  ),
});

interface FoodSceneLoaderProps {
  models: FoodoModel[];
}

export function FoodSceneLoader({ models }: FoodSceneLoaderProps) {
  return <FoodScene models={models} />;
}
