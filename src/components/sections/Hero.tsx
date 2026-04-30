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
      className="relative min-h-screen overflow-hidden bg-cream pt-28"
    >
      <div className="grain-overlay absolute inset-0" />

      {/* Decorative dotted grid (top-left of text column) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 top-1/2 hidden h-32 w-32 -translate-y-8 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--gold) / 0.45) 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* Decorative arc behind the dashboard */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[14%] hidden h-[640px] w-[640px] rounded-full border border-gold/30 lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-4%] top-[26%] hidden h-[420px] w-[420px] rounded-full border border-dashed border-gold/25 lg:block"
      />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="relative z-20 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-16 md:grid-cols-12 lg:px-10"
      >
        {/* LEFT — text column */}
        <div className="md:col-span-6 lg:col-span-6">
          {/* Eyebrow with rule */}
          <motion.div
            variants={heroItem}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gold" />
            <p className="font-mono-tag text-[12px] tracking-[0.28em] text-gold sm:text-[13px]">
              Est. 2022 · Salem, IN
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={heroItem}
            className="mt-7 font-display-bold uppercase leading-[0.92] text-dark"
            style={{ fontSize: "clamp(2.75rem, 7.2vw, 6.25rem)" }}
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
            className="mt-7 max-w-xl font-body text-base leading-relaxed text-dark/70 sm:text-lg"
          >
            From idea to production — we design, develop, and launch
            high-performance digital products for startups and businesses.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={heroItem}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-deep px-7 py-4 font-body text-base font-medium text-dark shadow-[0_18px_40px_-12px_hsl(var(--gold)/0.6)] transition-transform hover:-translate-y-0.5"
            >
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-dark/25 px-7 py-4 font-body text-base font-medium text-dark transition-colors hover:border-gold hover:text-gold"
            >
              View Our Work
            </a>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            variants={heroItem}
            className="mt-10 flex flex-wrap items-center gap-10"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Users className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display-bold text-2xl text-dark">50+</div>
                <div className="font-body text-sm text-dark/60">Happy Clients</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Star className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display-bold text-2xl text-dark">5.0</div>
                <div className="font-body text-sm text-dark/60">Clutch Rating</div>
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
          }}
        >
          <div className="relative">
            {/* Soft glow behind */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-gold/20 via-transparent to-transparent blur-2xl"
            />
            <img
              src={heroDashboard}
              alt="FreelancComm analytics dashboard preview showing project performance, revenue, and client satisfaction metrics"
              className="w-full rounded-[1.25rem] shadow-[0_40px_80px_-30px_rgba(20,20,20,0.35)] ring-1 ring-dark/10"
              loading="eager"
            />

            {/* Floating card — bottom-left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="absolute -bottom-8 -left-6 hidden w-[260px] rounded-2xl bg-cream p-4 shadow-xl ring-1 ring-dark/10 sm:flex sm:items-center sm:gap-3"
            >
              <div className="relative h-14 w-14 shrink-0">
                <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
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
                <span className="absolute inset-0 flex items-center justify-center font-display-bold text-sm text-dark">
                  85%
                </span>
              </div>
              <div>
                <div className="font-display-bold text-sm text-dark">
                  ProjectAce Platform
                </div>
                <div className="font-body text-xs text-dark/60">
                  Phase 3 · Development
                </div>
              </div>
            </motion.div>

            {/* Floating card — bottom-right (Revenue Growth) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.7 }}
              className="absolute -bottom-10 -right-4 hidden w-[230px] rounded-2xl bg-dark p-4 text-cream shadow-xl ring-1 ring-dark/30 sm:block"
            >
              <div className="flex items-center justify-between">
                <span className="font-body text-xs text-cream/70">
                  Revenue Growth
                </span>
                <span className="font-mono-tag text-[10px] text-cream/50">
                  This Year
                </span>
              </div>
              <div className="mt-1 font-display-bold text-2xl">₹ 24.8L</div>
              <div className="mt-0.5 font-body text-[11px] text-gold-light">
                ↑ 18% vs last year
              </div>
              <svg viewBox="0 0 200 50" className="mt-2 h-10 w-full">
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
      <div className="absolute bottom-8 left-6 z-20 hidden items-center gap-3 lg:left-10 lg:flex">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 text-gold">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 2v8M2 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="font-mono-tag text-[11px] tracking-[0.28em] text-dark/60">
          Scroll to Explore
        </span>
      </div>
    </section>
  );
};

export default Hero;
