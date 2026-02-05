import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProperty,
  deleteProperty,
  fetchProperties,
  fetchReviews,
  getBookedDates,
  getDetails,
} from "./property.endpoints";
import type { Property, PropertyReview } from "@/types/property";

export const PROPERTY_QUERY_KEY = ["properties"];
export const PROPERTY_DETAILS_QUERY_KEY = ["property-details"];
export const REVIEWS_QUERY = ["reviews"];
export const GALLERY_QUERY = ["gallery"];

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTY_QUERY_KEY });
    },
  });
};

export const useDeleteProperty = () => {
  return useMutation({
    mutationFn: deleteProperty,
  });
};

export const useProperties = () => {
  return useQuery<Property[]>({
    queryKey: PROPERTY_QUERY_KEY,
    queryFn: fetchProperties,
    enabled: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });
};

export const usePropertyDetails = (slug: string) => {
  return useQuery<Property, Error>({
    queryKey: [PROPERTY_DETAILS_QUERY_KEY, slug],
    queryFn: () => getDetails(slug),
    enabled: !!slug,
  });
};

export const useReviews = () => {
  return useQuery<PropertyReview[]>({
    queryKey: REVIEWS_QUERY,
    queryFn: fetchReviews,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export const usePropertyBookings = (propertyId: number | string) => {
  return useQuery({
    queryKey: ["property-bookings", propertyId],
    queryFn: () => getBookedDates(propertyId),
    enabled: !!propertyId,
    staleTime: 1000 * 60 * 5,
  });
};
