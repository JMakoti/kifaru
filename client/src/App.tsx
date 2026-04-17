import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
// import UserApp from "./apps/user/userApp";
// import AdminApp from "./apps/admin/adminApp";
// import AuthRoutes from "./apps/auth/auth.routes";
const UserApp = lazy(() => import("./apps/user/userApp"));
const AdminApp = lazy(() => import("./apps/admin/adminApp"));
const AuthRoutes = lazy(() => import("./apps/auth/auth.routes"));
import "./App.css";
import LoadingScreen from "./components/loadingscreen";
import { ProtectedRoute } from "./apps/auth/routes/protected.route";
import { useAuth } from "./providers/useAuth";
import ScrollToTop from "./lib/scrolltotop";


export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Auth System */}
        <Route
          path="/auth/*"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <AuthRoutes />
            </Suspense>
          }
        />
        {/* Admin mini-system */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Suspense fallback={<LoadingScreen />}>
                <AdminApp />
              </Suspense>
            </ProtectedRoute>
          }
        />
        {/* User main system */}
        <Route
          path="/*"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <UserApp />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}
