"use client";

import type { FoodoLightingInfo } from "@/lib/types";

interface SceneLightingProps {
  lightingInfo: FoodoLightingInfo;
}

/**
 * Configures the scene lighting based on the Foodo API's per-model presets.
 *
 * The API provides an ambient `lighting` RGB array (typically [0.1, 0.1, 0.1])
 * used as the base fill. We layer directional lights on top for depth and
 * realistic shading of the food models.
 */
export function SceneLighting({ lightingInfo }: SceneLightingProps) {
  const [r, g, b] = lightingInfo.lighting;
  const ambientIntensity = Math.max(r, g, b) * 8;

  return (
    <>
      <ambientLight intensity={ambientIntensity || 0.8} />
      {/* Key light — primary illumination from top-right */}
      <directionalLight position={[10, 10, 5]} intensity={1.8} />
      {/* Fill light — softer, opposite side to reduce harsh shadows */}
      <directionalLight position={[-5, 5, -5]} intensity={0.8} />
      {/* Rim light — subtle backlight for edge definition */}
      <directionalLight position={[0, 3, -10]} intensity={0.4} />
    </>
  );
}
