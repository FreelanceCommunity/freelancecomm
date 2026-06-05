import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { revealContainer, revealItem } from "@/lib/motion";
import kishoreImg from "@/assets/kishore.jpg";
import barathImg from "@/assets/barath.jpg";
import adityaImg from "@/assets/aditya.jpg";

const WA_MESSAGE = encodeURIComponent("Hi, I'd like to discuss a project with your team.");

const whatsappLeads = [
  {
    name: "Aditya",
    role: "Project Manager",
    href: `https://wa.me/919940398918?text=${WA_MESSAGE}`,
    photo: adityaImg,
  },
  {
    name: "Barath",
    role: "Lead Developer",
    href: `https://wa.me/919043057100?text=${WA_MESSAGE}`,
    photo: barathImg,
  },
  {
    name: "Kishore",
    role: "Lead Developer",
    href: `https://wa.me/916381179497?text=${WA_MESSAGE}`,
    photo: kishoreImg,
  },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const wordmarkY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const wordmarkScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  
  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden bg-cream py-20 sm:py-28 lg:py-40">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "min(600px, 90vw)",
          height: "min(600px, 90vw)",
          background: "radial-gradient(circle, hsl(var(--gold) / 0.10) 0%, transparent 70%)",
          scale: glowScale,
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-center overflow-hidden sm:top-8">
        <motion.div 
          className="bg-wordmark" 
          style={{ 
            fontSize: "clamp(60px, 14vw, 180px)",
            y: wordmarkY,
            scale: wordmarkScale,
          }}
        >
          CONTACT
        </motion.div>
      </div>

    <motion.div
      variants={revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-10"
    >
      <motion.p variants={revealItem} className="font-mono-tag text-sm text-gold">
        // Contact Us
      </motion.p>
      <motion.h2
        variants={revealItem}
        className="mt-6 font-display leading-[1.05] text-dark"
        style={{ fontSize: "clamp(2rem, 6vw, 4.75rem)" }}
      >
        Let's talk —
        <br />
        on <span className="text-gold-gradient">WhatsApp.</span>
      </motion.h2>
      <motion.p variants={revealItem} className="mx-auto mt-6 max-w-xl font-body text-base text-muted-foreground lg:text-lg">
        Drop a message to any of our team leads — we typically respond within a few hours.
      </motion.p>

      {/* WhatsApp Leads Grid */}
      <motion.div
        variants={revealItem}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {whatsappLeads.map((w) => (
          <a
            key={w.name}
            href={w.href}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="group flex flex-col items-center justify-between text-center bg-cream p-6 transition-all duration-300 hover:-translate-y-1"
            style={{
              border: "1px solid rgba(37,211,102,0.2)",
              boxShadow:
                "0 12px 30px -15px rgba(37,211,102,0.12), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
            }}
          >
            <div className="relative flex-shrink-0">
              <img
                src={w.photo}
                alt={w.name}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-[#25D366]/30 transition-all duration-300 group-hover:ring-[#25D366]"
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#25D366] text-white">
                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="currentColor" aria-hidden>
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .15 5.34.15 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.55 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44Z" />
                </svg>
              </span>
            </div>
            <div className="mt-4 min-w-0">
              <div className="font-display-bold text-base text-dark transition-colors group-hover:text-[#128C7E]">
                {w.name}
              </div>
              <div className="mt-0.5 font-mono-tag text-[9px] tracking-[0.2em] text-dark/40">
                {w.role.toUpperCase()}
              </div>
            </div>
            <span className="mt-4 font-body text-xs text-[#25D366] opacity-60 transition-opacity group-hover:opacity-100">
              Send a Message →
            </span>
          </a>
        ))}
      </motion.div>
    </motion.div>
  </section>
  );
};

export default Contact;
