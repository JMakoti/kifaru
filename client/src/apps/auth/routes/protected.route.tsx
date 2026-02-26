// apps/auth/routes/admin.route.tsx (or wherever your ProtectedRoute is)
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
    // Redirect logic we discussed earlier
    const redirectPath = location.pathname.startsWith("/admin")
      ? "/auth/login"
      : "/";
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role || "")) {
    return <Navigate to="/" replace />;
  }

  // If children exists, render them; otherwise, render the Outlet (for nested routes)
  return children ? <>{children}</> : <Outlet />;
}
