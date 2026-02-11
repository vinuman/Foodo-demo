import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/ui/back-button";
import { IngredientList } from "@/components/meals/ingredient-list";
import type { Meal } from "@/lib/types";

interface MealDetailProps {
  meal: Meal;
}

export function MealDetail({ meal }: MealDetailProps) {
  return (
    <article>
      {/* Hero — image with overlaid title, badges, and back link */}
      <div className="relative overflow-hidden rounded-3xl">
        <div className="relative aspect-21/9">
          <Image
            src={meal.thumbnail}
            alt={meal.name}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <BackButton label="Back to collection" />

          <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {meal.name}
          </h1>

          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="overlay">{meal.category}</Badge>
            <Badge variant="overlay">{meal.area}</Badge>
            {meal.tags.map((tag) => (
              <Badge key={tag} variant="overlay">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        {/* Instructions — takes 2/3 on desktop */}
        <section className="lg:col-span-2">
          <h2 className="font-serif text-2xl font-bold">
            Cooking Instructions
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-neutral-300">
            {meal.instructions
              .split("\r\n")
              .filter(Boolean)
              .map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
          </div>

          {/* External links — directly after instructions */}
          {(meal.youtubeUrl || meal.sourceUrl) && (
            <div className="mt-8 flex flex-wrap gap-3 border-t border-neutral-800 pt-6">
              {meal.youtubeUrl && (
                <a
                  href={meal.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                    <polygon points="10,8 16,12 10,16" />
                  </svg>
                  Watch on YouTube
                </a>
              )}
              {meal.sourceUrl && (
                <a
                  href={meal.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-6 py-3 text-sm font-semibold text-neutral-200 transition-colors hover:bg-neutral-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  View Original Source
                </a>
              )}
            </div>
          )}
        </section>

        {/* Ingredients — takes 1/3 on desktop */}
        <section>
          <h2 className="font-serif text-2xl font-bold">Ingredients</h2>
          <div className="mt-5">
            <IngredientList ingredients={meal.ingredients} />
          </div>
        </section>
      </div>
    </article>
  );
}
