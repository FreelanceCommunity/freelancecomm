import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { revealContainer, revealItem } from "@/lib/motion";

const items = [
  {
    tag: "AI/ML",
    title: "LLM-Powered UI Generation",
    desc: "Exploring how language models can write production-ready component code from design tokens.",
    file: "llm_ui_gen.ts",
  },
  {
    tag: "Design Systems",
    title: "Fluid Type & Space Systems",
    desc: "Building design tokens that mathematically scale across breakpoints — no more manual px tweaking.",
    file: "fluid_tokens.ts",
  },
  {
    tag: "Open Source",
    title: "FreelancComm UI Kit",
    desc: "An open-source component library opinionated for Indian startup design patterns. Coming soon.",
    file: "ui_kit.ts",
  },
];

const bootLines = [
  "freelanccomm@lab:~$ ./boot --module=research",
  "[ok]  loading kernel.research v3.4.1",
  "[ok]  mounting /experiments  ...... done",
  "[ok]  fetching active branches ... 3 found",
  "> Exploring the edges of what web can do.",
];

const Terminal = () => {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const current = bootLines[lineIdx] ?? "";
    if (charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 22);
      return () => clearTimeout(t);
    }
    if (lineIdx < bootLines.length - 1) {
      const t = setTimeout(() => {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, 220);
      return () => clearTimeout(t);
    }
    setDone(true);
  }, [charIdx, lineIdx, done]);

  return (
    <div className="overflow-hidden rounded-2xl border border-dark/10 bg-cream shadow-[0_30px_80px_-30px_rgba(20,20,20,0.25)]">
      <div className="flex items-center gap-2 border-b border-dark/10 bg-cement px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <span className="ml-3 font-mono-tag text-[10px] tracking-widest text-muted-foreground">
          ~/research — bash — 80×24
        </span>
      </div>
      <div className="px-5 py-5 font-mono text-[13px] leading-relaxed text-dark/90">
        {bootLines.slice(0, lineIdx).map((l, i) => (
          <div
            key={i}
            className={
              l.startsWith(">")
                ? "text-gold-deep"
                : l.includes("[ok]")
                  ? "text-green-700"
                  : "text-dark/80"
            }
          >
            {l}
          </div>
        ))}
        <div
          className={
            (bootLines[lineIdx] ?? "").startsWith(">")
              ? "text-gold-deep"
              : (bootLines[lineIdx] ?? "").includes("[ok]")
                ? "text-green-700"
                : "text-dark/80"
          }
        >
          {(bootLines[lineIdx] ?? "").slice(0, charIdx)}
          <span className="cursor-blink ml-0.5 text-gold-deep">▍</span>
        </div>
      </div>
    </div>
  );
};

const easePremium = [0.16, 1, 0.3, 1] as const;

const CodeWindow = ({
  it,
  index,
}: {
  it: (typeof items)[number];
  index: number;
}) => {
  return (
    <motion.div
      variants={revealItem}
      data-cursor-hover
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: easePremium }}
      className="overflow-hidden rounded-2xl border border-dark/10 bg-cream shadow-[0_20px_60px_-30px_rgba(20,20,20,0.25)]"
    >
      <div className="flex items-center justify-between border-b border-dark/10 bg-cement px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="font-mono-tag text-[10px] tracking-widest text-muted-foreground">
          {it.file}
        </span>
        <span className="font-mono-tag text-[10px] tracking-widest text-gold-deep">
          0{index + 1}
        </span>
      </div>

      <div className="p-7">
        <span className="inline-block rounded-full border border-gold/40 px-3 py-1 font-mono-tag text-xs text-gold-deep">
          {it.tag}
        </span>
        <h3 className="mb-3 mt-6 font-display-bold text-xl leading-snug text-dark sm:text-2xl">
          {it.title}
        </h3>
        <p className="font-body text-base leading-relaxed text-muted-foreground">
          {it.desc}
        </p>

        <div className="mt-6 rounded-lg border border-dark/10 bg-cement/60 p-3 font-mono text-[11px] leading-relaxed">
          <div className="text-dark/70">
            <span className="text-[#7C3AED]">const</span>{" "}
            <span className="text-[#1D4ED8]">research</span> = {"{"}
          </div>
          <div className="pl-4 text-dark/70">
            status: <span className="text-green-700">"active"</span>,
          </div>
          <div className="pl-4 text-dark/70">
            owner: <span className="text-gold-deep">"freelanccomm"</span>,
          </div>
          <div className="text-dark/70">{"}"}</div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-dark/10 pt-4 font-mono-tag text-[10px]">
          <div>
            <span className="text-muted-foreground">Status: </span>
            <span className="text-green-700">● Active</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-gold" />
            <span className="h-1 w-1 rounded-full bg-gold/60" />
            <span className="h-1 w-1 rounded-full bg-gold/30" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const RnD = () => (
  <section
    id="rnd"
    className="bg-premium-canvas relative overflow-hidden bg-cream py-28 lg:py-36"
  >
    <div className="bg-canvas-wordmark"><span>EXPLORE</span></div>

    <motion.div
      variants={revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative mx-auto max-w-7xl px-6 lg:px-10"
    >
      <motion.div
        variants={revealItem}
        className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12"
      >
        <div className="lg:col-span-7">
          <p className="font-mono-tag text-sm text-gold-deep">// R&D</p>
          <h2 className="mt-4 font-display text-5xl leading-[1.02] text-dark sm:text-6xl lg:text-7xl xl:text-8xl">
            What we're
            <br />
            exploring <span className="text-gold-gradient">→</span>
          </h2>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
            Fragments of ideas we're actively prototyping in the studio —
            small experiments that often turn into the foundations of our next
            client projects.
          </p>
        </div>
      </motion.div>

      {/* Terminal */}
      <motion.div variants={revealItem} className="mt-12 max-w-2xl">
        <Terminal />
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {items.map((it, i) => (
          <CodeWindow key={it.title} it={it} index={i} />
        ))}
      </div>
    </motion.div>
  </section>
);

export default RnD;
