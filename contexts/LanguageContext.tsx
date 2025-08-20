"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import ar from '@/locales/ar.json';
import en from '@/locales/en.json';

type TranslationKey =
  | 'nav.home' | 'nav.about' | 'nav.skills' | 'nav.projects' | 'nav.experience' | 'nav.contact'
  | 'hero.title' | 'hero.subtitle' | 'hero.description' | 'hero.viewResume' | 'hero.viewCertificates'
  | 'about.title' | 'about.description1' | 'about.description2' | 'about.yearsExperience' | 'about.projectsCompleted' | 'about.technologiesMastered' | 'about.reactDev' | 'about.reactDesc' | 'about.typescriptDev' | 'about.typescriptDesc' | 'about.nodeDev' | 'about.nodeDesc'
  | 'skills.title' | 'skills.subtitle' | 'skills.frontend' | 'skills.backend' | 'skills.database' | 'skills.all' | 'skills.tools' | 'skills.performance' | 'skills.mobile' | 'skills.design' | 'skills.cloud' | 'skills.security' | 'skills.testing' | 'skills.beginner' | 'skills.intermediate' | 'skills.expert' | 'skills.expertBadge' | 'skills.complete' | 'skills.expertSkills' | 'skills.intermediateSkills' | 'skills.beginnerSkills'
  | 'projects.title' | 'projects.subtitle' | 'projects.viewLive' | 'projects.viewRepo' | 'projects.keyHighlights' | 'projects.featuredProjects' | 'projects.viewProject' | 'projects.noProjectsInCategory' | 'projects.page' | 'projects.of' | 'projects.all' | 'projects.webapp' | 'projects.landing' | 'projects.dashboard' | 'projects.portfolio' | 'projects.beginner' | 'projects.intermediate' | 'projects.advanced' | 'projects.months' | 'projects.weeks' | 'projects.week' | 'projects.month' | 'projects.previous' | 'projects.next' | 'projects.first' | 'projects.last'
  | 'experience.title' | 'experience.subtitle' | 'experience.present' | 'experience.months' | 'experience.years'
  | 'contact.title' | 'contact.subtitle' | 'contact.name' | 'contact.email' | 'contact.message' | 'contact.sendMessage' | 'contact.contactInfo' | 'contact.sending' | 'contact.openingWhatsApp' | 'contact.whatsappError' | 'contact.location' | 'contact.locationValue'
  | 'common.loading' | 'common.error' | 'common.success' | 'common.close' | 'common.next' | 'common.previous' | 'common.view' | 'common.download' | 'common.learnMore';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  dir: 'ltr' | 'rtl';
  t: (key: TranslationKey) => string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language, mounted]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: TranslationKey): string => {
    const translations = language === 'ar' ? ar : en;
    const value = key.split('.').reduce((obj, k) => obj?.[k], translations as any);
    
    if (value) return value;
    
    // Fallback to English if translation not found
    const enValue = key.split('.').reduce((obj, k) => obj?.[k], en as any);
    return enValue || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-gray-900" />;
  }

  return (
    <LanguageContext.Provider value={{ language, dir, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
