"use client";

function StreetLight({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 5, 8]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      {/* Lamp Arm */}
      <mesh position={[0.4, 4.8, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
        <meshStandardMaterial color="#666" />
      </mesh>
      {/* Lamp */}
      <mesh position={[0.8, 4.8, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#fff8b0"
          emissive="#fff8b0"
          emissiveIntensity={2}
        />
      </mesh>
      {/* Light */}
      <pointLight
        position={[0.8, 4.8, 0]}
        intensity={1}
        distance={8}
        color="#fff8b0"
      />
    </group>
  );
}

const positions: [number, number, number][] = [
  // Horizontal road
  [-50, 0, 6],
  [-30, 0, 6],
  [-10, 0, 6],
  [10, 0, 6],
  [30, 0, 6],
  [50, 0, 6],
  [-50, 0, -6],
  [-30, 0, -6],
  [-10, 0, -6],
  [10, 0, -6],
  [30, 0, -6],
  [50, 0, -6],
  // Vertical road
  [6, 0, -50],
  [6, 0, -30],
  [6, 0, -10],
  [6, 0, 10],
  [6, 0, 30],
  [6, 0, 50],
  [-6, 0, -50],
  [-6, 0, -30],
  [-6, 0, -10],
  [-6, 0, 10],
  [-6, 0, 30],
  [-6, 0, 50],
];

export default function StreetLights() {
  return (
    <>
      {positions.map((position, index) => (
        <StreetLight key={index} position={position} />
      ))}
    </>
  );
}