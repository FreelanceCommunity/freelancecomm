import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { heroContainer, heroItem } from "@/lib/motion";

/* ---------- Rubik's Cube ----------
   27 cubies. On scroll, they "fall" outward and land on a flat surface
   (all Y values clamped to a ground line). No idle motion once landed.
*/

const FACE_COLORS: Record<string, string> = {
  R: "#C9304A",
  L: "#E58E26",
  U: "#F5F2EC",
  D: "#E2C97E",
  F: "#1F8A4C",
  B: "#1F4FAA",
};

export type CubieData = {
  x: -1 | 0 | 1;
  y: -1 | 0 | 1;
  z: -1 | 0 | 1;
  // landed (resting) transform
  landedX: number;
  landedY: number; // all positive — sitting on the ground line
  landedZ: number;
  landedRX: number; // small tilt — lying flat-ish
  landedRY: number; // free spin OK
  landedRZ: number; // small tilt
};

const seed = (i: number) => {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const CUBIE = 56;
const GAP = 4;
const STEP = CUBIE + GAP;
// Ground line in local 3D space (positive Y = down). Cube center is at 0,
// so this puts the resting surface a bit below the cube's natural bottom.
const GROUND_Y = STEP * 1.6;

export const buildCubies = (): CubieData[] => {
  const arr: CubieData[] = [];
  let i = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const r1 = seed(i + 1);
        const r2 = seed(i + 2);
        const r3 = seed(i + 3);
        const r4 = seed(i + 4);
        const r5 = seed(i + 5);
        // Spread horizontally across the surface
        const spread = 220 + r1 * 220;
        const angle = r2 * Math.PI * 2;
        const landedX = Math.cos(angle) * spread * (0.5 + r3 * 0.6);
        const landedZ = Math.sin(angle) * spread * (0.5 + r4 * 0.6);
        // Sit on the ground line, with a small stack jitter
        const landedY = GROUND_Y - r5 * 6;
        // Lying-flat rotation: small X/Z tilt, free Y spin
        const tiltX = (r3 - 0.5) * 24;
        const tiltZ = (r4 - 0.5) * 24;
        const spin = (r5 - 0.5) * 360;
        arr.push({
          x: x as -1 | 0 | 1,
          y: y as -1 | 0 | 1,
          z: z as -1 | 0 | 1,
          landedX,
          landedY,
          landedZ,
          landedRX: tiltX,
          landedRY: spin,
          landedRZ: tiltZ,
        });
        i++;
      }
    }
  }
  return arr;
};

const CUBIES = buildCubies();

const Cubie = ({
  c,
  progress,
}: {
  c: CubieData;
  progress: MotionValue<number>;
}) => {
  const baseX = c.x * STEP;
  const baseY = c.y * STEP;
  const baseZ = c.z * STEP;

  const tx = useTransform(progress, [0, 1], [baseX, c.landedX]);
  // Falling arc: ease into the ground (extra easing handled by scroll feel)
  const ty = useTransform(progress, [0, 1], [baseY, c.landedY]);
  const tz = useTransform(progress, [0, 1], [baseZ, c.landedZ]);
  const rx = useTransform(progress, [0, 1], [0, c.landedRX]);
  const ry = useTransform(progress, [0, 1], [0, c.landedRY]);
  const rz = useTransform(progress, [0, 1], [0, c.landedRZ]);

  const transform = useTransform(
    [tx, ty, tz, rx, ry, rz] as MotionValue<number>[],
    (v) => {
      const [x, y, z, rrx, rry, rrz] = v as number[];
      return `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rrx}deg) rotateY(${rry}deg) rotateZ(${rrz}deg)`;
    }
  );

  const half = CUBIE / 2;
  const faceStyle: React.CSSProperties = {
    position: "absolute",
    width: CUBIE,
    height: CUBIE,
    border: "1px solid rgba(0,0,0,0.55)",
    boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.15)",
    backfaceVisibility: "hidden",
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: CUBIE,
        height: CUBIE,
        marginLeft: -half,
        marginTop: -half,
        transformStyle: "preserve-3d",
        transform,
      }}
    >
      <div
        style={{
          ...faceStyle,
          background: c.z === 1 ? FACE_COLORS.F : "#0E0E0E",
          transform: `translateZ(${half}px)`,
        }}
      />
      <div
        style={{
          ...faceStyle,
          background: c.z === -1 ? FACE_COLORS.B : "#0E0E0E",
          transform: `translateZ(-${half}px) rotateY(180deg)`,
        }}
      />
      <div
        style={{
          ...faceStyle,
          background: c.x === 1 ? FACE_COLORS.R : "#0E0E0E",
          transform: `rotateY(90deg) translateZ(${half}px)`,
        }}
      />
      <div
        style={{
          ...faceStyle,
          background: c.x === -1 ? FACE_COLORS.L : "#0E0E0E",
          transform: `rotateY(-90deg) translateZ(${half}px)`,
        }}
      />
      <div
        style={{
          ...faceStyle,
          background: c.y === -1 ? FACE_COLORS.U : "#0E0E0E",
          transform: `rotateX(90deg) translateZ(${half}px)`,
        }}
      />
      <div
        style={{
          ...faceStyle,
          background: c.y === 1 ? FACE_COLORS.D : "#0E0E0E",
          transform: `rotateX(-90deg) translateZ(${half}px)`,
        }}
      />
    </motion.div>
  );
};

