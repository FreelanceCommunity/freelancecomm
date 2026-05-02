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
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md border-b border-dark/10"
          : "bg-cream border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
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

        <a
          href="#contact"
          className="font-display-bold text-sm text-dark border-b-2 border-gold pb-1 hover:text-gold-deep transition-colors"
        >
          Let's Talk →
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
