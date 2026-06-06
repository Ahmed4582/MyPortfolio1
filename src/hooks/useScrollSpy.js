import { useEffect, useState } from "react";

export const useScrollSpy = () => {
  const [activeId, setActiveId] = useState("Home");

  useEffect(() => {
    const main = document.querySelector("main");
    const sections = Array.from(main?.querySelectorAll("[id]") || []);

    if (sections.length === 0 || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const ratios = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });

        const [bestId] = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0] || [];
        if (bestId) {
          setActiveId(bestId);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return activeId;
};

export default useScrollSpy;
