import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Users, Star } from "lucide-react";
import { heroContainer, heroItem } from "@/lib/motion";
import heroDashboard from "@/assets/hero-dashboard.png";

const WORDMARKS = ["FREELANCER", "DEVELOPER", "DESIGNER"];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % WORDMARKS.length), 2600);
    return () => clearInterval(id);
  }, []);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Subtle parallax on the dashboard image
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.9, 0.7]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[620px] overflow-hidden bg-cream pt-20"
    >
      {/* Radial gold glow — same as Let's Build */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, hsl(var(--gold) / 0.10) 0%, transparent 70%)",
        }}
      />

      {/* Rotating wordmark — same style as CTA's START, smaller & subtle */}
      <div className="pointer-events-none absolute inset-x-0 top-24 flex justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={WORDMARKS[wordIdx]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-wordmark whitespace-nowrap"
            style={{ fontSize: "clamp(60px, 11vw, 160px)" }}
          >
            {WORDMARKS[wordIdx]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grain-overlay absolute inset-0" />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="relative z-20 mx-auto grid h-[calc(100vh-5rem)] min-h-[540px] max-w-7xl grid-cols-1 items-center gap-6 px-6 pb-6 md:grid-cols-12 lg:px-10"
      >
        {/* LEFT — text column (narrower) */}
        <div className="md:col-span-5 lg:col-span-5">
          {/* Eyebrow with rule */}
          <motion.div
            variants={heroItem}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gold" />
            <p className="font-mono-tag text-[11px] tracking-[0.3em] text-gold-deep">
              Est. 2022 · Salem, IN
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={heroItem}
            className="mt-4 font-display-bold uppercase leading-[0.95] tracking-[-0.02em] text-dark"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3.75rem)" }}
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
            className="mt-5 max-w-md font-body text-[15px] leading-[1.7] text-dark/70 sm:text-base"
          >
            From idea to production — we design, develop, and launch
            high-performance digital products for startups and businesses.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={heroItem}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a href="#cta" className="btn-premium group">
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#projects" className="btn-ghost-premium">
              View Our Work
            </a>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            variants={heroItem}
            className="mt-8 flex flex-wrap items-center gap-10"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold-deep ring-1 ring-gold/30">
                <Users className="h-4 w-4" />
              </span>
              <div>
                <div className="font-display-bold text-2xl text-dark">50+</div>
                <div className="font-body text-xs text-dark/60">Happy Clients</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold-deep ring-1 ring-gold/30">
                <Star className="h-4 w-4" />
              </span>
              <div>
                <div className="font-display-bold text-2xl text-dark">5.0</div>
                <div className="font-body text-xs text-dark/60">Clutch Rating</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — dashboard mockup, vertically aligned to "Products" → Let's Talk button range */}
        <motion.div
          variants={heroItem}
          className="relative md:col-span-7 lg:col-span-7"
          style={{ y: imgY, opacity: imgOpacity, perspective: 1600 }}
        >
          <div
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateY(-12deg) rotateX(5deg) rotateZ(-1.5deg)",
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

            {/* Floating card — bottom-left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              style={{ transform: "translateZ(60px)" }}
              className="absolute -bottom-5 left-3 hidden w-[42%] max-w-[220px] min-w-[150px] items-center gap-2 rounded-xl bg-cream p-2 shadow-2xl ring-1 ring-dark/10 sm:flex md:left-4 md:gap-2.5 md:p-2.5"
            >
              <div className="relative h-9 w-9 shrink-0 md:h-11 md:w-11">
                <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--gold) / 0.2)" strokeWidth="3.5" />
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--gold))" strokeWidth="3.5" strokeDasharray="97.4" strokeDashoffset="14.6" strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-display-bold text-[10px] text-dark md:text-[11px]">85%</span>
              </div>
              <div className="min-w-0">
                <div className="truncate font-display-bold text-[11px] text-dark md:text-xs">ProjectAce Platform</div>
                <div className="truncate font-body text-[9px] text-dark/60 md:text-[10px]">Phase 3 · Development</div>
              </div>
            </motion.div>

            {/* Floating card — bottom-right (Revenue) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.7 }}
              style={{ transform: "translateZ(80px)" }}
              className="absolute -bottom-6 right-2 hidden w-[180px] rounded-xl bg-dark p-3 text-cream shadow-2xl ring-1 ring-dark/40 sm:block md:right-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-body text-[10px] text-cream/70">Revenue Growth</span>
                <span className="font-mono-tag text-[9px] text-cream/50">This Year</span>
              </div>
              <div className="mt-0.5 font-display-bold text-lg">₹ 24.8L</div>
              <div className="mt-0.5 font-body text-[10px] text-gold-light">↑ 18% vs last year</div>
              <svg viewBox="0 0 200 50" className="mt-1.5 h-7 w-full">
                <polyline fill="none" stroke="hsl(var(--gold))" strokeWidth="2" points="0,40 20,34 40,36 60,28 80,30 100,22 120,24 140,16 160,18 180,10 200,6" />
                <circle cx="200" cy="6" r="3" fill="hsl(var(--gold-light))" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-6 z-20 hidden items-center gap-2.5 lg:left-10 lg:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/50 text-gold-deep">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="font-mono-tag text-[10px] tracking-[0.3em] text-dark/60">
          Scroll to Explore
        </span>
      </div>
    </section>
  );
};

export default Hero;
