import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "R&D", href: "#rnd" },
  { label: "Reviews", href: "#reviews" },
];

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > lastY && y > 160) setHidden(true);
      else setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center"
    >
      <motion.nav
        animate={{
          width: scrolled ? "min(960px, 92%)" : "100%",
          marginTop: scrolled ? 14 : 0,
          borderRadius: scrolled ? 999 : 0,
        }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className={`relative flex items-center justify-between px-6 py-4 lg:px-10 ${
          scrolled
            ? "border border-cream/40 bg-cream/60 shadow-[0_18px_40px_-18px_hsl(var(--dark)/0.18)] backdrop-blur-xl"
            : "border-b border-cream/30 bg-cream/30 backdrop-blur-md"
        }`}
        style={{
          backgroundImage: scrolled
            ? "none"
            : "radial-gradient(80% 100% at 80% 0%, hsl(var(--gold) / 0.10), transparent 70%)",
        }}
      >
        <a href="#" className="font-display-bold text-xl text-dark md:text-2xl">
          freelanccomm<span className="text-gold">.in</span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-body text-[15px] text-dark/75 transition-colors duration-300 hover:text-dark"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn-premium !py-2.5 !px-5 !text-sm">
          Let's Talk →
        </a>
      </motion.nav>
    </motion.header>
  );
};

export default Navbar;
