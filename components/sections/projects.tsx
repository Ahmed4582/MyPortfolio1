"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ProjectLink {
  name: string;
  url: string;
}

interface Project {
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
  link?: ProjectLink[];
}

const projects: Project[] = [
  {
    title: "ElFahd",
    description:
      "This is an introductory website for a major law firm in Saudi Arabia.",
    highlights: [
      "Comprehensive eCommerce functionality including inventory, cart, checkout, and order management",
      "Tailored store theming capabilities powered by Tailwind CSS",
      "Robust authentication system and dedicated admin dashboards for each tenant",
      "Scalable, maintainable architecture leveraging modern frontend frameworks",
    ],
    technologies: ["React.js", "JavaScript", "Tailwind CSS", "FramerMotion"],
    link: [
      {
        name: "View Live Demo",
        url: "https://elfahdapp.vercel.app/",
      },
      {
        name: "View Repo",
        url: "https://github.com/Ahmed4582/ElFahd",
      },
    ],
  },
  {
    title: "TO DO App",
    description:
      "A robust task and workflow management system for efficient team collaboration with multi-role support and real-time updates.",
    highlights: [
      "Real-time task tracking and role-based collaboration",
      "Responsive and intuitive UI with  CSS",
      "Dynamic task management with drag-and-drop functionality",
    ],
    technologies: ["HTML", "JavaScript", "Css"],
    link: [
      {
        name: "View Live Demo",
        url: "https://ahmed4582.github.io/ToDoListJS/",
      },
      {
        name: "View Repo",
        url: "https://github.com/Ahmed4582/ToDoListJS",
      },
    ],
  },
  {
    title: "Multi-Store eCommerce System",
    description:
      "A full-featured, multi-tenant commerce system for independent online stores with isolated configurations and shared infrastructure.",
    highlights: [
      "Rich eCommerce functionality: product catalog, checkout, and order lifecycle",
      "Per-store customization through dynamic theming",
      "Dedicated dashboards with role-based access control",
      "Efficient data handling and scalable frontend ecosystem",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    title: "Moracoo Platform",
    description:
      "A high-performance web platform with modern design, optimized routing, and seamless user experience.",
    highlights: [
      "Mobile-first responsive design with Tailwind CSS",
      "Optimized routing leveraging Next.js capabilities",
      "Visually appealing and interactive interface",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Rawasi Crystal",
    description:
      "A visually stunning eCommerce site for luxury crystal and glass products, showcasing modern design and user experience.",
    highlights: [
      "Fully responsive layout using Bootstrap 5",
      "Interactive media elements for product presentation",
      "Smooth and dynamic UI developed with React",
    ],
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    link: [
      {
        name: "View Live Demo",
        url: "https://rawasicrystal.com/",
      },
    ],
  },
  {
    title: "LLC Intshar",
    description:
      "This is an introductory website for a leading company in the field of technology and artificial intelligence. It contains their projects and how to communicate with them.",
    highlights: [
      "Type-safe development using TypeScript",
      "Component-based architecture for clean scalability",
      "Elegant design with Sass responsiveness",
    ],
    technologies: ["React", "JavaScript", "Sass"],
    link: [
      {
        name: "View Live Demo",
        url: "https://intishaarllc.com/",
      },
    ],
  },
  {
    title: "Akar - 24",
    description:
      "This is an introductory website for a leading real estate and building company in Saudi Arabia. This website contains day and night mode and supports translation.",
    highlights: [
      "Fully responsive and mobile-optimized",
      "Interactive user experience with immersive media",
      "Reusable, maintainable codebase powered by React",
    ],
    technologies: ["React", "JavaScript", "Tailwind CSS", "Dark Mode"],
    link: [
      {
        name: "View Live Demo",
        url: "https://akar-24.vercel.app/",
      },
      {
        name: "View Repo",
        url: "https://github.com/Ahmed4582/Akar_244",
      },
    ],
  },
  {
    title: "Taif Alrwad",
    description:
      "A visually sophisticated corporate website with media integration and refined UI for business engagement.",
    highlights: [
      "Business-oriented visual design",
      "Integrated video and media experiences",
      "Optimized for performance and scalability using React & TypeScript",
    ],
    technologies: ["React", "TypeScript", "Bootstrap"],
  },
  {
    title: "Age Calculator",
    description:
      "A simple yet effective age calculator that provides users with their age in years, months, and days.",
    highlights: [
      "Cross-platform compatible with HTML, JavaScript, and Bootstrap",
      "Component-driven and modular layout",
      "Designed for intuitive navigation and data presentation",
    ],
    technologies: ["HTML", "JavaScript", "Bootstrap"],
    link: [
      {
        name: "View Live Demo",
        url: "https://age-clac.vercel.app/",
      },
      {
        name: "View Repo",
        url: "https://github.com/Ahmed4582/AgeClac",
      },
    ],
  },
  {
    title: "Travel Bank",
    description:
      "This is an introductory website for a leading company in the field of tourism, Umrah and Hajj.",
    highlights: [
      "Clean, typographically optimized layout",
      "Responsive design ensuring seamless experience across devices",
      "Developed with standard web technologies for broad accessibility",
    ],
    technologies: [
      "React.JS",
      "JavaScript",
      "Tailwind CSS",
      "Dark Mode",
      "i18n",
    ],
    link: [
      {
        name: "View Live Demo",
        url: "https://travel-bank.vercel.app/",
      },
    ],
  },
  {
    title: "Crud App",
    description:
      "A simple CRUD application that allows users to create, read, update, and delete data entries.",
    highlights: [
      "Clean, typographically optimized layout",
      "Responsive design ensuring seamless experience across devices",
      "Developed with standard web technologies for broad accessibility",
    ],
    technologies: ["React.JS", "TypeScript", "Tailwind CSS"],
    link: [
      {
        name: "View Live Demo",
        url: "https://crud-applcation.vercel.app/",
      },
      {
        name: "View Repo",
        url: "https://github.com/Ahmed4582/CrudApplcation",
      },
    ],
  },
];

const PROJECTS_PER_PAGE = 3;

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

  const paginatedProjects = projects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  return (
    <section id="projects" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Frontend Projects
        </h2>
        <p className="text-xl text-center text-zinc-600 dark:text-zinc-300 mb-12">
          Crafting responsive, accessible, and visually engaging frontend
          experiences
        </p>

        <div className="space-y-12">
          {paginatedProjects.map((project) => (
            <div
              key={project.title}
              className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                {project.description}
              </p>

              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Key Highlights:</h4>
                <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-300">
                  {project.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.link && (
                <div className="flex flex-wrap gap-4">
                  {project.link.map((l, idx) => (
                    <Link
                      key={idx}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-x-2 text-blue-500 hover:text-blue-600"
                    >
                      <span>{l.name}</span>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-4 mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="text-gray-500 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="text-gray-500 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
