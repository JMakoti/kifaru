import { Route, Routes } from "react-router";
import "./App.css";

import MainLayout from "./components/layout/main_layout";
import Home from "./pages/home";
import About from "./pages/about";
import Property from "./pages/property";
import Contact from "./pages/contact";
import Services from "./pages/services";
import Notfound from "./pages/notfound";

// Properties
import KifaruBelgium from "./pages/properties/kifaru-belgium";
import KifaruBrussels from "./pages/properties/kifaru-brussels";
import KifaruMsambweni from "./pages/properties/kifaru-msambweni";
import KifaruNairobi from "./pages/properties/kifaru-nairobi";
import KifaruNertherlands from "./pages/properties/kifaru-nertherlands";
import KifaruNyali from "./pages/properties/kifaru-nyali";

// Admin Dashboard
import AdminLayout from "./components/admin_layout/admin_layout";
import Dashboardhome from "./pages/admin/dashboardhome";
import Bookings from "./pages/admin/bookings";
import Payments from "./pages/admin/payments";
import Reports from "./pages/admin/reports";
import Guests from "./pages/admin/guests";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/property" element={<Property />}>
          <Route path="belgium" element={<KifaruBelgium />} />
          <Route path="brussels" element={<KifaruBrussels />} />
          <Route path="msambweni" element={<KifaruMsambweni />} />
          <Route path="nairobi" element={<KifaruNairobi />} />
          <Route path="nertherlands" element={<KifaruNertherlands />} />
          <Route path="nyali" element={<KifaruNyali />} />
        </Route>
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route> */}

      {/* Admin Dashboard */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboardhome />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="payments" element={<Payments />} />
        <Route path="reports" element={<Reports />} />
        <Route path="guests" element={<Guests />} />
      </Route>

      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
