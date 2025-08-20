"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useInView } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { 
  Code2, 
  Palette, 
  Database, 
  Globe, 
  Smartphone, 
  Cloud, 
  Shield, 
  Zap,
  Monitor,
  Package,
  GitBranch,
  Server,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const skillsByCategory = {
  frontend: [
    { name: "React", category: "JavaScript Library", icon: <Code2 className="w-5 h-5" />, level: "expert" },
    { name: "Next.js", category: "React Framework", icon: <Code2 className="w-5 h-5" />, level: "expert" },
    { name: "Tailwind CSS", category: "Utility-First CSS Framework", icon: <Palette className="w-5 h-5" />, level: "expert" },
    { name: "Bootstrap CSS", category: "Component-Based CSS Framework", icon: <Palette className="w-5 h-5" />, level: "intermediate" },
    { name: "JavaScript", category: "Programming Language", icon: <Code2 className="w-5 h-5" />, level: "expert" },
    { name: "TypeScript", category: "Strongly Typed Superset of JavaScript", icon: <Code2 className="w-5 h-5" />, level: "expert" },
    { name: "HTML5", category: "Markup Language", icon: <Code2 className="w-5 h-5" />, level: "expert" },
    { name: "CSS3", category: "Style Sheet Language", icon: <Palette className="w-5 h-5" />, level: "expert" },
    { name: "SCSS / SASS", category: "CSS Preprocessor", icon: <Palette className="w-5 h-5" />, level: "intermediate" },
    { name: "Webpack", category: "Module Bundler", icon: <Package className="w-5 h-5" />, level: "beginner" },
    { name: "Vite", category: "Frontend Build Tool", icon: <Zap className="w-5 h-5" />, level: "intermediate" },
    { name: "jQuery", category: "Legacy JavaScript Library", icon: <Code2 className="w-5 h-5" />, level: "intermediate" },
    { name: "ES6+", category: "Modern JavaScript Features", icon: <Code2 className="w-5 h-5" />, level: "expert" },
    { name: "Framer Motion", category: "Animation Library for React", icon: <Zap className="w-5 h-5" />, level: "intermediate" },
    { name: "Lucide Icons", category: "Icon Set for React Projects", icon: <Package className="w-5 h-5" />, level: "intermediate" },
    { name: "Select2", category: "Enhanced Select UI Component", icon: <Package className="w-5 h-5" />, level: "intermediate" },
    { name: "Swiper.js", category: "Touch Slider Library", icon: <Package className="w-5 h-5" />, level: "intermediate" },
    { name: "Chart.js / Recharts", category: "Data Visualization Libraries", icon: <Package className="w-5 h-5" />, level: "intermediate" },
    { name: "Responsive Design", category: "Frontend Development Principle", icon: <Monitor className="w-5 h-5" />, level: "expert" },
    { name: "Cross-Browser Compatibility", category: "Frontend Best Practice", icon: <Globe className="w-5 h-5" />, level: "intermediate" },
    { name: "Accessibility (a11y)", category: "Web Accessibility Standards", icon: <Smartphone className="w-5 h-5" />, level: "intermediate" },
  ],
  backend: [
    { name: "Node.js", category: "Runtime Environment", icon: <Server className="w-5 h-5" />, level: "intermediate" },
    { name: "Express.js", category: "Web Framework", icon: <Server className="w-5 h-5" />, level: "intermediate" },
    { name: "REST APIs", category: "API Architecture", icon: <Globe className="w-5 h-5" />, level: "intermediate" },
    { name: "GraphQL", category: "Query Language", icon: <GitBranch className="w-5 h-5" />, level: "beginner" },
    { name: "JWT", category: "Authentication", icon: <Shield className="w-5 h-5" />, level: "intermediate" },
    { name: "OAuth", category: "Authorization", icon: <Shield className="w-5 h-5" />, level: "beginner" },
    { name: "Middleware", category: "Request Processing", icon: <Server className="w-5 h-5" />, level: "intermediate" },
    { name: "Error Handling", category: "Backend Best Practice", icon: <Shield className="w-5 h-5" />, level: "intermediate" },
  ],
  database: [
    { name: "MongoDB", category: "NoSQL Database", icon: <Database className="w-5 h-5" />, level: "beginner" },
    { name: "SQL", category: "Relational Database", icon: <Database className="w-5 h-5" />, level: "intermediate" },
    { name: "Database Design", category: "Data Architecture", icon: <Database className="w-5 h-5" />, level: "intermediate" },
    { name: "Data Modeling", category: "Database Schema", icon: <Database className="w-5 h-5" />, level: "beginner" },
    { name: "Indexing", category: "Performance Optimization", icon: <Zap className="w-5 h-5" />, level: "beginner" },
    { name: "Data Validation", category: "Data Integrity", icon: <Shield className="w-5 h-5" />, level: "intermediate" },
  ],
};

