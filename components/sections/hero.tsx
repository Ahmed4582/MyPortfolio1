"use client";

import { ArrowDown, Sparkles, Code, Palette, Rocket, Zap, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
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

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const technologies = [
    { name: "React.js", variant: "default" },
    { name: "Next.js", variant: "secondary" },
    { name: "TypeScript", variant: "outline" },
    { name: "Node.js", variant: "destructive" },
  ];

  return (
    <section ref={ref} className={`h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden mt-20">
        <motion.div
          className="absolute top-20 left-10 text-blue-200 dark:text-blue-600/20"
          variants={floatingVariants}
          animate="float"
        >
          <Code className="h-32 w-32" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-purple-200 dark:text-purple-600/20"
          variants={floatingVariants}
          animate="float"
          style={{ animationDelay: "1s" }}
        >
          <Palette className="h-24 w-24" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-1/4 text-pink-200 dark:text-pink-600/20"
          variants={floatingVariants}
          animate="float"
          style={{ animationDelay: "2s" }}
        >
          <Sparkles className="h-16 w-16" />
        </motion.div>
      </div>

      {/* Additional background patterns for light mode */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)] dark:bg-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1),transparent_50%)] dark:bg-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(120,219,255,0.1),transparent_50%)] dark:bg-transparent" />

      <motion.div
        className="text-center space-y-8 px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 leading-tight"
          variants={itemVariants}
        >
          <span className="inline-block mt-44 sm:mt-20 md:mt-16 lg:mt-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
            {t('hero.title')}
          </span>
          <div className="inline-flex items-center ml-4">
            <Rocket className="h-16 w-16 text-blue-600 dark:text-blue-400 animate-bounce" />
          </div>
        </motion.div>
        
        <motion.p
          className="text-xl md:text-3xl text-gray-800 dark:text-gray-200 font-medium"
          variants={itemVariants}
        >
          {t('hero.subtitle')}
        </motion.p>
        
        <motion.div
          className="max-w-3xl mx-auto text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
          variants={itemVariants}
        >
          <span className="inline-block">
            {t('hero.description')}
          </span>
          <div className="inline-flex items-center ml-2">
            <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Technology Badges */}
        <motion.div
          className="flex justify-center gap-3 flex-wrap"
          variants={itemVariants}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <Badge variant={tech.variant as any} className="text-sm px-3 py-1 shadow-md">
                {tech.name}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* Resume & Certificate Buttons */}
        <motion.div
          className="flex justify-center gap-6 pt-8 flex-wrap"
          variants={itemVariants}
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <a
              href="https://drive.google.com/file/d/1DKYwTrQjWVrlsDtbWZACdjWtTUb3AydU/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mr-2">
                <span className="text-blue-600 text-xs font-bold">CV</span>
              </div>
              {t('hero.viewResume')}
            </a>
          </Button>
          
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <a
              href="https://drive.google.com/file/d/1931YDKN_P2DnYWIpK72GDfrvZLZgx0ud/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Star className="h-5 w-5 mr-2 text-yellow-300" />
              {t('hero.viewCertificates')}
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <Link
          href="#about"
    
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-6 w-6 text-blue-700 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-pink-400 transition-colors duration-300" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
