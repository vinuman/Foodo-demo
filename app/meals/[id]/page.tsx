import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BackButton } from "@/components/ui/back-button";
import { MealDetail } from "@/components/meals/meal-detail";
import { getMealById, getMealsByLetter } from "@/lib/mealdb";

/**
 * Meal detail page — Incremental Static Regeneration (ISR).
 *
 * Each meal page is statically generated on first request, then
 * revalidated in the background every 60 seconds. `generateStaticParams`
 * pre-renders a subset of meals at build time for instant load.
 */

interface MealPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  // Pre-render meals starting with "b" at build time.
  // Other meals are generated on-demand on first request.
  const meals = await getMealsByLetter("b");

  return meals.map((meal) => ({ id: meal.id }));
}

export async function generateMetadata({
  params,
}: MealPageProps): Promise<Metadata> {
  const { id } = await params;
  const meal = await getMealById(id, { revalidate: 60 });

  if (!meal) {
    return { title: "Meal Not Found" };
  }

  return {
    title: meal.name,
    description: `${meal.name} — a ${meal.area} ${meal.category.toLowerCase()} recipe. Learn how to make it with step-by-step instructions.`,
  };
}

export default async function MealPage({ params }: MealPageProps) {
  const { id } = await params;
  const meal = await getMealById(id, { revalidate: 60 });

  if (!meal) {
    notFound();
  }

  return (
    <>
      <div className="mb-6">
        <BackButton />
      </div>
      <MealDetail meal={meal} />
    </>
  );
}
