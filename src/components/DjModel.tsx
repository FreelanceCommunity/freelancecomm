import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, useAnimations } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import * as THREE from "three";
import djUrl from "@/assets/dj_music_man.glb?url";

useGLTF.preload(djUrl);

const Model = () => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(djUrl);
  const { actions, names } = useAnimations(animations, group);

  // Play any embedded animations (equivalent to model-viewer animation-name="*" autoplay)
  useEffect(() => {
    names.forEach((n) => {
      const a = actions[n];
      if (a) {
        a.reset();
        a.setLoop(THREE.LoopRepeat, Infinity);
        a.play();
      }
    });
  }, [actions, names]);

  // No rotation, no idle sway — fixed in place
  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.set(0, 0, 0);
    group.current.position.set(0, -0.6, 0);
  });

  return (
    <group ref={group} scale={2.2} position={[0, -0.6, 0]}>
      <primitive object={scene} />
    </group>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DjModel = ({ scrollMV: _scrollMV }: { scrollMV?: MotionValue<number> }) => {
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
