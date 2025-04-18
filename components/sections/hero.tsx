import { ArrowDown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center relative">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Ahmed Nasser
        </h1>
        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300">
          Front-End Engineer with 2+ Years of Hands-On Experience
        </p>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-zinc-500 dark:text-zinc-400">
          Crafting performant, accessible, and aesthetically refined web
          interfaces using modern front-end technologies and scalable design
          systems.
        </p>
      </div>
      <Link
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Scroll down to about section"
      >
        <ArrowDown className="h-6 w-6 text-zinc-600 dark:text-zinc-300" />
      </Link>
    </section>
  );
}
