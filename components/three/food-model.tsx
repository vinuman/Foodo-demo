"use client";

import { Clone, useGLTF } from "@react-three/drei";

interface FoodModelProps {
  url: string;
}

/**
 * Loads and renders a .glb model from a remote URL.
 *
 * Uses `Clone` instead of `<primitive>` to safely handle
 * re-mounting the same cached GLTF scene across model switches.
 * `useGLTF` caches internally — previously loaded models switch instantly.
 */
export function FoodModel({ url }: FoodModelProps) {
  const { scene } = useGLTF(url);

  return <Clone object={scene} />;
}
