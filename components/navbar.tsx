"use client";

import { useState, useEffect } from "react";
import {
  Facebook,
  Github,
  Inbox,
  Linkedin,
  Menu,
  MessageCircleCode,
  Search,
  X,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { t, language, dir } = useLanguage();

  const navItems = [
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.skills"), href: "#skills" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.experience"), href: "#experience" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const socialMedia = [
    {
      name: "Github",
      href: "https://github.com/Ahmed4582",
      icon: Github,
    },
    {
      name: "Linkedin",
      href: "https://www.linkedin.com/in/ahmed-naser-b1050b27b/",
      icon: Linkedin,
    },
    {
      name: "Email",
      href: "mailto:ahmed269117@gmail.com",
      icon: Inbox,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled
      setScrolled(window.scrollY > 20);
      
      // Update active section
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-lg border-b border-blue-200/30 dark:border-purple-800/20' 
        : 'bg-transparent'
    } ${dir === 'rtl' ? 'font-arabic' : ''}`}>
      <div className="max-w-full mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo & Controls */}
          <div className="flex items-center justify-between space-x-6">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span className="animate-pulse text-2xl text-black dark:text-white">Ahmed Naser</span>
            </Link>
            
            {/* Controls */}
            <div className="flex items-center space-x-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>

          {/* Right Side - Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`relative text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg group ${
                  activeSection === item.href.substring(1)
                    ? "text-blue-600 dark:text-purple-400 bg-blue-50 dark:bg-purple-900/20 shadow-md border border-blue-200/50 dark:border-purple-700/50"
                    : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-purple-400 hover:bg-blue-50 dark:hover:bg-purple-900/20 border border-transparent hover:border-blue-200/50 dark:hover:border-purple-700/50"
                }`}
              >
                {item.name}
                <span className={`absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${dir === 'rtl' ? 'scale-x-[-1]' : ''}`} />
                
                {/* Active indicator */}
                {activeSection === item.href.substring(1) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                )}
              </button>
            ))}
            
            {/* Social Media */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              {socialMedia?.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-purple-400 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-purple-900/20 transition-all duration-300 transform hover:scale-110 border border-transparent hover:border-blue-200/50 dark:hover:border-purple-700/50"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Social Media Mobile */}
            <div className="flex items-center gap-2">
              {socialMedia?.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-purple-400 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-purple-900/20 transition-all duration-300 border border-transparent hover:border-blue-200/50 dark:hover:border-purple-700/50"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-4 text-gray-600 dark:text-gray-300 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-purple-900/20 transition-all duration-300 border border-transparent hover:border-blue-200/50 dark:hover:border-purple-700/50"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 dark:bg-zinc-800/95 backdrop-blur-md rounded-lg mt-2 border border-blue-200/30 dark:border-purple-800/20 shadow-xl">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-all duration-300 ${
                    activeSection === item.href.substring(1)
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:text-gray-300 dark:hover:bg-gradient-to-r dark:hover:from-blue-900/20 dark:hover:to-purple-900/20"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
