import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Rocket, Clock, Smile, MapPin } from "lucide-react";
import { revealContainer, revealItem, easePremium } from "@/lib/motion";
import teamGroup from "@/assets/team-group.png";

const team = [
  { name: "Arjun R.", role: "Creative Director", line: "Turning briefs into bold ideas.", accent: "#C9A84C", initial: "A" },
  { name: "Priya M.", role: "Lead Developer", line: "Code that ships and scales.", accent: "#7777DD", initial: "P" },
  { name: "Kiran S.", role: "Motion Designer", line: "Making things beautifully move.", accent: "#6BA83A", initial: "K" },
  { name: "Divya T.", role: "Brand Strategist", line: "Strategy with a human pulse.", accent: "#C93A5A", initial: "D" },
  { name: "Rohan V.", role: "Product Engineer", line: "Bridging design and systems.", accent: "#3A8AC9", initial: "R" },
  { name: "Meera J.", role: "UX Researcher", line: "Insights that shape every pixel.", accent: "#E2C97E", initial: "M" },
  { name: "Vikram N.", role: "AI Engineer", line: "Models that think with the team.", accent: "#9D7DDC", initial: "V" },
  { name: "Sana K.", role: "Content Lead", line: "Words with weight and warmth.", accent: "#5DBB9C", initial: "S" },
];

const stats = [
  { icon: Rocket, value: "50+", label: "Projects Delivered" },
  { icon: Clock, value: "98%", label: "On-Time Delivery" },
  { icon: Smile, value: "30+", label: "Happy Clients" },
  { icon: MapPin, value: "Chennai, IN", label: "Our Home Base" },
];

const PAGE_SIZE = 2;
const totalPages = Math.ceil(team.length / PAGE_SIZE);

const ProfileCard = ({ m }: { m: (typeof team)[number] }) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ duration: 0.4, ease: easePremium }}
    data-cursor-hover
    className="group relative overflow-hidden bg-darkcard p-7 ring-1 ring-cream/5 transition-colors duration-300 hover:bg-darkcard-hover"
  >
    <div
      className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
      style={{ backgroundColor: m.accent }}
    />
    <div className="relative flex items-center gap-4">
      <div
        className="flex h-14 w-14 items-center justify-center font-display-bold text-2xl text-cream"
        style={{
          background: `linear-gradient(135deg, ${m.accent}55, ${m.accent}20)`,
          borderLeft: `2px solid ${m.accent}`,
          borderBottom: `2px solid ${m.accent}`,
        }}
      >
        {m.initial}
      </div>
      <div>
        <div className="font-display-bold text-xl text-cream">{m.name}</div>
        <div className="mt-1 font-mono-tag text-[11px] tracking-[0.2em] text-gold">{m.role}</div>
      </div>
    </div>
    <p className="relative mt-6 font-body text-base leading-relaxed text-muted-foreground">
      "{m.line}"
    </p>
    <div className="relative mt-6 flex items-center gap-2 font-mono-tag text-[10px] text-cream/40 transition-colors group-hover:text-gold">
      <span className="h-px w-6 bg-current" />
      Member
    </div>
  </motion.div>
);

const About = () => {
  const [page, setPage] = useState(0);
  const start = page * PAGE_SIZE;
  const visible = team.slice(start, start + PAGE_SIZE);

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
          <motion.div variants={revealItem} className="lg:col-span-6">
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

          <motion.div
            variants={revealItem}
            className="relative lg:col-span-6"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={teamGroup}
                alt="The freelancecomm team together at an event in Chennai"
                className="h-full w-full object-cover"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(ellipse at center, black 55%, transparent 92%)",
                  maskImage:
                    "radial-gradient(ellipse at center, black 55%, transparent 92%)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 60%, hsl(var(--dark)) 100%)",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          variants={revealItem}
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden bg-cream/10 sm:grid-cols-2 lg:grid-cols-5"
        >
          <div className="bg-dark p-7">
            <div className="font-display-bold text-xl text-cream">
              Built on focus.
            </div>
            <div className="mt-1 font-display-bold text-xl text-gold">
              Driven by craft.
            </div>
            <div className="mt-3 font-body text-sm text-muted-foreground">
              Numbers that reflect our commitment.
            </div>
          </div>
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex items-center gap-4 bg-dark p-7"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center bg-gold/10 text-gold"
                  style={{
                    borderLeft: "2px solid hsl(var(--gold))",
                    borderBottom: "2px solid hsl(var(--gold))",
                  }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display-bold text-2xl text-cream">
                    {s.value}
                  </div>
                  <div className="mt-1 font-mono-tag text-[10px] tracking-[0.2em] text-cream/55">
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Slidable profile cards */}
        <motion.div variants={revealItem} className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono-tag text-xs text-gold">// The Team</p>
              <h3 className="mt-2 font-display text-2xl text-cream sm:text-3xl">
                Meet the makers.
              </h3>
            </div>
            <div className="font-mono-tag text-[11px] tracking-[0.2em] text-cream/45">
              {String(page + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
            </div>
          </div>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.45, ease: easePremium }}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2"
              >
                {visible.map((m) => (
                  <ProfileCard key={m.name} m={m} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              data-cursor-hover
              aria-label="Previous"
              className="btn-ghost-premium !py-2.5 !px-4 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  data-cursor-hover
                  aria-label={`Go to page ${i + 1}`}
                  className={`h-[2px] transition-all ${
                    i === page ? "w-8 bg-gold" : "w-4 bg-cream/25 hover:bg-cream/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              data-cursor-hover
              aria-label="Next"
              className="btn-premium !py-2.5 !px-4 disabled:cursor-not-allowed disabled:opacity-40"
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
