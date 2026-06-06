import { memo, useMemo } from "react";
import { Award, BookOpen, Briefcase, Code, FileText, Globe, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import useJsonData from "../hooks/useJsonData";

const aboutItems = [
  {
    title: "Bio",
    icon: Sparkles,
    copy: "Frontend Developer focused on responsive React experiences, practical UX, and clean implementation details that make interfaces reliable across devices.",
  },
  {
    title: "Education",
    icon: BookOpen,
    copy: "Computer Science and Mathematics student building a strong foundation in software engineering, algorithms, and web application architecture.",
  },
  {
    title: "Experience",
    icon: Briefcase,
    copy: "1.5+ years building React, Next.js, JavaScript, TypeScript, HTML, CSS, and Tailwind projects across solo and collaborative work.",
  },
  {
    title: "Current Work",
    icon: Code,
    copy: "Developing JSON-driven portfolio sections, accessible UI patterns, and client-side workflows with Framer Motion and EmailJS.",
  },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const AboutPage = () => {
  const { data: projects }     = useJsonData("/data/projects.json");
  const { data: certificates } = useJsonData("/data/certificates.json");

  const yearsExperience = useMemo(() => {
    const start = new Date("2023-11-06");
    const today = new Date();
    return (
      today.getFullYear() -
      start.getFullYear() -
      (today < new Date(today.getFullYear(), start.getMonth(), start.getDate()) ? 1 : 0)
    );
  }, []);

  const stats = [
    { icon: Code,    value: projects.length,     label: "Projects",      desc: "Live & demo work" },
    { icon: Award,   value: certificates.length,  label: "Certificates",  desc: "Validated learning" },
    { icon: Globe,   value: yearsExperience,       label: "Years",         desc: "Focused practice" },
  ];

  return (
    <section
      id="About"
      className="overflow-hidden bg-[#060913] px-[5%] py-20 text-white lg:px-[10%]"
    >
      {/* Section header */}
      <div className="mb-14 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          Who I Am
        </p>
        <h2 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          About Me
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-400">
          Transforming ideas into accessible, responsive digital experiences.
        </p>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_360px]">

          {/* ── Left content ── */}
          <div className="space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Ahmed Naser Metwally
              </p>
              <h3 className="mt-3 text-3xl font-bold text-slate-100 md:text-4xl leading-snug">
                Frontend developer building practical web interfaces.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-400">
                I work with React, Tailwind CSS, JavaScript, TypeScript, and
                modern frontend tooling to create fast, usable interfaces. I use
                AI as a professional tool to accelerate research and iteration
                while keeping implementation decisions grounded in clear UX and
                maintainable code.
              </p>
            </div>

            {/* Info cards grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {aboutItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-all duration-300 hover:border-cyan-500/20 hover:bg-cyan-500/[0.04]"
                  >
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.copy}</p>
                  </motion.article>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://drive.google.com/file/d/10RVNng_lPuV5UnaWvZ-hMb5BPCkWQrd3/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-90"
              >
                <FileText className="h-4 w-4" />
                Download CV
              </a>
              <a
                href="#Portofolio"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/5 px-5 py-3 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500/15"
              >
                <Code className="h-4 w-4" />
                View Projects
              </a>
            </div>
          </div>

          {/* ── Right — Photo ── */}
          <div className="mx-auto w-full max-w-[360px]">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border border-cyan-500/15 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
                <img
                  src="/Photo.jpg"
                  alt="Ahmed Naser Metwally"
                  className="aspect-square w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.a
                key={stat.label}
                href="#Portofolio"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-all duration-300 hover:border-cyan-500/25 hover:bg-cyan-500/[0.04]"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-5xl font-extrabold text-white">{stat.value}</span>
                </div>
                <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-200">
                  {stat.label}
                </h4>
                <p className="mt-1 text-sm text-slate-500">{stat.desc}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(AboutPage);
