import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { heroContainer, heroItem } from "@/lib/motion";

/* ---------- Rubik's Cube ---------- */
/* A 3x3x3 cube made of 27 cubies. On scroll, each cubie animates to a
   scattered position. Scrolling back reverses the animation. */

const FACE_COLORS: Record<string, string> = {
  // Classic Rubik's palette but tuned to feel premium (slightly muted)
  R: "#C9304A", // right  - red
  L: "#E58E26", // left   - orange
  U: "#F5F2EC", // up     - cream/white
  D: "#E2C97E", // down   - gold
  F: "#1F8A4C", // front  - green
  B: "#1F4FAA", // back   - blue
};

type Cubie = {
  x: -1 | 0 | 1;
  y: -1 | 0 | 1;
  z: -1 | 0 | 1;
  // scatter offsets (px-ish in 3D space)
  sx: number;
  sy: number;
  sz: number;
  rx: number;
  ry: number;
  rz: number;
};

const seed = (i: number) => {
  // deterministic pseudo-random
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const buildCubies = (): Cubie[] => {
  const arr: Cubie[] = [];
  let i = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const r1 = seed(i + 1);
        const r2 = seed(i + 2);
        const r3 = seed(i + 3);
        const r4 = seed(i + 4);
        const r5 = seed(i + 5);
        const r6 = seed(i + 6);
        // scatter outward + random offset
        const dirX = x === 0 ? (r1 - 0.5) * 2 : x;
        const dirY = y === 0 ? (r2 - 0.5) * 2 : y;
        const dirZ = z === 0 ? (r3 - 0.5) * 2 : z;
        arr.push({
          x: x as -1 | 0 | 1,
          y: y as -1 | 0 | 1,
          z: z as -1 | 0 | 1,
          sx: dirX * (180 + r4 * 220),
          sy: dirY * (180 + r5 * 220),
          sz: dirZ * (140 + r6 * 180),
          rx: (r4 - 0.5) * 360,
          ry: (r5 - 0.5) * 360,
          rz: (r6 - 0.5) * 360,
        });
        i++;
      }
    }
  }
  return arr;
};

const CUBIES = buildCubies();
const CUBIE = 56; // px
const GAP = 4;
const STEP = CUBIE + GAP;

const Cubie = ({ c, progress }: { c: Cubie; progress: MotionValue<number> }) => {
  const baseX = c.x * STEP;
  const baseY = c.y * STEP;
  const baseZ = c.z * STEP;

  const tx = useTransform(progress, [0, 1], [baseX, baseX + c.sx]);
  const ty = useTransform(progress, [0, 1], [baseY, baseY + c.sy]);
  const tz = useTransform(progress, [0, 1], [baseZ, baseZ + c.sz]);
  const rx = useTransform(progress, [0, 1], [0, c.rx]);
  const ry = useTransform(progress, [0, 1], [0, c.ry]);
  const rz = useTransform(progress, [0, 1], [0, c.rz]);

  // Compose transform string
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
      {/* Front (z = 1) */}
      <div
        style={{
          ...faceStyle,
          background: c.z === 1 ? FACE_COLORS.F : "#0E0E0E",
          transform: `translateZ(${half}px)`,
        }}
      />
      {/* Back (z = -1) */}
      <div
        style={{
          ...faceStyle,
          background: c.z === -1 ? FACE_COLORS.B : "#0E0E0E",
          transform: `translateZ(-${half}px) rotateY(180deg)`,
        }}
      />
      {/* Right (x = 1) */}
      <div
        style={{
          ...faceStyle,
          background: c.x === 1 ? FACE_COLORS.R : "#0E0E0E",
          transform: `rotateY(90deg) translateZ(${half}px)`,
        }}
      />
      {/* Left (x = -1) */}
      <div
        style={{
          ...faceStyle,
          background: c.x === -1 ? FACE_COLORS.L : "#0E0E0E",
          transform: `rotateY(-90deg) translateZ(${half}px)`,
        }}
      />
      {/* Top (y = -1 in screen, since Y down) */}
      <div
        style={{
          ...faceStyle,
          background: c.y === -1 ? FACE_COLORS.U : "#0E0E0E",
          transform: `rotateX(90deg) translateZ(${half}px)`,
        }}
      />
      {/* Bottom (y = 1) */}
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
  // Slow idle rotation but no vertical bobbing
  return (
    <div
      style={{
        perspective: 1400,
        width: 360,
        height: 360,
        filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.35))",
      }}
    >
      <motion.div
        animate={{ rotateX: [-22, -22], rotateY: [-30, 330] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {CUBIES.map((c, i) => (
          <Cubie key={i} c={c} progress={progress} />
        ))}
      </motion.div>
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
  // Map 0→1 across the hero scroll. Reversing scroll naturally rewinds.
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

        {/* Stats */}
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

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-4 z-20 flex flex-col items-center gap-2">
        <span className="font-mono-tag text-[10px] text-dark/50">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
