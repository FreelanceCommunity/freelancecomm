import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Users, Star } from "lucide-react";
import { heroContainer, heroItem } from "@/lib/motion";
import heroDashboard from "@/assets/hero-dashboard.png";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Subtle parallax on the dashboard image
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [0, -1.5]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.9, 0.7]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[680px] overflow-hidden bg-cream pt-20"
    >
      <div className="grain-overlay absolute inset-0" />

      {/* Decorative dotted grid (top-left of text column) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 top-1/2 hidden h-24 w-24 -translate-y-8 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--gold) / 0.45) 1.25px, transparent 1.25px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Decorative arc behind the dashboard */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[12%] hidden h-[480px] w-[480px] rounded-full border border-gold/30 lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-4%] top-[22%] hidden h-[320px] w-[320px] rounded-full border border-dashed border-gold/25 lg:block"
      />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="relative z-20 mx-auto grid h-[calc(100vh-5rem)] min-h-[600px] max-w-7xl grid-cols-1 items-center gap-8 px-6 pb-10 md:grid-cols-12 lg:px-10"
      >
        {/* LEFT — text column */}
        <div className="md:col-span-6 lg:col-span-6">
          {/* Eyebrow with rule */}
          <motion.div
            variants={heroItem}
            className="flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold" />
            <p className="font-mono-tag text-[11px] tracking-[0.26em] text-gold">
              Est. 2022 · Salem, IN
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={heroItem}
            className="mt-4 font-display-bold uppercase leading-[0.95] text-dark"
            style={{ fontSize: "clamp(2rem, 4.6vw, 4rem)" }}
          >
            We build
            <br />
            <span className="text-gold-gradient">Products</span>
            <br />
            that scale<span className="text-gold">.</span>
          </motion.h1>

          {/* Subcopy */}
          <motion.p
            variants={heroItem}
            className="mt-4 max-w-md font-body text-sm leading-relaxed text-dark/70 sm:text-[15px]"
          >
            From idea to production — we design, develop, and launch
            high-performance digital products for startups and businesses.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={heroItem}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-deep px-5 py-3 font-body text-sm font-medium text-dark shadow-[0_14px_30px_-12px_hsl(var(--gold)/0.6)] transition-transform hover:-translate-y-0.5"
            >
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-dark/25 px-5 py-3 font-body text-sm font-medium text-dark transition-colors hover:border-gold hover:text-gold"
            >
              View Our Work
            </a>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            variants={heroItem}
            className="mt-7 flex flex-wrap items-center gap-8"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Users className="h-4 w-4" />
              </span>
              <div>
                <div className="font-display-bold text-xl text-dark">50+</div>
                <div className="font-body text-xs text-dark/60">Happy Clients</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Star className="h-4 w-4" />
              </span>
              <div>
                <div className="font-display-bold text-xl text-dark">5.0</div>
                <div className="font-body text-xs text-dark/60">Clutch Rating</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — dashboard mockup */}
        <motion.div
          variants={heroItem}
          className="relative md:col-span-6 lg:col-span-6"
          style={{
            y: imgY,
            scale: imgScale,
            rotate: imgRotate,
            opacity: imgOpacity,
            willChange: "transform",
            perspective: 1600,
          }}
        >
          {/* Tilted 3D stage so the dashboard sits at an angle like the reference */}
          <div
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateY(-14deg) rotateX(6deg) rotateZ(-2deg)",
            }}
          >
            {/* Soft glow behind */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-gold/25 via-transparent to-transparent blur-2xl"
            />
            <img
              src={heroDashboard}
              alt="FreelancComm analytics dashboard preview showing project performance, revenue, and client satisfaction metrics"
              className="w-full rounded-[1.25rem] shadow-[0_50px_90px_-30px_rgba(20,20,20,0.45)] ring-1 ring-dark/10"
              loading="eager"
            />

            {/* Floating card — overlapping bottom-left of dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              style={{ transform: "translateZ(60px)" }}
              className="absolute -bottom-5 left-3 hidden w-[200px] items-center gap-2.5 rounded-xl bg-cream p-2.5 shadow-2xl ring-1 ring-dark/10 sm:flex md:left-4"
            >
              <div className="relative h-11 w-11 shrink-0">
                <svg viewBox="0 0 36 36" className="h-11 w-11 -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    stroke="hsl(var(--gold) / 0.2)"
                    strokeWidth="3.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    stroke="hsl(var(--gold))"
                    strokeWidth="3.5"
                    strokeDasharray="97.4"
                    strokeDashoffset="14.6"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-display-bold text-[11px] text-dark">
                  85%
                </span>
              </div>
              <div>
                <div className="font-display-bold text-xs text-dark">
                  ProjectAce Platform
                </div>
                <div className="font-body text-[10px] text-dark/60">
                  Phase 3 · Development
                </div>
              </div>
            </motion.div>

            {/* Floating card — overlapping bottom-right (Revenue Growth) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.7 }}
              style={{ transform: "translateZ(80px)" }}
              className="absolute -bottom-6 right-2 hidden w-[180px] rounded-xl bg-dark p-3 text-cream shadow-2xl ring-1 ring-dark/40 sm:block md:right-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-body text-[10px] text-cream/70">
                  Revenue Growth
                </span>
                <span className="font-mono-tag text-[9px] text-cream/50">
                  This Year
                </span>
              </div>
              <div className="mt-0.5 font-display-bold text-lg">₹ 24.8L</div>
              <div className="mt-0.5 font-body text-[10px] text-gold-light">
                ↑ 18% vs last year
              </div>
              <svg viewBox="0 0 200 50" className="mt-1.5 h-7 w-full">
                <polyline
                  fill="none"
                  stroke="hsl(var(--gold))"
                  strokeWidth="2"
                  points="0,40 20,34 40,36 60,28 80,30 100,22 120,24 140,16 160,18 180,10 200,6"
                />
                <circle cx="200" cy="6" r="3" fill="hsl(var(--gold-light))" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — bottom-left like reference */}
      <div className="absolute bottom-4 left-6 z-20 hidden items-center gap-2.5 lg:left-10 lg:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/50 text-gold">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 2v8M2 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="font-mono-tag text-[10px] tracking-[0.26em] text-dark/60">
          Scroll to Explore
        </span>
      </div>
    </section>
  );
};

export default Hero;
