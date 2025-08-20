"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useInView } from "framer-motion";
import { User, Code, Heart, Target, Sparkles, Zap, Globe, Database, Server, Star, CheckCircle } from "lucide-react";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function About() {
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

  const features = [
    {
      icon: Code,
      title: t('about.reactDev'),
      description: t('about.reactDesc')
    },
    {
      icon: Server,
      title: t('about.nodeDev'),
      description: t('about.nodeDesc')
    }
  ];

  const stats = [
    { label: t('about.yearsExperience'), value: '2+', icon: Star },
    { label: t('about.projectsCompleted'), value: '15+', icon: CheckCircle },
    { label: t('about.technologiesMastered'), value: '20+', icon: Zap },
  ];

  return (
    <section ref={ref} id="about" className={`py-24 px-6 relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(120,119,198,0.08),transparent_50%)] dark:bg-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(147,51,234,0.08),transparent_50%)] dark:bg-transparent" />
      
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
          variants={itemVariants}
        >
          {t("about.title")}
        </motion.h2>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative group"
            variants={itemVariants}
          >
            <Card className="overflow-hidden shadow-2xl border border-blue-200/30 dark:border-blue-800/20">
              <CardContent className="p-0">
                <div className="aspect-square rounded-3xl overflow-hidden relative">
                  <Image
                    src="/assets/myimage.jpeg"
                    alt="Profile Picture"
                    width={700}
                    height={700}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </CardContent>
            </Card>
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg"
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          
          <motion.div
            className="space-y-8"
            variants={itemVariants}
          >
            <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <motion.p
                variants={itemVariants}
                className="text-xl leading-relaxed"
              >
                {t('about.description1')}
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-xl leading-relaxed"
              >
                {t('about.description2')}
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200/50 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-2 mx-auto text-white shadow-md">
                      <stat.icon className="h-4 w-4" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Features grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8"
              variants={itemVariants}
            >
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200/50 dark:border-purple-800/50 hover:bg-blue-50/80 dark:hover:bg-purple-900/20 transition-all duration-300 group hover:shadow-lg"
                >
                  <CardContent className="p-0">
                    <motion.div
                      className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-3 text-white shadow-md"
                      variants={iconVariants}
                    >
                      <feature.icon className="h-6 w-6" />
                    </motion.div>
                    <CardTitle className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-base">
                      {feature.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
