import { Route, Routes } from "react-router-dom";
import UserApp from "./apps/user/userApp";
import AdminApp from "./apps/admin/adminApp";
import AuthRoutes from "./apps/auth/auth.routes";
import Notfound from "./apps/user/pages/notfound";
import "./App.css";
import LoadingScreen from "./components/loadingscreen";
import { ProtectedRoute } from "./apps/auth/routes/protected.route";
import { useAuth } from "./providers/useAuth";

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Routes>
      {/* Auth System */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Admin mini-system */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminApp />
          </ProtectedRoute>
        }
      />

      {/* User main system */}
      <Route path="/*" element={<UserApp />} />

      {/* 404 Page */}
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
