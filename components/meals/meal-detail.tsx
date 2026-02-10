import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { IngredientList } from "@/components/meals/ingredient-list";
import type { Meal } from "@/lib/types";

interface MealDetailProps {
  meal: Meal;
}

export function MealDetail({ meal }: MealDetailProps) {
  return (
    <article>
      {/* Hero */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
        <Image
          src={meal.thumbnail}
          alt={meal.name}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
        />
      </div>

      {/* Header */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {meal.name}
        </h1>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge>{meal.category}</Badge>
          <Badge variant="outline">{meal.area}</Badge>
          {meal.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Content grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Instructions — takes 2/3 on desktop */}
        <section className="lg:col-span-2">
          <h2 className="text-xl font-semibold">Instructions</h2>
          <div className="mt-3 space-y-3 text-neutral-700 leading-relaxed dark:text-neutral-300">
            {meal.instructions
              .split("\r\n")
              .filter(Boolean)
              .map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
          </div>
        </section>

        {/* Ingredients — takes 1/3 on desktop */}
        <section>
          <h2 className="text-xl font-semibold">Ingredients</h2>
          <div className="mt-3">
            <IngredientList ingredients={meal.ingredients} />
          </div>
        </section>
      </div>

      {/* External links */}
      {(meal.youtubeUrl || meal.sourceUrl) && (
        <div className="mt-8 flex flex-wrap gap-3">
          {meal.youtubeUrl && (
            <a
              href={meal.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
            >
              Watch on YouTube
            </a>
          )}
          {meal.sourceUrl && (
            <a
              href={meal.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              View Source
            </a>
          )}
        </div>
      )}
    </article>
  );
}
