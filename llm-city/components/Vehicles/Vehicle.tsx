"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
  children: React.ReactNode;
  path: [number, number, number][];
  speed?: number;
  startIndex?: number;
};

const ARRIVAL_THRESHOLD = 0.5;

export default function Vehicle({
  children,
  path,
  speed = 6,
  startIndex = 0,
}: Props) {
  const group = useRef<THREE.Group>(null);
  const next = useRef((startIndex + 1) % Math.max(path.length, 1));

  useFrame((_, delta) => {
    if (!group.current || path.length < 2) return;

    const target = new THREE.Vector3(...path[next.current]);
    const position = group.current.position;
    const distanceToTarget = position.distanceTo(target);

    // Advance to the next waypoint before computing direction so we never
    // normalize a zero-length vector (which would produce NaN and freeze
    // or teleport the vehicle).
    if (distanceToTarget < ARRIVAL_THRESHOLD) {
      next.current = (next.current + 1) % path.length;
      return;
    }

    const direction = new THREE.Vector3()
      .subVectors(target, position)
      .normalize();

    position.addScaledVector(direction, speed * delta);

    // Rotate smoothly to face the direction of travel
    const angle = Math.atan2(direction.x, direction.z);
    group.current.rotation.y = angle;
  });

  const initialPosition = path[startIndex] ?? [0, 0, 0];

  return (
    <group ref={group} position={new THREE.Vector3(...initialPosition)}>
      {children}
    </group>
  );
}