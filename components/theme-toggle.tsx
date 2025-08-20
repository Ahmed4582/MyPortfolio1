"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg transition-colors">
        <div className="h-5 w-5 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative group p-2 rounded-lg transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 hover:scale-110"
      aria-label="Toggle theme"
    >
      <div className="relative">
        {theme === "light" ? (
          <Sun className="h-5 w-5 text-yellow-500 transition-all duration-300 group-hover:rotate-90 group-hover:scale-110" />
        ) : (
          <Moon className="h-5 w-5 text-blue-400 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110" />
        )}
      </div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </button>
  );
}
