import { MEALDB_BASE_URL } from "./constants";
import type { Ingredient, Meal, MealDBMeal } from "./types";

function extractIngredients(raw: MealDBMeal): Ingredient[] {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const name = raw[`strIngredient${i}`]?.trim();
    const measure = raw[`strMeasure${i}`]?.trim() ?? "";

    if (name) {
      ingredients.push({ name, measure });
    }
  }

  return ingredients;
}

function normaliseMeal(raw: MealDBMeal): Meal {
  return {
    id: raw.idMeal,
    name: raw.strMeal,
    category: raw.strCategory,
    area: raw.strArea,
    instructions: raw.strInstructions,
    thumbnail: raw.strMealThumb,
    tags: raw.strTags?.split(",").map((t) => t.trim()) ?? [],
    youtubeUrl: raw.strYoutube || null,
    sourceUrl: raw.strSource || null,
    ingredients: extractIngredients(raw),
  };
}

// SSG — relies on Next.js default fetch caching (no revalidate, no cache: "no-store").
export async function getMealsByLetter(letter: string): Promise<Meal[]> {
  const res = await fetch(`${MEALDB_BASE_URL}/search.php?f=${letter}`);

  if (!res.ok) {
    throw new Error(`MealDB: failed to fetch meals for letter "${letter}"`);
  }

  const data: { meals: MealDBMeal[] | null } = await res.json();

  return (data.meals ?? []).map(normaliseMeal);
}

// ISR — caller passes `next: { revalidate }`.
export async function getMealById(
  id: string,
  fetchOptions?: NextFetchRequestConfig,
): Promise<Meal | null> {
  const res = await fetch(`${MEALDB_BASE_URL}/lookup.php?i=${id}`, {
    next: fetchOptions,
  });

  if (!res.ok) {
    throw new Error(`MealDB: failed to fetch meal ${id}`);
  }

  const data: { meals: MealDBMeal[] | null } = await res.json();
  const raw = data.meals?.[0];

  return raw ? normaliseMeal(raw) : null;
}

// SSR — caller passes `cache: "no-store"`.
export async function searchMeals(
  query: string,
  fetchOptions?: RequestInit,
): Promise<Meal[]> {
  const res = await fetch(
    `${MEALDB_BASE_URL}/search.php?s=${encodeURIComponent(query)}`,
    fetchOptions,
  );

  if (!res.ok) {
    throw new Error(`MealDB: search failed for "${query}"`);
  }

  const data: { meals: MealDBMeal[] | null } = await res.json();

  return (data.meals ?? []).map(normaliseMeal);
}
