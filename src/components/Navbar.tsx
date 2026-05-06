import { useEffect, useState } from "react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "FAQ", href: "#rnd" },
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
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
      <nav
        className="relative flex w-full items-center justify-between border-b border-x-0 border-t-0 border-dark/80 py-4 px-6 lg:px-10 transition-[max-width,background-color,box-shadow,margin,padding] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          maxWidth: scrolled ? "1280px" : "100%",
          marginTop: scrolled ? "12px" : "0px",
          backgroundColor: scrolled
            ? "hsl(var(--cream) / 0.88)"
            : "hsl(var(--cream) / 0.6)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: scrolled
            ? "0 8px 24px -12px hsl(var(--dark) / 0.2)"
            : "none",
          backgroundImage:
            "radial-gradient(80% 120% at 50% 0%, hsl(var(--gold) / 0.12), transparent 70%)",
        }}
      >
        <a href="#" className="flex items-center gap-2" aria-label="freelanccomm.in">
          <span className="relative inline-flex items-end leading-none">
            <span
              className="font-display-bold leading-none text-gold"
              style={{ fontSize: "2.1rem" }}
            >
              F
            </span>
            <span
              className="font-display-bold leading-none text-dark"
              style={{ fontSize: "1.25rem", marginLeft: "-0.05rem", paddingBottom: "0.1rem" }}
            >
              c
            </span>
          </span>
          <span className="hidden font-display-bold text-lg text-dark sm:inline md:text-xl">
            freelanccomm<span className="text-gold">.in</span>
          </span>
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
          Contact Us →
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
