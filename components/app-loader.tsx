"use client";

import { useEffect, useState } from "react";

export default function AppLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoaded = () => {
      // small delay for a smoother fade-out
      setTimeout(() => setIsLoading(false), 250);
    };

    if (document.readyState === "complete") {
      handleLoaded();
    } else {
      window.addEventListener("load", handleLoaded);
    }

    // fallback in case load event doesn't fire (e.g., SSR cached)
    const fallback = setTimeout(() => setIsLoading(false), 1500);

    return () => {
      window.removeEventListener("load", handleLoaded);
      clearTimeout(fallback);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-purple-400/30 border-t-purple-600 dark:border-purple-600/30 dark:border-t-purple-300 animate-spin" />
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-600 dark:text-gray-300">
          Loading...
        </div>
      </div>
    </div>
  );
}


