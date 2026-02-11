"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") ?? "";

  const [value, setValue] = useState(initialQuery);
  const [, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Sync input when navigating back/forward
  useEffect(() => {
    setValue(searchParams.get("query") ?? "");
  }, [searchParams]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    setValue(next);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      startTransition(() => {
        if (next.trim()) {
          router.push(`/search?query=${encodeURIComponent(next.trim())}`);
        } else {
          router.push("/search");
        }
      });
    }, 350);
  }

  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Find your next culinary adventure..."
        autoFocus
        className="w-full rounded-full border border-neutral-700 bg-neutral-900 py-3.5 pl-11 pr-4 text-base text-white outline-none transition-shadow placeholder:text-neutral-500 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-700"
      />
    </div>
  );
}
