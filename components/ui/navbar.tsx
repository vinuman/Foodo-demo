"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
  { href: "/food-3d", label: "3D Showcase" },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <Image
            src="/foodo icon.svg"
            alt="Foodo"
            width={70}
            height={37}
            priority
          />
        </Link>

        <ul className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-accent after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-accent"
                      : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
