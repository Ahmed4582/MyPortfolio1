"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: 'beginner' | 'intermediate' | 'expert';
  category: string;
}

interface SkillCardProps {
  skill: Skill;
  t: (key: any) => string;
}

export function SkillCard({ skill, t }: SkillCardProps) {
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

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <Card className="border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 hover:shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          {/* Skill Icon */}
          <div className="w-16 h-16 mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 group-hover:scale-110 transition-transform duration-300">
            <div className="w-full h-full text-2xl text-purple-600 dark:text-purple-400">
              {skill.icon}
            </div>
          </div>

          {/* Skill Name */}
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {skill.name}
          </h3>

          {/* Level Badge */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge className={`bg-gradient-to-r ${getLevelColor(skill.level)} text-white border-0`}>
              {getLevelLabel(skill.level)}
            </Badge>
            {skill.level === 'expert' && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700">
                <Star className="h-3 w-3 mr-1" />
                {t('skills.expertBadge')}
              </Badge>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
            <motion.div
              className={`h-2 rounded-full bg-gradient-to-r ${getLevelColor(skill.level)}`}
              initial={{ width: 0 }}
              animate={{ width: skill.level === 'beginner' ? '30%' : skill.level === 'intermediate' ? '60%' : '90%' }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          {/* Progress Text */}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {skill.level === 'beginner' ? '30%' : skill.level === 'intermediate' ? '60%' : '90%'} {t('skills.complete')}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
