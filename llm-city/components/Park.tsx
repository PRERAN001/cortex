"use client";

type TreeProps = {
  position: [number, number, number];
};

function Tree({ position }: TreeProps) {
  return (
    <group position={position}>
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 1.5, 8]} />
        <meshStandardMaterial color="#6d4c41" />
      </mesh>
      <mesh position={[0, 2, 0]} castShadow>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#43a047" />
      </mesh>
    </group>
  );
}

// A thin, low curb running the perimeter of the park footprint — the
// "boundary" that visually separates grass from road/sidewalk.
function Boundary({ size }: { size: number }) {
  const half = size / 2;
  const thickness = 0.4;
  const height = 0.25;
  return (
    <group>
      {/* north / south edges */}
      <mesh position={[0, height / 2, -half]} castShadow receiveShadow>
        <boxGeometry args={[size + thickness, height, thickness]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      <mesh position={[0, height / 2, half]} castShadow receiveShadow>
        <boxGeometry args={[size + thickness, height, thickness]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      {/* east / west edges */}
      <mesh position={[-half, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[thickness, height, size + thickness]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      <mesh position={[half, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[thickness, height, size + thickness]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
    </group>
  );
}

type LawnProps = {
  size: number;
  position: [number, number, number];
};

function Lawn({ size, position }: LawnProps) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial
        color="#66bb6a"
        polygonOffset
        polygonOffsetFactor={-4}
        polygonOffsetUnits={-4}
      />
    </mesh>
  );
}

type ParkProps = {
  /** Overall footprint of the park (outer edge to outer edge). */
  size?: number;
  /**
   * Width of the empty cross left clear through the center so roads that
   * run along this block's centerlines are never covered by grass.
   * Set to 0 for parks that aren't sitting on a road crossing.
   */
  roadGap?: number;
  /** Draw the curb/fence around the park footprint. */
  boundary?: boolean;
  /** Show the small central fountain (only really makes sense with a gap). */
  fountain?: boolean;
};

export default function Park({
  size = 34,
  roadGap = 12,
  boundary = true,
  fountain = true,
}: ParkProps) {
  const half = size / 2;
  const gapHalf = roadGap / 2;
  const lawnSize = half - gapHalf; // size of each quadrant lawn patch
  const lawnOffset = gapHalf + lawnSize / 2;

  const quadrants: [number, number][] =
    roadGap > 0
      ? [
          [-lawnOffset, -lawnOffset],
          [lawnOffset, -lawnOffset],
          [-lawnOffset, lawnOffset],
          [lawnOffset, lawnOffset],
        ]
      : [[0, 0]];

  const lawnPatchSize = roadGap > 0 ? lawnSize : size;

  return (
    <group position={[0, 0.02, 0]}>
      {boundary && <Boundary size={size} />}

      {quadrants.map(([x, z], i) => (
        <Lawn key={i} size={lawnPatchSize} position={[x, 0, z]} />
      ))}

      {/* Trees dotted around each lawn patch, tucked away from the gap */}
      {quadrants.map(([x, z], i) => (
        <group key={`trees-${i}`}>
          <Tree
            position={[
              x + (x >= 0 ? -lawnPatchSize / 4 : lawnPatchSize / 4),
              0,
              z + (z >= 0 ? -lawnPatchSize / 4 : lawnPatchSize / 4),
            ]}
          />
          <Tree
            position={[
              x + (x >= 0 ? lawnPatchSize / 3 : -lawnPatchSize / 3),
              0,
              z + (z >= 0 ? lawnPatchSize / 3 : -lawnPatchSize / 3),
            ]}
          />
        </group>
      ))}

      {/* Fountain sits in the clear gap, never on top of the lawn */}
      {fountain && (
        <>
          <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[2, 2, 0.3, 32]} />
            <meshStandardMaterial
              color="#9e9e9e"
              polygonOffset
              polygonOffsetFactor={-2}
              polygonOffsetUnits={-2}
            />
          </mesh>
          <mesh position={[0, 0.32, 0]} receiveShadow>
            <cylinderGeometry args={[1.2, 1.2, 0.08, 32]} />
            <meshStandardMaterial color="#4fc3f7" />
          </mesh>
        </>
      )}
    </group>
  );
}