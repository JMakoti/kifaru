import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layout/adminlayout";
import DashboardHome from "./pages/dashboardhome";
import Properties from "./pages/properties";
import Bookings from "./pages/bookings";
import Transcations from "./pages/transaction";
import Reports from "./pages/reports";
import Guests from "./pages/guests";
import Settings from "./pages/settings";
import AdminProfile from "./pages/adminprofile";
import Gallery from "./pages/gallery";
import Reviews from "./pages/reviews";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="property" element={<Properties />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="payments" element={<Transcations />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="reports" element={<Reports />} />
        <Route path="guests" element={<Guests />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>
    </Routes>
  );
}
