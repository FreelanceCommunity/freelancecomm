import { useState } from "react";
import { motion } from "framer-motion";
import { revealContainer, revealItem, easePremium } from "@/lib/motion";

const projects = [
  {
    name: "The Boys Portfolio",
    category: "Portfolio",
    year: "2024",
    url: "https://portfolio-q6trprmpo-theboys-projects-3cf681c8.vercel.app/",
    gradient: "from-[#1a2a1a] to-[#2a3d1a]",
    accent: "#6BA83A",
    h: "h-72",
    span: true,
  },
  {
    name: "BabysitterHub",
    category: "Website",
    year: "2024",
    url: "https://babysitterhub.vercel.app/",
    gradient: "from-[#1a1a2e] to-[#2e2e4a]",
    accent: "#7777DD",
    h: "h-56",
  },
  {
    name: "3Tree",
    category: "Website",
    year: "2024",
    url: "https://3tree-lilac.vercel.app/",
    gradient: "from-[#2e1a0e] to-[#4a2e1a]",
    accent: "#C9A84C",
    h: "h-56",
  },
  {
    name: "Stint",
    category: "Website",
    year: "2024",
    url: "https://stint.gethure.com/",
    gradient: "from-[#0e1a2e] to-[#1a2e4a]",
    accent: "#3A8AC9",
    h: "h-56",
  },
  {
    name: "Core",
    category: "Website",
    year: "2024",
    url: "https://core.gethure.com/",
    gradient: "from-[#2e0e1a] to-[#4a1a2e]",
    accent: "#C93A5A",
    h: "h-56",
  },
  {
    name: "Fiverr Portfolio",
    category: "Portfolio",
    year: "2024",
    url: "https://theeightboys.github.io/fiverrportfoliosite/",
    gradient: "from-[#10262e] to-[#1a3a44]",
    accent: "#4AA3A3",
    h: "h-56",
  },
  {
    name: "ReputationFlow360",
    category: "Website",
    year: "2024",
    url: "https://reputationflow360.com/",
    gradient: "from-[#241620] to-[#3a2030]",
    accent: "#D97AA6",
    h: "h-56",
  },
  {
    name: "PdfHub",
    category: "Web App",
    year: "2024",
    url: "https://pdfhub-beryl.vercel.app/",
    gradient: "from-[#1c1d13] to-[#2b2d1a]",
    accent: "#9BB14A",
    h: "h-56",
  },
  {
    name: "RedRule",
    category: "Website",
    year: "2024",
    url: "https://redrule.site/",
    gradient: "from-[#2b1111] to-[#3c1a1a]",
    accent: "#D76666",
    h: "h-56",
  },
  {
    name: "CallFlow International",
    category: "Website",
    year: "2024",
    url: "https://callflow-international.vercel.app/",
    gradient: "from-[#121c2b] to-[#1a2a3c]",
    accent: "#5EA0E6",
    h: "h-56",
  },
  {
    name: "Attribuer",
    category: "Website",
    year: "2024",
    url: "https://attribuer.nl/",
    gradient: "from-[#1a1f26] to-[#232b36]",
    accent: "#8CB3FF",
    h: "h-56",
  },
  {
    name: "Superb Sorbet",
    category: "Website",
    year: "2024",
    url: "https://superb-sorbet-f38fb7.netlify.app/",
    gradient: "from-[#2a1822] to-[#3a2230]",
    accent: "#E38DB5",
    h: "h-56",
  },
  {
    name: "HseHub Final",
    category: "Website",
    year: "2024",
    url: "https://hsehubfinal.vercel.app/",
    gradient: "from-[#132320] to-[#1c332e]",
    accent: "#6BC0A3",
    h: "h-56",
  },
  {
    name: "Kishore Profile",
    category: "Portfolio",
    year: "2024",
    url: "https://kishoremk05.github.io/profile/",
    gradient: "from-[#1f1a26] to-[#2b2236]",
    accent: "#B589FF",
    h: "h-56",
  },
  {
    name: "Inkluvo",
    category: "Website",
    year: "2024",
    url: "https://websiteinkluvo.vercel.app/",
    gradient: "from-[#1a2418] to-[#243324]",
    accent: "#8DCB6F",
    h: "h-56",
  },
  {
    name: "HureCare",
    category: "Website",
    year: "2024",
    url: "https://hurecare.vercel.app/",
    gradient: "from-[#1b2022] to-[#242c2f]",
    accent: "#7CB0BA",
    h: "h-56",
  },
  {
    name: "Youtublox",
    category: "Website",
    year: "2024",
    url: "https://youtublox.vercel.app/",
    gradient: "from-[#241a1a] to-[#352323]",
    accent: "#E07D7D",
    h: "h-56",
  },
  {
    name: "Whiteboard",
    category: "Web App",
    year: "2024",
    url: "https://whiteboard-ten-psi.vercel.app/",
    gradient: "from-[#161f24] to-[#20303a]",
    accent: "#6FAAD1",
    h: "h-56",
  },
  {
    name: "Fund X",
    category: "Website",
    year: "2024",
    url: "https://fund-x-kappa.vercel.app/",
    gradient: "from-[#231f14] to-[#342c1c]",
    accent: "#D0B05A",
    h: "h-56",
  },
  {
    name: "Brand Website",
    category: "Portfolio",
    year: "2024",
    url: "https://kishoremk05.github.io/brand-website/",
    gradient: "from-[#201a14] to-[#2f241c]",
    accent: "#C98F5A",
    h: "h-56",
  },
];

