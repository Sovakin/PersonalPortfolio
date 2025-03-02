import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    screenshots: string[];
    technologies: string[];
    demoUrl?: string | null;
    githubUrl?: string | null;
  };
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
      <Dialog open={isOpen} onOpenChange={() => onClose()}>
        <DialogContent className="max-w-3xl w-full">
          <DialogHeader>
            <DialogTitle>{project.title}</DialogTitle>
          </DialogHeader>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {project.screenshots.map((screenshot, index) => (
                    <div key={index} className="flex-[0_0_100%] min-w-0">
                      <img
                          src={screenshot}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-[400px] object-cover rounded-md"
                      />
                    </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2"
                onClick={scrollPrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={scrollNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Project details */}
          <div className="space-y-4">
            <p className="text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                  <span
                      key={tech}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                {tech}
              </span>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
  );
}