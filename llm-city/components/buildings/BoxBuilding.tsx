"use client";

import { Text } from "@react-three/drei";

type Props = {
  name: string;
  position: [number, number, number];
  height?: number;
  color?: string;
};

export default function BoxBuilding({
  name,
  position,
  height = 10,
  color = "#6FA8DC",
}: Props) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[6, height, 6]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      <Text
        position={[0, height + 1.2, 0]}
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