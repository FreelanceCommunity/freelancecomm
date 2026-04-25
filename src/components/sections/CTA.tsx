import { motion } from "framer-motion";
import { revealContainer, revealItem } from "@/lib/motion";

const CTA = () => (
  <section id="contact" className="relative overflow-hidden bg-cream py-32 lg:py-40">
    {/* radial gold glow */}
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: 600,
        height: 600,
        background: "radial-gradient(circle, hsl(var(--gold) / 0.10) 0%, transparent 70%)",
      }}
    />

    {/* Giant START wordmark */}
    <div className="pointer-events-none absolute inset-x-0 top-8 flex justify-center">
      <div className="bg-wordmark" style={{ fontSize: "clamp(80px, 15vw, 180px)" }}>
        START
      </div>
    </div>

    <motion.div
      variants={revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-10"
    >
      <motion.p variants={revealItem} className="font-mono-tag text-[11px] text-gold">
        // Let's Build
      </motion.p>
      <motion.h2
        variants={revealItem}
        className="mt-6 font-display text-4xl leading-[1.02] text-dark sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Ready to build
        <br />
        something <span className="text-gold-gradient">great?</span>
      </motion.h2>
      <motion.p variants={revealItem} className="mx-auto mt-6 max-w-xl font-body text-base text-muted-foreground lg:text-lg">
        Tell us about your project. We'll get back within 24 hours.
      </motion.p>

      <motion.div variants={revealItem} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="mailto:hello@freelanccomm.in"
          data-cursor-hover
          className="rounded-full bg-gold px-8 py-4 font-display-bold text-base text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light"
        >
          Start a Project →
        </a>
        <a
          href="#projects"
          data-cursor-hover
          className="rounded-full border border-dark/30 px-8 py-4 font-display-bold text-base text-dark transition-all duration-300 hover:bg-dark hover:text-cream"
        >
          View Our Work
        </a>
      </motion.div>

      <motion.p variants={revealItem} className="mt-8 font-mono text-xs text-muted-foreground">
        hello@freelanccomm.in
      </motion.p>
    </motion.div>
  </section>
);

export default CTA;
