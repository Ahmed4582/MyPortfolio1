import { Github, Linkedin, Mail } from "lucide-react";
import { Telegram, WhatsApp } from "@mui/icons-material";

const navLinks = [
  { href: "#Home",       label: "Home" },
  { href: "#About",      label: "About" },
  { href: "#Skills",     label: "Skills" },
  { href: "#Portofolio", label: "Portfolio" },
  { href: "#Contact",    label: "Contact" },
];

const socialLinks = [
  { icon: Github,   href: "https://github.com/Ahmed4582",                             label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ahmed-naser-95562140b",         label: "LinkedIn" },
  { icon: Telegram, href: "https://t.me/Ahmedx_N",                                   label: "Telegram" },
  { icon: WhatsApp, href: "https://wa.me/+20114239918",                               label: "WhatsApp" },
  { icon: Mail,     href: "mailto:an2900234@gmail.com",                               label: "Email" },
];

const scrollTo = (e, href) => {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
};

const Footer = () => (
  <footer className="bg-[#060913] border-t border-white/[0.06]">
    <div className="mx-auto max-w-6xl px-[5%] lg:px-[10%] py-14">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

        {/* Brand */}
        <div className="space-y-4">
          <a href="#Home" onClick={(e) => scrollTo(e, "#Home")} className="text-lg font-bold font-mono">
            <span className="text-slate-400">&lt;</span>
            <span className="text-white">Ahmed</span>
            <span className="text-cyan-400">.</span>
            <span className="text-cyan-400">dev</span>
            <span className="text-slate-400"> /&gt;</span>
          </a>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            Frontend developer building fast, accessible, and visually polished
            web experiences with React and Next.js.
          </p>
          {/* Social row */}
          <div className="flex gap-2.5 pt-1">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-200 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Navigation
          </h4>
          <ul className="space-y-2.5">
            {navLinks.map(({ href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => scrollTo(e, href)}
                  className="text-sm text-slate-400 transition-colors duration-200 hover:text-cyan-400"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact quick */}
        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Contact
          </h4>
          <ul className="space-y-2.5">
            <li>
              <a
                href="mailto:an2900234@gmail.com"
                className="text-sm text-slate-400 transition-colors duration-200 hover:text-cyan-400"
              >
                an2900234@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/+20114239918"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 transition-colors duration-200 hover:text-cyan-400"
              >
                +20 114 239 918
              </a>
            </li>
            <li>
              <a
                href="https://drive.google.com/file/d/10RVNng_lPuV5UnaWvZ-hMb5BPCkWQrd3/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Download CV →
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Ahmed Naser Metwally. All rights reserved.
        </p>
        <p className="text-xs text-slate-600">
          Built with React &amp; Tailwind CSS
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
