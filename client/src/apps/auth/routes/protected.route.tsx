import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingScreen from "@/components/loadingscreen";
import { useAuth } from "@/providers/useAuth";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  children?: ReactNode;
}

export function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    const redirectPath = location.pathname.startsWith("/admin")
      ? "/auth/login"
      : "/";
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role || "")) {
    return <Navigate to="/" replace />;
  }
  return children ? <>{children}</> : <Outlet />;
}
