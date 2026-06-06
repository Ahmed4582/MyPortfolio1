import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github, X, CheckCircle } from "lucide-react";
import useFocusTrap from "../../hooks/useFocusTrap";

const swipeThreshold = 80;

const ProjectModal = ({ projects, modalIndex, onClose, onPrev, onNext }) => {
  const project         = projects[modalIndex];
  const modalRef        = useRef(null);
  const shouldReduce    = useReducedMotion();
  useFocusTrap(modalRef, Boolean(project));

  useEffect(() => {
    if (!project) return undefined;
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "Escape")     onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev, project]);

  if (!project) return null;

  /* Split case_study into bullet points (split by ". ") */
  const bullets = project.case_study
    ? project.case_study.split(/\.\s+/).filter(Boolean)
    : [];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={onClose}
      >
        {/* Desktop prev arrow */}
        <button
          type="button"
          aria-label="Previous project"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-500/20 bg-[#060913]/80 text-white transition hover:bg-cyan-500/15 hover:border-cyan-500/40 md:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <motion.div
          key={project.id}
          ref={modalRef}
          drag={shouldReduce ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x >  swipeThreshold) onPrev();
            if (info.offset.x < -swipeThreshold) onNext();
          }}
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
          animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduce  ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
          transition={shouldReduce ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 30 }}
          className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-cyan-500/15 bg-[#060913] text-white shadow-2xl shadow-black/60"
          onMouseDown={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Close button */}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="grid lg:grid-cols-[55%_45%]">
            {/* Image */}
            <div className="relative min-h-[220px] bg-slate-950 lg:min-h-full">
              <img
                src={project.image || "/images/placeholder.jpg"}
                alt={project.title}
                className="h-full max-h-[480px] w-full object-cover lg:max-h-none"
                onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent lg:hidden" />
              {/* Project counter badge */}
              <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm">
                {modalIndex + 1} / {projects.length}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-5 overflow-y-auto p-6 md:p-7">
              {/* Title */}
              <div>
                <h2
                  id="modal-title"
                  className="text-xl font-bold leading-tight text-white md:text-3xl"
                >
                  {project.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {project.description}
                </p>
              </div>

              {/* Tech badges */}
              {project.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Features / Case Study */}
              {bullets.length > 0 && (
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-cyan-400" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA buttons */}
              <div className="mt-auto flex flex-wrap gap-3">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                )}
              </div>

              {/* Mobile nav */}
              <div className="grid grid-cols-2 gap-3 md:hidden">
                <button
                  type="button"
                  onClick={onPrev}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-white"
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-white"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Desktop next arrow */}
        <button
          type="button"
          aria-label="Next project"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-500/20 bg-[#060913]/80 text-white transition hover:bg-cyan-500/15 hover:border-cyan-500/40 md:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

ProjectModal.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id:           PropTypes.number.isRequired,
      title:        PropTypes.string.isRequired,
      description:  PropTypes.string.isRequired,
      image:        PropTypes.string,
      live_url:     PropTypes.string,
      github_url:   PropTypes.string,
      technologies: PropTypes.arrayOf(PropTypes.string),
      case_study:   PropTypes.string,
    }),
  ).isRequired,
  modalIndex: PropTypes.number.isRequired,
  onClose:    PropTypes.func.isRequired,
  onPrev:     PropTypes.func.isRequired,
  onNext:     PropTypes.func.isRequired,
};

export default ProjectModal;
