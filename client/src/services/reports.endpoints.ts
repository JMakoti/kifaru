import type { DashboardResponse } from "@/types/reports";
import { api } from "./user.endpoints";

const REPORTS = "/reports";

export const reportsApi = {
  // --- GET Dashboard ---
  getDashboard: async (): Promise<DashboardResponse> => {
    const { data } = await api.get(`${REPORTS}/dashboard/`);
    return data;
  },
};
