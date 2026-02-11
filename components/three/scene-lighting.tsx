"use client";

import type { FoodoLightingInfo } from "@/lib/types";

export interface LightingPreset {
  name: string;
  ambientColor: [number, number, number];
  ambientIntensity: number;
  keyPosition: [number, number, number];
  keyIntensity: number;
  fillPosition: [number, number, number];
  fillIntensity: number;
  rimPosition: [number, number, number];
  rimIntensity: number;
}

export const LIGHTING_PRESETS: LightingPreset[] = [
  {
    name: "Studio",
    ambientColor: [1, 1, 1],
    ambientIntensity: 0.8,
    keyPosition: [10, 10, 5],
    keyIntensity: 1.8,
    fillPosition: [-5, 5, -5],
    fillIntensity: 0.8,
    rimPosition: [0, 3, -10],
    rimIntensity: 0.4,
  },
  {
    name: "Warm",
    ambientColor: [1, 0.85, 0.7],
    ambientIntensity: 0.6,
    keyPosition: [8, 8, 4],
    keyIntensity: 2.0,
    fillPosition: [-4, 6, -3],
    fillIntensity: 0.5,
    rimPosition: [0, 2, -8],
    rimIntensity: 0.3,
  },
  {
    name: "Cool",
    ambientColor: [0.75, 0.85, 1],
    ambientIntensity: 0.7,
    keyPosition: [6, 12, 8],
    keyIntensity: 1.6,
    fillPosition: [-6, 4, -6],
    fillIntensity: 0.9,
    rimPosition: [2, 4, -10],
    rimIntensity: 0.5,
  },
  {
    name: "Dramatic",
    ambientColor: [1, 0.9, 0.8],
    ambientIntensity: 0.3,
    keyPosition: [12, 6, 2],
    keyIntensity: 2.5,
    fillPosition: [-8, 2, -4],
    fillIntensity: 0.2,
    rimPosition: [-2, 5, -12],
    rimIntensity: 0.7,
  },
];

interface SceneLightingProps {
  lightingInfo: FoodoLightingInfo;
  preset?: LightingPreset;
}

export function SceneLighting({ lightingInfo, preset }: SceneLightingProps) {
  if (preset) {
    return (
      <>
        <ambientLight
          color={preset.ambientColor}
          intensity={preset.ambientIntensity}
        />
        <directionalLight
          position={preset.keyPosition}
          intensity={preset.keyIntensity}
        />
        <directionalLight
          position={preset.fillPosition}
          intensity={preset.fillIntensity}
        />
        <directionalLight
          position={preset.rimPosition}
          intensity={preset.rimIntensity}
        />
      </>
    );
  }

  // Default: derive from API data (explicit colors reset any preset tint).
  const [r, g, b] = lightingInfo.lighting;
  const ambientIntensity = Math.max(r, g, b) * 8;

  return (
    <>
      <ambientLight color={[1, 1, 1]} intensity={ambientIntensity || 0.8} />
      <directionalLight color={[1, 1, 1]} position={[10, 10, 5]} intensity={1.8} />
      <directionalLight color={[1, 1, 1]} position={[-5, 5, -5]} intensity={0.8} />
      <directionalLight color={[1, 1, 1]} position={[0, 3, -10]} intensity={0.4} />
    </>
  );
}
