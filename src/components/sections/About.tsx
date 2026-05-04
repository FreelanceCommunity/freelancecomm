import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const team = [
  {
    name: "Arjun R.",
    role: "Creative Director",
    line: "Turning briefs into bold ideas.",
    quote:
      "Good design solves problems.\nGreat design builds brands.\nWe aim for the latter.",
    accent: "#C9A84C",
    initial: "A",
  },
  {
    name: "Priya M.",
    role: "Lead Developer",
    line: "Code that ships and scales.",
    quote:
      "Clean code is a love letter\nto the next developer —\nand to your future self.",
    accent: "#7777DD",
    initial: "P",
  },
  {
    name: "Kiran S.",
    role: "Motion Designer",
    line: "Making things beautifully move.",
    quote:
      "Motion is meaning.\nEvery frame should earn\nthe attention it asks for.",
    accent: "#6BA83A",
    initial: "K",
  },
  {
    name: "Divya T.",
    role: "Brand Strategist",
    line: "Strategy with a human pulse.",
    quote:
      "A brand isn't a logo.\nIt's the feeling people\ncarry after you've left the room.",
    accent: "#C93A5A",
    initial: "D",
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

  return (
    <section className="bg-dark py-24 lg:py-32">
      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-7xl px-6 lg:px-10"
      >
        {/* Top: text left, team photo right */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.div variants={revealItem} className="lg:col-span-5">
            <p className="font-mono-tag text-sm text-gold">// About Us</p>
            <h2
              className="mt-6 font-display leading-[1.02] text-cream"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
            >
              A crew of
              <br />
              <span className="text-gold-gradient">obsessive</span>
              <br />
              builders.
            </h2>
            <p className="mt-7 max-w-lg font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
              We're a tight-knit freelance collective from Chennai, India. No
              bloat, no middlemen — just a focused team that obsesses over
              craft, ships fast, and delivers work you're proud to show.
            </p>
          </motion.div>

          <motion.div variants={revealItem} className="relative lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={teamGroup}
                alt="The freelancecomm team together in Chennai"
                className="h-full w-full object-cover"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(ellipse at 60% 50%, black 45%, transparent 88%)",
                  maskImage:
                    "radial-gradient(ellipse at 60% 50%, black 45%, transparent 88%)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(var(--dark)) 0%, transparent 25%, transparent 75%, hsl(var(--dark)) 100%)",
                }}
              />

              {/* Floating Collective badge */}
              <div
                className="absolute right-3 top-3 bg-darkcard/85 px-4 py-3 backdrop-blur-md"
                style={{
                  borderLeft: "2px solid hsl(var(--gold))",
                  borderBottom: "2px solid hsl(var(--gold))",
                }}
              >
                <div className="flex items-center gap-2 font-display-bold text-sm text-gold">
                  <Users className="h-4 w-4" />
                  Collective
                </div>
                <div className="mt-1 font-body text-xs text-cream/85">
                  4 Core Members
                </div>
                <div className="font-body text-xs text-cream/55">
                  Network of Specialists
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row — single rounded card with dividers */}
        <motion.div
          variants={revealItem}
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
                {/* Photo / initial */}
                <div className="lg:col-span-3">
                  <div
                    className="relative flex aspect-square w-full items-center justify-center overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${m.accent}, ${m.accent}55)`,
                    }}
                  >
                    <span className="font-display-bold text-[7rem] leading-none text-dark/85">
                      {m.initial}
                    </span>
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
