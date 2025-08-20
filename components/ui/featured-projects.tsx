"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./project-card";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: { name: string; url: string; }[];
  image: string;
  category: string;
  featured?: boolean;
  year: number;
  duration: string;
  complexity: string;
}

interface FeaturedProjectsProps {
  projects: Project[];
  getCategoryIcon: (category: string) => React.ReactNode;
  getCategoryColor: (category: string) => string;
  getCategoryLabel: (category: string) => string;
  getComplexityColor: (complexity: string) => string;
  getComplexityLabel: (complexity: string) => string;
  t: (key: any) => string;
  language: string;
}

export function FeaturedProjects({
  projects,
  getCategoryIcon,
  getCategoryColor,
  getCategoryLabel,
  getComplexityColor,
  getComplexityLabel,
  t,
  language
}: FeaturedProjectsProps) {
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const featuredProjects = projects.filter(p => p.featured).slice(0, 2);

  if (featuredProjects.length === 0) return null;

  return (
    <motion.div
      className="mb-16"
      variants={itemVariants}
    >
      <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
        {t('projects.featuredProjects')}
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {featuredProjects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            isFeatured={true}
            getCategoryIcon={getCategoryIcon}
            getCategoryColor={getCategoryColor}
            getCategoryLabel={getCategoryLabel}
            getComplexityColor={getComplexityColor}
            getComplexityLabel={getComplexityLabel}
            t={t}
            language={language}
          />
        ))}
      </div>
    </motion.div>
  );
}
