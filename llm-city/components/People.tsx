"use client";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const ARRIVAL_THRESHOLD = 0.5;

function buildWaypoints(radius: number) {
  return [
    new THREE.Vector3(-radius, 0, -radius),
    new THREE.Vector3(radius, 0, -radius),
    new THREE.Vector3(radius, 0, radius),
    new THREE.Vector3(-radius, 0, radius),
  ];
}

function Person({
  startIndex,
  color,
  waypoints,
}: {
  startIndex: number;
  color: string;
  waypoints: THREE.Vector3[];
}) {
  const group = useRef<THREE.Group>(null);
  const state = useRef({
    target: (startIndex + 1) % waypoints.length,
    speed: 4 + Math.random() * 2,
  });

  // Spawn people at a random point along their starting segment instead of
  // stacked exactly on top of each other at the same waypoint.
  const initialPosition = useMemo(() => {
    const start = waypoints[startIndex];
    const end = waypoints[(startIndex + 1) % waypoints.length];
    const t = Math.random();
    return new THREE.Vector3().lerpVectors(start, end, t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startIndex]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const target = waypoints[state.current.target];
    const position = group.current.position;
    const distanceToTarget = position.distanceTo(target);

    if (distanceToTarget < ARRIVAL_THRESHOLD) {
      state.current.target = (state.current.target + 1) % waypoints.length;
      return;
    }
    const direction = new THREE.Vector3()
      .subVectors(target, position)
      .normalize();
    position.addScaledVector(direction, state.current.speed * delta);
    group.current.lookAt(target.x, 0.8, target.z);
  });

  return (
    <group ref={group} position={initialPosition}>
      {/* Body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.5, 4, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#FFD7B5" />
      </mesh>
    </group>
  );
}

type PeopleProps = {
  /**
   * Half-width of the square walking loop, in local coordinates relative to
   * wherever this <People /> instance is placed (e.g. inside a <group
   * position={...}>). Keep this comfortably smaller than half the block
   * size it's placed in, or the loop will spill into roads/neighboring
   * blocks. Default (15) fits inside a 40-unit block with margin to spare.
   */
  radius?: number;
};

export default function People({ radius = 15 }: PeopleProps) {
  const colors = [
    "#e53935",
    "#1e88e5",
    "#43a047",
    "#fdd835",
    "#8e24aa",
    "#fb8c00",
  ];

  const waypoints = useMemo(() => buildWaypoints(radius), [radius]);

  return (
    <>
      {colors.map((color, i) => (
        <Person
          key={i}
          startIndex={i % waypoints.length}
          color={color}
          waypoints={waypoints}
        />
      ))}
    </>
  );
}