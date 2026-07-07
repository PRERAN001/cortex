"use client";

import { Text } from "@react-three/drei";

type Props = {
  name: string;
  position: [number, number, number];
  height?: number;
  color?: string;
};

export default function TwinTower({
  name,
  position,
  height = 16,
  color = "#7FAEDC",
}: Props) {
  return (
    <group position={position}>
      {/* Left Tower */}
      <mesh position={[-2, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, height, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Right Tower */}
      <mesh position={[2, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, height, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Sky Bridge */}
      <mesh position={[0, height - 2, 0]}>
        <boxGeometry args={[4, 1.2, 4]} />
        <meshStandardMaterial color="#b0bec5" />
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