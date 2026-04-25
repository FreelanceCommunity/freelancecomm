import { motion } from "framer-motion";
import { revealContainer, revealItem } from "@/lib/motion";

const team = [
  { name: "Arjun R.", role: "Creative Director", line: "Turning briefs into bold ideas." },
  { name: "Priya M.", role: "Lead Developer", line: "Code that ships and scales." },
  { name: "Kiran S.", role: "Motion Designer", line: "Making things beautifully move." },
  { name: "Divya T.", role: "Brand Strategist", line: "Strategy with a human pulse." },
];

const About = () => (
  <section className="bg-dark py-28 lg:py-36">
    <motion.div
      variants={revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-2 lg:px-10"
    >
      <motion.div variants={revealItem}>
        <p className="font-mono-tag text-[11px] text-gold">// About Us</p>
        <h2 className="mt-6 font-display text-4xl leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
          A crew of
          <br />
          <span className="text-gold-gradient">obsessive</span>
          <br />
          builders.
        </h2>
        <p className="mt-8 max-w-xs font-body text-sm leading-relaxed text-muted-foreground">
          We're a tight-knit freelance collective from Salem, India. No bloat, no middlemen — just a focused team that obsesses over craft, ships fast, and delivers work you're proud to show.
        </p>
      </motion.div>

      <motion.div variants={revealItem} className="flex flex-col gap-3">
        {team.map((m) => (
          <div
            key={m.name}
            data-cursor-hover
            className="group flex items-center justify-between rounded-xl border-l-2 border-transparent bg-darkcard px-6 py-5 transition-all duration-300 hover:border-gold hover:bg-darkcard-hover"
          >
            <div>
              <div className="font-display-bold text-lg text-cream">{m.name}</div>
              <div className="font-mono-tag text-[10px] text-gold">{m.role}</div>
            </div>
            <p className="max-w-[140px] text-right font-body text-sm text-muted-foreground">
              {m.line}
            </p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

export default About;
