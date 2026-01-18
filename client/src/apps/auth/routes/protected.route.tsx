import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/providers/authprovider";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  return <>{children}</>;
}
