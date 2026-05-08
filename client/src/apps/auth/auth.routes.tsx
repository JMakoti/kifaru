import { Route, Routes } from "react-router-dom";
import AuthLayout from "./authlayout";
import Register from "./register";
import ForgetPass from "./forgetpass";
import CheckEmail from "./checkemail";
// import ResetPasswordPage from "./resetpass";
import AdminLogin from "./admin.login";
import Login from "./user.login";
import { PublicRoute } from "./routes/public.route";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          index
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="login"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="forgot-pass"
          element={
            <PublicRoute>
              <ForgetPass />
            </PublicRoute>
          }
        />
        <Route
          path="check-email"
          element={
            <PublicRoute>
              <CheckEmail />
            </PublicRoute>
          }
        />
        {/* <Route
          path="password-reset-confirm/:uidb64/:token"
          element={
            <PublicRoute>
              <ResetPasswordPage />
            </PublicRoute>
          }
        />  */}
      </Route>
    </Routes>
  );
}
