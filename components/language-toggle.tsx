"use client";

import { Globe, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="relative group p-2 rounded-lg transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 hover:scale-110"
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
    >
      <div className="relative">
        <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400 transition-all duration-300 group-hover:rotate-12" />
        <Languages className="h-3 w-3 text-pink-500 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </div>
      
      {/* Language indicator */}
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
        <span className="text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {language === 'en' ? 'EN' : 'AR'}
        </span>
      </div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </button>
  );
}
