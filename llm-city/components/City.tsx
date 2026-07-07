"use client";
import { useState } from "react";
import * as THREE from "three";
import BoxBuilding from "./buildings/BoxBuilding";
import TowerBuilding from "./buildings/TowerBuilding";
import PodiumTower from "./buildings/PodiumTower";
import TwinTower from "./buildings/TwinTower";
import CylinderTower from "./buildings/CylinderTower";
import HexTower from "./buildings/HexTower";
import PyramidBuilding from "./buildings/PyramidBuilding";
import DomeBuilding from "./buildings/DomeBuilding";
import LShapeBuilding from "./buildings/LShapeBuilding";
import BridgeBuilding from "./buildings/BridgeBuilding";
import Road from "./Road";
import Trees from "./Trees";
import Park from "./Park";
import StreetLights from "./StreetLights";
import People from "./People";
import Car from "./Vehicles/Car";
import Bus from "./Vehicles/Bus";
import Truck from "./Vehicles/Truck";
import AgentManager from "./agents/AgentManager";
import CameraController from "./camera/CameraController";

// ---------------------------------------------------------------------------
// LLM CITY — layout notes
// ---------------------------------------------------------------------------
// Grid spacing is 40 units between road center-lines. Every building sits
// inside a "block" bounded by four road lines, offset far enough from the
// centerlines (>= 8u) and from its block-mates (>= 12u) so nothing clips.
// Roads now form a 5x5 grid (-80,-40,0,40,80) instead of the old 3x3, so the
// city has a real downtown core, four inner districts, four outer districts,
// and a ring of outer landmarks — plenty of room to keep adding "buildings"
// as LLM City grows over the next few days :)
// ---------------------------------------------------------------------------

