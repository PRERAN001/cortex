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

export default function Vehicle({
  children,
  path,
  speed = 6,
  startIndex = 0,
}: Props) {
  const group = useRef<THREE.Group>(null);

  const current = useRef(startIndex);
  const next = useRef((startIndex + 1) % path.length);

  useFrame((_, delta) => {
    if (!group.current || path.length < 2) return;

    const target = new THREE.Vector3(...path[next.current]);

    // Direction
    const direction = new THREE.Vector3()
      .subVectors(target, group.current.position)
      .normalize();

    // Move
    group.current.position.addScaledVector(
      direction,
      speed * delta
    );

    // Rotate smoothly
    const angle = Math.atan2(direction.x, direction.z);
    group.current.rotation.y = angle;

    // Reached waypoint?
    if (group.current.position.distanceTo(target) < 0.5) {
      current.current = next.current;
      next.current = (next.current + 1) % path.length;
    }
  });

  return (
    <group
      ref={group}
      position={new THREE.Vector3(...path[startIndex])}
    >
      {children}
    </group>
  );
}