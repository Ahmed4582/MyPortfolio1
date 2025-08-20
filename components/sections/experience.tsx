"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, TrendingUp } from "lucide-react";
import { useRef } from "react";

const experiences = [
  {
    company: "Inteshar",
    position: "Frontend Developer",
    period: "2024 - Present",
    location: "Remote",
    description:
      "Developed and optimized web applications using React. Streamlined deployment processes with CI/CD pipelines, achieving a 40% performance improvement.",
    achievements: [
      "40% performance improvement through optimization",
      "CI/CD pipeline implementation",
      "React-based web applications development"
    ]
  },
  {
    company: "Stellar Glaze",
    position: "Frontend Developer",
    period: "12/2024 - 09/2025",
    location: "Remote",
    description:
      "Developed and optimized web applications using React. Streamlined deployment processes with CI/CD pipelines, achieving a 40% performance improvement.",
    achievements: [
      "40% performance improvement through optimization",
      "CI/CD pipeline implementation",
      "React-based web applications development",
      "Landing page development",
      "LMS development",
      "AI-powered conference platform development"
    ]
  },
  {
    company: "All Safe",
    position: "Frontend Developer",
    period: "04/2024 - 10/2024",
    location: "Remote",
    description:
      "Collaborated with cross-functional teams to design and implement user-friendly interfaces using React. Enhanced application scalability and maintainability by adopting best practices and modern tools.",
    achievements: [
      "Cross-functional team collaboration",
      "User-friendly interface implementation",
      "Application scalability improvements"
    ]
  },
  {
    company: "Freelancer",
    position: "Frontend Developer",
    period: "2024 - Present",
    location: "Remote",
    description:
      "Delivered tailored web solutions for diverse clients across multiple industries. Built Frontend applications using React, Next.js, admin dashboards, and responsive UI/UX. Managed entire development lifecycle from planning to deployment.",
    achievements: [
      "Diverse industry solutions",
      "Full development lifecycle management",
      "Admin dashboard development"
    ]
  },
];

export default function Experience() {
  const { t, language, dir } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "backOut",
      },
    },
  };

  return (
    <section ref={ref} id="experience" className={`py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-800/50 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden ${dir === 'rtl' ? 'font-arabic' : ''}`}>
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 dark:bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 dark:bg-purple-600/20 rounded-full blur-3xl" />
      </div>
      
      <motion.div
        className="max-w-5xl mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
          variants={itemVariants}
        >
          {t("experience.title")}
        </motion.h2>
        
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
            >
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
              
              {/* Timeline dot */}
              <motion.div
                className="absolute left-0 top-0 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg border-4 border-white dark:border-gray-800"
                variants={iconVariants}
                whileHover={{ scale: 1.2 }}
              />
              
              {/* Content */}
              <div className="ml-16 relative">
                <motion.div
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-blue-200/30 dark:border-purple-800/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/90 dark:hover:bg-gray-800/90"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <motion.h3
                        className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2"
                        whileHover={{ x: 5 }}
                      >
                        {exp.position}
                      </motion.h3>
                      
                      <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Briefcase className="h-4 w-4 text-blue-500" />
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            {exp.company}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-purple-500" />
                          <span>{exp.period}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-pink-500" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Achievement badge */}
                    <motion.div
                      className="mt-4 lg:mt-0"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium">
                        <TrendingUp className="h-4 w-4" />
                        <span>{language === 'ar' ? 'مطور نشط' : 'Active Developer'}</span>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Description */}
                  <motion.p
                    className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                    whileHover={{ x: 5 }}
                  >
                    {exp.description}
                  </motion.p>
                  
                  {/* Achievements */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                      {language === 'ar' ? 'الإنجازات الرئيسية:' : 'Key Achievements:'}
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start space-x-3 text-gray-600 dark:text-gray-400"
                          whileHover={{ x: 5 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
