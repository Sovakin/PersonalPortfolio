import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

export default function Portfolio() {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform built with React and TypeScript. Features include product catalog, shopping cart, user authentication, and payment integration. The platform offers a seamless shopping experience with real-time inventory updates and order tracking.",
      technologies: ["React", "TypeScript", "Redux", "Node.js", "Express", "MongoDB", "Stripe", "Tailwind CSS"],
      screenshots: [
        "https://placehold.co/1200x800/png",
        "https://placehold.co/1200x800/png",
        "https://placehold.co/1200x800/png"
      ],
      demoUrl: "https://demo-ecommerce.com",
      githubUrl: "https://github.com/yourusername/ecommerce"
    },
    {
      title: "Task Management App",
      description: "A real-time task management application with collaborative features. Users can create projects, assign tasks, set deadlines, and track progress. Includes features like real-time updates, file attachments, and team chat.",
      technologies: ["React", "TypeScript", "Socket.io", "Node.js", "PostgreSQL", "Material UI", "Jest", "Docker"],
      screenshots: [
        "https://placehold.co/1200x800/png",
        "https://placehold.co/1200x800/png",
        "https://placehold.co/1200x800/png"
      ],
      demoUrl: "https://demo-tasks.com",
      githubUrl: "https://github.com/yourusername/task-manager"
    },
    {
      title: "Weather Dashboard",
      description: "A comprehensive weather dashboard that displays current and forecasted weather data. Features include interactive maps, historical weather data, custom alerts, and location-based forecasts using multiple weather APIs.",
      technologies: ["React", "TypeScript", "Chart.js", "OpenWeather API", "Mapbox", "TailwindCSS", "Vite"],
      screenshots: [
        "https://placehold.co/1200x800/png",
        "https://placehold.co/1200x800/png",
        "https://placehold.co/1200x800/png"
      ],
      demoUrl: "https://weather-dash.com",
      githubUrl: "https://github.com/yourusername/weather"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-6xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8">Portfolio</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </motion.div>
  );
}