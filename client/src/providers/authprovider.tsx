import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "@/services/user.endpoints";
import type {
  User,
  LoginFormInputs,
  RegisterFormInputs,
  AuthResponse,
} from "@/types/user.types";
import { AuthContext } from "./auth-context";

// Helper to check if auth token exists in cookies
const getAuthTokenFromCookie = (): string | null => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth-token="))
    ?.split("=")[1];
  return cookieValue || null;
};

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  login: (data: LoginFormInputs) => Promise<AuthResponse>;
  register: (data: RegisterFormInputs) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AUTH_QUERY_KEY = ["auth-user"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  /**
  Load authenticated user
   */
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery<User | null>({
    queryKey: AUTH_QUERY_KEY,
    queryFn: getProfile,
    enabled: !!getAuthTokenFromCookie(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  /**
  Login
   */
  const loginMutation = useMutation<AuthResponse, Error, LoginFormInputs>({
    mutationFn: loginUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });

  /**
  Register
   */
  const registerMutation = useMutation<AuthResponse, Error, RegisterFormInputs>(
    {
      mutationFn: registerUser,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      },
    },
  );

  /**
  Logout
   */
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      queryClient.clear();
    },
  });

  const refreshUser = async () => {
    await refetch();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        refreshUser,
        isAuthenticated: !!user,
        isLoading,
        error: error as Error | null,
        login: loginMutation.mutateAsync,
        register: registerMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
