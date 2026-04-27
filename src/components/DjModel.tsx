import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { MotionValue } from "framer-motion";
import "@google/model-viewer";
import djUrl from "@/assets/dj_music_man.glb?url";

type ModelViewerElement = HTMLElement & {
  play?: () => Promise<void>;
  pause?: () => void;
  updateFraming?: () => void;
  availableAnimations?: string[];
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        autoplay?: boolean;
        "animation-name"?: string;
        "animation-crossfade-duration"?: string;
        exposure?: string;
        "shadow-intensity"?: string;
        "camera-orbit"?: string;
        "camera-target"?: string;
        "field-of-view"?: string;
        "min-camera-orbit"?: string;
        "max-camera-orbit"?: string;
        "interaction-prompt"?: string;
        "disable-zoom"?: boolean;
        loading?: "auto" | "lazy" | "eager";
        reveal?: "auto" | "interaction" | "manual";
      };
    }
  }
}

// Sequence: Roll in from off-screen left → Punch (used as "point") → Idle breathing → loop
type Phase = "roll" | "point" | "idle";

const PHASE_DURATIONS: Record<Phase, number> = {
  roll: 2200,   // sliding in across the screen
  point: 1400,  // punch/point gesture
  idle: 2600,   // brief idle breathing before looping
};

const DjModel = ({ scrollMV: _scrollMV }: { scrollMV?: MotionValue<number> }) => {
  const viewerRef = useRef<ModelViewerElement>(null);
  const [phase, setPhase] = useState<Phase>("roll");

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const onLoad = () => {
      viewer.updateFraming?.();
      void viewer.play?.();
    };
    viewer.addEventListener("load", onLoad);
    return () => viewer.removeEventListener("load", onLoad);
  }, []);

  // Cycle through phases continuously
  useEffect(() => {
    const t = setTimeout(() => {
      setPhase((p) => (p === "roll" ? "point" : p === "point" ? "idle" : "roll"));
    }, PHASE_DURATIONS[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  const animationName =
    phase === "roll" ? "Roll" : phase === "point" ? "Punch" : "Idle";

  // During the roll phase the character slides in from far left.
  // After that it stays anchored at the left side of the hero.
  const slideVariants = {
    roll: { x: "-60%", transition: { duration: PHASE_DURATIONS.roll / 1000, ease: [0.22, 0.61, 0.36, 1] as const } },
    point: { x: "0%", transition: { duration: 0.4, ease: "easeOut" as const } },
    idle: { x: "0%", transition: { duration: 0.4, ease: "easeOut" as const } },
  };

  return (
    <motion.div
      className="h-full w-full"
      initial={{ x: "-110%" }}
      animate={phase}
      variants={slideVariants}
    >
      <model-viewer
        ref={viewerRef}
        src={djUrl}
        autoplay
        animation-name={animationName}
        animation-crossfade-duration="250"
        exposure="1.15"
        shadow-intensity="0.75"
        camera-orbit="-35deg 80deg 60%"
        camera-target="0m 1m 0m"
        field-of-view="16deg"
        min-camera-orbit="-35deg 80deg 60%"
        max-camera-orbit="-35deg 80deg 60%"
        interaction-prompt="none"
        disable-zoom
        loading="eager"
        reveal="auto"
        className="block h-full w-full"
        style={{ width: "100%", height: "100%", background: "transparent" }}
      />
    </motion.div>
  );
};

export default DjModel;
