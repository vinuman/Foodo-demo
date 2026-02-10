import { MealCard } from "@/components/ui/meal-card";
import type { Meal } from "@/lib/types";

interface MealGridProps {
  meals: Meal[];
}

export function MealGrid({ meals }: MealGridProps) {
  if (meals.length === 0) {
    return (
      <p className="py-12 text-center text-neutral-500 dark:text-neutral-400">
        No meals found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  );
}
