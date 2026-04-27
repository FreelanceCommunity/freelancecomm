import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

/**
 * Loop sequence (kept intentionally minimal):
 *   rollIn  → one single roll across from off-screen left to center
 *   wave    → stand at center and wave at the viewer
 *   runOut  → run forward to the right and exit off-screen
 *   reset   → invisible off-screen-left reset, then loop
 */
type Phase = "rollIn" | "wave" | "runOut" | "reset";

const PHASE_DURATIONS: Record<Phase, number> = {
  rollIn: 1800, // tuned so Roll clip plays once cleanly across the slide
  wave: 1700,
  runOut: 1900,
  reset: 50,
};

// Camera orbits — negative azimuth = facing right, positive = facing left.
// We rotate the camera (not the model) so the character appears to face the
// direction of travel. Crossfaded by model-viewer for smoothness.
const ORBIT_FACING_RIGHT = "-35deg 82deg 115%";
const ORBIT_FACING_LEFT = "35deg 82deg 115%";

const DjModel = ({ scrollMV: _scrollMV }: { scrollMV?: MotionValue<number> }) => {
  const viewerRef = useRef<ModelViewerElement>(null);
  const [phase, setPhase] = useState<Phase>("reset");

  // Kick the loop off after first paint
  useEffect(() => {
    const t = setTimeout(() => setPhase("rollIn"), 60);
    return () => clearTimeout(t);
  }, []);

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

  // Phase scheduler
  useEffect(() => {
    const next: Record<Phase, Phase> = {
      reset: "rollIn",
      rollIn: "settle",
      settle: "wave",
      wave: "turn",
      turn: "runOut",
      runOut: "reset",
    };
    const t = setTimeout(() => setPhase(next[phase]), PHASE_DURATIONS[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  // Pick the correct clip per phase
  const animationName = (() => {
    switch (phase) {
      case "rollIn":
        return "Roll";
      case "settle":
      case "turn":
        return "Idle";
      case "wave":
        return "Punch"; // closest to a wave (raises arm)
      case "runOut":
        return "Run";
      case "reset":
      default:
        return "Idle";
    }
  })();

  // Camera faces RIGHT while moving right (rollIn, runOut) and during wave.
  // During the brief "turn" beat we flip orientation so the run feels natural.
  const cameraOrbit =
    phase === "runOut" ? ORBIT_FACING_LEFT : ORBIT_FACING_RIGHT;

  // Horizontal travel across the hero.
  // -110% = fully off-screen left, 0% = centered, 120% = fully off-screen right.
  const slideVariants = {
    reset: { x: "-110%", opacity: 0, transition: { duration: 0 } },
    rollIn: {
      x: "0%",
      opacity: 1,
      transition: {
        duration: PHASE_DURATIONS.rollIn / 1000,
        ease: [0.22, 0.61, 0.36, 1] as const,
        opacity: { duration: 0.25, ease: "easeOut" as const },
      },
    },
    settle: {
      x: "0%",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
    wave: {
      x: "0%",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
    turn: {
      x: "0%",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
    runOut: {
      x: "120%",
      opacity: 1,
      transition: {
        duration: PHASE_DURATIONS.runOut / 1000,
        ease: [0.45, 0, 0.55, 1] as const,
      },
    },
  } as const;

  return (
    <motion.div
      className="h-full w-full will-change-transform"
      initial={{ x: "-110%", opacity: 0 }}
      animate={phase}
      variants={slideVariants}
    >
      <model-viewer
        ref={viewerRef}
        src={djUrl}
        autoplay
        animation-name={animationName}
        animation-crossfade-duration="350"
        exposure="1.15"
        shadow-intensity="0.75"
        camera-orbit={cameraOrbit}
        camera-target="0m 0.9m 0m"
        field-of-view="28deg"
        min-camera-orbit={cameraOrbit}
        max-camera-orbit={cameraOrbit}
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

// Keep AnimatePresence import side-effect-free in case of future tree-shaking
void AnimatePresence;

export default DjModel;
