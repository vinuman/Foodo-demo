"use client";

import type { FoodoModel } from "@/lib/types";

interface ModelSelectorProps {
  models: FoodoModel[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

function formatName(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export function ModelSelector({
  models,
  selectedIndex,
  onSelect,
}: ModelSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {models.map((model, i) => (
        <button
          key={model._id}
          onClick={() => onSelect(i)}
          className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            i === selectedIndex
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
          }`}
        >
          {formatName(model.name)}
        </button>
      ))}
    </div>
  );
}
