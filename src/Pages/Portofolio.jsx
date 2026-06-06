import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Award, Boxes, Code, ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import useJsonData from "../hooks/useJsonData";
import ProjectCard from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import ProjectModal from "../components/portfolio/ProjectModal";
import CertificatesCarousel from "../components/portfolio/CertificatesCarousel";
import { SkeletonCard } from "../components/ui/Skeleton";

const tabs = [
  { id: "projects",      label: "Projects",      icon: Code },
  { id: "certificates",  label: "Certificates",  icon: Award },
  { id: "tech",          label: "Tech Stack",    icon: Boxes },
];

const techStacks = [
  { icon: "html.svg",       language: "HTML" },
  { icon: "css.svg",        language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg",   language: "Tailwind CSS" },
  { icon: "reactjs.svg",    language: "ReactJS" },
  { icon: "vite.svg",       language: "Vite" },
  { icon: "nodejs.svg",     language: "Node JS" },
  { icon: "bootstrap.svg",  language: "Bootstrap" },
  { icon: "firebase.svg",   language: "Firebase" },
  { icon: "MUI.svg",        language: "Material UI" },
  { icon: "vercel.svg",     language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
  { icon: "next.jpg",       language: "NextJS" },
  { icon: "ts.png",         language: "TypeScript" },
  { icon: "ant.jpg",        language: "Ant Design" },
  { icon: "shadcn.png",     language: "Shadcn UI" },
  { icon: "redux.png",      language: "Redux" },
];

const skeletonItems = Array.from({ length: 6 }, (_, i) => i);

/* ── Featured card (first / newest project) ── */
const FeaturedCard = ({ project, index, onClick }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
    className="group relative grid overflow-hidden rounded-2xl border border-cyan-500/15 bg-[#0A1020] shadow-xl shadow-black/30 transition-all duration-300 hover:border-cyan-500/30 lg:grid-cols-[55%_45%] lg:h-[400px]"
  >
    {/* Image */}
    <div className="relative h-[220px] overflow-hidden lg:h-full">
      <img
        src={project.image || "/images/placeholder.jpg"}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A1020]/60 hidden lg:block" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1020] via-transparent to-transparent lg:hidden" />

      {/* Featured badge */}
      <div className="absolute left-4 top-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500 px-3 py-1 text-xs font-bold text-[#060913] shadow-md shadow-cyan-500/30">
          ✦ Featured
        </span>
      </div>
    </div>

    {/* Info */}
    <div className="flex flex-col gap-4 p-6 lg:p-8">
      {/* Tech chips */}
      {project.technologies?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300"
            >
              {t}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-500">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Title + description */}
      <div>
        <h3 className="text-xl font-bold leading-snug text-white lg:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400 lg:text-base">
          {project.description}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-auto flex flex-wrap gap-3">
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-cyan-500/20 transition hover:opacity-90"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
        )}
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        )}
        <button
          type="button"
          onClick={() => onClick(index)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-2.5 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500/15"
        >
          Details
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  </motion.article>
);

/* ── Projects renderer ── */
const Portofolio = () => {
  const [activeTab,   setActiveTab]   = useState("projects");
  const [modalIndex,  setModalIndex]  = useState(null);
  const { data: projects,     loading: projectsLoading,     error: projectsError }  = useJsonData("/data/projects.json");
  const { data: certificates, loading: certificatesLoading }                         = useJsonData("/data/certificates.json");

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => b.id - a.id),
    [projects],
  );

  useEffect(() => { AOS.init({ once: false }); }, []);

  const handlePrev = useCallback(() => {
    setModalIndex((cur) => {
      if (cur === null || sortedProjects.length === 0) return cur;
      return (cur - 1 + sortedProjects.length) % sortedProjects.length;
    });
  }, [sortedProjects.length]);

  const handleNext = useCallback(() => {
    setModalIndex((cur) => {
      if (cur === null || sortedProjects.length === 0) return cur;
      return (cur + 1) % sortedProjects.length;
    });
  }, [sortedProjects.length]);

  const renderProjects = () => {
    if (projectsLoading) {
      return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skeletonItems.map((i) => <SkeletonCard key={i} />)}
        </div>
      );
    }
    if (projectsError) {
      return (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-300">
          {projectsError}
        </div>
      );
    }

    const [featured, ...rest] = sortedProjects;

    return (
      <div className="space-y-5 pb-12">
        {/* Featured — always visible */}
        <FeaturedCard
          project={featured}
          index={0}
          onClick={setModalIndex}
        />

        {/* Swiper — all screen sizes */}
        <div>
          <p className="mb-4 text-xs text-slate-500">
            {rest.length} more projects — swipe or use arrows
          </p>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={16}
            slidesPerView={1.2}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            loop={rest.length > 3}
            breakpoints={{
              480:  { slidesPerView: 1.5, spaceBetween: 16 },
              640:  { slidesPerView: 2,   spaceBetween: 18 },
              900:  { slidesPerView: 2.5, spaceBetween: 20 },
              1024: { slidesPerView: 3,   spaceBetween: 20 },
            }}
            className="!overflow-visible pb-12"
            a11y={{ prevSlideMessage: "Previous project", nextSlideMessage: "Next project" }}
          >
            {rest.map((project, i) => (
              <SwiperSlide key={project.id}>
                <ProjectCard
                  image={project.image}
                  title={project.title}
                  description={project.description}
                  liveUrl={project.live_url}
                  githubUrl={project.github_url}
                  technologies={project.technologies}
                  onClick={() => setModalIndex(i + 1)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  };

  const renderTechStack = () => (
    <div className="grid grid-cols-2 gap-5 pb-[5%] md:grid-cols-3 lg:grid-cols-6 lg:gap-8">
      {techStacks.map((stack) => (
        <TechStackIcon
          key={stack.language}
          TechStackIcon={stack.icon}
          Language={stack.language}
        />
      ))}
    </div>
  );

  return (
    <section
      className="w-full overflow-hidden bg-[#060913] px-[5%] pt-14 sm:mt-0 lg:px-[10%]"
      id="Portofolio"
    >
      {/* Header */}
      <div className="pb-10 text-center" data-aos="fade-up" data-aos-duration="800">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          My Work
        </p>
        <h2 className="mx-auto inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-center text-3xl font-bold text-transparent md:text-5xl">
          Portfolio Showcase
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-400 md:text-base">
          Explore my journey through projects, certifications, and technical expertise.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-2 backdrop-blur">
        <div className="grid grid-cols-3 gap-2">
          {tabs.map((tab) => {
            const Icon     = tab.icon;
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-2 text-sm font-semibold transition-all duration-200 md:flex-row md:gap-2 md:text-base ${
                  selected
                    ? "bg-cyan-500/15 text-cyan-400 shadow-lg shadow-cyan-500/10 border border-cyan-500/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
                aria-pressed={selected}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
      >
        {activeTab === "projects"     && renderProjects()}
        {activeTab === "certificates" && (
          <CertificatesCarousel certificates={certificates} loading={certificatesLoading} />
        )}
        {activeTab === "tech"         && renderTechStack()}
      </motion.div>

      {/* Modal */}
      {modalIndex !== null && (
        <ProjectModal
          projects={sortedProjects}
          modalIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
};

export default Portofolio;
