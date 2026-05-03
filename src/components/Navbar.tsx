import { useEffect, useState } from "react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "R&D", href: "#rnd" },
  { label: "Reviews", href: "#reviews" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const onScrollSpy = () => {
      const y = window.scrollY + 120;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = `#${id}`;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScrollSpy, { passive: true });
    onScrollSpy();
    return () => window.removeEventListener("scroll", onScrollSpy);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center">
      <nav
        className={`relative flex items-center justify-between border-b border-x-0 border-t-0 py-4 transition-all duration-500 ${
          scrolled
            ? "mt-3 w-[92%] max-w-5xl border-dark/80 bg-cream/85 px-5 shadow-[0_8px_24px_-12px_hsl(var(--dark)/0.2)] backdrop-blur-xl lg:px-7"
            : "mt-0 w-full border-dark/80 bg-cream/60 px-6 backdrop-blur-md lg:px-10"
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
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setActive(l.href)}
                  className={`relative font-body text-[15px] transition-colors duration-300 ${
                    isActive ? "text-dark" : "text-dark/75 hover:text-dark"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-1/2 h-[2px] -translate-x-1/2 bg-gold transition-all duration-300 ${
                      isActive ? "w-5" : "w-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <a href="#contact" className="btn-premium !py-2.5 !px-5 !text-sm">
          Let's Talk →
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
