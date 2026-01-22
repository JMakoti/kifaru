import {Route, Routes } from "react-router-dom";
import UserApp from "./apps/user/userApp";
import AdminApp from "./apps/admin/adminApp";
import AuthRoutes from "./apps/auth/auth.routes";
import Notfound from "./apps/user/pages/notfound";
import "./App.css";
import { useAuth } from "./providers/authprovider";
import LoadingScreen from "./components/loadingscreen";


export default function App() {
  const {isAuthenticated,isLoading } = useAuth();
  console.log("Auth Status:", { isAuthenticated, isLoading });

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
            <Navigate to="/"/>
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
