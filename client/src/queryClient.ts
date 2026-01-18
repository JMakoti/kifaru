import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: false, //Avoid refetch on network is reconnected
      refetchOnWindowFocus: false, // Avoid refetching on focus
      staleTime: 5 * 60 * 1000, // 5 minutes stale time
    },
  },
});

export default queryClient;
