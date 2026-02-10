import { Skeleton } from "@/components/ui/skeleton";

export default function MealDetailLoading() {
  return (
    <>
      {/* Back button */}
      <div className="mb-6">
        <Skeleton className="h-9 w-20 rounded-lg" />
      </div>

      {/* Hero image */}
      <Skeleton className="aspect-video w-full rounded-2xl" />

      {/* Title + badges */}
      <div className="mt-6">
        <Skeleton className="h-10 w-80" />
        <div className="mt-3 flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>

      {/* Content grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Instructions skeleton */}
        <div className="space-y-3 lg:col-span-2">
          <Skeleton className="h-7 w-36" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Ingredients skeleton */}
        <div>
          <Skeleton className="h-7 w-28" />
          <div className="mt-3 space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
