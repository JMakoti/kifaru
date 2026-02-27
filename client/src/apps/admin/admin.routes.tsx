import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AdminLayout from "./layout/adminlayout";
import LoadingScreen from "@/components/loadingscreen";

const DashboardHome = lazy(() => import("./pages/dashboardhome"));
const Properties = lazy(() => import("./pages/properties"));
const Bookings = lazy(() => import("./pages/bookings"));
const Transactions = lazy(() => import("./pages/transaction"));
const Reports = lazy(() => import("./pages/reports"));
const Guests = lazy(() => import("./pages/guests"));
const Settings = lazy(() => import("./pages/settings"));
const AdminProfile = lazy(() => import("./pages/adminprofile"));
const Gallery = lazy(() => import("./pages/gallery"));
const Reviews = lazy(() => import("./pages/reviews"));
const NotFound = lazy(() => import("@/apps/user/notfound"));
const PropertyReport = lazy(() => import("./pages/reports/propertyreportpage"));
const BookingsReport = lazy(() => import("./pages/reports/bookingreportpaage"));
const PaymentsReport = lazy(() => import("./pages/reports/paymentreportpage"));


export default function AdminRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="property" element={<Properties />} />
          {/* <Route path="property/:slug" element={<AdminPropertyDetails />} /> */}
          <Route path="gallery" element={<Gallery />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="payments" element={<Transactions />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reports/properties" element={<PropertyReport />} />
          <Route path="reports/bookings" element={<BookingsReport />} />
          <Route path="reports/payments" element={<PaymentsReport />} />
          <Route path="guests" element={<Guests />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<AdminProfile />} />

          {/* Optional 404 for admin */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}