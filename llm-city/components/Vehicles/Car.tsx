"use client";

type Props = {
  color?: string;
};

export default function Car({ color = "#ef5350" }: Props) {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[1.6, 0.4, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[0.9, 0.3, 0.7]} />
        <meshStandardMaterial color="#90caf9" />
      </mesh>
      {/* Wheels */}
      <mesh position={[-0.55, -0.05, 0.4]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.12, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.55, -0.05, 0.4]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.12, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-0.55, -0.05, -0.4]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.12, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.55, -0.05, -0.4]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.12, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}