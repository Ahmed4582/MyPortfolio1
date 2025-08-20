"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useInView } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { ProjectCard } from "@/components/ui/project-card";
import { CategoryFilter } from "@/components/ui/category-filter";
import { FeaturedProjects } from "@/components/ui/featured-projects";
import { ProjectGrid } from "@/components/ui/project-grid";
import { Pagination } from "@/components/ui/pagination";
import { getCategoryIcon, getCategoryColor, getComplexityColor } from "@/lib/project-utils";  
import { createProjectsData } from "@/lib/project-data";

export default function Projects() {
  const { t, language, dir } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'dashboard' | 'ecommerce' | 'portfolio' | 'landing' | 'webapp' | 'mobile'>('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Get projects data
  const projects = createProjectsData(language);
  const PROJECTS_PER_PAGE = 6;

  // Helper functions
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'dashboard': return t('projects.dashboard');
      case 'ecommerce': return language === 'ar' ? 'تجارة إلكترونية' : 'E-commerce';
      case 'portfolio': return t('projects.portfolio');
      case 'landing': return t('projects.landing');
      case 'webapp': return t('projects.webapp');
      case 'mobile': return language === 'ar' ? 'تطبيق موبايل' : 'Mobile App';
      default: return category;
    }
  };

  const getComplexityLabel = (complexity: string) => {
    switch (complexity) {
      case 'beginner': return t('projects.beginner');
      case 'intermediate': return t('projects.intermediate');
      case 'advanced': return t('projects.advanced');
      default: return complexity;
    }
  };

  // Filter and paginate projects
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  // Animation variants
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

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Categories for filter
  const categories = [
    { key: 'all', label: t('projects.all') },
    { key: 'ecommerce', label: language === 'ar' ? 'تجارة إلكترونية' : 'E-commerce', icon: getCategoryIcon('ecommerce') },
    { key: 'webapp', label: t('projects.webapp'), icon: getCategoryIcon('webapp') },
    { key: 'landing', label: t('projects.landing'), icon: getCategoryIcon('landing') },
    { key: 'dashboard', label: t('projects.dashboard'), icon: getCategoryIcon('dashboard') },
    { key: 'portfolio', label: t('projects.portfolio'), icon: getCategoryIcon('portfolio') },
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category as any);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section ref={ref} id="projects" className={`py-20 relative overflow-hidden bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(147,51,234,0.08),transparent_50%)] dark:bg-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.08),transparent_50%)] dark:bg-transparent" />
      
      <motion.div
        className="max-w-7xl mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400"
          variants={itemVariants}
        >
          {t("projects.title")}
        </motion.h2>
        <motion.p
          className="text-xl text-center text-gray-700 dark:text-gray-300 mb-16"
          variants={itemVariants}
        >
          {t("projects.subtitle")}
        </motion.p>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Featured Projects */}
        {selectedCategory === 'all' && (
          <FeaturedProjects
            projects={projects}
            getCategoryIcon={getCategoryIcon}
            getCategoryColor={getCategoryColor}
            getCategoryLabel={getCategoryLabel}
            getComplexityColor={getComplexityColor}
            getComplexityLabel={getComplexityLabel}
            t={t}
            language={language}
          />
        )}

        {/* Projects Grid */}
        <ProjectGrid
          projects={paginatedProjects}
          getCategoryIcon={getCategoryIcon}
          getCategoryColor={getCategoryColor}
          getCategoryLabel={getCategoryLabel}
          getComplexityColor={getComplexityColor}
          getComplexityLabel={getComplexityLabel}
          t={t}
          language={language}
        />

        <Separator className="my-16 bg-purple-200 dark:bg-purple-800" />

        {/* Pagination */}
        {filteredProjects.length > PROJECTS_PER_PAGE && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            t={t}
            language={language}
          />
        )}
      </motion.div>
    </section>
  );
}
