import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MotionValue } from "framer-motion";
import "@google/model-viewer";
import djUrl from "@/assets/dj_music_man.glb?url";

type ModelViewerElement = HTMLElement & {
  play?: (options?: { repetitions?: number; pingpong?: boolean }) => Promise<void>;
  pause?: () => void;
  updateFraming?: () => void;
  availableAnimations?: string[];
  duration?: number;
  currentTime?: number;
  timeScale?: number;
  paused?: boolean;
  loop?: boolean;
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
 * Loop sequence:
 *   jumpIn  → enter from left in a parabolic JUMP arc while playing the
 *             Roll clip (reads as "jump + roll" / a tucked aerial somersault),
 *             landing at center
 *   wave    → raise hand and wave hi (PickUp clip — closest non-violent
 *             arm-raise gesture in this GLB)
 *   runOut  → run forward to the right and exit off-screen
 *   reset   → invisible off-screen-left re-arm, then loop
 */
type Phase = "jumpIn" | "wave" | "runOut" | "reset";

const ROLL_REPETITIONS = 2;

const FALLBACK_CLIP_DURATIONS: Record<string, number> = {
  Roll: 1.0,
  PickUp: 1.0,
  Run: 1.0,
  Idle: 1.0,
};

// Negative azimuth = facing right (direction of travel).
const ORBIT_FACING_RIGHT = "-35deg 82deg 115%";

const DjModel = ({ scrollMV: _scrollMV }: { scrollMV?: MotionValue<number> }) => {
  const viewerRef = useRef<ModelViewerElement>(null);
  const [phase, setPhase] = useState<Phase>("reset");
  const [clipDurations, setClipDurations] = useState<Record<string, number>>(
    FALLBACK_CLIP_DURATIONS
  );

  const phaseDurations = useMemo<Record<Phase, number>>(() => {
    const roll = (clipDurations.Roll ?? 1.0) * 1000;
    const pickup = (clipDurations.PickUp ?? 1.0) * 1000;
    const run = (clipDurations.Run ?? 1.0) * 1000;
    return {
      // Jump-and-roll across the entry: 2 full Roll cycles for a clean spin
      jumpIn: roll * ROLL_REPETITIONS,
      wave: pickup + 600,
      runOut: run * 2,
      reset: 50,
    };
  }, [clipDurations]);

  // Kick the loop off after first paint
  useEffect(() => {
    const t = setTimeout(() => setPhase("jumpIn"), 60);
    return () => clearTimeout(t);
  }, []);

  // Measure real clip durations once available
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    let cancelled = false;

    const measure = async () => {
      for (let i = 0; i < 60; i++) {
        if (viewer.availableAnimations && viewer.availableAnimations.length) break;
        await new Promise((r) => setTimeout(r, 50));
      }
      if (cancelled) return;
      const names = viewer.availableAnimations ?? [];
      const out: Record<string, number> = { ...FALLBACK_CLIP_DURATIONS };
      const wanted = ["Roll", "PickUp", "Run", "Idle"];
      const previousName = viewer.getAttribute("animation-name");
      const wasPaused = !!viewer.paused;
      viewer.pause?.();
      for (const clip of wanted) {
        if (!names.includes(clip)) continue;
        viewer.setAttribute("animation-name", clip);
        await new Promise((r) => requestAnimationFrame(() => r(null)));
        const d = viewer.duration;
        if (typeof d === "number" && d > 0 && Number.isFinite(d)) {
          out[clip] = d;
        }
      }
      if (previousName) viewer.setAttribute("animation-name", previousName);
      if (!wasPaused) void viewer.play?.();
      if (!cancelled) setClipDurations(out);
    };

    const onLoad = () => {
      viewer.updateFraming?.();
      void measure();
      void viewer.play?.();
    };
    viewer.addEventListener("load", onLoad);
    return () => {
      cancelled = true;
      viewer.removeEventListener("load", onLoad);
    };
  }, []);

  // Phase scheduler
  useEffect(() => {
    const next: Record<Phase, Phase> = {
      reset: "jumpIn",
      jumpIn: "wave",
      wave: "runOut",
      runOut: "reset",
    };
    const t = setTimeout(() => setPhase(next[phase]), phaseDurations[phase]);
    return () => clearTimeout(t);
  }, [phase, phaseDurations]);

  // Pre-arm the Roll clip during reset so the seam into jumpIn is glitch-free
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    if (phase === "reset") {
      viewer.setAttribute("animation-name", "Roll");
      try {
        viewer.currentTime = 0;
      } catch {
        /* noop */
      }
      void viewer.play?.();
    } else if (phase === "jumpIn") {
      try {
        viewer.currentTime = 0;
      } catch {
        /* noop */
      }
      void viewer.play?.();
    }
  }, [phase]);

  const animationName = (() => {
    switch (phase) {
      case "jumpIn":
        return "Roll"; // tucked aerial somersault during the jump arc
      case "wave":
        return "PickUp"; // arm-raise = wave hi
      case "runOut":
        return "Run";
      case "reset":
      default:
        return "Roll"; // pre-armed
    }
  })();

  const cameraOrbit = ORBIT_FACING_RIGHT;

  // Horizontal slide (X). Y is handled by an inner wrapper so we can layer
  // a parabolic JUMP arc on top of the linear slide during jumpIn.
  const slideVariants = {
    reset: { x: "-110%", opacity: 0, transition: { duration: 0 } },
    jumpIn: {
      x: "0%",
      opacity: 1,
      transition: {
        duration: phaseDurations.jumpIn / 1000,
        ease: "linear" as const,
        opacity: { duration: 0.2, ease: "easeOut" as const },
      },
    },
    wave: {
      x: "0%",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
    runOut: {
      x: "120%",
      opacity: 1,
      transition: {
        duration: phaseDurations.runOut / 1000,
        ease: "linear" as const,
      },
    },
  } as const;

  // Vertical jump arc — only active during jumpIn. Two arcs (one per Roll
  // cycle) so the silhouette reads clearly as "jump → land → jump → land".
  // y values are CSS units (negative = up). Keyframes are evenly spaced.
  const jumpArcVariants = {
    reset: { y: "0%" },
    jumpIn: {
      y: ["0%", "-22%", "0%", "-22%", "0%"],
      transition: {
        duration: phaseDurations.jumpIn / 1000,
        ease: "easeOut" as const,
        times: [0, 0.25, 0.5, 0.75, 1],
      },
    },
    wave: { y: "0%", transition: { duration: 0.2 } },
    runOut: { y: "0%" },
  };

  return (
    <motion.div
      className="h-full w-full will-change-transform"
      initial={{ x: "-110%", opacity: 0 }}
      animate={phase}
      variants={slideVariants}
    >
      <motion.div
        className="h-full w-full will-change-transform"
        animate={phase}
        variants={jumpArcVariants}
      >
        <model-viewer
          ref={viewerRef}
          src={djUrl}
          autoplay
          animation-name={animationName}
          animation-crossfade-duration="200"
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
    </motion.div>
  );
};

void AnimatePresence;

export default DjModel;
