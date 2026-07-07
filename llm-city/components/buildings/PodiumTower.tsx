"use client";

import { Text } from "@react-three/drei";

type Props = {
  name: string;
  position: [number, number, number];
  height?: number;
  color?: string;
};

export default function PodiumTower({
  name,
  position,
  height = 16,
  color = "#7AA6D8",
}: Props) {
  return (
    <group position={position}>
      {/* Podium */}
      <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
        <boxGeometry args={[8, 3, 8]} />
        <meshStandardMaterial
          color="#8fbce6"
          metalness={0.25}
          roughness={0.7}
        />
      </mesh>

      {/* Tower */}
      <mesh castShadow receiveShadow position={[0, height / 2 + 3, 0]}>
        <boxGeometry args={[4, height, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.35}
          roughness={0.6}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, height + 6.2, 0]}>
        <boxGeometry args={[4.6, 0.3, 4.6]} />
        <meshStandardMaterial color="#d6d6d6" />
      </mesh>

      <Text
        position={[0, height + 8, 0]}
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