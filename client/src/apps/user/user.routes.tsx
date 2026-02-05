import { Route, Routes } from "react-router";
import MainLayout from "./layout/mainlayout";
import Home from "./pages/home";
import About from "./pages/about";
import Property from "./pages/property";
import KifaruProperty from "./pages/properties/kifaru-property";
import KifaruPropertyDetails from "./pages/properties/kifaru-properties-details";
import Contact from "./pages/contact";
import UserProfile from "./pages/profiles/userprofile";
import { ProtectedRoute } from "../auth/routes/protected.route";
import BookingForm from "./components/property/bookingform";
import BookingPreviewPayment from "./components/property/bookingpreview";
import ConfirmPaymentBooking from "./components/property/bookpayment";

export default function UserRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="property" element={<Property />}>
          <Route index element={<KifaruProperty />} />
          <Route path=":slug" element={<KifaruPropertyDetails />} />
          <Route path=":slug/booking" element={<BookingForm />} />
          <Route path=":slug/preview" element={<BookingPreviewPayment />} />
          <Route path=":slug/payment" element={<ConfirmPaymentBooking/>}/>
        </Route>
        <Route path="contact" element={<Contact />} />
        <Route
          path="profile"
          
          element={
            <ProtectedRoute allowedRoles={["external"]}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
