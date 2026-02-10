import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <>
      <section className="pb-8 pt-4">
        <Skeleton className="h-12 w-72" />
        <Skeleton className="mt-3 h-6 w-96" />
      </section>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <Skeleton className="aspect-4/3 w-full rounded-none" />
            <div className="p-4">
              <Skeleton className="h-5 w-3/4" />
              <div className="mt-2 flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
