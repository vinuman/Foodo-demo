import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { Meal } from "@/lib/types";

interface MealCardProps {
  meal: Meal;
  featured?: boolean;
  priority?: boolean;
}

export function MealCard({ meal, featured = false, priority = false }: MealCardProps) {
  return (
    <Link
      href={`/meals/${meal.id}`}
      className={`group relative block overflow-hidden rounded-3xl ${
        featured ? "row-span-2" : ""
      }`}
    >
      <div className="relative h-full min-h-[240px]">
        <Image
          src={meal.thumbnail}
          alt={meal.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="mb-2 flex flex-wrap gap-1.5">
            <Badge variant="overlay">{meal.category}</Badge>
            <Badge variant="overlay">{meal.area}</Badge>
          </div>
          <h3 className="font-serif text-lg font-bold leading-tight text-white sm:text-xl">
            {meal.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
