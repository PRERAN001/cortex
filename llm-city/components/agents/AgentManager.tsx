"use client";

import Agent from "./Agent";
import * as THREE from "three";

type Props = {
  onSelect?: (
    position: THREE.Vector3
  ) => void;
};

export default function AgentManager({
  onSelect,
}: Props) {
  return (
    <>
      <Agent
        name="Planner Alpha"
        startNode="N6"
        onSelect={onSelect}
      />
    </>
  );
}