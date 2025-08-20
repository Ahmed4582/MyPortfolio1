"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SkillsTabsProps {
  categories: { key: string; label: string; icon: React.ReactNode }[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function SkillsTabs({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: SkillsTabsProps) {
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3 mb-12"
      variants={itemVariants}
    >
      {categories.map((category) => (
        <Button
          key={category.key}
          onClick={() => onCategoryChange(category.key)}
          variant={selectedCategory === category.key ? "default" : "outline"}
          size="lg"
          className={`transition-all duration-300 transform hover:scale-105 ${
            selectedCategory === category.key
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
              : "hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-300 dark:border-purple-600"
          }`}
        >
          <span className="mr-2">
            {category.icon}
          </span>
          {category.label}
        </Button>
      ))}
    </motion.div>
  );
}
