import type { Ingredient } from "@/lib/types";

interface IngredientListProps {
  ingredients: Ingredient[];
}

export function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-800">
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Item
            </th>
            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Qty
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/60">
          {ingredients.map((item, i) => (
            <tr key={i} className="transition-colors hover:bg-neutral-800/30">
              <td className="px-5 py-3 text-neutral-100">
                {item.name}
              </td>
              <td className="px-5 py-3 text-right text-neutral-400">
                {item.measure}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
