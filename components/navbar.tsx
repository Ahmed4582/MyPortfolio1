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
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const socialMedia = [
    {
      name: "Github",
      href: "https://github.com/Ahmed4582",
      icon: Github,
    },
    {
      name: "Linkedin",
      href: "https://www.linkedin.com/in/ahmed-naser-5075232b1",
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
  }, []);

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
    <nav className="fixed w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <>Ahmed</>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.href.substring(1)
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
            <ThemeToggle />
            {socialMedia?.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              {socialMedia?.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              ))}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-4 text-zinc-600 dark:text-zinc-300"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    activeSection === item.href.substring(1)
                      ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                      : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
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
