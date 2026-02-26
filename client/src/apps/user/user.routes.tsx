import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import MainLayout from "./layout/mainlayout";
import { ProtectedRoute } from "../auth/routes/protected.route";
import LoadingScreen from "@/components/loadingscreen";
// import PropertyDetails from "./pages/properties/propertydetails";

/* -------------------------
   Lazy Loaded Pages
-------------------------- */

const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Property = lazy(() => import("./pages/property"));
const KifaruProperty = lazy(() => import("./pages/properties/kifaru-property"));
// const KifaruPropertyDetails = lazy(
//   () => import("./pages/properties/kifaru-properties-details"),
// );
const Contact = lazy(() => import("./pages/contact"));
const PropertyDetails = lazy(() => import("./pages/properties/propertydetails"));
const UserProfile = lazy(() => import("./pages/profiles/userprofile"));

/* -------------------------
   Heavy Booking / Payment Pages
-------------------------- */

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

/* -------------------------
   Loader Component
-------------------------- */

function PageLoader() {
  return <LoadingScreen />;
}

/* -------------------------
   Routes
-------------------------- */

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
          {/* <Route path="details" element={< />} /> */}

          {/* 404 */}
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

// import { Route, Routes } from "react-router";
// import MainLayout from "./layout/mainlayout";
// import Home from "./pages/home";
// import About from "./pages/about";
// import Property from "./pages/property";
// import KifaruProperty from "./pages/properties/kifaru-property";
// import KifaruPropertyDetails from "./pages/properties/kifaru-properties-details";
// import Contact from "./pages/contact";
// import UserProfile from "./pages/profiles/userprofile";
// import { ProtectedRoute } from "../auth/routes/protected.route";
// import BookingForm from "./components/property/bookingform";
// import BookingPreviewPayment from "./components/property/bookingpreview";
// import ConfirmPaymentBooking from "./components/property/bookpayment";
// import Confirmbooking from "./components/property/confirmbooking";
// import Notfound from "./notfound";

// export default function UserRoutes() {
//   return (
//     <Routes>
//       <Route element={<MainLayout />}>
//         <Route index element={<Home />} />
//         <Route path="about" element={<About />} />
//         <Route path="property" element={<Property />}>
//           <Route index element={<KifaruProperty />} />
//           <Route path=":slug" element={<KifaruPropertyDetails />} />
//           <Route path=":slug/booking" element={<BookingForm />} />
//           <Route path=":slug/preview" element={<BookingPreviewPayment />} />
//           <Route path=":slug/payment" element={<ConfirmPaymentBooking />} />
//         </Route>
//         <Route path="payment/callback" element={<Confirmbooking />} />
//         <Route path="contact" element={<Contact />} />
//         <Route
//           path="profile"
//           element={
//             <ProtectedRoute allowedRoles={["external"]}>
//               <UserProfile />
//             </ProtectedRoute>
//           }
//         />
//         {/* 404 Route */}
//         <Route path="*" element={<Notfound />} />
//       </Route>
//     </Routes>
//   );
// }
