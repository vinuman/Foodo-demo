"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useProgress, Center } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { FoodModel } from "./food-model";
import { ModelSelector } from "./model-selector";
import { SceneLighting } from "./scene-lighting";
import type { FoodoLightingInfo, FoodoModel } from "@/lib/types";

const DEG2RAD = Math.PI / 180;

/* ------------------------------------------------------------------ */
/*  Internal scene components (only used inside <Canvas>)             */
/* ------------------------------------------------------------------ */

/** Displays a loading spinner + percentage while a model is loading. */
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

/**
 * Synchronises camera position, OrbitControls target, and tone-mapping
 * exposure whenever the selected model's lightingInfo changes.
 */
function SceneConfig({
  lightingInfo,
  controlsRef,
}: {
  lightingInfo: FoodoLightingInfo;
  controlsRef: React.RefObject<THREE.EventDispatcher | null>;
}) {
  const { camera, gl } = useThree();

  useEffect(() => {
    const { horizontalTiltAngle, exposure } = lightingInfo;

    // Use a closer distance and lower angle than the API defaults,
    // which are tuned for Foodo's own renderer. These values produce
    // a more natural "table-level" view of the food model.
    const distance = 2;
    const tilt = 25; // degrees — slight elevation, mostly straight-on

    const phi = tilt * DEG2RAD;
    const theta = horizontalTiltAngle * DEG2RAD;

    camera.position.set(
      distance * Math.cos(phi) * Math.sin(theta),
      distance * Math.sin(phi),
      distance * Math.cos(phi) * Math.cos(theta),
    );

    gl.toneMappingExposure = exposure;

    // Sync OrbitControls with the new camera position
    const controls = controlsRef.current as unknown as {
      target: THREE.Vector3;
      update: () => void;
    } | null;

    if (controls) {
      controls.target.set(0, 0, 0);
      controls.update();
    }
  }, [camera, gl, lightingInfo, controlsRef]);

  return null;
}

/* ------------------------------------------------------------------ */
/*  Public component                                                  */
/* ------------------------------------------------------------------ */

interface FoodSceneProps {
  models: FoodoModel[];
}

/** Reorder models so a preferred item appears first. */
function reorder(models: FoodoModel[], preferredName: string): FoodoModel[] {
  const idx = models.findIndex((m) => m.name === preferredName);
  if (idx <= 0) return models;
  return [models[idx], ...models.slice(0, idx), ...models.slice(idx + 1)];
}

export default function FoodScene({ models: raw }: FoodSceneProps) {
  const models = reorder(raw, "chocolate-roll-cake-");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const controlsRef = useRef(null);
  const selected = models[selectedIndex];

  return (
    <div className="space-y-6">
      <ModelSelector
        models={models}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />

      <div className="aspect-square w-full overflow-hidden rounded-2xl bg-neutral-900 sm:aspect-4/3 lg:aspect-video">
        <Canvas
          camera={{ fov: 45, near: 0.1, far: 100 }}
          gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
        >
          <SceneConfig
            lightingInfo={selected.lightingInfo}
            controlsRef={controlsRef}
          />
          <SceneLighting lightingInfo={selected.lightingInfo} />
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
    </div>
  );
}
