"use client";

import { motion } from "framer-motion";
import { SkillCard } from "./skill-card";

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: 'beginner' | 'intermediate' | 'expert';
  category: string;
}

interface SkillsGridProps {
  skills: Skill[];
  t: (key: any) => string;
}

export function SkillsGrid({ skills, t }: SkillsGridProps) {
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

  if (skills.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-gray-500 dark:text-gray-400 text-lg">
          لا توجد مهارات في هذه الفئة
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
    >
      {skills.map((skill) => (
        <SkillCard
          key={skill.name}
          skill={skill}
          t={t}
        />
      ))}
    </motion.div>
  );
}
