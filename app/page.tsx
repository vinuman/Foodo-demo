import { MealGrid } from "@/components/meals/meal-grid";
import { getMealsByLetter } from "@/lib/mealdb";

// Home page — SSG. Fetches meals at build time using the default cached fetch.

const FEATURED_LETTERS = ["b", "c", "s"] as const;

export default async function HomePage() {
  const mealGroups = await Promise.all(
    FEATURED_LETTERS.map((letter) => getMealsByLetter(letter)),
  );

  const meals = mealGroups.flat();

  return (
    <>
      <section className="pb-10 pt-6">
        <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Discover{" "}
          <em className="text-accent">Exceptional</em>{" "}
          Meals
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-400">
          A curated sanctuary for global culinary artistry. Immerse yourself in
          refined recipes, premium ingredients, and a world of flavor.
        </p>
      </section>

      <MealGrid meals={meals} variant="bento" />
    </>
  );
}
