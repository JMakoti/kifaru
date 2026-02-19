import type { DashboardResponse } from "@/types/reports";
import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "./reports.endpoints";

// --- QUERY KEYS ---
export const REPORTDASH_QUERY_KEY = ["reportsdash"];

// --- GET DASHBOARD ---

export const useReportDash = () => {
  return useQuery<DashboardResponse>({
    queryKey: REPORTDASH_QUERY_KEY,
    queryFn: reportsApi.getDashboard,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
