import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

export default function Portfolio() {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform built with React and TypeScript.",
      technologies: ["React", "TypeScript", "Redux", "Tailwind CSS"],
      demoUrl: "https://demo-ecommerce.com",
      githubUrl: "https://github.com/yourusername/ecommerce"
    },
    {
      title: "Task Management App",
      description: "A real-time task management application with collaborative features.",
      technologies: ["React", "TypeScript", "Socket.io", "Material UI"],
      demoUrl: "https://demo-tasks.com",
      githubUrl: "https://github.com/yourusername/task-manager"
    },
    {
      title: "Weather Dashboard",
      description: "A weather dashboard that displays current and forecasted weather data.",
      technologies: ["React", "TypeScript", "Chart.js", "OpenWeather API"],
      demoUrl: "https://weather-dash.com",
      githubUrl: "https://github.com/yourusername/weather"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8">Portfolio</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </motion.div>
  );
}
