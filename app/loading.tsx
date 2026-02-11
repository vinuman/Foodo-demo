import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <>
      <section className="pb-10 pt-6">
        <Skeleton className="h-16 w-96" />
        <Skeleton className="mt-4 h-6 w-80" />
      </section>

      <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className={`rounded-3xl ${i === 1 || i === 6 ? "row-span-2" : ""}`}
          />
        ))}
      </div>
    </>
  );
}
