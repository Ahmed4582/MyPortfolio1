import PropTypes from "prop-types";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const ProjectCard = ({
  image,
  title,
  description,
  liveUrl,
  githubUrl,
  technologies = [],
  onClick,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={shouldReduceMotion ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="group flex h-[340px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0A1020] shadow-lg shadow-black/30 transition-all duration-300 hover:border-cyan-500/25 hover:shadow-cyan-500/10"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
      aria-label={`View details for ${title}`}
    >
      {/* Image — top 58% */}
      <div className="relative h-[58%] overflow-hidden flex-shrink-0">
        <img
          src={image || "/images/placeholder.jpg"}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }}
        />
        {/* Top gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#0A1020]/60" />

        {/* Hover arrow badge */}
        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-500/30 bg-[#060913]/70 text-cyan-400 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      {/* Info panel — bottom 42% */}
      <div className="flex flex-1 flex-col justify-between p-4">
        {/* Tech chips */}
        {technologies.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {technologies.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-cyan-500/20 bg-cyan-500/[0.08] px-2.5 py-0.5 text-[10px] font-medium text-cyan-400"
              >
                {t}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-0.5 text-[10px] font-medium text-slate-500">
                +{technologies.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="line-clamp-1 text-sm font-bold text-white sm:text-base group-hover:text-cyan-50 transition-colors">
          {title}
        </h3>

        {/* Action row */}
        <div className="mt-3 flex items-center gap-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-cyan-500/20 transition hover:opacity-90"
            >
              <ExternalLink className="h-3 w-3" />
              Live
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <Github className="h-3 w-3" />
              GitHub
            </a>
          )}
          <button
            type="button"
            onClick={onClick}
            className="ml-auto text-xs font-medium text-slate-500 transition hover:text-cyan-400"
          >
            Details →
          </button>
        </div>
      </div>
    </motion.article>
  );
};

ProjectCard.propTypes = {
  image:        PropTypes.string,
  title:        PropTypes.string.isRequired,
  description:  PropTypes.string.isRequired,
  liveUrl:      PropTypes.string,
  githubUrl:    PropTypes.string,
  technologies: PropTypes.arrayOf(PropTypes.string),
  onClick:      PropTypes.func.isRequired,
};

export default ProjectCard;
