import React from "react";
import { 
  Code2, 
  Palette, 
  Database, 
  Globe, 
  Smartphone, 
  Cloud, 
  Shield, 
  Zap,
  Atom,
  FileCode,
  Layers,
  Cpu,
  Server,
  GitBranch,
  Package,
  Monitor
} from "lucide-react";

export interface Skill {
  name: string;
  icon: React.ReactNode;
  level: 'beginner' | 'intermediate' | 'expert';
  category: string;
}

export function createSkillsData(): Skill[] {
  return [
  // Frontend Skills
  { name: "React.js", icon: <Atom className="w-full h-full" />, level: "expert", category: "frontend" },
  { name: "Next.js", icon: <FileCode className="w-full h-full" />, level: "expert", category: "frontend" },
  { name: "TypeScript", icon: <Code2 className="w-full h-full" />, level: "expert", category: "frontend" },
  { name: "JavaScript", icon: <Code2 className="w-full h-full" />, level: "expert", category: "frontend" },
  { name: "Tailwind CSS", icon: <Palette className="w-full h-full" />, level: "expert", category: "frontend" },
  { name: "HTML5", icon: <Layers className="w-full h-full" />, level: "expert", category: "frontend" },
  { name: "CSS3", icon: <Palette className="w-full h-full" />, level: "expert", category: "frontend" },
  { name: "Bootstrap", icon: <Palette className="w-full h-full" />, level: "intermediate", category: "frontend" },
  { name: "SCSS/SASS", icon: <Palette className="w-full h-full" />, level: "intermediate", category: "frontend" },
  { name: "Framer Motion", icon: <Zap className="w-full h-full" />, level: "intermediate", category: "frontend" },
  { name: "Shadcn/ui", icon: <Package className="w-full h-full" />, level: "intermediate", category: "frontend" },
  { name: "Radix UI", icon: <Package className="w-full h-full" />, level: "intermediate", category: "frontend" },

  // Backend Skills
  { name: "Node.js", icon: <Server className="w-full h-full" />, level: "intermediate", category: "backend" },
  { name: "Express.js", icon: <Server className="w-full h-full" />, level: "intermediate", category: "backend" },
  { name: "PostgreSQL", icon: <Database className="w-full h-full" />, level: "beginner", category: "backend" },
  { name: "MongoDB", icon: <Database className="w-full h-full" />, level: "beginner", category: "backend" },
  { name: "REST APIs", icon: <Globe className="w-full h-full" />, level: "intermediate", category: "backend" },
  { name: "GraphQL", icon: <GitBranch className="w-full h-full" />, level: "beginner", category: "backend" },

  // Database Skills
  { name: "SQL", icon: <Database className="w-full h-full" />, level: "intermediate", category: "database" },
  { name: "NoSQL", icon: <Database className="w-full h-full" />, level: "beginner", category: "database" },
  { name: "Database Design", icon: <Database className="w-full h-full" />, level: "intermediate", category: "database" },
  { name: "Data Modeling", icon: <Database className="w-full h-full" />, level: "beginner", category: "database" },

  // Tools & Others
  { name: "Git", icon: <GitBranch className="w-full h-full" />, level: "intermediate", category: "tools" },
  { name: "GitHub", icon: <GitBranch className="w-full h-full" />, level: "intermediate", category: "tools" },
  { name: "VS Code", icon: <Code2 className="w-full h-full" />, level: "expert", category: "tools" },
  { name: "npm/yarn", icon: <Package className="w-full h-full" />, level: "intermediate", category: "tools" },
  { name: "Webpack", icon: <Package className="w-full h-full" />, level: "beginner", category: "tools" },
  { name: "Vite", icon: <Zap className="w-full h-full" />, level: "intermediate", category: "tools" },

  // Performance & Optimization
  { name: "Performance Optimization", icon: <Zap className="w-full h-full" />, level: "intermediate", category: "performance" },
  { name: "SEO", icon: <Globe className="w-full h-full" />, level: "intermediate", category: "performance" },
  { name: "Accessibility", icon: <Smartphone className="w-full h-full" />, level: "intermediate", category: "performance" },
  { name: "Responsive Design", icon: <Monitor className="w-full h-full" />, level: "expert", category: "performance" },
  { name: "Cross-browser", icon: <Globe className="w-full h-full" />, level: "intermediate", category: "performance" },

  // Mobile & PWA
  { name: "PWA", icon: <Smartphone className="w-full h-full" />, level: "beginner", category: "mobile" },
  { name: "Mobile First", icon: <Smartphone className="w-full h-full" />, level: "intermediate", category: "mobile" },
  { name: "Touch Interfaces", icon: <Smartphone className="w-full h-full" />, level: "intermediate", category: "mobile" },

  // Design & UX
  { name: "UI/UX Design", icon: <Palette className="w-full h-full" />, level: "intermediate", category: "design" },
  { name: "Figma", icon: <Palette className="w-full h-full" />, level: "beginner", category: "design" },
  { name: "Adobe XD", icon: <Palette className="w-full h-full" />, level: "beginner", category: "design" },
  { name: "Prototyping", icon: <Palette className="w-full h-full" />, level: "intermediate", category: "design" },

  // Cloud & Deployment
  { name: "Vercel", icon: <Cloud className="w-full h-full" />, level: "intermediate", category: "cloud" },
  { name: "Netlify", icon: <Cloud className="w-full h-full" />, level: "intermediate", category: "cloud" },
  { name: "AWS", icon: <Cloud className="w-full h-full" />, level: "beginner", category: "cloud" },
  { name: "Docker", icon: <Package className="w-full h-full" />, level: "beginner", category: "cloud" },

  // Security
  { name: "JWT", icon: <Shield className="w-full h-full" />, level: "intermediate", category: "security" },
  { name: "OAuth", icon: <Shield className="w-full h-full" />, level: "beginner", category: "security" },
  { name: "HTTPS", icon: <Shield className="w-full h-full" />, level: "intermediate", category: "security" },
  { name: "Data Protection", icon: <Shield className="w-full h-full" />, level: "intermediate", category: "security" },

  // Testing
  { name: "Jest", icon: <Code2 className="w-full h-full" />, level: "beginner", category: "testing" },
  { name: "React Testing", icon: <Code2 className="w-full h-full" />, level: "beginner", category: "testing" },
  { name: "Unit Testing", icon: <Code2 className="w-full h-full" />, level: "beginner", category: "testing" },
  { name: "Integration Testing", icon: <Code2 className="w-full h-full" />, level: "beginner", category: "testing" }
  ];
}

export function getSkillsByCategory(skills: Skill[], category: string): Skill[] {
  if (category === 'all') return skills;
  return skills.filter(skill => skill.category === category);
}
