"use client";

import { Clone, useGLTF } from "@react-three/drei";

interface FoodModelProps {
  url: string;
}

export function FoodModel({ url }: FoodModelProps) {
  const { scene } = useGLTF(url);

  return <Clone object={scene} />;
}
