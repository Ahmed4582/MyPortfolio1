const experiences = [
  {
    company: "Inteshar",
    position: "Frontend Developer",
    period: "2024 - Present",
    description:
      "Developed and optimized web applications using React. Streamlined deployment processes with CI/CD pipelines, achieving a 40% performance improvement.",
  },
  {
    company: "All Safe",
    position: "Frontend Developer",
    period: "04/2024 - 10/2024",
    description:
      "Collaborated with cross-functional teams to design and implement user-friendly interfaces using React. Enhanced application scalability and maintainability by adopting best practices and modern tools.",
  },
  {
    company: "Freelancer",
    position: "Frontend Developer",
    period: "2024 - Present",
    description:
      "Delivered tailored web solutions for diverse clients across multiple industries. Built Frontend applications using React, Next.js, admin dashboards, and responsive UI/UX. Managed entire development lifecycle from planning to deployment.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-zinc-50 dark:bg-zinc-800/50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Work Experience
        </h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-purple-600"
            >
              <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-purple-600 -translate-x-[3px]" />
              <h3 className="text-xl font-semibold">{exp.position}</h3>
              <p className="text-purple-600 dark:text-purple-400 mb-2">
                {exp.company}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                {exp.period}
              </p>
              <p className="text-zinc-600 dark:text-zinc-300">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
