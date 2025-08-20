"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./project-card";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: { name: string; url: string; }[];
  image: string;
  category: string;
  year: number;
  duration: string;
  complexity: string;
}

interface ProjectGridProps {
  projects: Project[];
  getCategoryIcon: (category: string) => React.ReactNode;
  getCategoryColor: (category: string) => string;
  getCategoryLabel: (category: string) => string;
  getComplexityColor: (complexity: string) => string;
  getComplexityLabel: (complexity: string) => string;
  t: (key: any) => string;
  language: string;
}

export function ProjectGrid({
  projects,
  getCategoryIcon,
  getCategoryColor,
  getCategoryLabel,
  getComplexityColor,
  getComplexityLabel,
  t,
  language
}: ProjectGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  if (projects.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-gray-500 dark:text-gray-400 text-lg">
          {t('projects.noProjectsInCategory')}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
    >
      <AnimatePresence mode="wait">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            isFeatured={false}
            getCategoryIcon={getCategoryIcon}
            getCategoryColor={getCategoryColor}
            getCategoryLabel={getCategoryLabel}
            getComplexityColor={getComplexityColor}
            getComplexityLabel={getComplexityLabel}
            t={t}
            language={language}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
