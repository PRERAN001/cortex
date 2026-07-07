"use client";

type Props = {
  position: [number, number, number];
  rotation?: [number, number, number];
};

export default function Road({ position, rotation = [0, 0, 0] }: Props) {
  return (
    <group position={position} rotation={rotation}>
      {/* Asphalt */}
      <mesh receiveShadow>
        <boxGeometry args={[120, 0.05, 6]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* Center Line */}
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[120, 0.01, 0.12]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>
    </group>
  );
}