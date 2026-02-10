import { Skeleton } from "@/components/ui/skeleton";

export default function Food3DLoading() {
  return (
    <>
      <section className="pb-8 pt-4">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="mt-3 h-6 w-96" />
      </section>

      <div className="space-y-6">
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-28 shrink-0 rounded-full" />
          ))}
        </div>
        <Skeleton className="aspect-square w-full rounded-2xl sm:aspect-4/3 lg:aspect-video" />
      </div>
    </>
  );
}
