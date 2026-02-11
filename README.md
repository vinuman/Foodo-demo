# Foodo — Food Discovery

A Next.js food discovery app built with TypeScript, Tailwind CSS, and React Three Fiber. The main focus is demonstrating intentional use of different rendering strategies and integrating WebGL into a modern frontend stack.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The app uses [TheMealDB](https://www.themealdb.com/api.php) (public, no key needed) for meal data and a proprietary Foodo API for 3D food models. The Foodo key is server-side only — it never reaches the client bundle.

## Rendering Strategies

Each route uses a different strategy on purpose, not just because the framework supports it, but because the data characteristics actually call for it:

**`/` — Static Site Generation (SSG)**
The home page fetches meals by letter at build time. This data almost never changes (it's a fixed recipe database), so there's no reason to fetch it on every request. Default `fetch` caching means the page is generated once and served from the CDN.

**`/meals/[id]` — Incremental Static Regeneration (ISR)**
Meal detail pages are statically generated on first visit, then revalidated every 60 seconds. `generateStaticParams` pre-renders a subset at build time so the most common pages are ready instantly. New meals get generated on-demand. ISR is the right fit here — the data is mostly stable but we want updates to propagate without a full rebuild.

**`/search?query=` — Server-Side Rendering (SSR)**
Search results need to reflect the current query on every request. There's nothing to cache — the input changes every time. `force-dynamic` and `cache: "no-store"` ensure fresh results on each hit.

**`/food-3d` — Client-Side Rendering (CSR)**
The 3D page is a Server Component that fetches model metadata from the Foodo API (keeping the API key server-side), then hands it off to a client-only R3F scene via `next/dynamic` with `ssr: false`. WebGL can't run on the server, so this split is necessary. The dynamic import also means the Three.js bundle only loads when you visit this route.

## WebGL / 3D Implementation

The 3D scene is built with React Three Fiber and Drei. Here's how it's structured:

- **Model loading** — `useGLTF` fetches `.glb` files from the Foodo CDN. Models are cached by R3F internally, so switching between previously loaded models is instant. `Clone` is used instead of `<primitive>` to avoid issues when re-mounting the same cached scene object.

- **Camera & controls** — `OrbitControls` handles drag-to-orbit, scroll-to-zoom, and right-click-to-pan. Camera position is computed from the API's per-model `lightingInfo` (tilt angle, exposure). A "Reset View" button restores the original camera position and re-enables auto-rotation.

- **Lighting** — Each model comes with lighting hints from the API (ambient RGB, exposure). On top of that, users can cycle through four presets (Studio, Warm, Cool, Dramatic) that swap out the ambient + directional light configuration. Explicit color values on every light ensure clean transitions — without them, R3F reuses the previous Three.js color when a prop is removed.

- **Loading states** — `Suspense` with a percentage spinner (via Drei's `useProgress`) while models download. The page-level and dynamic-import skeletons mirror the final layout so there's no layout shift.

- **Performance** — The entire R3F bundle is code-split behind `next/dynamic`. Tone mapping is set to ACES Filmic for realistic food rendering. `enableDamping` on controls keeps interactions smooth without being floaty.

## Project Structure

```
app/
  page.tsx              # Home (SSG)
  search/page.tsx       # Search (SSR)
  meals/[id]/page.tsx   # Meal detail (ISR)
  food-3d/page.tsx      # 3D showcase (CSR)
components/
  ui/                   # Shared UI (navbar, badges, skeleton, etc.)
  meals/                # Meal-specific components
  three/                # R3F scene, model loader, lighting, selector
lib/
  mealdb.ts             # TheMealDB API service
  foodo.ts              # Foodo 3D Model API service
  types.ts              # Shared TypeScript interfaces
  constants.ts          # API URLs, env var keys
```

## Tech Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- React Three Fiber + Drei + Three.js
- TheMealDB API + Foodo 3D Model API
