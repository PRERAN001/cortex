"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
  target?: THREE.Vector3 | null;
};

const ARRIVE_EPSILON = 0.05;
const TRANSITION_SPEED = 3;

export default function CameraController({ target }: Props) {
  const { camera } = useThree();
  const controls = useRef<any>(null);

  const defaultCamera = useMemo(() => new THREE.Vector3(45, 55, 65), []);
  const defaultTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  const desiredCamera = useRef(defaultCamera.clone());
  const desiredTarget = useRef(defaultTarget.clone());

  // Only true while we're animating toward a focus point / the default view.
  // While false, OrbitControls has full free control of the camera.
  const transitioning = useRef(false);

  useEffect(() => {
    function esc(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      desiredCamera.current.copy(defaultCamera);
      desiredTarget.current.copy(defaultTarget);
      transitioning.current = true;
    }
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [defaultCamera, defaultTarget]);

  useEffect(() => {
    if (!target) return;
    desiredTarget.current.copy(target);
    desiredCamera.current.copy(target.clone().add(new THREE.Vector3(8, 8, 8)));
    transitioning.current = true;
  }, [target]);

  useFrame((_, delta) => {
    if (!controls.current) return;

    if (transitioning.current) {
      const t = Math.min(delta * TRANSITION_SPEED, 1);
      camera.position.lerp(desiredCamera.current, t);
      controls.current.target.lerp(desiredTarget.current, t);

      const camDist = camera.position.distanceTo(desiredCamera.current);
      const targetDist = controls.current.target.distanceTo(desiredTarget.current);

      if (camDist < ARRIVE_EPSILON && targetDist < ARRIVE_EPSILON) {
        camera.position.copy(desiredCamera.current);
        controls.current.target.copy(desiredTarget.current);
        transitioning.current = false;
      }
    }

    // Needed every frame for damping to feel smooth, whether or not
    // we're mid-transition — this does NOT move the camera on its own,
    // it just applies OrbitControls' own damping/inertia.
    controls.current.update();
  });

  return (
    <OrbitControls
      ref={controls}
      enableDamping
      dampingFactor={0.08}
      onStart={() => {
        // If the user grabs the camera mid-transition, hand control
        // back to them immediately instead of fighting their drag.
        transitioning.current = false;
      }}
    />
  );
}