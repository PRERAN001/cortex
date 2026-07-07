"use client";

import Vehicle from "./Vehicle";

type Props = {
  path: [number, number, number][];
  color?: string;
  speed?: number;
  startIndex?: number;
};

export default function Truck({
  path,
  color = "#42a5f5",
  speed = 4.5,
  startIndex = 0,
}: Props) {
  return (
    <Vehicle path={path} speed={speed} startIndex={startIndex}>
      {/* Cargo */}
      <mesh position={[-0.5, 0.45, 0]} castShadow>
        <boxGeometry args={[2, 0.9, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Cabin */}
      <mesh position={[1.1, 0.35, 0]} castShadow>
        <boxGeometry args={[0.9, 0.7, 1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Roof */}
      <mesh position={[1.1, 0.8, 0]} castShadow>
        <boxGeometry args={[0.8, 0.15, 0.9]} />
        <meshStandardMaterial color="#90caf9" />
      </mesh>
      {/* Wheels */}
      {[
        [-1.2, 0, 0.5],
        [0.2, 0, 0.5],
        [-1.2, 0, -0.5],
        [0.2, 0, -0.5],
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