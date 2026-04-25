import { motion } from "framer-motion";
import { heroContainer, heroItem } from "@/lib/motion";

const FloatingShape = () => (
  <motion.div
    animate={{ y: [0, -18, 0], rotate: [0, 3, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    className="relative"
    style={{ width: 320, height: 320, filter: "drop-shadow(0 24px 60px hsl(var(--gold) / 0.25))" }}
  >
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <defs>
        <linearGradient id="goldFace" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2C97E" />
          <stop offset="50%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#7A5E1A" />
        </linearGradient>
        <linearGradient id="darkFace" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>
        <linearGradient id="midFace" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7A5E1A" />
          <stop offset="100%" stopColor="#C9A84C" />
        </linearGradient>
      </defs>
      {/* Icosahedron-ish faceted shape */}
      <polygon points="100,15 175,60 145,140" fill="url(#goldFace)" />
      <polygon points="100,15 145,140 55,140" fill="url(#midFace)" />
      <polygon points="100,15 55,140 25,60" fill="url(#goldFace)" opacity="0.85" />
      <polygon points="25,60 175,60 100,15" fill="url(#darkFace)" opacity="0.75" />
      <polygon points="55,140 145,140 100,185" fill="url(#darkFace)" />
      <polygon points="25,60 55,140 100,185" fill="url(#midFace)" opacity="0.6" />
      <polygon points="175,60 145,140 100,185" fill="url(#goldFace)" opacity="0.7" />
    </svg>
  </motion.div>
);

const stats = [
  { num: "24+", label: "Projects Shipped" },
  { num: "18", label: "Happy Clients" },
  { num: "4", label: "Expert Members" },
  { num: "3+", label: "Years Active" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-cream pt-28">
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

      {/* Floating shape */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center" style={{ marginTop: "-2%" }}>
        <FloatingShape />
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
            <p className="font-mono-tag text-[11px] text-gold">Est. 2022 — Salem, India</p>
            <h1 className="mt-4 font-display-bold text-3xl leading-[1.05] text-dark sm:text-4xl md:text-5xl">
              We build digital products that actually <span className="text-gold-gradient">move people.</span>
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
              <div className="mt-1 font-body text-xs text-muted-foreground">{s.label}</div>
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
