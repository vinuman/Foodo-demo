"use client";

import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";
import type { FoodoModel } from "@/lib/types";

const FoodScene = dynamic(() => import("./food-scene"), {
  ssr: false,
  loading: () => (
    <div className="space-y-6">
      <div className="flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-28 shrink-0 rounded-full" />
        ))}
      </div>
      <div className="relative overflow-hidden rounded-2xl">
        <Skeleton className="aspect-square w-full sm:aspect-4/3 lg:aspect-[2.5/1]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 px-5 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="mt-2 h-5 w-40 rounded" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-14 w-14 rounded-xl" />
              <Skeleton className="h-14 w-16 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
});

interface FoodSceneLoaderProps {
  models: FoodoModel[];
}

export function FoodSceneLoader({ models }: FoodSceneLoaderProps) {
  return <FoodScene models={models} />;
}
