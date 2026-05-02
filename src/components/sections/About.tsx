import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { revealContainer, revealItem, easePremium } from "@/lib/motion";

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

const PAGE_SIZE = 5;
const totalPages = Math.ceil(team.length / PAGE_SIZE);

const TeamCard = ({ m, wide = false }: { m: (typeof team)[number]; wide?: boolean }) => (
  <motion.div
    variants={revealItem}
    whileHover={{ y: -6 }}
    transition={{ duration: 0.4, ease: easePremium }}
    data-cursor-hover
    className={`group relative overflow-hidden bg-darkcard p-7 ring-1 ring-cream/5 transition-colors duration-300 hover:bg-darkcard-hover ${
      wide ? "sm:col-span-2" : ""
    }`}
  >
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
      {m.line}
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

        {/* Grid: first card full width, others 2 per row */}
        <motion.div
          key={page}
          variants={revealItem}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          <AnimatePresence mode="wait">
            {visible.map((m, i) => (
              <TeamCard key={`${page}-${m.name}`} m={m} wide={i === 0} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            variants={revealItem}
            className="mt-12 flex items-center justify-center gap-4"
          >
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              data-cursor-hover
              className="btn-ghost-premium disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ArrowLeft className="h-4 w-4" />
              Prev
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  data-cursor-hover
                  className={`font-mono-tag text-xs transition-all ${
                    i === page
                      ? "bg-gold px-3 py-1.5 text-dark"
                      : "px-3 py-1.5 text-cream/60 hover:text-cream"
                  }`}
                  style={
                    i === page
                      ? { borderLeft: "2px solid hsl(var(--gold-deep))", borderBottom: "2px solid hsl(var(--gold-deep))" }
                      : undefined
                  }
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              data-cursor-hover
              className="btn-premium disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default About;
