import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  demoUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 mt-auto">
          {demoUrl && (
            <Button
              variant="outline"
              onClick={() => window.open(demoUrl, "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
            </Button>
          )}
          {githubUrl && (
            <Button
              variant="outline"
              onClick={() => window.open(githubUrl, "_blank")}
            >
              <Github className="h-4 w-4 mr-2" />
              Source
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