// Low perimeter wall marking the edge of the city, with corner pillars.
// `extent` is the half-width of the square boundary (city spans -extent..extent).
function CityBoundary({ extent }: { extent: number }) {
  const wallHeight = 3;
  const wallThickness = 1;
  const pillarSize = 2.5;
  const pillarHeight = 5;
  const span = extent * 2;

  const corners: [number, number][] = [
    [-extent, -extent],
    [extent, -extent],
    [-extent, extent],
    [extent, extent],
  ];

  return (
    <group>
      {/* North / South walls */}
      <mesh position={[0, wallHeight / 2, -extent]} castShadow receiveShadow>
        <boxGeometry args={[span, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>
      <mesh position={[0, wallHeight / 2, extent]} castShadow receiveShadow>
        <boxGeometry args={[span, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>
      {/* East / West walls */}
      <mesh position={[-extent, wallHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[wallThickness, wallHeight, span]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>
      <mesh position={[extent, wallHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[wallThickness, wallHeight, span]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>

      {/* Corner pillars, a little taller than the wall so they read as gates */}
      {corners.map(([x, z], i) => (
        <mesh key={i} position={[x, pillarHeight / 2, z]} castShadow receiveShadow>
          <boxGeometry args={[pillarSize, pillarHeight, pillarSize]} />
          <meshStandardMaterial color="#263238" />
        </mesh>
      ))}
    </group>
  );
}

export default function City() {
  const [focus, setFocus] = useState<THREE.Vector3 | null>(null);

  const ROAD_LINES = [-80, -40, 0, 40, 80];

  const horizontalRoad = ROAD_LINES.map((x) => [x, 0.1, 0]);
  const horizontalRoadReverse = [...horizontalRoad].reverse();

  const verticalRoad = ROAD_LINES.map((z) => [0, 0.1, z]);
  const verticalRoadReverse = [...verticalRoad].reverse();

  // Outer ring loop, one road-width out from the core (z = 80 lane),
  // running the full width of the grid — gives traffic somewhere to go
  // besides straight through downtown.
  const outerRingRoad = [
    [-80, 0.1, 80],
    [-40, 0.1, 80],
    [0, 0.1, 80],
    [40, 0.1, 80],
    [80, 0.1, 80],
  ];
  const outerRingRoadReverse = [...outerRingRoad].reverse();

  const farLaneRoad = [
    [-80, 0.1, -80],
    [-40, 0.1, -80],
    [0, 0.1, -80],
    [40, 0.1, -80],
    [80, 0.1, -80],
  ];
  const farLaneRoadReverse = [...farLaneRoad].reverse();

  return (
    <>
      {/* Ground — expanded to match the bigger grid */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color="#202020" />
      </mesh>

      {/* ---------------- Road grid (5x5) ---------------- */}
      {ROAD_LINES.map((z) => (
        <Road key={`h-${z}`} position={[0, 0.01, z]} />
      ))}
      {ROAD_LINES.map((x) => (
        <Road key={`v-${x}`} position={[x, 0.01, 0]} rotation={[0, Math.PI / 2, 0]} />
      ))}

      {/* Center Park — has a road running through both axes, so it uses
          the default roadGap (12) to keep the crossing clear of grass. */}
      <Park />

      {/* City boundary wall — marks the edge of the playable/rendered city */}
      <CityBoundary extent={140} />

      {/* ================= DOWNTOWN CORE (inner 4 quadrants) ================= */}

      {/* -- Top Left -- */}
      <BoxBuilding name="Storage Hub" position={[-20, 0, -20]} height={10} />
      <TowerBuilding name="Reasoning Tower" position={[-32, 0, -32]} height={18} />
      <LShapeBuilding name="Code Forge" position={[-14, 0, -32]} />
      <PyramidBuilding name="Vision Lab" position={[-32, 0, -14]} />

      {/* -- Top Right -- */}
      <PodiumTower name="Memory Bank" position={[20, 0, -20]} height={16} />
      <CylinderTower name="Knowledge Center" position={[32, 0, -32]} height={18} />
      <BoxBuilding name="Tool Workshop" position={[14, 0, -32]} height={8} />
      <HexTower name="Inference Hub" position={[32, 0, -14]} height={18} />

      {/* -- Bottom Left -- */}
      <TwinTower name="Agent HQ" position={[-20, 0, 20]} height={16} />
      <BoxBuilding name="Analytics Center" position={[-32, 0, 32]} height={10} />
      <DomeBuilding name="Research Center" position={[-14, 0, 32]} />
      <LShapeBuilding name="Security Hub" position={[-32, 0, 14]} />

      {/* -- Bottom Right -- */}
      <BridgeBuilding name="Gateway Center" position={[20, 0, 20]} height={15} />
      <TowerBuilding name="Execution Tower" position={[32, 0, 32]} height={20} />
      <BoxBuilding name="Context Vault" position={[14, 0, 32]} height={9} />
      <CylinderTower name="Communication Hub" position={[32, 0, 14]} height={16} />

      {/* ================= OUTER DISTRICTS (between road 40 and road 80) ================= */}

      {/* -- Outer Top Left -- */}
      <TowerBuilding name="Fine-Tune Foundry" position={[-60, 0, -60]} height={22} />
      <BoxBuilding name="Dataset Depot" position={[-72, 0, -48]} height={11} />
      <HexTower name="Embedding Exchange" position={[-48, 0, -72]} height={17} />
      <PyramidBuilding name="Alignment Institute" position={[-60, 0, -48]} />

      {/* -- Outer Top Right -- */}
      <CylinderTower name="Latency Labs" position={[60, 0, -60]} height={20} />
      <PodiumTower name="Sampling Studios" position={[72, 0, -48]} height={14} />
      <BoxBuilding name="Token Terminal" position={[48, 0, -72]} height={10} />
      <DomeBuilding name="Guardrail Gardens" position={[60, 0, -48]} />

      {/* -- Outer Bottom Left -- */}
      <TwinTower name="Retrieval Row" position={[-60, 0, 60]} height={18} />
      <LShapeBuilding name="Prompt Plaza" position={[-72, 0, 48]} />
      <BoxBuilding name="Cache Court" position={[-48, 0, 72]} height={9} />
      <HexTower name="Eval Emporium" position={[-60, 0, 48]} height={16} />

      {/* -- Outer Bottom Right -- */}
      <BridgeBuilding name="Multimodal Mews" position={[60, 0, 60]} height={17} />
      <TowerBuilding name="Compute Commons" position={[72, 0, 48]} height={24} />
      <BoxBuilding name="Sandbox Square" position={[48, 0, 72]} height={10} />
      <CylinderTower name="Router Ridge" position={[60, 0, 48]} height={15} />

      {/* ================= OUTER LANDMARKS (past the outer ring, road 80+) ================= */}

      <HexTower name="Central Compute" position={[0, 0, -110]} height={26} />
      <BridgeBuilding name="Cloud Exchange" position={[110, 0, 0]} height={20} />
      <PodiumTower name="Vector Vault" position={[-110, 0, 0]} height={20} />
      <TowerBuilding name="Model Registry" position={[0, 0, 110]} height={24} />

      <CylinderTower name="Frontier Spire" position={[-95, 0, -95]} height={28} />
      <TwinTower name="Scaling Labs" position={[95, 0, -95]} height={20} />
      <PyramidBuilding name="Safety Summit" position={[-95, 0, 95]} />
      <HexTower name="Benchmark Belt" position={[95, 0, 95]} height={19} />

      {/* ================= NEIGHBORHOOD PARKS ================= */}
      {/* These sit in the 8 mid-edge grid blocks that have no road running
          through their middle (only downtown-core and outer-corner blocks
          have buildings) — so a solid lawn is safe here, no gap needed. */}

      <group position={[-60, 0, -20]}>
        <Park size={26} roadGap={0} fountain={false} />
      </group>
      <group position={[-60, 0, 20]}>
        <Park size={26} roadGap={0} fountain={false} />
      </group>
      <group position={[60, 0, -20]}>
        <Park size={26} roadGap={0} fountain={false} />
      </group>
      <group position={[60, 0, 20]}>
        <Park size={26} roadGap={0} fountain={false} />
      </group>
      <group position={[-20, 0, -60]}>
        <Park size={26} roadGap={0} fountain={false} />
      </group>
      <group position={[20, 0, -60]}>
        <Park size={26} roadGap={0} fountain={false} />
      </group>
      <group position={[-20, 0, 60]}>
        <Park size={26} roadGap={0} fountain={false} />
      </group>
      <group position={[20, 0, 60]}>
        <Park size={26} roadGap={0} fountain={false} />
      </group>

      {/* ================= Greenery, people, lighting — repeated across districts ================= */}

      <Trees />
      <group position={[-60, 0, -60]}>
        <Trees />
      </group>
      <group position={[60, 0, -60]}>
        <Trees />
      </group>
      <group position={[-60, 0, 60]}>
        <Trees />
      </group>
      <group position={[60, 0, 60]}>
        <Trees />
      </group>

      <StreetLights />
      <group position={[-60, 0, -60]}>
        <StreetLights />
      </group>
      <group position={[60, 0, -60]}>
        <StreetLights />
      </group>
      <group position={[-60, 0, 60]}>
        <StreetLights />
      </group>
      <group position={[60, 0, 60]}>
        <StreetLights />
      </group>

      {/* radius kept well under half the 40-unit block size (20) so loops
          stay inside their own block and never cross into a road or a
          neighboring district. */}
      <People radius={10} />
      <group position={[-30, 0, -30]}>
        <People radius={10} />
      </group>
      <group position={[30, 0, -30]}>
        <People radius={10} />
      </group>
      <group position={[-30, 0, 30]}>
        <People radius={10} />
      </group>
      <group position={[30, 0, 30]}>
        <People radius={10} />
      </group>
      <group position={[-60, 0, -60]}>
        <People radius={10} />
      </group>
      <group position={[60, 0, -60]}>
        <People radius={10} />
      </group>
      <group position={[-60, 0, 60]}>
        <People radius={10} />
      </group>
      <group position={[60, 0, 60]}>
        <People radius={10} />
      </group>

      {/* ---------------- Vehicles — one distinct color each, spread over the whole grid ---------------- */}

      {/* Core cross streets */}
      <Car path={horizontalRoad} color="#EF5350" speed={6} />
      <Car path={horizontalRoadReverse} color="#42A5F5" speed={5.5} />
      <Car path={verticalRoad} color="#66BB6A" speed={5.8} />
      <Car path={verticalRoadReverse} color="#AB47BC" speed={6.2} />
      <Bus path={horizontalRoad} color="#FDD835" speed={4} />
      <Truck path={verticalRoad} color="#29B6F6" speed={4.5} />

      {/* Outer ring traffic */}
      <Car path={outerRingRoad} color="#FF7043" speed={6.4} />
      <Car path={outerRingRoadReverse} color="#26C6DA" speed={5.6} />
      <Car path={farLaneRoad} color="#EC407A" speed={5.9} />
      <Car path={farLaneRoadReverse} color="#9CCC65" speed={6.1} />
      <Bus path={outerRingRoadReverse} color="#FFA726" speed={4.2} />
      <Truck path={farLaneRoad} color="#7E57C2" speed={4.3} />

      <CameraController target={focus} />
      <AgentManager onSelect={setFocus} />
    </>
  );
}