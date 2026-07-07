"use client";

import { Text } from "@react-three/drei";

type Props = {
  name: string;
  position: [number, number, number];
  color?: string;
};

export default function DomeBuilding({
  name,
  position,
  color = "#81C784",
}: Props) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 2, 8]} />
        <meshStandardMaterial color="#90A4AE" />
      </mesh>

      {/* Dome */}
      <mesh position={[0, 4, 0]} castShadow receiveShadow>
        <sphereGeometry
          args={[3.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.5}
        />
      </mesh>

      <Text
        position={[0, 7.5, 0]}
        fontSize={0.55}
        color="white"
        anchorX="center"
        anchorY="middle"
        billboard
      >
        {name}
      </Text>
    </group>
  );
}