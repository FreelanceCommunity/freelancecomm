import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Rocket,
  Clock,
  Smile,
  MapPin,
  Users,
  Quote,
  Linkedin,
  Dribbble,
} from "lucide-react";
import { revealContainer, revealItem, easePremium } from "@/lib/motion";
import teamGroup from "@/assets/team-group.png";
import adityaPhoto from "@/assets/aditya.jpg";
import barathPhoto from "@/assets/barath.jpg";
import dhanushPhoto from "@/assets/dhanush.jpg";
import jaisuryaPhoto from "@/assets/jaisurya.jpg";
import kishorePhoto from "@/assets/kishore.jpg";
import madhanPhoto from "@/assets/madhan.jpg";
import maniPhoto from "@/assets/mani.jpg";
import manojPhoto from "@/assets/manoj.jpg";

const team = [
  {
    name: "Aditya",
    role: "Researcher",
    line: "Strong English, driven by space and auto mechanics.",
    quote:
      "I love researching complex systems and\nturning technical ideas into clear insights.",
    accent: "#4AA3A3",
    image: adityaPhoto,
  },
  {
    name: "Barath",
    role: "Software Developer",
    line: "Cross-platform apps with seamless UX.",
    quote:
      "React Native specialist focused on\nreliability, speed, and smooth interaction.",
    accent: "#7777DD",
    image: barathPhoto,
  },
  {
    name: "Dhanush Kumar",
    role: "UI and Web Developer",
    line: "Polished UI and full-stack execution.",
    quote:
      "I blend UI/UX craft with full-stack\nbuilds for functional, beautiful products.",
    accent: "#D07A2C",
    image: dhanushPhoto,
  },
  {
    name: "Jaisurya",
    role: "3D Designer",
    line: "Crafting 3D models, animation, and video content.",
    quote:
      "From modeling to post, I deliver\nvisuals that feel cinematic and precise.",
    accent: "#6BA83A",
    image: jaisuryaPhoto,
  },
  {
    name: "Kishore",
    role: "Software Developer",
    line: "Building responsive, user-friendly web experiences.",
    quote:
      "Full-stack builder focused on performance,\ncompatibility, and clean UX across devices.",
    accent: "#C9A84C",
    image: kishorePhoto,
  },
  {
    name: "Madhan Raj",
    role: "IoT Developer",
    line: "Innovative IoT systems across hardware and software.",
    quote:
      "I bring ideas to life with end-to-end\nIoT builds that are practical and reliable.",
    accent: "#C93A5A",
    image: madhanPhoto,
  },
  {
    name: "Manikandan",
    role: "Hardware Developer",
    line: "Smart systems, automation, and optimized IoT solutions.",
    quote:
      "From sensors to systems, I design\nrobust hardware that scales with ideas.",
    accent: "#3F8B6B",
    image: maniPhoto,
  },
  {
    name: "Manoj",
    role: "Data Scientist",
    line: "Connecting products to the right audiences.",
    quote:
      "Strategy plus structure: I use data\nmodels to guide smart, measurable decisions.",
    accent: "#8A6FD1",
    image: manojPhoto,
  },
];

const stats = [
  { icon: Rocket, value: "50+", label: "Projects Delivered" },
  { icon: Clock, value: "98%", label: "On-Time Delivery" },
  { icon: Smile, value: "30+", label: "Happy Clients" },
  { icon: MapPin, value: "Chennai, IN", label: "Our Home Base" },
];

