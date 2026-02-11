import { Skeleton } from "@/components/ui/skeleton";

export default function Food3DLoading() {
  return (
    <>
      <section className="pb-8 pt-4">
        <Skeleton className="h-12 w-72" />
      </section>

      <div className="space-y-6">
        {/* Model selector pills */}
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-28 shrink-0 rounded-full" />
          ))}
        </div>

        {/* Canvas with overlaid info bar */}
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
    </>
  );
}
