"use client";

import { Text } from "@react-three/drei";

type Props = {
  name: string;
  position: [number, number, number];
  height?: number;
  color?: string;
};

export default function HexTower({
  name,
  position,
  height = 18,
  color = "#81D4FA",
}: Props) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3, 3, height, 6]} />
        <meshStandardMaterial
          color={color}
          metalness={0.35}
          roughness={0.6}
        />
      </mesh>

      <mesh position={[0, height + 0.5, 0]}>
        <cylinderGeometry args={[3.3, 3.3, 0.6, 6]} />
        <meshStandardMaterial color="#CFD8DC" />
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