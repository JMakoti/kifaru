import { useQuery } from "@tanstack/react-query";
import type { Property } from "./property.types";
import { fetchProperties } from "./property.endpoints";

export const useProperties = () => {
  return useQuery<Property[]>({
    queryKey: ["properties"],
    queryFn: fetchProperties,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
