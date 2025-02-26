import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface SkillCardProps {
  title: string;
  skills: string[];
}

export default function SkillCard({ title, skills }: SkillCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-primary/10 text-primary rounded text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
