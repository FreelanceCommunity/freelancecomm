import { useEffect, useState } from "react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "R&D", href: "#rnd" },
  { label: "Reviews", href: "#reviews" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`relative flex w-full items-center justify-between border-y border-x-0 px-6 py-4 transition-all duration-500 lg:px-10 ${
          scrolled
            ? "border-dark/10 bg-cream/80 shadow-[0_8px_24px_-12px_hsl(var(--dark)/0.18)] backdrop-blur-xl"
            : "border-dark/10 bg-cream/60 backdrop-blur-md"
        }`}
        style={{
          backgroundImage:
            "radial-gradient(80% 120% at 50% 0%, hsl(var(--gold) / 0.12), transparent 70%)",
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
      </nav>
    </header>
  );
};

export default Navbar;
