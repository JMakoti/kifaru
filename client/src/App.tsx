import { Route, Routes } from "react-router";
import "./App.css";

import MainLayout from "./components/layout/main_layout";
import Home from "./pages/home";
import About from "./pages/about";
import Property from "./pages/property";
import Contact from "./pages/contact";
// import Services from "./pages/services";
import Notfound from "./pages/notfound";

// Properties
import KifaruProperty from "./pages/properties/kifaru-property";

// Admin Dashboard
import AdminLayout from "./components/admin_layout/admin_layout";
import Dashboardhome from "./pages/admin/dashboardhome";
import Bookings from "./pages/admin/bookings";
import Transcations from "./pages/admin/payments";
import Reports from "./pages/admin/reports";
import Guests from "./pages/admin/guests";
import Settings from "./pages/admin/settings";

import KifaruPropertyDetails from "./pages/properties/kifaru-properties-details";
import Payment from "./components/property/payment";
import Properties from "./pages/admin/properties";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/property" element={<Property />}>
          <Route index element={<KifaruProperty />} />
          <Route path=":propertyId" element={<KifaruPropertyDetails />} />
          <Route index path=":propertyId/payment" element={<Payment />} />
        </Route>
        {/* <Route path="services" element={<Services />} /> */}
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route> */}

      {/* Admin Dashboard */}

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboardhome />} />
        <Route path="property" element={<Properties />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="payments" element={<Transcations />} />
        <Route path="reports" element={<Reports />} />
        <Route path="guests" element={<Guests />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
