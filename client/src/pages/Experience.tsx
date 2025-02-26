import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Experience() {
  const experiences = [
    {
      company: "Tech Company",
      position: "Senior Frontend Developer",
      period: "2021 - Present",
      description: "Led the development of multiple React applications, implemented new features, and improved performance.",
      achievements: [
        "Reduced bundle size by 40% through code splitting and lazy loading",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
        "Mentored junior developers and conducted code reviews"
      ]
    },
    {
      company: "Startup Inc",
      position: "Frontend Developer",
      period: "2019 - 2021",
      description: "Worked on building responsive web applications using React and TypeScript.",
      achievements: [
        "Developed reusable component library used across multiple projects",
        "Integrated third-party APIs and implemented real-time features",
        "Improved application accessibility to meet WCAG standards"
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8">Work Experience</h1>
      
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{exp.company}</CardTitle>
                  <p className="text-primary font-medium">{exp.position}</p>
                </div>
                <span className="text-muted-foreground">{exp.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{exp.description}</p>
              <ul className="list-disc list-inside space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-muted-foreground">
                    {achievement}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
