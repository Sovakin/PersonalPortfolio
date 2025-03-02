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
    ],
    tools: [
      "Git",
      "Webpack",
      "Vite",
      "Docker",
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-4xl mx-auto space-y-12"
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <motion.h1 
              className="text-4xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Frontend разработчик
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Создаю красивые и производительные веб-приложений 😏
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <SocialLinks />
            </motion.div>
          </div>
          <motion.div 
            className="relative aspect-square"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute inset-0 rounded-full from-primary/20 via-primary/10" />
            <img
              src="/photo/my.jpg"
              alt="Фото"
              className="rounded-full w-full h-full object-cover border-4 border-background shadow-xl"
            />
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="prose dark:prose-invert max-w-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-4">Об о мне</h2>
        <p className="text-lg text-muted-foreground">
          Я frontend-разработчик с опытом создания современных веб-приложений.
          Опираясь на React и TypeScript (частично Next.JS), я создаю адаптивные и удобные
          интерфейсы, которые обеспечивают исключительный пользовательский опыт.
        </p>
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <SkillCard title="Frontend разработка" skills={skills.frontend} />
        <SkillCard title="Инструменты и технологии" skills={skills.tools} />
      </motion.div>
    </motion.div>
  );
}