import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import LoadingScreen from "@/components/loadingscreen";
import { useAuth } from "@/providers/useAuth";

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Redirect authenticated users based on their role
  if (isAuthenticated) {
    if (user?.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    // external users and other roles redirect to home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
