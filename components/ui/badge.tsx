import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "overlay" | "default" | "outline";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

  const variants = {
    overlay:
      "bg-white/15 text-white uppercase tracking-wider backdrop-blur-sm text-[10px]",
    default:
      "bg-neutral-800 text-neutral-300",
    outline:
      "border border-neutral-700 text-neutral-400",
  };

  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
}
