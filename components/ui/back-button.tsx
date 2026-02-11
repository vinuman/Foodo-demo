"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  label?: string;
}

export function BackButton({ label = "Back" }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-neutral-300 transition-colors hover:text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>
      {label}
    </button>
  );
}
