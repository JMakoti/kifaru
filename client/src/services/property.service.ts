import { useQuery } from "@tanstack/react-query";
import type { Property } from "./property.types";
import { fetchProperties, getDetails } from "./property.endpoints";

export const PROPERTY_QUERY_KEY = ["properties"];
export const PROPERTY_DETAILS_QUERY_KEY = ["property-details"];

export const useProperties = () => {
  return useQuery<Property[]>({
    queryKey: PROPERTY_QUERY_KEY,
    queryFn: fetchProperties,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export const usePropertyDetails = (slug: string) => {
  return useQuery<Property, Error>({
    queryKey: [PROPERTY_DETAILS_QUERY_KEY, slug],
    queryFn: () => getDetails(slug),
    enabled: !!slug,
  });
};
