"use client";

import { useFrame } from "@react-three/fiber";
import { Text, useCursor } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

import { getNode, getRandomNeighbor } from "../navigation/RoadGraph";

type Props = {
  name?: string;
  startNode: string;
  color?: string;
  speed?: number;
  onSelect?: (position: THREE.Vector3)=>void;
};

export default function Agent({
  name = "Planner Alpha",
  startNode,
  color = "#00E5FF",
  speed = 3,
    onSelect,
}: Props) {
  const group = useRef<THREE.Group>(null);

  const currentNode = useRef(startNode);
  const targetNode = useRef(getRandomNeighbor(startNode));

  const floatTime = useRef(Math.random() * Math.PI);

  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

  useCursor(hovered);

  const start = getNode(startNode);

  useFrame((_, delta) => {
    if (!group.current) return;

    floatTime.current += delta * 3;

    const target = getNode(targetNode.current);

    if (!target) return;

    const targetPos = new THREE.Vector3(...target.position);

    // Floating
    group.current.position.y =
      target.position[1] +
      0.8 +
      Math.sin(floatTime.current) * 0.08;

    // Direction

    const dir = new THREE.Vector3()
      .subVectors(targetPos, group.current.position)
      .normalize();

    // Movement

    group.current.position.addScaledVector(
      dir,
      speed * delta
    );

    // Smooth rotation

    const targetAngle = Math.atan2(dir.x, dir.z);

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetAngle,
      delta * 8
    );

    if (group.current.position.distanceTo(targetPos) < 0.5) {
      currentNode.current = targetNode.current;

      const next = getRandomNeighbor(currentNode.current);

      if (next) {
        targetNode.current = next;
      }
    }
  });

  if (!start) return null;

  return (
    <group
      ref={group}
      position={[
  start.position[0],
  start.position[1],
  start.position[2],
]}
    >
      {/* Invisible Click Collider */}

      <mesh
        visible={false}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e)=>{
    e.stopPropagation();

    setSelected((p)=>!p);

    if(group.current){
        onSelect?.(
            group.current.position.clone()
        );
    }
}}
      >
        <sphereGeometry args={[0.8]} />
      </mesh>

      {/* Core */}

      <mesh>
        <sphereGeometry args={[0.22, 32, 32]} />

        <meshStandardMaterial
          color={hovered ? "#ffffff" : color}
          emissive={color}
          emissiveIntensity={hovered ? 6 : 3}
        />
      </mesh>

      {/* Ring */}

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.34, 0.04, 24, 64]} />

        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={hovered ? 3 : 1}
        />
      </mesh>

      {/* Beam */}

      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5]} />

        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3}
        />
      </mesh>

      {/* Selection Ring */}

      {selected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.05, 24, 64]} />

          <meshStandardMaterial
            color="#FFD600"
            emissive="#FFD600"
            emissiveIntensity={5}
          />
        </mesh>
      )}

      {/* Name */}

      <Text
        position={[0, 0.7, 0]}
        fontSize={0.18}
        anchorX="center"
        color="white"
        billboard
      >
        {name}
      </Text>

      {/* Status */}

      {selected && (
        <Text
          position={[0, 1.05, 0]}
          fontSize={0.12}
          anchorX="center"
          color="#66ff99"
          billboard
        >
          Idle
        </Text>
      )}
    </group>
  );
}