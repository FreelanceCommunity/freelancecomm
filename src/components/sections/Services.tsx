import { motion } from "framer-motion";
import { revealContainer, revealItem } from "@/lib/motion";

const services = [
  { num: "01", title: "Web Design & Dev", desc: "Pixel-perfect, performant websites built for conversion and delight." },
  { num: "02", title: "Mobile Apps", desc: "Cross-platform apps that feel native and work beautifully." },
  { num: "03", title: "Brand Identity", desc: "Visual systems that tell your story with clarity and confidence." },
  { num: "04", title: "Motion & Animation", desc: "Micro-interactions and transitions that make interfaces come alive." },
  { num: "05", title: "AI Integration", desc: "Embedding intelligence into products — chatbots, automations, workflows." },
  { num: "06", title: "SEO & Growth", desc: "Organic strategies that bring the right eyes to your product." },
];

const Services = () => (
  <section id="services" className="bg-cream py-28 lg:py-36">
    <motion.div
      variants={revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto max-w-7xl px-6 lg:px-10"
    >
      <motion.div variants={revealItem} className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="font-mono-tag text-[11px] text-gold">// What We Do</p>
          <h2 className="mt-4 font-display text-4xl leading-[1] text-dark sm:text-5xl lg:text-6xl">
            Our Services
          </h2>
        </div>
        <p className="max-w-[240px] font-body text-sm leading-relaxed text-muted-foreground">
          A focused set of disciplines, executed with depth. We pick what to do well, and decline the rest.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <motion.div
            key={s.num}
            variants={revealItem}
            data-cursor-hover
            className="group cursor-none rounded-2xl border border-dark/10 p-8 transition-all duration-[400ms] ease-premium hover:bg-dark"
          >
            <div className="font-mono-tag text-sm font-bold text-gold">{s.num}</div>
            <div className="mt-6 border-t border-dark/10 pt-6 transition-colors duration-[400ms] group-hover:border-gold/30">
              <h3 className="font-display-bold text-xl text-dark transition-colors duration-[400ms] group-hover:text-cream">
                {s.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground transition-colors duration-[400ms] group-hover:text-cream/70">
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default Services;
