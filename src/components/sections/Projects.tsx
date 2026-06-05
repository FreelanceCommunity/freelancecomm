import { useState } from "react";
import { motion } from "framer-motion";
import { revealContainer, revealItem, easePremium } from "@/lib/motion";
import callflowImg from "@/assets/calllflow .png";
import redruleImg from "@/assets/redrule.png";
import threetreeImg from "@/assets/the 3 tree.png";
import hsehubImg from "@/assets/hsehub.png";
import superbImg from "@/assets/superb.png";
import reputationImg from "@/assets/reputationflow360.png";
import kishorePortfolioImg from "@/assets/kishore portfolio.png";
import inkluvoImg from "@/assets/inklovo.png";
import fiverPortfolioImg from "@/assets/fiver portfolio site.png";
import hurecareImg from "@/assets/hurecare.png";
import hurecoreImg from "@/assets/hurecore.png";
import babysitterImg from "@/assets/babysitter.png";
import carestintImg from "@/assets/carestint.png";
import theBoysImg from "@/assets/the eight boys portfolio.png";
import youtubloxImg from "@/assets/youtublox.png";
import whiteboardImg from "@/assets/whiteboard.png";
import fundxImg from "@/assets/fundx.png";
import brandwebsiteImg from "@/assets/brandwebsite.png";

const projects = [
  {
    name: "CallFlow International",
    category: "Website",
    year: "2024",
    url: "https://callflow-international.vercel.app/",
    gradient: "from-[#121c2b] to-[#1a2a3c]",
    accent: "#5EA0E6",
    h: "h-56",
    image: callflowImg,
  },
  {
    name: "RedRule",
    category: "Website",
    year: "2024",
    url: "https://redrule.site/",
    gradient: "from-[#2b1111] to-[#3c1a1a]",
    accent: "#D76666",
    h: "h-56",
    image: redruleImg,
  },
  {
    name: "3Tree",
    category: "Website",
    year: "2024",
    url: "https://3tree-lilac.vercel.app/",
    gradient: "from-[#2e1a0e] to-[#4a2e1a]",
    accent: "#C9A84C",
    h: "h-56",
    image: threetreeImg,
  },
  {
    name: "HseHub Final",
    category: "Website",
    year: "2024",
    url: "https://hsehubfinal.vercel.app/",
    gradient: "from-[#132320] to-[#1c332e]",
    accent: "#6BC0A3",
    h: "h-56",
    image: hsehubImg,
  },
  {
    name: "Superb Sorbet",
    category: "Website",
    year: "2024",
    url: "https://superb-sorbet-f38fb7.netlify.app/",
    gradient: "from-[#2a1822] to-[#3a2230]",
    accent: "#E38DB5",
    h: "h-56",
    image: superbImg,
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
    name: "ReputationFlow360",
    category: "Website",
    year: "2024",
    url: "https://reputationflow360.com/",
    gradient: "from-[#241620] to-[#3a2030]",
    accent: "#D97AA6",
    h: "h-56",
    image: reputationImg,
  },
  {
    name: "Kishore Portfolio",
    category: "Portfolio",
    year: "2024",
    url: "https://kishore-portfolio-nine.vercel.app/",
    gradient: "from-[#1f1a26] to-[#2b2236]",
    accent: "#B589FF",
    h: "h-56",
    image: kishorePortfolioImg,
  },
  {
    name: "Inkluvo",
    category: "Website",
    year: "2024",
    url: "https://websiteinkluvo.vercel.app/",
    gradient: "from-[#1a2418] to-[#243324]",
    accent: "#8DCB6F",
    h: "h-56",
    image: inkluvoImg,
  },
  {
    name: "Fiverr Portfolio",
    category: "Portfolio",
    year: "2024",
    url: "https://theeightboys.github.io/fiverrportfoliosite/",
    gradient: "from-[#10262e] to-[#1a3a44]",
    accent: "#4AA3A3",
    h: "h-56",
    image: fiverPortfolioImg,
  },
  {
    name: "HureCare",
    category: "Website",
    year: "2024",
    url: "https://hurecare.vercel.app/",
    gradient: "from-[#1b2022] to-[#242c2f]",
    accent: "#7CB0BA",
    h: "h-56",
    image: hurecareImg,
  },
  {
    name: "HureCore",
    category: "Website",
    year: "2024",
    url: "https://core.gethure.com/",
    gradient: "from-[#2e0e1a] to-[#4a1a2e]",
    accent: "#C93A5A",
    h: "h-56",
    image: hurecoreImg,
  },
  {
    name: "BabysitterHub",
    category: "Website",
    year: "2024",
    url: "https://babysitterhub.vercel.app/",
    gradient: "from-[#1a1a2e] to-[#2e2e4a]",
    accent: "#7777DD",
    h: "h-56",
    image: babysitterImg,
  },
  {
    name: "Stint",
    category: "Website",
    year: "2024",
    url: "https://stint.gethure.com/",
    gradient: "from-[#0e1a2e] to-[#1a2e4a]",
    accent: "#3A8AC9",
    h: "h-56",
    image: carestintImg,
  },
  {
    name: "The Boys Portfolio",
    category: "Portfolio",
    year: "2024",
    url: "https://portfolio-q6trprmpo-theboys-projects-3cf681c8.vercel.app/",
    gradient: "from-[#1a2a1a] to-[#2a3d1a]",
    accent: "#6BA83A",
    h: "h-72",
    span: true,
    image: theBoysImg,
  },
  {
    name: "Youtublox",
    category: "Website",
    year: "2024",
    url: "https://youtublox.vercel.app/",
    gradient: "from-[#241a1a] to-[#352323]",
    accent: "#E07D7D",
    h: "h-56",
    image: youtubloxImg,
  },
  {
    name: "Whiteboard",
    category: "Web App",
    year: "2024",
    url: "https://whiteboard-ten-psi.vercel.app/",
    gradient: "from-[#161f24] to-[#20303a]",
    accent: "#6FAAD1",
    h: "h-56",
    image: whiteboardImg,
  },
  {
    name: "Fund X",
    category: "Website",
    year: "2024",
    url: "https://fund-x-kappa.vercel.app/",
    gradient: "from-[#231f14] to-[#342c1c]",
    accent: "#D0B05A",
    h: "h-56",
    image: fundxImg,
  },
  {
    name: "Brand Website",
    category: "Portfolio",
    year: "2024",
    url: "https://kishoremk05.github.io/brand-website/",
    gradient: "from-[#201a14] to-[#2f241c]",
    accent: "#C98F5A",
    h: "h-56",
    span: true,
    image: brandwebsiteImg,
  },
];

