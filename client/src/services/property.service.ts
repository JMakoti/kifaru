import { useQuery } from "@tanstack/react-query";
import { type PropertyReview, type Property } from "./property.types";
import { fetchProperties, fetchReviews, getDetails } from "./property.endpoints";

export const PROPERTY_QUERY_KEY = ["properties"];
export const PROPERTY_DETAILS_QUERY_KEY = ["property-details"];
export const REVIEWS_QUERY = ["reviews"]

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

export const useReviews = () =>{
  return useQuery<PropertyReview[]>({
    queryKey: REVIEWS_QUERY,
    queryFn: fetchReviews,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })
}
