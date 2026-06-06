import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const blobRefs = useRef([]);

  useEffect(() => {
    let requestId;

    const handleScroll = () => {
      const scroll = window.pageYOffset;
      blobRefs.current.forEach((blob, i) => {
        if (!blob) return;
        const x = Math.sin(scroll / 120 + i * 0.8) * 280;
        const y = Math.cos(scroll / 120 + i * 0.8) * 50;
        blob.style.transform = `translate(${x}px, ${y}px)`;
        blob.style.transition = "transform 1.6s ease-out";
      });
      requestId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Cyan blob — top right */}
      <div
        ref={(r) => (blobRefs.current[0] = r)}
        className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-cyan-500 rounded-full mix-blend-screen filter blur-[140px] opacity-[0.07]"
      />
      {/* Blue blob — center left */}
      <div
        ref={(r) => (blobRefs.current[1] = r)}
        className="absolute top-1/3 -left-32 w-[420px] h-[420px] bg-blue-500 rounded-full mix-blend-screen filter blur-[130px] opacity-[0.06]"
      />
      {/* Cyan/teal blob — bottom right */}
      <div
        ref={(r) => (blobRefs.current[2] = r)}
        className="absolute -bottom-24 right-1/4 w-[460px] h-[460px] bg-sky-400 rounded-full mix-blend-screen filter blur-[140px] opacity-[0.05]"
      />
      {/* Subtle indigo blob — bottom left */}
      <div
        ref={(r) => (blobRefs.current[3] = r)}
        className="absolute bottom-0 -left-20 w-[360px] h-[360px] bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-[0.05]"
      />

      {/* Fine grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#60a5fa 1px,transparent 1px),linear-gradient(to bottom,#60a5fa 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial vignette — keeps edges dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(34,211,238,0.03),transparent)]" />
    </div>
  );
};

export default AnimatedBackground;
