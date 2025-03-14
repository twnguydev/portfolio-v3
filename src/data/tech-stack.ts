import { TechFeature } from "@/interfaces/stack";

export const features: TechFeature[] = [
  {
    name: "Front-end",
    items: [
      { name: "React & Next.js", proficiency: 90 },
      { name: "Angular & TypeScript", proficiency: 85 },
      { name: "TailwindCSS & SCSS", proficiency: 95 },
      { name: "UX/UI responsive", proficiency: 85 }
    ],
    gradient: "from-rose-500 to-purple-500"
  },
  {
    name: "Back-end",
    items: [
      { name: "Laravel & PHP", proficiency: 80 },
      { name: "Spring Boot & Java", proficiency: 75 },
      { name: "Nest & Express", proficiency: 85 },
      { name: "APIs RESTful", proficiency: 90 }
    ],
    gradient: "from-purple-500 to-blue-500"
  },
  {
    name: "Base de données",
    items: [
      { name: "MySQL & PostgreSQL", proficiency: 85 },
      { name: "MongoDB", proficiency: 80 },
      { name: "Optimisation des requêtes", proficiency: 75 },
      { name: "Modélisation de données", proficiency: 90 }
    ],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "DevOps & Outils",
    items: [
      { name: "Docker & CI/CD", proficiency: 75 },
      { name: "Git & GitHub/GitLab", proficiency: 95 },
      { name: "Tests automatisés", proficiency: 70 },
      { name: "Monitoring & Sécurité", proficiency: 70 }
    ],
    gradient: "from-cyan-500 to-teal-500"
  }
];