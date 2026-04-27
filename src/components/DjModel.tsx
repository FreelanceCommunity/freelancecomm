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

// Loop sequence:
//   rollIn  : character rolls in from off-screen left toward left third of screen
//   wave    : character waves hi (using "Punch" arm-up gesture as wave)
//   runOut  : character runs to the right and exits off-screen right
// Then resets back to off-screen left and the loop repeats.
type Phase = "rollIn" | "wave" | "runOut";

const PHASE_DURATIONS: Record<Phase, number> = {
  rollIn: 1800,
  wave: 1600,
  runOut: 2200,
};

const DjModel = ({ scrollMV: _scrollMV }: { scrollMV?: MotionValue<number> }) => {
  const viewerRef = useRef<ModelViewerElement>(null);
  const [phase, setPhase] = useState<Phase>("rollIn");

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
      setPhase((p) =>
        p === "rollIn" ? "wave" : p === "wave" ? "runOut" : "rollIn"
      );
    }, PHASE_DURATIONS[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  const animationName =
    phase === "rollIn" ? "Roll" : phase === "wave" ? "Punch" : "Run";

  // Horizontal travel across the hero. The motion.div is the full hero width;
  // we slide it from off-screen left → left third → off-screen right.
  const slideVariants = {
    rollIn: {
      x: "-25%",
      transition: {
        duration: PHASE_DURATIONS.rollIn / 1000,
        ease: [0.22, 0.61, 0.36, 1] as const,
      },
    },
    wave: {
      x: "-25%",
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
    runOut: {
      x: "120%",
      transition: {
        duration: PHASE_DURATIONS.runOut / 1000,
        ease: [0.45, 0, 0.55, 1] as const,
      },
    },
  };

  return (
    <motion.div
      className="h-full w-full"
      // Reset instantly off-screen left whenever we re-enter rollIn phase
      initial={false}
      animate={phase === "rollIn" ? ["reset", "rollIn"] : phase}
      variants={{
        reset: { x: "-110%", transition: { duration: 0 } },
        ...slideVariants,
      }}
    >
      <model-viewer
        ref={viewerRef}
        src={djUrl}
        autoplay
        animation-name={animationName}
        animation-crossfade-duration="250"
        exposure="1.15"
        shadow-intensity="0.75"
        camera-orbit="-35deg 80deg 110%"
        camera-target="0m 0.9m 0m"
        field-of-view="28deg"
        min-camera-orbit="-35deg 80deg 110%"
        max-camera-orbit="-35deg 80deg 110%"
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
