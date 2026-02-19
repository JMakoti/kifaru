import type { BookingsData, DashboardResponse, PaymentsData, PropertyData } from "@/types/reports";
import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "./reports.endpoints";

// --- QUERY KEYS ---
export const REPORTDASH_QUERY_KEY = ["reportsdash"];
export const PROPERTIES_REPORT_KEY = ["propertiesReport"];
export const BOOKINGS_REPORT_KEY = ["bookingsReport"];
export const PAYMENTS_REPORT_KEY = ["paymentsReport"];

// --- GET DASHBOARD ---

export const useReportDash = () => {
  return useQuery<DashboardResponse>({
    queryKey: REPORTDASH_QUERY_KEY,
    queryFn: reportsApi.getDashboard,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

// --- OTHER REPORTS ---
export const usePropertiesReport = () => {
  return useQuery<PropertyData>({
    queryKey: PROPERTIES_REPORT_KEY,
    queryFn: reportsApi.getPropertiesReport,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export const useBookingsReport = () => {
  return useQuery<BookingsData>({
    queryKey: BOOKINGS_REPORT_KEY,
    queryFn: reportsApi.getBookingsReport,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export const usePaymentsReport = <T = PaymentsData>() => {
  return useQuery<T>({
    queryKey: PAYMENTS_REPORT_KEY,
    queryFn: reportsApi.getPaymentsReport,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
