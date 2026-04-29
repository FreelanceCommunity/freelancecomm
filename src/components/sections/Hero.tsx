import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { heroContainer, heroItem } from "@/lib/motion";
import NeuralNetwork from "@/components/NeuralNetwork";

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

export const RubiksCube = ({
  progress,
  size = 520,
}: {
  progress: MotionValue<number>;
  size?: number;
}) => {
  // Static isometric framing — no idle spin. Guarantees the dropped pile
  // sits perfectly still on the surface.
  return (
    <div
      style={{
        perspective: 1400,
        width: size,
        height: size,
        filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.35))",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: "rotateX(-24deg) rotateY(-32deg)",
        }}
      >
        {CUBIES.map((c, i) => (
          <Cubie key={i} c={c} progress={progress} />
        ))}
      </div>
    </div>
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

  // Parallax for the neural network panel
  const neuralScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const neuralY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const neuralX = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const neuralRotate = useTransform(scrollYProgress, [0, 1], [0, -2.5]);
  const neuralOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.85, 0.55]);

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

      {/* Content */}
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="relative z-20 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col justify-end px-6 pb-12 lg:px-10"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          {/* Left column: heading + stacked CRAFT/STRATEGY/RESULTS */}
          <motion.div variants={heroItem} className="md:col-span-7">
            <p className="font-mono-tag text-[13px] text-gold sm:text-sm">
              Est. 2022 — Salem, India
            </p>
            <h1 className="mt-5 font-display-bold text-[2.75rem] leading-[1.02] text-dark sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              We build digital products that actually{" "}
              <span className="text-gold-gradient">move people.</span>
            </h1>

            <p className="mt-8 font-display text-4xl leading-[0.95] text-dark/15 sm:text-5xl lg:text-6xl">
              CRAFT.&nbsp;&nbsp;STRATEGY.&nbsp;&nbsp;RESULTS.
            </p>
          </motion.div>

          {/* Right column: live neural network */}
          <motion.div
            variants={heroItem}
            className="md:col-span-5"
          >
            <div className="aspect-square w-full md:aspect-[4/5] lg:aspect-square">
              <NeuralNetwork />
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={heroItem}
          className="mt-14 grid grid-cols-2 gap-6 border-t border-dark/10 pt-10 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display-bold text-4xl text-dark sm:text-5xl">{s.num}</div>
              <div className="mt-2 font-body text-sm text-muted-foreground sm:text-base">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-4 z-20 flex flex-col items-center gap-2">
        <span className="font-mono-tag text-xs text-dark/50">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
