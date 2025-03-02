import { createContext, useContext, useEffect, ReactNode } from "react";
import { useQuery, useMutation, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { User } from "@shared/schema";

interface AuthContextType {
  user: User | undefined;
  isLoading: boolean;
  loginMutation: UseMutationResult<any, unknown, { username: string; password: string }, unknown>;
  registerMutation: UseMutationResult<any, unknown, { username: string; password: string }, unknown>;
  logoutMutation: UseMutationResult<void, unknown, void, unknown>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const loginMutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/login", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      setLocation("/admin");
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/register", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      setLocation("/admin");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.clear();
      setLocation("/auth");
    },
  });

  const value = {
    user,
    isLoading,
    loginMutation,
    registerMutation,
    logoutMutation,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}