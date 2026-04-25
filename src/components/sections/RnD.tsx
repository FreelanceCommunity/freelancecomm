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
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0B] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#141414] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <span className="ml-3 font-mono-tag text-[10px] tracking-widest text-muted-foreground">
          ~/research — bash — 80×24
        </span>
      </div>
      {/* body */}
      <div className="px-5 py-5 font-mono text-[13px] leading-relaxed text-cream/90">
        {bootLines.slice(0, lineIdx).map((l, i) => (
          <div
            key={i}
            className={
              l.startsWith(">")
                ? "text-gold"
                : l.includes("[ok]")
                  ? "text-green-400/90"
                  : "text-cream/90"
            }
          >
            {l}
          </div>
        ))}
        <div
          className={
            (bootLines[lineIdx] ?? "").startsWith(">")
              ? "text-gold"
              : (bootLines[lineIdx] ?? "").includes("[ok]")
                ? "text-green-400/90"
                : "text-cream/90"
          }
        >
          {(bootLines[lineIdx] ?? "").slice(0, charIdx)}
          <span className="cursor-blink ml-0.5 text-gold">▍</span>
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
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#0F0F0F] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]"
    >
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#161616] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="font-mono-tag text-[10px] tracking-widest text-muted-foreground">
          {it.file}
        </span>
        <span className="font-mono-tag text-[10px] tracking-widest text-gold">
          0{index + 1}
        </span>
      </div>

      <div className="p-7">
        <span className="inline-block rounded-full border border-gold/30 px-3 py-1 font-mono-tag text-[10px] text-gold">
          {it.tag}
        </span>
        <h3 className="mb-3 mt-6 font-display-bold text-lg leading-snug text-cream">
          {it.title}
        </h3>
        <p className="font-body text-sm leading-relaxed text-muted-foreground">
          {it.desc}
        </p>

        {/* fake code preview */}
        <div className="mt-6 rounded-lg border border-white/5 bg-black/40 p-3 font-mono text-[11px] leading-relaxed">
          <div className="text-muted-foreground">
            <span className="text-[#C792EA]">const</span>{" "}
            <span className="text-[#82AAFF]">research</span> = {"{"}
          </div>
          <div className="pl-4 text-muted-foreground">
            status: <span className="text-green-400">"active"</span>,
          </div>
          <div className="pl-4 text-muted-foreground">
            owner: <span className="text-gold">"freelanccomm"</span>,
          </div>
          <div className="text-muted-foreground">{"}"}</div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 font-mono-tag text-[10px]">
          <div>
            <span className="text-muted-foreground">Status: </span>
            <span className="text-green-400">● Active</span>
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
    className="relative overflow-hidden bg-[#0A0A0A] py-28 lg:py-36"
  >
    {/* Subtle grid backdrop — full computer feel */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--cream)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--cream)) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage:
          "radial-gradient(ellipse at center, black 50%, transparent 85%)",
      }}
    />
    {/* Soft gold glow */}
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[820px] -translate-x-1/2 rounded-full"
      style={{
        background:
          "radial-gradient(closest-side, hsl(var(--gold) / 0.18), transparent 70%)",
      }}
    />

    <motion.div
      variants={revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative mx-auto max-w-7xl px-6 lg:px-10"
    >
      <motion.div
        variants={revealItem}
        className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end"
      >
        <div>
          <p className="font-mono-tag text-[11px] text-gold">// R&D</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
            What we're
            <br />
            exploring <span className="text-gold-gradient">→</span>
          </h2>
        </div>
        <div className="w-full max-w-xl">
          <Terminal />
        </div>
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
