"use client";

import { Text } from "@react-three/drei";

type Props = {
  name: string;
  position: [number, number, number];
  height?: number;
  color?: string;
};

export default function CylinderTower({
  name,
  position,
  height = 18,
  color = "#90CAF9",
}: Props) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3, 3, height, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>

      <mesh position={[0, height + 0.4, 0]}>
        <cylinderGeometry args={[3.2, 3.2, 0.5, 32]} />
        <meshStandardMaterial color="#d6d6d6" />
      </mesh>

      <Text
        position={[0, height + 2, 0]}
        fontSize={0.55}
        color="white"
        billboard
      >
        {name}
      </Text>
    </group>
  );
}