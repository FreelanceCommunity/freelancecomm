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
  // model-viewer exposes the active clip duration once a model is loaded
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
 * Loop sequence (kept intentionally minimal):
 *   rollIn  → two clean rolls across from off-screen left to center
 *   wave    → stand at center and wave at the viewer
 *   runOut  → run forward to the right and exit off-screen
 *   reset   → invisible off-screen-left reset, then loop
 */
type Phase = "rollIn" | "wave" | "runOut" | "reset";

// Number of times the Roll clip should play during the rollIn phase.
const ROLL_REPETITIONS = 2;

// Fallback durations (used until we can read the real clip durations from
// the loaded model). Roll is ~1.0s, PickUp ~1.0s, Run ~1.0s in this GLB.
const FALLBACK_CLIP_DURATIONS: Record<string, number> = {
  Roll: 1.0,
  PickUp: 1.0,
  Run: 1.0,
  Idle: 1.0,
};

// Camera orbits — negative azimuth = facing right.
const ORBIT_FACING_RIGHT = "-35deg 82deg 115%";

const DjModel = ({ scrollMV: _scrollMV }: { scrollMV?: MotionValue<number> }) => {
  const viewerRef = useRef<ModelViewerElement>(null);
  const [phase, setPhase] = useState<Phase>("reset");
  // Real clip durations measured after the model loads. Used to time the
  // rollIn phase to an EXACT integer multiple of the Roll clip length, which
  // guarantees the roll loops without a mid-keyframe pop.
  const [clipDurations, setClipDurations] = useState<Record<string, number>>(
    FALLBACK_CLIP_DURATIONS
  );

  // Compute phase durations from the measured clip lengths so each clip
  // boundary lines up with a phase boundary.
  const phaseDurations = useMemo<Record<Phase, number>>(() => {
    const roll = (clipDurations.Roll ?? 1.0) * 1000;
    const pickup = (clipDurations.PickUp ?? 1.0) * 1000;
    const run = (clipDurations.Run ?? 1.0) * 1000;
    return {
      // Two full Roll plays, on the keyframe boundary
      rollIn: roll * ROLL_REPETITIONS,
      // One full PickUp wave, plus a small hold
      wave: pickup + 600,
      // Two Run cycles to cover the off-screen exit smoothly
      runOut: run * 2,
      // Invisible re-arm
      reset: 50,
    };
  }, [clipDurations]);

  // Kick the loop off after first paint
  useEffect(() => {
    const t = setTimeout(() => setPhase("rollIn"), 60);
    return () => clearTimeout(t);
  }, []);

  // Read clip durations from the live model-viewer once available animations
  // are exposed. We have to switch animation-name briefly to each clip to
  // measure its `duration`, but model-viewer also accepts an internal API:
  // simply iterate availableAnimations and rely on the viewer's `duration`
  // property after each set. We do this once, hidden, before the loop starts.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    let cancelled = false;

    const measure = async () => {
      // Wait until model-viewer reports its animation list
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
        // Yield so the viewer applies the new clip and recomputes duration
        await new Promise((r) => requestAnimationFrame(() => r(null)));
        const d = viewer.duration;
        if (typeof d === "number" && d > 0 && Number.isFinite(d)) {
          out[clip] = d;
        }
      }
      // Restore the active clip + play state
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

  // Phase scheduler — uses the dynamically computed durations.
  useEffect(() => {
    const next: Record<Phase, Phase> = {
      reset: "rollIn",
      rollIn: "wave",
      wave: "runOut",
      runOut: "reset",
    };
    const t = setTimeout(() => setPhase(next[phase]), phaseDurations[phase]);
    return () => clearTimeout(t);
  }, [phase, phaseDurations]);

  // ---- Frame-smoothing for the double-roll ----
  // model-viewer loops the active clip via Three.js LoopRepeat which is
  // seamless internally, but the slide motion + crossfade restarts can cause
  // a visible pop. We mitigate by:
  //   1) Pre-arming the Roll clip during the `reset` phase so it's already
  //      cycling at t=0 when rollIn begins (no clip restart at the seam).
  //   2) Forcing currentTime back to 0 on the rollIn boundary so the
  //      character lands on a known frame for the slide easing curve.
  //   3) Snapping the slide motion to a LINEAR ease during rollIn — the
  //      Roll clip plays at constant speed, so any non-linear body motion
  //      visibly desyncs from the somersault rotation.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    if (phase === "reset") {
      // Pre-warm: load the Roll clip and let it run silently off-screen so
      // the GPU/animation mixer is already in steady state by the time we
      // reveal the character.
      viewer.setAttribute("animation-name", "Roll");
      try {
        viewer.currentTime = 0;
      } catch {
        /* noop — some versions don't allow direct assignment */
      }
      void viewer.play?.();
    } else if (phase === "rollIn") {
      // Rebase the clip to frame 0 exactly when the slide motion starts so
      // the Nth roll completes precisely as x reaches 0%.
      try {
        viewer.currentTime = 0;
      } catch {
        /* noop */
      }
      void viewer.play?.();
    }
  }, [phase]);

  // Pick the correct clip per phase
  const animationName = (() => {
    switch (phase) {
      case "rollIn":
        return "Roll";
      case "wave":
        // GLB has no dedicated "Wave" clip — PickUp raises the arm in a
        // friendly hand-up gesture, the closest non-violent wave we have.
        return "PickUp";
      case "runOut":
        return "Run";
      case "reset":
      default:
        // Pre-arm Roll during reset so the seam into rollIn is glitch-free
        return "Roll";
    }
  })();

  // Camera always faces right (character moves left → right the whole loop).
  const cameraOrbit = ORBIT_FACING_RIGHT;

  // Horizontal travel across the hero.
  // -110% = fully off-screen left, 0% = centered, 120% = fully off-screen right.
  // CRITICAL: rollIn uses LINEAR easing so the body translation matches the
  // constant-speed Roll clip. Any non-linear curve here will visibly desync
  // from the somersault and read as a "glitch" between the two rolls.
  const slideVariants = {
    reset: { x: "-110%", opacity: 0, transition: { duration: 0 } },
    rollIn: {
      x: "0%",
      opacity: 1,
      transition: {
        duration: phaseDurations.rollIn / 1000,
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
        // Longer crossfade than a single Roll cycle would be wrong — keep it
        // short so the seam between roll #1 and roll #2 (which is handled by
        // Three.js LoopRepeat, not a clip switch) isn't double-blended.
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
  );
};

// Keep AnimatePresence import side-effect-free in case of future tree-shaking
void AnimatePresence;

export default DjModel;
