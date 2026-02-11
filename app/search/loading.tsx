import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <>
      <section className="flex flex-col items-center pb-10 pt-16">
        <Skeleton className="h-14 w-52" />
        <Skeleton className="mt-4 h-6 w-96" />
      </section>

      <div className="mx-auto mb-10 max-w-2xl">
        <Skeleton className="h-12 w-full rounded-full" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="min-h-[240px] rounded-3xl" />
        ))}
      </div>
    </>
  );
}
