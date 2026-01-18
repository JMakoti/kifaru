import { Route, Routes } from "react-router";
import MainLayout from "./layout/mainlayout";
import Home from "./pages/home";
import About from "./pages/about";
import Property from "./pages/property";
import KifaruProperty from "./pages/properties/kifaru-property";
import KifaruPropertyDetails from "./pages/properties/kifaru-properties-details";
import Payment from "./components/property/payment";
import Contact from "./pages/contact";
import UserProfile from "./pages/profiles/userprofile";
import { ProtectedRoute } from "../auth/routes/protected.route";

export default function UserRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="property" element={<Property />}>
          <Route index element={<KifaruProperty />} />
          <Route path=":propertyId" element={<KifaruPropertyDetails />} />
          <Route index path=":propertyId/payment" element={<Payment />} />
        </Route>
        <Route path="contact" element={<Contact />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
