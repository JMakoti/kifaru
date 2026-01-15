import { Route, Routes } from "react-router";
import AuthLayout from "./authlayout";
import Register from "./register";
import ForgetPass from "./forgetpass";
import ResetPass from "./resetpass";
import AdminLogin from "./admin.login";
import Login from "./user.login";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="admin" element={<AdminLogin />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-pass" element={<ForgetPass />} />
        <Route path="reset-pass/:uuid/:token" element={<ResetPass />} />
        <Route path="reset-pass" element={<ResetPass />} />
      </Route>
    </Routes>
  );
}
