"use client";

import { Text } from "@react-three/drei";

type Props = {
  name: string;
  position: [number, number, number];
  color?: string;
};

export default function LShapeBuilding({
  name,
  position,
  color = "#90CAF9",
}: Props) {
  return (
    <group position={position}>
      {/* Main Tower */}
      <mesh position={[-1.6, 5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 10, 6]} />
        <meshStandardMaterial
          color={color}
          metalness={0.25}
          roughness={0.7}
        />
      </mesh>

      {/* Side Wing */}
      <mesh position={[2, 3, -1.5]} castShadow receiveShadow>
        <boxGeometry args={[3, 6, 3]} />
        <meshStandardMaterial
          color={color}
          metalness={0.25}
          roughness={0.7}
        />
      </mesh>

      <Text
        position={[0, 11.5, 0]}
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