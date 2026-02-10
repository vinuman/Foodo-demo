import type { Metadata } from "next";

import { MealGrid } from "@/components/meals/meal-grid";
import { SearchInput } from "@/components/ui/search-input";
import { searchMeals } from "@/lib/mealdb";

/**
 * Search page — Server-Side Rendering (SSR).
 *
 * `dynamic = "force-dynamic"` ensures this page is never statically cached.
 * Every request reads the current `searchParams` and fetches fresh results
 * with `cache: "no-store"`.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search",
  description: "Search for meals by name across a global recipe database.",
};

interface SearchPageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query } = await searchParams;
  const meals = query ? await searchMeals(query, { cache: "no-store" }) : [];

  return (
    <>
      <section className="pb-8 pt-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Search
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          Find any meal by name. Results are fetched fresh on every search.
        </p>
      </section>

      <div className="mb-8">
        <SearchInput />
      </div>

      {query ? (
        <MealGrid meals={meals} />
      ) : (
        <p className="py-12 text-center text-neutral-500 dark:text-neutral-400">
          Start typing to search for meals.
        </p>
      )}
    </>
  );
}
