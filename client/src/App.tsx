import { Route, Routes } from "react-router";
import UserApp from "./apps/user/userApp";
import AdminApp from "./apps/admin/adminApp";
import AuthRoutes from "./apps/auth/auth.routes";
import Notfound from "./apps/user/pages/notfound";
import "./App.css";

export default function App() {
  return (
    <Routes>
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
