import type { Metadata } from "next";

import { MealGrid } from "@/components/meals/meal-grid";
import { SearchInput } from "@/components/ui/search-input";
import { searchMeals } from "@/lib/mealdb";

// Search page — SSR. Every request fetches fresh results (force-dynamic + no-store).
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
      <section className="pb-10 pt-16 text-center">
        <h1 className="font-serif text-5xl font-bold italic tracking-tight sm:text-6xl">
          Search
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-neutral-400">
          Find any meal by name. Results are fetched fresh from our global
          culinary database on every search.
        </p>
      </section>

      <div className="mx-auto mb-10 max-w-2xl">
        <SearchInput />
      </div>

      {query ? (
        <MealGrid meals={meals} />
      ) : (
        <p className="py-12 text-center text-neutral-500">
          Start typing to explore recipes
        </p>
      )}
    </>
  );
}
