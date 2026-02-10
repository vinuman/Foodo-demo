import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "outline";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

  const variants = {
    default:
      "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
    outline:
      "border border-neutral-200 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400",
  };

  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
}
