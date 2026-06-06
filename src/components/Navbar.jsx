import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import useScrollSpy from "../hooks/useScrollSpy";

const navItems = [
  { href: "#Home",       label: "Home" },
  { href: "#About",      label: "About" },
  { href: "#Skills",     label: "Skills" },
  { href: "#Portofolio", label: "Portfolio" },
  { href: "#Contact",    label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection           = useScrollSpy();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    setIsOpen(false);
  };

  const isActive = (href) => activeSection === href.substring(1);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isOpen
          ? "bg-[#060913]"
          : scrolled
          ? "bg-[#060913]/80 backdrop-blur-xl border-b border-white/[0.05]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-[5%] lg:px-[10%]">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a
            href="#Home"
            onClick={(e) => scrollToSection(e, "#Home")}
            className="text-lg font-bold font-mono tracking-tight"
          >
            <span className="text-slate-400">&lt;</span>
            <span className="text-white">Ahmed</span>
            <span className="text-cyan-400">.</span>
            <span className="text-cyan-400">dev</span>
            <span className="text-slate-400"> /&gt;</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-cyan-400 bg-cyan-400/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 pt-2 pb-6 space-y-1 border-t border-white/[0.05]">
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? "text-cyan-400 bg-cyan-400/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              style={{
                transitionDelay: `${i * 50}ms`,
                transform: isOpen ? "translateX(0)" : "translateX(20px)",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
