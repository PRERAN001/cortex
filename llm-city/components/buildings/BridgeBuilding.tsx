"use client";

import { Text } from "@react-three/drei";

type Props = {
  name: string;
  position: [number, number, number];
  height?: number;
  color?: string;
};

export default function BridgeBuilding({
  name,
  position,
  height = 16,
  color = "#64B5F6",
}: Props) {
  return (
    <group position={position}>
      {/* Left Tower */}
      <mesh position={[-3, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, height, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>

      {/* Right Tower */}
      <mesh position={[3, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, height, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>

      {/* Sky Bridge */}
      <mesh position={[0, height - 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 1.2, 4]} />
        <meshStandardMaterial color="#ECEFF1" />
      </mesh>

      {/* Roof Caps */}
      <mesh position={[-3, height + 0.3, 0]}>
        <boxGeometry args={[3.4, 0.3, 4.4]} />
        <meshStandardMaterial color="#CFD8DC" />
      </mesh>

      <mesh position={[3, height + 0.3, 0]}>
        <boxGeometry args={[3.4, 0.3, 4.4]} />
        <meshStandardMaterial color="#CFD8DC" />
      </mesh>

      <Text
        position={[0, height + 2.5, 0]}
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