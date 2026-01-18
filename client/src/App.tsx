import { Route, Routes } from "react-router";
import UserApp from "./apps/user/userApp";
import AdminApp from "./apps/admin/adminApp";
import AuthRoutes from "./apps/auth/auth.routes";
import Notfound from "./apps/user/pages/notfound";
import "./App.css";
import { useAuth } from "./providers/authprovider";

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  const {isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      {/* Redirect to profile if authenticated, otherwise show home */}
      {/* <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/profile" replace />
          ) : (
            <Navigate to="/user" replace />
          )
        }
      /> */}

      {/* Admin mini-system */}
      <Route path="/admin/*" element={<AdminApp />} />

      {/* Auth */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* User main system */}
      <Route path="/*" element={<UserApp />} />

      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
