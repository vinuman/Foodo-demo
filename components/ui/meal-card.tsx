import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { Meal } from "@/lib/types";

interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  return (
    <Link
      href={`/meals/${meal.id}`}
      className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={meal.thumbnail}
          alt={meal.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold leading-tight text-neutral-900 group-hover:text-neutral-700 dark:text-white dark:group-hover:text-neutral-300">
          {meal.name}
        </h3>

        <div className="mt-2 flex flex-wrap gap-2">
          <Badge>{meal.category}</Badge>
          <Badge variant="outline">{meal.area}</Badge>
        </div>
      </div>
    </Link>
  );
}
