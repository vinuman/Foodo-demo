import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MealDetail } from "@/components/meals/meal-detail";
import { getMealById, getMealsByLetter } from "@/lib/mealdb";

// Meal detail page — ISR. Statically generated, revalidated every 60s.

interface MealPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
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

  return <MealDetail meal={meal} />;
}
