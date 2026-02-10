import type { Ingredient } from "@/lib/types";

interface IngredientListProps {
  ingredients: Ingredient[];
}

export function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
            <th className="px-4 py-3 font-semibold text-neutral-700 dark:text-neutral-300">
              Ingredient
            </th>
            <th className="px-4 py-3 font-semibold text-neutral-700 dark:text-neutral-300">
              Measure
            </th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((item, i) => (
            <tr
              key={item.name}
              className={
                i % 2 === 0
                  ? "bg-white dark:bg-neutral-950"
                  : "bg-neutral-50 dark:bg-neutral-900"
              }
            >
              <td className="px-4 py-2.5 text-neutral-900 dark:text-neutral-100">
                {item.name}
              </td>
              <td className="px-4 py-2.5 text-neutral-600 dark:text-neutral-400">
                {item.measure}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
