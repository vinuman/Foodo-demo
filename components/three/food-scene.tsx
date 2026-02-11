"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useProgress, Center } from "@react-three/drei";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { FoodModel } from "./food-model";
import { ModelSelector } from "./model-selector";
import { SceneLighting, LIGHTING_PRESETS } from "./scene-lighting";
import type { FoodoLightingInfo, FoodoModel } from "@/lib/types";

const DEG2RAD = Math.PI / 180;

function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-3 border-neutral-600 border-t-white" />
        <p className="text-sm font-medium text-white">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
}

function computeCameraPosition(lightingInfo: FoodoLightingInfo) {
  const distance = 2;
  const tilt = 25;
  const phi = tilt * DEG2RAD;
  const theta = lightingInfo.horizontalTiltAngle * DEG2RAD;

  return new THREE.Vector3(
    distance * Math.cos(phi) * Math.sin(theta),
    distance * Math.sin(phi),
    distance * Math.cos(phi) * Math.cos(theta),
  );
}

function SceneConfig({
  lightingInfo,
  controlsRef,
  resetToken,
}: {
  lightingInfo: FoodoLightingInfo;
  controlsRef: React.RefObject<THREE.EventDispatcher | null>;
  resetToken: number;
}) {
  const { camera, gl } = useThree();

  useEffect(() => {
    const pos = computeCameraPosition(lightingInfo);
    camera.position.copy(pos);
    Object.assign(gl, { toneMappingExposure: lightingInfo.exposure });

    const controls = controlsRef.current as unknown as {
      target: THREE.Vector3;
      autoRotate: boolean;
      update: () => void;
    } | null;

    if (controls) {
      controls.target.set(0, 0, 0);
      controls.autoRotate = true;
      controls.update();
    }
  }, [camera, gl, lightingInfo, controlsRef, resetToken]);

  return null;
}

interface FoodSceneProps {
  models: FoodoModel[];
}

function reorder(models: FoodoModel[], preferredName: string): FoodoModel[] {
  const idx = models.findIndex((m) => m.name === preferredName);
  if (idx <= 0) return models;
  return [models[idx], ...models.slice(0, idx), ...models.slice(idx + 1)];
}

function formatName(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export default function FoodScene({ models: raw }: FoodSceneProps) {
  const models = reorder(raw, "chocolate-roll-cake-");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [presetIndex, setPresetIndex] = useState(-1); // -1 = API default
  const [resetToken, setResetToken] = useState(0);
  const controlsRef = useRef(null);
  const selected = models[selectedIndex];

  const activePreset =
    presetIndex >= 0 ? LIGHTING_PRESETS[presetIndex] : undefined;

  const handleResetView = useCallback(() => {
    setResetToken((t) => t + 1);
  }, []);

  const handleCycleLighting = useCallback(() => {
    setPresetIndex((prev) => {
      // -1 (API) -> 0 (Studio) -> 1 (Warm) -> 2 (Cool) -> 3 (Dramatic) -> -1 (API)
      const next = prev + 1;
      return next >= LIGHTING_PRESETS.length ? -1 : next;
    });
  }, []);

  const lightingLabel =
    presetIndex === -1 ? "Default" : LIGHTING_PRESETS[presetIndex].name;

  return (
    <div className="space-y-6">
      <ModelSelector
        models={models}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />

      <div className="relative overflow-hidden rounded-2xl">
        <div className="aspect-square w-full bg-neutral-950 sm:aspect-4/3 lg:aspect-[2.5/1]">
          <Canvas
            camera={{ fov: 45, near: 0.1, far: 100 }}
            gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
          >
            <SceneConfig
              lightingInfo={selected.lightingInfo}
              controlsRef={controlsRef}
              resetToken={resetToken}
            />
            <SceneLighting
              lightingInfo={selected.lightingInfo}
              preset={activePreset}
            />
            <OrbitControls
              ref={controlsRef}
              enableDamping
              dampingFactor={0.05}
              autoRotate
              autoRotateSpeed={1}
            />
            <Suspense fallback={<Loader />}>
              <Center>
                <FoodModel url={selected.modelPath.glb} />
              </Center>
            </Suspense>
          </Canvas>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 bg-linear-to-b from-black/80 via-black/50 to-transparent px-5 pb-10 pt-4">
          <div className="pointer-events-auto flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  Live Rendering
                </span>
              </div>
              <p className="mt-1 font-serif text-lg font-bold text-white">
                {formatName(selected.name)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleResetView}
                className="flex cursor-pointer flex-col items-center gap-1 rounded-xl bg-white/10 p-2.5 text-neutral-300 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
                title="Reset camera to initial position"
              >
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
                  aria-hidden="true"
                >
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
                <span className="text-[9px] font-semibold uppercase tracking-wider">
                  Reset View
                </span>
              </button>
              <button
                onClick={handleCycleLighting}
                className="flex w-16 cursor-pointer flex-col items-center gap-1 rounded-xl bg-white/10 p-2.5 text-neutral-300 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
                title={`Current: ${lightingLabel} — click to cycle`}
              >
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
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
                <span className="text-[9px] font-semibold uppercase tracking-wider">
                  {lightingLabel}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