const Projects = () => {
  const [page, setPage] = useState(0);
  const [loadedIframes, setLoadedIframes] = useState<Record<string, boolean>>({});
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
            const isFull = i === 2 || !!p.span;
            const cardHeight = isFull ? "h-[450px]" : "h-[380px]"; 
            const showIframe = p.url && !p.image;

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
                className={`group flex flex-col justify-between overflow-hidden rounded-2xl ${cardHeight} ${isFull ? "md:col-span-2" : ""} border border-cream/5 bg-dark/30`}
              >
                {/* Visual Preview Container */}
                <div className="relative flex-1 w-full overflow-hidden bg-gradient-to-br from-dark to-dark/50">
                  {/* Abstract background fallback */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-80`} />
                  <div
                    className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-sm"
                    style={{ backgroundColor: p.accent }}
                  />
                  <div
                    className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-30"
                    style={{ borderColor: p.accent }}
                  />

                  {/* Static Image Preview */}
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-105"
                    />
                  ) : (
                    /* Real Live Iframe Preview */
                    showIframe && (
                      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
                        <iframe
                          src={p.url}
                          title={p.name}
                          loading="lazy"
                          onLoad={() => setLoadedIframes((prev) => ({ ...prev, [p.name]: true }))}
                          className={`absolute top-0 left-0 w-[300%] h-[300%] origin-top-left scale-[0.3333] border-0 transition-all duration-1000 ${
                            loadedIframes[p.name]
                              ? "opacity-60 group-hover:opacity-85 group-hover:scale-[0.35]"
                              : "opacity-0"
                          }`}
                        />
                        {/* Subtle blending mask */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                      </div>
                    )
                  )}

                  {/* Hover overlay for button (contained strictly inside preview box) */}
                  <div className="absolute inset-0 flex items-center justify-center bg-dark/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30">
                    <span className="border-2 border-cream px-6 py-2.5 font-display-bold text-sm text-cream">
                      View Live Project {"->"}
                    </span>
                  </div>
                </div>

                {/* Bottom Details Section (below the preview card, zero text overlap) */}
                <div className="p-4 bg-[#141517] border-t border-cream/5 z-20 flex flex-col justify-center">
                  <p className="font-mono-tag text-xs" style={{ color: p.accent }}>
                    {p.category} · {p.year}
                  </p>
                  <h3 className="mt-1.5 font-display-bold text-xl text-cream sm:text-2xl transition-colors duration-300 group-hover:text-gold leading-tight">
                    {p.name}
                  </h3>
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
