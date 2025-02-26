import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import SkillCard from "@/components/SkillCard";

export default function Home() {
  const skills = {
    frontend: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Redux",
      "React Query",
    ],
    tools: [
      "Git",
      "Webpack",
      "Vite",
      "Jest",
      "Docker",
      "CI/CD",
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Frontend Developer</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Building beautiful and performant web applications
        </p>
        <div className="flex justify-center">
          <SocialLinks />
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none mb-12">
        <h2>About Me</h2>
        <p>
          I'm a passionate frontend developer with expertise in building modern web applications.
          With a strong foundation in React and TypeScript, I create responsive and user-friendly
          interfaces that deliver exceptional user experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <SkillCard title="Frontend Development" skills={skills.frontend} />
        <SkillCard title="Tools & Technologies" skills={skills.tools} />
      </div>
    </motion.div>
  );
}
