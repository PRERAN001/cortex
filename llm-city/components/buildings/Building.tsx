"use client";
import { Text } from "@react-three/drei";
type Props = {
  position: [number, number, number];
  height: number;
    name: string;
};

export default function Building({ name,position, height }: Props) {
  return (
    <mesh castShadow receiveShadow position={position}>
      <boxGeometry args={[6, height, 6]} />
      <Text
        position={[0, height + 1.5, 0]}
        fontSize={0.6}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>

      <meshStandardMaterial color="#fff" metalness={0.7} roughness={0.2} />
    </mesh>
  );
}
