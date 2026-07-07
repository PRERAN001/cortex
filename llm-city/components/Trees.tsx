"use client";

type TreeProps = {
  position: [number, number, number];
};

function Tree({ position }: TreeProps) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 1.5, 8]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      {/* Leaves */}
      <mesh position={[0, 2, 0]} castShadow>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#4caf50" />
      </mesh>
    </group>
  );
}

const trees: [number, number, number][] = [
  [-15, 0, -15],
  [15, 0, -15],
  [-15, 0, 15],
  [15, 0, 15],
  [-35, 0, 10],
  [35, 0, -10],
  [0, 0, 35],
  [0, 0, -35],
];

export default function Trees() {
  return (
    <>
      {trees.map((pos, i) => (
        <Tree key={i} position={pos} />
      ))}
    </>
  );
}