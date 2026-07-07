"use client";

import Vehicle from "./Vehicle";

type Props = {
  path: [number, number, number][];
  color?: string;
  speed?: number;
  startIndex?: number;
};

export default function Bus({
  path,
  color = "#ffca28",
  speed = 4,
  startIndex = 0,
}: Props) {
  return (
    <Vehicle path={path} speed={speed} startIndex={startIndex}>
      {/* Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[3.5, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[3.2, 0.2, 0.9]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>
      {/* Wheels */}
      {[
        [-1.2, 0, 0.5],
        [1.2, 0, 0.5],
        [-1.2, 0, -0.5],
        [1.2, 0, -0.5],
      ].map((p, i) => (
        <mesh
          key={i}
          position={p as [number, number, number]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.18, 0.18, 0.15, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
      ))}
    </Vehicle>
  );
}