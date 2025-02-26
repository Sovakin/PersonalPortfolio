import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github, Plus } from "lucide-react";
import ProjectModal from "./ProjectModal";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  screenshots: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  screenshots,
  demoUrl,
  githubUrl,
}: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {/* Preview image */}
          <div className="relative mb-4 rounded-md overflow-hidden">
            <img
              src={screenshots[0]}
              alt={`${title} preview`}
              className="w-full h-48 object-cover"
            />
            <Button
              variant="secondary"
              className="absolute bottom-2 right-2"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Details
            </Button>
          </div>

          <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
            {technologies.length > 3 && (
              <Badge variant="outline">+{technologies.length - 3}</Badge>
            )}
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

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={{
          title,
          description,
          technologies,
          screenshots,
          demoUrl,
          githubUrl,
        }}
      />
    </>
  );
}