import { Skeleton } from "@/components/ui/skeleton";

export default function MealDetailLoading() {
  return (
    <>
      {/* Hero skeleton — matches the rounded-3xl aspect-21/9 hero */}
      <Skeleton className="aspect-21/9 w-full rounded-3xl" />

      {/* Content grid */}
      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        {/* Instructions skeleton */}
        <div className="space-y-4 lg:col-span-2">
          <Skeleton className="h-8 w-48" />
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
          <Skeleton className="h-8 w-32" />
          <div className="mt-5 space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
