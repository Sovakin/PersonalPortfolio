import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProjectSchema, type Project } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const form = useForm({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      technologies: [],
      screenshots: [],
      demoUrl: "",
      githubUrl: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/projects", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: "Проект создан",
        description: "Проект успешно добавлен в портфолио",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await apiRequest("PATCH", `/api/projects/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setIsDialogOpen(false);
      setEditingProject(null);
      form.reset();
      toast({
        title: "Проект обновлен",
        description: "Изменения успешно сохранены",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Проект удален",
        description: "Проект успешно удален из портфолио",
      });
    },
  });

  function onSubmit(data: any) {
    // Convert comma-separated strings to arrays
    const formattedData = {
      ...data,
      technologies: data.technologies.split(",").map((t: string) => t.trim()),
      screenshots: data.screenshots.map((s: string) => s.trim()),
    };

    if (editingProject) {
      updateMutation.mutate({
        id: editingProject.id,
        data: formattedData,
      });
    } else {
      createMutation.mutate(formattedData);
    }
  }

  function openEditDialog(project: Project) {
    setEditingProject(project);
    form.reset({
      ...project,
      technologies: project.technologies.join(", "),
      screenshots: project.screenshots,
    });
    setIsDialogOpen(true);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Управление проектами</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingProject(null);
              form.reset();
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить проект
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Редактировать проект" : "Новый проект"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Описание</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="technologies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Технологии</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input {...field} placeholder="React, TypeScript, Tailwind CSS" />
                          <p className="text-sm text-muted-foreground">
                            Введите технологии через запятую, например: React, TypeScript, Node.js
                          </p>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="screenshots"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Скриншоты (до 5 файлов, макс. 5MB каждый)</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            {field.value.map((url, index) => (
                              <div key={url} className="relative aspect-video rounded-lg overflow-hidden">
                                <img
                                  src={url}
                                  alt={`Screenshot ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-2 right-2"
                                  onClick={() => {
                                    const newScreenshots = [...field.value];
                                    newScreenshots.splice(index, 1);
                                    field.onChange(newScreenshots);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                              <Input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={async (e) => {
                                  if (!e.target.files?.length) return;

                                  if (field.value.length + e.target.files.length > 5) {
                                    toast({
                                      title: "Слишком много файлов",
                                      description: "Максимальное количество скриншотов - 5",
                                      variant: "destructive",
                                    });
                                    return;
                                  }

                                  const formData = new FormData();
                                  Array.from(e.target.files).forEach((file) => {
                                    formData.append("screenshots", file);
                                  });

                                  try {
                                    const res = await fetch("/api/upload", {
                                      method: "POST",
                                      body: formData,
                                      credentials: "include",
                                    });

                                    if (!res.ok) throw new Error("Upload failed");

                                    const { urls } = await res.json();
                                    field.onChange([...field.value, ...urls]);
                                  } catch (error) {
                                    toast({
                                      title: "Ошибка загрузки",
                                      description: "Не удалось загрузить изображения",
                                      variant: "destructive",
                                    });
                                  }
                                }}
                                className="cursor-pointer"
                              />
                              {field.value.length > 0 && (
                                <Button
                                  variant="outline"
                                  onClick={() => field.onChange([])}
                                >
                                  Очистить все
                                </Button>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Поддерживаемые форматы: JPG, PNG, GIF. Нажмите для выбора нескольких файлов.
                            </p>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="demoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Демо URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="githubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingProject ? "Сохранить" : "Создать"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {projects?.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between p-4 bg-card rounded-lg border"
          >
            <div>
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {project.description}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => openEditDialog(project)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => deleteMutation.mutate(project.id)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}