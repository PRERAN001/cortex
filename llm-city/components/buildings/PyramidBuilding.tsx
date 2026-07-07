"use client";

import { Text } from "@react-three/drei";

type Props = {
  name: string;
  position: [number, number, number];
  color?: string;
};

export default function PyramidBuilding({
  name,
  position,
  color = "#F4D35E",
}: Props) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 2, 8]} />
        <meshStandardMaterial color="#b0bec5" />
      </mesh>

      {/* Pyramid */}
      <mesh position={[0, 5, 0]} castShadow receiveShadow>
        <coneGeometry args={[4, 6, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>

      <Text
        position={[0, 9, 0]}
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