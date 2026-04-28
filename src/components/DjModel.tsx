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
 * Loop sequence (cleaner read):
 *   runIn   → enter from left at a run
 *   jump    → mid-stride parabolic jump (Jump clip if present, else Roll)
 *   runMid  → continue running to center
 *   wave    → stop, raise hand, wave hi (PickUp ≈ arm-raise)
 *   runOut  → run forward to the right and exit off-screen
 *   reset   → invisible off-screen-left re-arm, then loop
 */
type Phase = "runIn" | "jump" | "runMid" | "wave" | "runOut" | "reset";

const FALLBACK_CLIP_DURATIONS: Record<string, number> = {
  Roll: 1.0,
  PickUp: 1.0,
  Run: 1.0,
  Jump: 1.0,
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
  const [hasJumpClip, setHasJumpClip] = useState(false);

  const phaseDurations = useMemo<Record<Phase, number>>(() => {
    const run = (clipDurations.Run ?? 1.0) * 1000;
    const pickup = (clipDurations.PickUp ?? 1.0) * 1000;
    const jump = (clipDurations.Jump ?? clipDurations.Roll ?? 1.0) * 1000;
    return {
      runIn: Math.max(900, run * 1.2),
      jump: Math.max(700, jump),
      runMid: Math.max(700, run * 0.9),
      wave: pickup * 2 + 500,
      runOut: Math.max(1100, run * 1.6),
      reset: 50,
    };
  }, [clipDurations]);

  // Kick the loop off after first paint
  useEffect(() => {
    const t = setTimeout(() => setPhase("runIn"), 60);
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
      setHasJumpClip(names.includes("Jump"));
      const out: Record<string, number> = { ...FALLBACK_CLIP_DURATIONS };
      const wanted = ["Roll", "PickUp", "Run", "Jump", "Idle"];
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
      reset: "runIn",
      runIn: "jump",
      jump: "runMid",
      runMid: "wave",
      wave: "runOut",
      runOut: "reset",
    };
    const t = setTimeout(() => setPhase(next[phase]), phaseDurations[phase]);
    return () => clearTimeout(t);
  }, [phase, phaseDurations]);

  // Pre-arm Run during reset for a clean re-entry
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    if (phase === "reset") {
      viewer.setAttribute("animation-name", "Run");
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
      case "runIn":
      case "runMid":
      case "runOut":
        return "Run";
      case "jump":
        return hasJumpClip ? "Jump" : "Roll";
      case "wave":
        return "PickUp";
      case "reset":
      default:
        return "Run";
    }
  })();

  const cameraOrbit = ORBIT_FACING_RIGHT;

  // Horizontal positions across the loop
  const slideVariants = {
    reset: { x: "-110%", opacity: 0, transition: { duration: 0 } },
    runIn: {
      x: "-25%",
      opacity: 1,
      transition: {
        duration: phaseDurations.runIn / 1000,
        ease: "linear" as const,
        opacity: { duration: 0.2, ease: "easeOut" as const },
      },
    },
    jump: {
      x: "-5%",
      opacity: 1,
      transition: {
        duration: phaseDurations.jump / 1000,
        ease: "linear" as const,
      },
    },
    runMid: {
      x: "0%",
      opacity: 1,
      transition: {
        duration: phaseDurations.runMid / 1000,
        ease: "easeOut" as const,
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

  // Vertical jump arc — only active during the jump phase.
  const jumpArcVariants = {
    reset: { y: "0%" },
    runIn: { y: "0%" },
    jump: {
      y: ["0%", "-26%", "0%"],
      transition: {
        duration: phaseDurations.jump / 1000,
        ease: "easeOut" as const,
        times: [0, 0.5, 1],
      },
    },
    runMid: { y: "0%", transition: { duration: 0.2 } },
    wave: { y: "0%" },
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
