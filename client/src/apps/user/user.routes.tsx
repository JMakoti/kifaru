import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import MainLayout from "./layout/mainlayout";
import { ProtectedRoute } from "../auth/routes/protected.route";
import LoadingScreen from "@/components/loadingscreen";

const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Property = lazy(() => import("./pages/property"));
const KifaruProperty = lazy(() => import("./pages/properties/kifaru-property"));
const Contact = lazy(() => import("./pages/contact"));
const PropertyDetails = lazy(() => import("./pages/properties/propertydetails"));
const UserProfile = lazy(() => import("./pages/profiles/userprofile"));

const BookingForm = lazy(() => import("./components/property/bookingform"));
const BookingPreviewPayment = lazy(
  () => import("./components/property/bookingpreview"),
);
const ConfirmPaymentBooking = lazy(
  () => import("./components/property/bookpayment"),
);
const Confirmbooking = lazy(
  () => import("./components/property/confirmbooking"),
);

const Notfound = lazy(() => import("./notfound"));


function PageLoader() {
  return <LoadingScreen />;
}

export default function UserRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          <Route path="property" element={<Property />}>
            <Route index element={<KifaruProperty />} />
            <Route path=":slug" element={<PropertyDetails />} />
            <Route path=":slug/booking" element={<BookingForm />} />
            <Route path=":slug/preview" element={<BookingPreviewPayment />} />
            <Route path=":slug/payment" element={<ConfirmPaymentBooking />} />
          </Route>

          <Route path="payment/callback" element={<Confirmbooking />} />
          <Route path="contact" element={<Contact />} />

          <Route
            path="profile"
            element={
              <ProtectedRoute allowedRoles={["external"]}>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}