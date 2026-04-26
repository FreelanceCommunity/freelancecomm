import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  ContactShadows,
  useAnimations,
  Center,
  Bounds,
} from "@react-three/drei";
import { MotionValue } from "framer-motion";
import * as THREE from "three";
import djUrl from "@/assets/dj_music_man.glb?url";

useGLTF.preload(djUrl);

const Model = () => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(djUrl);
  // Clone so HMR / multiple mounts don't fight over the same scene graph
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    cloned.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
  }, [cloned]);

  // Play any embedded animations (model-viewer: animation-name="*" autoplay)
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

  // Lock — no rotation, no sway
  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.set(0, 0, 0);
  });

  return (
    <group ref={group}>
      <primitive object={cloned} />
    </group>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DjModel = ({ scrollMV: _scrollMV }: { scrollMV?: MotionValue<number> }) => {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 5], fov: 35 }}
      dpr={[1, 2]}
      shadows
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#E2C97E" />
      <Suspense fallback={null}>
        {/* Bounds auto-fits the model to the camera; Center re-origins it */}
        <Bounds fit clip observe margin={1.15}>
          <Center disableY={false}>
            <Model />
          </Center>
        </Bounds>
        <ContactShadows
          position={[0, -1.0, 0]}
          opacity={0.4}
          scale={10}
          blur={2.6}
          far={3}
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
};

export default DjModel;
