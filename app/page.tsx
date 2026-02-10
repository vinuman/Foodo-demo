import { MealGrid } from "@/components/meals/meal-grid";
import { getMealsByLetter } from "@/lib/mealdb";

/**
 * Home page — Static Site Generation (SSG).
 *
 * Fetches meals at build time using the default cached `fetch`.
 * No `revalidate` or `cache: "no-store"` — the page is fully static,
 * generated once and served from the CDN on every request.
 */

const FEATURED_LETTERS = ["b", "c", "s"] as const;

export default async function HomePage() {
  const mealGroups = await Promise.all(
    FEATURED_LETTERS.map((letter) => getMealsByLetter(letter)),
  );

  const meals = mealGroups.flat();

  return (
    <>
      <section className="pb-8 pt-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Discover Meals
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          Browse a curated collection of recipes from around the world.
          Click any meal to see the full recipe with ingredients and
          instructions.
        </p>
      </section>

      <MealGrid meals={meals} />
    </>
  );
}
