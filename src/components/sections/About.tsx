import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { revealContainer, revealItem, easePremium } from "@/lib/motion";

const team = [
  { name: "Arjun R.", role: "Creative Director", line: "Turning briefs into bold ideas.", accent: "#C9A84C", initial: "A" },
  { name: "Priya M.", role: "Lead Developer", line: "Code that ships and scales.", accent: "#7777DD", initial: "P" },
  { name: "Kiran S.", role: "Motion Designer", line: "Making things beautifully move.", accent: "#6BA83A", initial: "K" },
  { name: "Divya T.", role: "Brand Strategist", line: "Strategy with a human pulse.", accent: "#C93A5A", initial: "D" },
  { name: "Rohan V.", role: "Product Engineer", line: "Bridging design and systems.", accent: "#3A8AC9", initial: "R" },
  // Hidden behind "View All"
  { name: "Meera J.", role: "UX Researcher", line: "Insights that shape every pixel.", accent: "#E2C97E", initial: "M" },
  { name: "Vikram N.", role: "AI Engineer", line: "Models that think with the team.", accent: "#9D7DDC", initial: "V" },
  { name: "Sana K.", role: "Content Lead", line: "Words with weight and warmth.", accent: "#5DBB9C", initial: "S" },
];

const TeamCard = ({ m }: { m: (typeof team)[number] }) => (
  <motion.div
    variants={revealItem}
    whileHover={{ y: -6 }}
    transition={{ duration: 0.4, ease: easePremium }}
    data-cursor-hover
    className="group relative overflow-hidden rounded-2xl bg-darkcard p-7 ring-1 ring-cream/5 transition-colors duration-300 hover:bg-darkcard-hover"
  >
    {/* abstract glow */}
    <div
      className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
      style={{ backgroundColor: m.accent }}
    />
    <div
      className="pointer-events-none absolute -right-2 -top-2 h-24 w-24 rounded-full border opacity-30"
      style={{ borderColor: m.accent }}
    />

    <div className="relative flex items-center gap-4">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl font-display-bold text-2xl text-cream"
        style={{ background: `linear-gradient(135deg, ${m.accent}55, ${m.accent}20)`, border: `1px solid ${m.accent}80` }}
      >
        {m.initial}
      </div>
      <div>
        <div className="font-display-bold text-xl text-cream">{m.name}</div>
        <div className="mt-1 font-mono-tag text-[11px] tracking-[0.2em] text-gold">{m.role}</div>
      </div>
    </div>

    <p className="relative mt-6 font-body text-base leading-relaxed text-muted-foreground">
      {m.line}
    </p>

    <div className="relative mt-6 flex items-center gap-2 font-mono-tag text-[10px] text-cream/40 transition-colors group-hover:text-gold">
      <span className="h-px w-6 bg-current" />
      Member
    </div>
  </motion.div>
);

const About = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? team : team.slice(0, 5);

  return (
    <section className="bg-dark py-28 lg:py-36">
      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-7xl px-6 lg:px-10"
      >
        <motion.div variants={revealItem} className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="font-mono-tag text-sm text-gold">// About Us</p>
            <h2 className="mt-6 font-display text-5xl leading-[1.02] text-cream sm:text-6xl lg:text-7xl xl:text-8xl">
              A crew of
              <br />
              <span className="text-gold-gradient">obsessive</span>
              <br />
              builders.
            </h2>
          </div>
          <p className="md:col-span-5 font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
            We're a tight-knit freelance collective from Salem, India. No bloat,
            no middlemen — just a focused team that obsesses over craft, ships
            fast, and delivers work you're proud to show.
          </p>
        </motion.div>

        <motion.div
          variants={revealItem}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence initial={false}>
            {visible.map((m) => (
              <TeamCard key={m.name} m={m} />
            ))}
          </AnimatePresence>
        </motion.div>

        {team.length > 5 && (
          <motion.div variants={revealItem} className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              data-cursor-hover
              className="btn-premium"
            >
              {showAll ? "Show Less" : "View All Team"}
              <ArrowRight className={`h-4 w-4 transition-transform ${showAll ? "-rotate-90" : ""}`} />
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default About;
