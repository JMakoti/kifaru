import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { propertyApi, reviewApi } from "./property.endpoints";
import type { Property, PropertyReview } from "@/types/property";
import { toast } from "sonner";

export const PROPERTY_QUERY_KEY = ["properties"];
export const REVIEWS_QUERY = ["reviews"];
export const PROPERTY_BOOKING = ["property-bookings"];

// Query hook to fetch all properties
export function useProperties() {
  return useQuery<Property[]>({
    queryKey: PROPERTY_QUERY_KEY,
    queryFn: propertyApi.getAll,
    enabled: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });
}

// Query hook to fetch a single property
export function usePropertyDetails(slug: string) {
  return useQuery<Property, Error>({
    queryKey: [...PROPERTY_QUERY_KEY, slug],
    queryFn: () => propertyApi.getById(slug),
    enabled: !!slug,
  });
}

// Mutation hook to create a property
export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: propertyApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PROPERTY_QUERY_KEY });
      toast.success("Property created successfully!", {
        description: `${data.name} has been added to your listings.`,
      });
    },
    onError: (error: Error) => {
      toast.error("Failed to create property", {
        description: error.message || "Please try again later.",
      });
    },
  });
}

// Mutation hook to update a property
export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, property }: { slug: string; property: Property }) =>
      propertyApi.update(slug, property),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PROPERTY_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: [...PROPERTY_QUERY_KEY, data.id],
      });
      toast.success("Property updated successfully!", {
        description: `${data.name} has been updated.`,
      });
    },
    onError: (error: Error) => {
      toast.error("Failed to update property", {
        description: error.message || "Please try again later.",
      });
    },
  });
}

// Mutation hook to delete a property
export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: propertyApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTY_QUERY_KEY });
      toast.success("Property deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error("Failed to delete property", {
        description: error.message || "Please try again later.",
      });
    },
  });
}

// Query hook to fetch all booked dates
export const usePropertyBookings = (propertyId: number | string) => {
  return useQuery({
    queryKey: [PROPERTY_BOOKING, propertyId],
    queryFn: () => propertyApi.getBookedDates(propertyId),
    enabled: !!propertyId,
    staleTime: 1000 * 60 * 5,
  });
};

//Query hook to fetch all reviews
export const useReviews = () => {
  return useQuery<PropertyReview[]>({
    queryKey: REVIEWS_QUERY,
    queryFn: reviewApi.getAll,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
