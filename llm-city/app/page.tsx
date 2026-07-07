"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import City from "@/components/City";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas
        shadows
        camera={{
          position: [30, 20, 30],
          fov: 50,
        }}
      >

        
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[20, 30, 20]}
          intensity={2}
          castShadow
        />

        <City />

        <OrbitControls />
      </Canvas>
    </div>
  );
}