const ITEMS_PER_PAGE = 6;

export default function Skills() {
  const { t, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<"frontend" | "backend" | "database">("frontend");
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const currentSkills = skillsByCategory[activeTab];
  const totalPages = Math.ceil(currentSkills.length / ITEMS_PER_PAGE);

  const paginatedSkills = currentSkills.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'from-blue-500 to-cyan-500';
      case 'intermediate': return 'from-purple-500 to-pink-500';
      case 'expert': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return t('skills.beginner');
      case 'intermediate': return t('skills.intermediate');
      case 'expert': return t('skills.expert');
      default: return level;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const tabVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section ref={ref} id="skills" className={`py-20 relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.08),transparent_50%)] dark:bg-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.08),transparent_50%)] dark:bg-transparent" />
      
      <motion.div
        className="max-w-7xl mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-cyan-700 to-purple-700 dark:from-blue-400 dark:via-cyan-400 dark:to-purple-400"
          variants={itemVariants}
        >
          {t("skills.title")}
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg md:text-xl text-center text-gray-700 dark:text-gray-300 mb-8 sm:mb-16"
          variants={itemVariants}
        >
          {t("skills.subtitle")}
        </motion.p>

        {/* Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12"
          variants={containerVariants}
        >
          {["frontend", "backend", "database"].map((tab) => (
            <motion.button
              key={tab}
              variants={tabVariants}
              animate={activeTab === tab ? {
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                ]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab(tab as any);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-xl font-semibold transition-all duration-300 ${
                activeTab === (tab as any)
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-gray-200 dark:border-gray-700"
              }`}
            >
              <span className="flex items-center gap-2">
                {tab === 'frontend' && <Palette className="w-5 h-5" />}
                {tab === 'backend' && <Server className="w-5 h-5" />}
                {tab === 'database' && <Database className="w-5 h-5" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 sm:mb-12"
          variants={containerVariants}
        >
          {paginatedSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              animate={{
                scale: [1, 1.02, 1],
                y: [0, -2, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{
                scale: 1.05,
                y: -8,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <div className="border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 hover:shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 h-full">
                {/* Skill Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-full h-full text-purple-600 dark:text-purple-400">
                      {skill.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {skill.category}
                    </p>
                  </div>
                </div>

                {/* Level Badge */}
                <div className="flex justify-between items-center">
                  <div className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r text-white border-0"
                    style={{
                      background: `linear-gradient(to right, ${getLevelColor(skill.level)})`
                    }}>
                    {getLevelLabel(skill.level)}
                  </div>
                  <span className="text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center gap-2 sm:gap-4"
            variants={itemVariants}
          >
            <motion.button
              animate={{
                scale: [1, 1.05, 1],
                x: [0, -1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-gray-200 dark:border-gray-700">
              {t('projects.page')} {currentPage} {t('projects.of')} {totalPages}
            </span>
            <motion.button
              animate={{
                scale: [1, 1.05, 1],
                x: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        )}

        <Separator className="my-16 bg-blue-200 dark:bg-blue-800" />

        {/* Skills Summary */}
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {Object.values(skillsByCategory).flat().filter(s => s.level === 'expert').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {t('skills.expertSkills')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {Object.values(skillsByCategory).flat().filter(s => s.level === 'intermediate').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {t('skills.intermediateSkills')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                {Object.values(skillsByCategory).flat().filter(s => s.level === 'beginner').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {t('skills.beginnerSkills')}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}