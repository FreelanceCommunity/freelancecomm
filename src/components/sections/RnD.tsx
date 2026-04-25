import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { revealContainer, revealItem } from "@/lib/motion";

const items = [
  { tag: "AI/ML", title: "LLM-Powered UI Generation", desc: "Exploring how language models can write production-ready component code from design tokens." },
  { tag: "Design Systems", title: "Fluid Type & Space Systems", desc: "Building design tokens that mathematically scale across breakpoints — no more manual px tweaking." },
  { tag: "Open Source", title: "FreelancComm UI Kit", desc: "An open-source component library opinionated for Indian startup design patterns. Coming soon." },
];

const fullText = "> Exploring the edges of what web can do.";

const Typewriter = () => {
  const [text, setText] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="rounded-full bg-dark px-5 py-3 font-mono text-sm text-gold">
      {text}
      <span className="cursor-blink ml-0.5">|</span>
    </div>
  );
};

const RnD = () => (
  <section id="rnd" className="bg-cement py-28 lg:py-36">
    <motion.div
      variants={revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto max-w-7xl px-6 lg:px-10"
    >
      <motion.div variants={revealItem} className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="font-mono-tag text-[11px] text-gold">// R&D</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-dark sm:text-5xl lg:text-6xl">
            What we're
            <br />
            exploring <span className="text-gold-gradient">→</span>
          </h2>
        </div>
        <Typewriter />
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {items.map((it) => (
          <motion.div
            key={it.title}
            variants={revealItem}
            data-cursor-hover
            className="rounded-2xl border border-white/5 bg-dark p-8"
          >
            <span className="inline-block rounded-full border border-gold/30 px-3 py-1 font-mono-tag text-[10px] text-gold">
              {it.tag}
            </span>
            <h3 className="mb-3 mt-6 font-display-bold text-lg leading-snug text-cream">{it.title}</h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
            <div className="mt-8 border-t border-white/5 pt-6 font-mono-tag text-[10px]">
              <span className="text-muted-foreground">Status: </span>
              <span className="text-green-400">Active</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default RnD;