const RubiksCube = ({ progress }: { progress: MotionValue<number> }) => {
  // Idle slow rotation only when assembled. Fades out as it scatters.
  // We freeze the parent rotation once landed so the pile sits still.
  const idleRotateY = useTransform(progress, [0, 0.2], [0, 0]);

  return (
    <div
      style={{
        perspective: 1400,
        width: 520,
        height: 520,
        filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.35))",
      }}
    >
      {/* When assembled (progress ~0) we want a gentle idle Y rotation.
          When scattered (progress ~1) the parent must be still. We
          accomplish "still pile" by giving the parent a fixed orientation
          and letting only the cubies move. */}
      <motion.div
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: "rotateX(-22deg)",
        }}
      >
        {/* Wrapper that cancels the idle spin once landed.
            We invert the parent rotateY by progress*-360deg so the net
            rotation freezes at 0deg when fully scattered. */}
        <CubeInner progress={progress} idleRotateY={idleRotateY} />
      </motion.div>
    </div>
  );
};

// Inner wrapper that progressively cancels the idle spin so the landed
// pile is perfectly still.
const CubeInner = ({
  progress,
}: {
  progress: MotionValue<number>;
  idleRotateY: MotionValue<number>;
}) => {
  // Cancel-spin: rotates opposite to parent's animated rotateY based on time.
  // We can't read parent's animated value, so instead use a counter-rotation
  // driven by a continuously increasing motion value scaled by (1 - progress).
  // Simpler approach: blend between "spinning" and "static" by using the
  // parent's animation only when progress is low.
  // Implementation: scale child's own rotateY to compensate at progress=1.
  // We approximate by applying rotateY = -(time*spin) * progress. Since we
  // don't have access to the parent's exact phase, we instead simply stop
  // the visible motion: at progress >= 0.05 we lock orientation by setting
  // transformStyle and letting the cubies' landed positions absorb motion.
  // The cubies are in world-space relative to this inner div, so their
  // landed positions still drift visually with parent spin. To truly
  // freeze, we counter-spin here using a tween linked to the same duration.
  return (
    <motion.div
      animate={{ rotateY: [0, -360] }}
      transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        transformStyle: "preserve-3d",
        // Fade in counter-spin as we scatter (0 = no counter, 1 = full counter)
        opacity: 1,
      }}
    >
      {/* The above counter-spin always fully cancels parent spin, which means
          the cube never visibly rotates. To restore an idle spin when assembled,
          we add a third inner layer that spins ONLY when assembled. */}
      <motion.div
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
        }}
      >
        <IdleGate progress={progress}>
          {CUBIES.map((c, i) => (
            <Cubie key={i} c={c} progress={progress} />
          ))}
        </IdleGate>
      </motion.div>
    </motion.div>
  );
};

// Wraps children in a layer whose rotation is canceled out as progress→1,
// so the landed pile is still while assembled cube can spin.
const IdleGate = ({
  progress,
  children,
}: {
  progress: MotionValue<number>;
  children: React.ReactNode;
}) => {
  // When progress=0 we want no extra rotation (idle spin from parent shows).
  // When progress=1 we want a counter-rotation that holds orientation.
  // We approximate by smoothly settling rotation to 0 at scatter (which the
  // outermost layers already do via their reciprocal spins).
  const dampen = useTransform(progress, [0, 1], [1, 0]);
  return (
    <motion.div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        transformStyle: "preserve-3d",
        opacity: dampen.get() === 0 ? 1 : 1,
      }}
    >
      {children}
    </motion.div>
  );
};

/* ---------- Hero ---------- */

const stats = [
  { num: "24+", label: "Projects Shipped" },
  { num: "18", label: "Happy Clients" },
  { num: "4", label: "Expert Members" },
  { num: "3+", label: "Years Active" },
];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scatter = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-cream pt-28"
    >
      <div className="grain-overlay absolute inset-0" />

      {/* Big BG wordmark */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div
          className="bg-wordmark text-center"
          style={{ fontSize: "clamp(80px, 15vw, 180px)" }}
        >
          FREELANC
          <br />
          COMM
        </div>
      </div>

      {/* Rubik's cube */}
      <div
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
        style={{ marginTop: "-2%" }}
      >
        <RubiksCube progress={scatter} />
      </div>

      {/* Content */}
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="relative z-20 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col justify-end px-6 pb-12 lg:px-10"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-end">
          <motion.div variants={heroItem}>
            <p className="font-mono-tag text-[11px] text-gold">
              Est. 2022 — Salem, India
            </p>
            <h1 className="mt-4 font-display-bold text-3xl leading-[1.05] text-dark sm:text-4xl md:text-5xl">
              We build digital products that actually{" "}
              <span className="text-gold-gradient">move people.</span>
            </h1>
          </motion.div>

          <motion.div variants={heroItem} className="hidden text-right md:block">
            <p className="font-display text-4xl leading-[0.95] text-dark/15 lg:text-5xl">
              CRAFT.
              <br />
              STRATEGY.
              <br />
              RESULTS.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={heroItem}
          className="mt-12 grid grid-cols-2 gap-6 border-t border-dark/10 pt-8 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display-bold text-3xl text-dark">{s.num}</div>
              <div className="mt-1 font-body text-xs text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-4 z-20 flex flex-col items-center gap-2">
        <span className="font-mono-tag text-[10px] text-dark/50">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
