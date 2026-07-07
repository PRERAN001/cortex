"use client";

import { Text } from "@react-three/drei";

type Props = {
  name: string;
  position: [number, number, number];
  height?: number;
  color?: string;
};

export default function TowerBuilding({
  name,
  position,
  height = 18,
  color = "#8EB8E5",
}: Props) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[4, height, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.35}
          roughness={0.6}
        />
      </mesh>

      <mesh position={[0, height + 0.4, 0]}>
        <boxGeometry args={[5, 0.4, 5]} />
        <meshStandardMaterial color="#b0bec5" />
      </mesh>

      <mesh position={[0, height + 1.3, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.8]} />
        <meshStandardMaterial color="#666" />
      </mesh>

      <Text
        position={[0, height + 3.2, 0]}
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