const About = () => {
  const [page, setPage] = useState(0);
  const total = team.length;
  const m = team[page];
  
  // Parallax for the section
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const statsY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={sectionRef} className="bg-dark py-24 lg:py-32 overflow-hidden">
      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-7xl px-6 lg:px-10"
      >
        {/* Hero image with text overlay */}
        <motion.div variants={revealItem} className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/2] md:aspect-[16/9] lg:aspect-[16/9]">
            <motion.img
              src={teamGroup}
              alt="The freelancecomm team together in Chennai"
              className="h-full w-full object-cover"
              style={{
                y: imageY,
                objectPosition: "center 20%",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)",
              }}
            />
            {/* Edge fades into section bg */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1/3"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(var(--dark)) 0%, transparent 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
              style={{
                background:
                  "linear-gradient(to top, hsl(var(--dark)) 0%, transparent 100%)",
              }}
            />
            {/* Left-side dark gradient for text legibility */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-full md:w-2/3"
              style={{
                background:
                  "linear-gradient(to right, hsl(var(--dark) / 0.92) 0%, hsl(var(--dark) / 0.7) 35%, transparent 75%)",
              }}
            />

            {/* Text inside image */}
            <div className="absolute inset-0 flex items-center">
              <motion.div 
                className="w-full px-6 sm:px-10 lg:px-14"
                style={{ y: textY }}
              >
                <div className="max-w-xl">
                  <p className="font-mono-tag text-sm text-gold">// About Us</p>
                  <h2
                    className="mt-4 font-display leading-[1.02] text-cream"
                    style={{ fontSize: "clamp(1.85rem, 4.5vw, 4rem)" }}
                  >
                    A crew of{" "}
                    <span className="text-gold-gradient">obsessive</span>{" "}
                    builders.
                  </h2>
                  <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-cream/80 sm:mt-6 sm:text-base lg:text-lg">
                    We're a tight-knit freelance collective from Chennai, India.
                    No bloat, no middlemen — just a focused team that obsesses
                    over craft, ships fast, and delivers work you're proud to
                    show.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Floating Collective badge — bottom right */}
            <motion.div
              className="absolute bottom-3 right-3 bg-darkcard/85 px-3 py-2 backdrop-blur-md sm:bottom-6 sm:right-6 sm:px-4 sm:py-3"
              style={{
                y: badgeY,
                borderLeft: "2px solid hsl(var(--gold))",
                borderBottom: "2px solid hsl(var(--gold))",
              }}
            >
              <div className="flex items-center gap-1.5 font-display-bold text-[11px] text-gold sm:gap-2 sm:text-sm">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                Collective
              </div>
              <div className="mt-0.5 font-body text-[10px] text-cream/85 sm:mt-1 sm:text-xs">
                8 Core Members
              </div>
              <div className="hidden font-body text-[10px] text-cream/55 sm:block sm:text-xs">
                Network of Specialists
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats row — single rounded card with dividers */}
        <motion.div
          variants={revealItem}
          style={{ y: statsY }}
          className="mt-12 overflow-hidden rounded-2xl bg-darkcard ring-1 ring-cream/10"
        >
          <div className="grid grid-cols-2 divide-cream/10 sm:grid-cols-4 sm:divide-x">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex items-center gap-4 p-6 lg:p-7"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-2 ring-gold text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display-bold text-2xl text-cream lg:text-[1.6rem]">
                      {s.value}
                    </div>
                    <div className="mt-0.5 font-body text-sm text-cream/60">
                      {s.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Slidable profile card */}
        <motion.div variants={revealItem} className="mt-8">
          <div className="overflow-hidden rounded-2xl bg-darkcard ring-1 ring-cream/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: easePremium }}
                className="grid grid-cols-1 items-center gap-6 p-6 lg:grid-cols-12 lg:gap-10 lg:p-10"
              >
                {/* Photo */}
                <div className="lg:col-span-3">
                  <div
                    className="relative flex aspect-square w-full items-center justify-center overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${m.accent}, ${m.accent}55)`,
                    }}
                  >
                    <img
                      src={m.image}
                      alt={`${m.name} portrait`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Name + role + line + socials */}
                <div className="lg:col-span-5">
                  <h3 className="font-display-bold text-3xl text-cream lg:text-4xl">
                    {m.name}
                  </h3>
                  <div className="mt-2 inline-block border-b-2 border-gold pb-1 font-display-bold text-base text-gold">
                    {m.role}
                  </div>
                  <p className="mt-6 font-body text-lg text-cream/85">
                    {m.line}
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    {[Linkedin, Dribbble].map((Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        data-cursor-hover
                        className="flex h-9 w-9 items-center justify-center text-gold ring-1 ring-gold/60 transition-colors hover:bg-gold/10"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                    <a
                      href="#"
                      data-cursor-hover
                      className="flex h-9 w-9 items-center justify-center font-display-bold text-xs text-gold ring-1 ring-gold/60 transition-colors hover:bg-gold/10"
                    >
                      Bē
                    </a>
                  </div>
                </div>

                {/* Quote + signature */}
                <div className="border-cream/10 lg:col-span-4 lg:border-l lg:pl-10">
                  <Quote className="h-6 w-6 text-gold" />
                  <p className="mt-3 whitespace-pre-line font-body text-base leading-relaxed text-cream/85">
                    {m.quote}
                  </p>
                  <p
                    className="mt-5 text-2xl text-gold"
                    style={{ fontFamily: "'Caveat', 'Brush Script MT', cursive" }}
                  >
                    {m.name}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider controls */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p) => (p - 1 + total) % total)}
              data-cursor-hover
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full text-cream ring-1 ring-cream/20 transition-colors hover:bg-cream/5"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {team.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  data-cursor-hover
                  aria-label={`Go to profile ${i + 1}`}
                  className={`h-[2px] transition-all ${
                    i === page ? "w-8 bg-gold" : "w-4 bg-cream/25 hover:bg-cream/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setPage((p) => (p + 1) % total)}
              data-cursor-hover
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-dark transition-colors hover:bg-gold-deep"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
