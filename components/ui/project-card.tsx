"use client";

import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectLink {
  name: string;
  url: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: ProjectLink[];
  image: string;
  category: string;
  year: number;
  duration: string;
  complexity: string;
}

interface ProjectCardProps {
  project: Project;
  isFeatured?: boolean;
  getCategoryIcon: (category: string) => React.ReactNode;
  getCategoryColor: (category: string) => string;
  getCategoryLabel: (category: string) => string;
  getComplexityColor: (complexity: string) => string;
  getComplexityLabel: (complexity: string) => string;
  t: (key: any) => string;
  language: string;
}

export function ProjectCard({ 
  project, 
  isFeatured = false, 
  getCategoryIcon, 
  getCategoryColor, 
  getCategoryLabel, 
  getComplexityColor, 
  getComplexityLabel,
  t,
  language
}: ProjectCardProps) {
  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  if (isFeatured) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -10, scale: 1.02 }}
        className="group h-full"
      >
        <Card className="border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-500 hover:shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm relative overflow-hidden h-full flex flex-col">
          {/* Project Image */}
          <div className="h-64 relative overflow-hidden flex-shrink-0">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-4 right-4">
              <Badge className={`bg-gradient-to-r ${getCategoryColor(project.category)} text-white border-0 flex items-center gap-2`}>
                {getCategoryIcon(project.category)}
                {getCategoryLabel(project.category)}
              </Badge>
            </div>

            {/* Year Badge */}
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200">
                {project.year}
              </Badge>
            </div>

            {/* Complexity Badge */}
            <div className="absolute bottom-4 left-4">
              <Badge className={getComplexityColor(project.complexity)}>
                {getComplexityLabel(project.complexity)}
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-6 flex-1 flex flex-col">
            <CardTitle className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-700">
              {project.title}
            </CardTitle>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-base leading-relaxed flex-1">
              {project.description}
            </p>

            {/* Project Meta */}
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{project.duration}</span>
              </div>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <Badge 
                  key={tech}
                  variant="secondary" 
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Project Links */}
            {project.link && (
              <div className="flex gap-3 mt-auto">
                {project.link.map((link, idx) => (
                  <Button
                    key={idx}
                    asChild
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-sm">
                        {link.name === 'View Project' ? t('projects.viewProject') : link.name}
                      </span>
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Regular project card
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8, scale: 1.02 }}
      className="group h-full"
    >
      <Card className="border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-500 hover:shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden h-full flex flex-col">
        {/* Project Image */}
        <div className="h-40 relative overflow-hidden flex-shrink-0">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-2 right-2">
            <Badge className={`bg-gradient-to-r ${getCategoryColor(project.category)} text-white border-0 text-xs flex items-center gap-1`}>
              {getCategoryIcon(project.category)}
              {getCategoryLabel(project.category)}
            </Badge>
          </div>

          {/* Year Badge */}
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 text-xs">
              {project.year}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4 flex-1 flex flex-col">
          <CardTitle className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {project.title}
          </CardTitle>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed flex-1">
            {project.description.length > 120 
              ? `${project.description.substring(0, 120)}...` 
              : project.description
            }
          </p>

          {/* Project Meta */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="h-3 w-3" />
              <span>{project.duration}</span>
            </div>
            <Badge className={getComplexityColor(project.complexity)}>
              {getComplexityLabel(project.complexity)}
            </Badge>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.technologies.map((tech) => (
              <Badge 
                key={tech}
                variant="secondary" 
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Project Links */}
          {project.link && (
            <div className="mt-auto">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200"
              >
                <Link
                  href={project.link[0]?.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-sm">
                    {t('projects.viewProject')}
                  </span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
