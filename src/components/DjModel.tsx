import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import * as THREE from "three";
import djUrl from "@/assets/dj_music_man.glb?url";

useGLTF.preload(djUrl);

const Model = ({ scrollMV }: { scrollMV?: MotionValue<number> }) => {
  const { scene } = useGLTF(djUrl);
  const ref = useRef<THREE.Group>(null);
  const scroll = useRef(0);

  useMotionValueEvent(scrollMV ?? ({ on: () => () => {} } as unknown as MotionValue<number>), "change", (v) => {
    scroll.current = v as number;
  });

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    // Idle gentle sway + scroll-driven spin
    ref.current.rotation.y = t * 0.35 + scroll.current * Math.PI * 1.2;
    ref.current.position.y = Math.sin(t * 1.2) * 0.05 - 0.6;
  });

  return (
    <group ref={ref} scale={2.2} position={[0, -0.6, 0]}>
      <primitive object={scene} />
    </group>
  );
};

const DjModel = ({ scrollMV }: { scrollMV?: MotionValue<number> }) => {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 4.2], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#E2C97E" />
      <Suspense fallback={null}>
        <Model scrollMV={scrollMV} />
        <ContactShadows
          position={[0, -1.55, 0]}
          opacity={0.45}
          scale={8}
          blur={2.4}
          far={3}
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
};

export default DjModel;
