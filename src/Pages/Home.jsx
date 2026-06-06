import { useState, useEffect, useCallback, memo } from "react";
import PropTypes from "prop-types";
import { ExternalLink, Mail, Github } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Linkedin } from "lucide-react";
import { Telegram, WhatsApp } from "@mui/icons-material";

const TYPING_SPEED   = 90;
const ERASING_SPEED  = 45;
const PAUSE_DURATION = 2200;
const WORDS          = ["Frontend Developer", "React Specialist", "Next.js Engineer"];
const TECH_STACK     = ["React", "Next.js", "TypeScript", "Tailwind CSS"];

const SOCIAL_LINKS = [
  { icon: Github,    link: "https://github.com/Ahmed4582",                               label: "GitHub" },
  { icon: Linkedin,  link: "https://www.linkedin.com/in/ahmed-naser-95562140b",           label: "LinkedIn" },
  { icon: Telegram,  link: "https://t.me/Ahmedx_N",                                     label: "Telegram" },
  { icon: WhatsApp,  link: "https://wa.me/+20114239918",                                  label: "WhatsApp" },
];

/* ── Sub-components ── */

const SocialLink = memo(({ icon: Icon, link, label }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-200 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-400"
  >
    <Icon className="h-4 w-4" />
  </a>
));
SocialLink.displayName = "SocialLink";
SocialLink.propTypes = { icon: PropTypes.elementType.isRequired, link: PropTypes.string.isRequired, label: PropTypes.string.isRequired };

/* ── Main component ── */

const Home = () => {
  const [text,       setText]       = useState("");
  const [isTyping,   setIsTyping]   = useState(true);
  const [wordIndex,  setWordIndex]  = useState(0);
  const [charIndex,  setCharIndex]  = useState(0);
  const [isLoaded,   setIsLoaded]   = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    AOS.init({ once: true, offset: 10, duration: shouldReduceMotion ? 0 : 700 });
    setIsLoaded(true);
    if (shouldReduceMotion) setText(WORDS[0]);
    return () => setIsLoaded(false);
  }, [shouldReduceMotion]);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((p) => p + WORDS[wordIndex][charIndex]);
        setCharIndex((p) => p + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((p) => p.slice(0, -1));
        setCharIndex((p) => p - 1);
      } else {
        setWordIndex((p) => (p + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    if (shouldReduceMotion) return undefined;
    const id = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED);
    return () => clearTimeout(id);
  }, [handleTyping, isTyping, shouldReduceMotion]);

  return (
    <section
      id="Home"
      className={`relative min-h-screen bg-[#060913] px-[5%] lg:px-[10%] transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      <div className="mx-auto flex min-h-screen flex-col items-center justify-center lg:flex-row lg:justify-between gap-12 pt-16">

        {/* ── LEFT ── */}
        <div className="w-full space-y-7 lg:w-[55%]" data-aos="fade-right" data-aos-delay="100">

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Available for work
          </div>

          {/* Name */}
          <div className="space-y-1">
            <p className="text-base font-medium text-slate-400 tracking-wide">Hi, I&apos;m</p>
            <h1 className="text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
              Ahmed{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Naser
              </span>
            </h1>
          </div>

          {/* Typing effect */}
          <div className="flex h-8 items-center gap-1" data-aos="fade-up" data-aos-delay="300">
            <span className="text-xl font-light text-slate-300 sm:text-2xl">{text}</span>
            {!shouldReduceMotion && (
              <span className="ml-0.5 inline-block h-6 w-[2px] bg-gradient-to-b from-cyan-400 to-blue-500 animate-blink rounded-full" />
            )}
          </div>

          {/* Description */}
          <p className="max-w-lg text-base leading-relaxed text-slate-400" data-aos="fade-up" data-aos-delay="400">
            Building fast, accessible, and visually polished web experiences. I
            combine clean code with thoughtful UX to deliver interfaces that work
            great on every device.
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-2" data-aos="fade-up" data-aos-delay="500">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="600">
            <a
              href="#Portofolio"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:opacity-90 hover:shadow-cyan-500/30"
            >
              View Projects
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="#Contact"
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/5 px-6 py-3 text-sm font-semibold text-cyan-400 transition-all duration-200 hover:bg-cyan-500/15"
            >
              Contact Me
              <Mail className="h-4 w-4" />
            </a>
          </div>

          {/* Social links */}
          <div className="flex gap-3" data-aos="fade-up" data-aos-delay="700">
            {SOCIAL_LINKS.map((s) => (
              <SocialLink key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* ── RIGHT — Photo ── */}
        <div
          className="relative flex w-full items-center justify-center lg:w-[40%]"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          {/* Glow behind photo */}
          <div className="absolute inset-0 mx-auto h-[360px] w-[300px] rounded-3xl bg-gradient-to-br from-cyan-500/15 to-blue-600/15 blur-3xl" />

          {/* Photo card */}
          <div className="relative animate-glow overflow-hidden rounded-3xl border border-cyan-500/20 shadow-[0_0_60px_rgba(34,211,238,0.1)]">
            <img
              src="/Photo.jpg"
              alt="Ahmed Naser Metwally"
              className="h-[400px] w-[300px] object-cover object-top sm:h-[440px] sm:w-[330px]"
            />
            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#060913]/80 to-transparent" />

            {/* Name tag bottom */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Frontend Dev</p>
                <p className="text-sm font-bold text-white">Ahmed Naser</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open
              </span>
            </div>
          </div>

          {/* Floating badge — top right */}
          <div className="absolute -right-2 top-8 rounded-xl border border-cyan-500/30 bg-[#0A1020]/90 px-3 py-2 text-xs font-mono text-cyan-300 backdrop-blur-md sm:-right-6">
            ⚛ React & Next.js
          </div>

          {/* Floating badge — bottom left */}
          <div className="absolute -left-2 bottom-16 rounded-xl border border-blue-500/30 bg-[#0A1020]/90 px-3 py-2 text-xs font-mono text-blue-300 backdrop-blur-md sm:-left-6">
            16+ Projects
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 lg:flex">
        <span className="text-xs text-slate-500">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-slate-500/50 to-transparent" />
      </div>
    </section>
  );
};

export default memo(Home);
