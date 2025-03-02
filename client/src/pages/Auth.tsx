import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

export default function Auth() {
    const [, setLocation] = useLocation();
    const { user, loginMutation, registerMutation } = useAuth();
    const [activeTab, setActiveTab] = useState("login");

    const loginForm = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const registerForm = useForm({
        resolver: zodResolver(insertUserSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    // Redirect if already logged in
    if (user) {
        setLocation("/");
        return null;
    }

    return (
        <div className="min-h-[80vh] grid md:grid-cols-2 gap-8 items-center">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Добро пожаловать</CardTitle>
                    <CardDescription>
                        Войдите в систему или зарегистрируйтесь
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Вход</TabsTrigger>
                            <TabsTrigger value="register">Регистрация</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <Form {...loginForm}>
                                <form
                                    onSubmit={loginForm.handleSubmit((data) =>
                                        loginMutation.mutate(data)
                                    )}
                                    className="space-y-4"
                                >
                                    <FormField
                                        control={loginForm.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Имя пользователя</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={loginForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Пароль</FormLabel>
                                                <FormControl>
                                                    <Input type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={loginMutation.isPending}
                                    >
                                        {loginMutation.isPending && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Войти
                                    </Button>
                                </form>
                            </Form>
                        </TabsContent>
                        <TabsContent value="register">
                            <Form {...registerForm}>
                                <form
                                    onSubmit={registerForm.handleSubmit((data) =>
                                        registerMutation.mutate(data)
                                    )}
                                    className="space-y-4"
                                >
                                    <FormField
                                        control={registerForm.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Имя пользователя</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={registerForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Пароль</FormLabel>
                                                <FormControl>
                                                    <Input type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={registerMutation.isPending}
                                    >
                                        {registerMutation.isPending && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Зарегистрироваться
                                    </Button>
                                </form>
                            </Form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
            <div className="hidden md:block">
                <h2 className="text-3xl font-bold mb-4">
                    Вопрос: Зачем я сделал авторизацию❓️
                </h2>
                <p className="text-muted-foreground">
                    Ну, немного захотел добавить бекенда на сайт в виде админ-панели
                    и добавление карточек портфолио на сайт через админ-панель)
                </p>
            </div>
        </div>
    );
}