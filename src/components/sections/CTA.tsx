import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Instagram } from "lucide-react";
import { revealContainer, revealItem } from "@/lib/motion";
import kishoreImg from "@/assets/kishore.jpg";
import barathImg from "@/assets/barath.jpg";
import adityaImg from "@/assets/aditya.jpg";

const EMAIL = "freelancecomm9@gmail.com";

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .15 5.34.15 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.55 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.6h-.01a9.7 9.7 0 0 1-4.95-1.36l-.36-.21-3.74.98 1-3.65-.23-.37a9.7 9.7 0 0 1-1.49-5.18c0-5.36 4.36-9.72 9.72-9.72 2.6 0 5.04 1.01 6.88 2.85a9.66 9.66 0 0 1 2.85 6.88c0 5.36-4.36 9.72-9.72 9.72Zm5.34-7.28c-.29-.15-1.73-.86-2-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.14-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.45-.86-.77-1.45-1.71-1.62-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.18-.24-.57-.49-.5-.66-.51l-.57-.01a1.1 1.1 0 0 0-.8.37c-.27.29-1.05 1.03-1.05 2.51s1.07 2.91 1.22 3.11c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.73-.71 1.98-1.39.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.56-.34Z" />
  </svg>
);

const WA_MESSAGE = encodeURIComponent("Hi, I'd like to discuss a project with your team.");

const channels = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: <Mail className="h-5 w-5" />,
  },
  {
    label: "Instagram",
    value: "@freelancecomm.in",
    href: "https://www.instagram.com/freelancecomm.in/",
    icon: <Instagram className="h-5 w-5" />,
  },
];

const whatsappLeads = [
  {
    name: "Aditya",
    role: "Project Manager",
    value: "+91 99403 98918",
    href: `https://wa.me/919940398918?text=${WA_MESSAGE}`,
    photo: adityaImg,
  },
  {
    name: "Barath",
    role: "Lead Developer",
    value: "+91 90430 57100",
    href: `https://wa.me/919043057100?text=${WA_MESSAGE}`,
    photo: barathImg,
  },
  {
    name: "Kishore",
    role: "Lead Developer",
    value: "+91 63811 79497",
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
        on your <span className="text-gold-gradient">channel.</span>
      </motion.h2>
      <motion.p variants={revealItem} className="mx-auto mt-8 max-w-xl font-body text-lg text-muted-foreground lg:text-xl">
        Pick whatever feels easiest. We reply within 24 hours.
      </motion.p>

      <motion.a
        variants={revealItem}
        href={`mailto:${EMAIL}`}
        data-cursor-hover
        className="mt-8 inline-flex items-center gap-3 font-mono text-sm text-dark hover:text-gold-deep sm:text-base"
      >
        <Mail className="h-4 w-4 text-gold" />
        {EMAIL}
      </motion.a>

      <motion.div
        variants={revealItem}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            data-cursor-hover
            className="group flex flex-col items-start gap-3 bg-cream p-6 text-left transition-all duration-300 hover:-translate-y-1"
            style={{
              border: "1px solid hsl(var(--dark) / 0.12)",
              boxShadow:
                "0 10px 24px -16px hsl(var(--dark) / 0.35), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
            }}
          >
            <span
              className="flex h-11 w-11 items-center justify-center bg-gold/15 text-gold-deep transition-colors group-hover:bg-gold/25"
              style={{
                border: "1px solid hsl(var(--gold) / 0.8)",
              }}
            >
              {c.icon}
            </span>
            <div className="min-w-0">
              <div className="font-mono-tag text-[10px] tracking-[0.25em] text-dark/55">
                {c.label}
              </div>
              <div className="mt-1 break-words font-display-bold text-base text-dark transition-colors group-hover:text-gold-deep">
                {c.value}
              </div>
            </div>
          </a>
        ))}
      </motion.div>

      {/* WhatsApp Enquiry Banner */}
      <motion.div variants={revealItem} className="mt-10">
        <div
          className="relative overflow-hidden bg-cream"
          style={{
            border: "1px solid rgba(37,211,102,0.2)",
            boxShadow:
              "0 16px 40px -20px rgba(37,211,102,0.15), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
          }}
        >
          {/* Subtle green gradient glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(37,211,102,0.25) 0%, transparent 70%)",
            }}
          />

          {/* Top section — headline + stacked avatars */}
          <div className="relative flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left sm:p-10">
            {/* Stacked team avatars */}
            <div className="relative flex items-center flex-shrink-0">
              {[adityaImg, barathImg, kishoreImg].map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt="Team member"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-cream"
                  style={{ marginLeft: i > 0 ? "-12px" : "0", zIndex: 3 - i }}
                />
              ))}
              <span
                className="ml-[-12px] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white ring-2 ring-cream"
                style={{ zIndex: 0 }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .15 5.34.15 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.55 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.6h-.01a9.7 9.7 0 0 1-4.95-1.36l-.36-.21-3.74.98 1-3.65-.23-.37a9.7 9.7 0 0 1-1.49-5.18c0-5.36 4.36-9.72 9.72-9.72 2.6 0 5.04 1.01 6.88 2.85a9.66 9.66 0 0 1 2.85 6.88c0 5.36-4.36 9.72-9.72 9.72Zm5.34-7.28c-.29-.15-1.73-.86-2-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.14-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.45-.86-.77-1.45-1.71-1.62-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.18-.24-.57-.49-.5-.66-.51l-.57-.01a1.1 1.1 0 0 0-.8.37c-.27.29-1.05 1.03-1.05 2.51s1.07 2.91 1.22 3.11c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.73-.71 1.98-1.39.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.56-.34Z" />
                </svg>
              </span>
            </div>

            {/* Text */}
            <div className="relative min-w-0 flex-1">
              <div className="font-mono-tag text-[10px] tracking-[0.25em] text-dark/45">
                QUICK ENQUIRY VIA WHATSAPP
              </div>
              <div className="mt-1.5 font-display-bold text-xl text-dark sm:text-2xl">
                Have a project in mind?
              </div>
              <p className="mt-2 font-body text-sm text-dark/60 sm:text-base">
                Drop a message to any of our team leads — we typically respond within a few hours.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-8 border-t border-[#25D366]/15 sm:mx-10" />

          {/* Individual contact cards */}
          <div className="grid grid-cols-1 gap-0 divide-y divide-[#25D366]/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {whatsappLeads.map((w) => (
              <a
                key={w.name}
                href={w.href}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="group flex items-center gap-3.5 px-8 py-5 transition-colors hover:bg-[#25D366]/5 sm:px-6 sm:py-6 sm:flex-col sm:items-center sm:text-center sm:gap-2.5"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={w.photo}
                    alt={w.name}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-[#25D366]/30 transition-all duration-300 group-hover:ring-[#25D366] sm:h-14 sm:w-14"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#25D366] text-white sm:h-5 sm:w-5">
                    <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 sm:h-3 sm:w-3" fill="currentColor" aria-hidden>
                      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .15 5.34.15 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.55 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44Z" />
                    </svg>
                  </span>
                </div>
                <div className="min-w-0 flex-1 sm:flex-none">
                  <div className="font-display-bold text-base text-dark transition-colors group-hover:text-[#128C7E]">
                    {w.name}
                  </div>
                  <div className="font-mono-tag text-[9px] tracking-[0.2em] text-dark/40">
                    {w.role.toUpperCase()}
                  </div>
                </div>
                <span className="font-body text-xs text-[#25D366] opacity-60 transition-opacity group-hover:opacity-100 sm:mt-1">
                  Send a Message →
                </span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  </section>
  );
};

export default Contact;
