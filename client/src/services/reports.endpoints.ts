import type { DashboardResponse } from "@/types/reports";
import { api } from "./user.endpoints";

const REPORTS = "/reports";

export const reportsApi = {
  // --- GET Dashboard ---
  getDashboard: async (): Promise<DashboardResponse> => {
    const { data } = await api.get(`${REPORTS}/dashboard/`);
    return data;
  },

  // --- GET Properties Report ---
  getPropertiesReport: async () => {
    const { data } = await api.get(`${REPORTS}/properties/`);
    return data;
  },

  // --- GET Bookings Report ---
  getBookingsReport: async () => {
    const { data } = await api.get(`${REPORTS}/bookings/`);
    return data;
  },

  // --- GET Payments Report ---
  getPaymentsReport: async () => {
    const { data } = await api.get(`${REPORTS}/payments/`);
    return data;
  },
};