const Projects = () => {
  const [page, setPage] = useState(0);
  const perPage = 5;
  const pages = Array.from({ length: Math.ceil(projects.length / perPage) }, (_, i) =>
    projects.slice(i * perPage, i * perPage + perPage)
  );
  const totalPages = pages.length;
  const pageProjects = pages[page] || [];

  return (
    <section id="projects" className="bg-dark py-28 lg:py-36">
      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-7xl px-6 lg:px-10"
      >
        <motion.div
          variants={revealItem}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="font-mono-tag text-sm text-gold">// Selected Work</p>
            <h2 className="mt-4 font-display text-5xl leading-[1] text-cream sm:text-6xl lg:text-7xl xl:text-8xl">
              Selected
              <br />
              Projects
            </h2>
          </div>
        </motion.div>

        <motion.div
          key={page}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easePremium }}
          className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {pageProjects.map((p, i) => {
            const isFull = i === 2;
            const cardHeight = isFull ? "h-64 md:h-72" : "h-56";

            return (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easePremium, delay: i * 0.05 }}
                whileHover={{ y: -6, scale: 1.02 }}
                data-cursor-hover
                className={`group relative overflow-hidden rounded-2xl ${cardHeight} ${isFull ? "md:col-span-2" : ""} bg-gradient-to-br ${p.gradient}`}
              >
                {/* Abstract circle */}
                <div
                  className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-sm"
                  style={{ backgroundColor: p.accent }}
                />
                <div
                  className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-30"
                  style={{ borderColor: p.accent }}
                />

                {/* Bottom-left info */}
                <div className="absolute inset-x-6 bottom-6">
                  <p className="font-mono-tag text-sm" style={{ color: p.accent }}>
                    {p.category} · {p.year}
                  </p>
                  <h3 className="mt-2 font-display-bold text-3xl text-cream sm:text-4xl">
                    {p.name}
                  </h3>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-dark/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="border-2 border-cream px-6 py-3 font-display-bold text-base text-cream">
                    View Project {"->"}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
            data-cursor-hover
            aria-label="Previous page"
            className="flex h-10 w-10 items-center justify-center rounded-full text-cream ring-1 ring-cream/20 transition-colors hover:bg-cream/5"
          >
            {"<"}
          </button>
          <div className="font-mono-tag text-xs text-cream/70">
            Page {page + 1} / {totalPages}
          </div>
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
            onClick={() => setPage((p) => (p + 1) % totalPages)}
            data-cursor-hover
            aria-label="Next page"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-dark transition-colors hover:bg-gold-deep"
          >
            {">"}
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
