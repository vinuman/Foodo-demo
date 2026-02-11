import { MealCard } from "@/components/ui/meal-card";
import type { Meal } from "@/lib/types";

interface MealGridProps {
  meals: Meal[];
  variant?: "bento" | "uniform";
}

const FEATURED_PATTERN = new Set([1, 6]);

function isFeatured(index: number): boolean {
  return FEATURED_PATTERN.has(index % 8);
}

export function MealGrid({ meals, variant = "uniform" }: MealGridProps) {
  if (meals.length === 0) {
    return (
      <p className="py-12 text-center text-neutral-500">
        No meals found.
      </p>
    );
  }

  if (variant === "bento") {
    return (
      <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {meals.map((meal, i) => (
          <MealCard
            key={meal.id}
            meal={meal}
            featured={isFeatured(i)}
          />
        ))}
      </div>
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
