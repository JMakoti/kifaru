import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { propertyApi, reviewApi } from "./property.endpoints";
import type { Property, PropertyReview, ReviewPayload } from "@/types/property";
import { toast } from "sonner";

export const PROPERTY_QUERY_KEY = ["properties"];
export const REVIEWS_QUERY = ["reviews"];
export const PROPERTY_BOOKING = ["property-bookings"];

// Query hook to fetch all properties
export function useProperties() {
  return useQuery<Property[]>({
    queryKey: PROPERTY_QUERY_KEY,
    queryFn: propertyApi.getAll,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    placeholderData: (previousData) => previousData,
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
// export const useReviews = () => {
//   return useQuery<PropertyReview[]>({
//     queryKey: REVIEWS_QUERY,
//     queryFn: reviewApi.getAll,
//     staleTime: 1000 * 60 * 5,
//     retry: 2,
//   });
// };

export const useReviews = () => {
  const queryClient = useQueryClient();

  // 1. Fetch all reviews
  const useGetReviews = () =>
    useQuery<PropertyReview[]>({
      queryKey: REVIEWS_QUERY,
      queryFn: reviewApi.getAll,
      staleTime: 1000 * 60 * 5,
      retry: 2,
    });

  // 2. Fetch a single review
  const useGetReview = (id: number) =>
    useQuery({
      queryKey: [REVIEWS_QUERY, id],
      queryFn: () => reviewApi.getById(id),
      enabled: !!id,
    });

  // 3. Create a review
  const useCreateReview = () =>
    useMutation({
      mutationFn: reviewApi.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [REVIEWS_QUERY] });
      },
    });

  // 4. Create a review
  const useUpdateReview = () =>
    useMutation({
      mutationFn: ({
        id,
        payload,
      }: {
        id: number;
        payload: Partial<ReviewPayload>;
      }) => reviewApi.update(id, payload),
      onSuccess: (updatedReview) => {
        queryClient.invalidateQueries({ queryKey: [REVIEWS_QUERY] });
        queryClient.setQueryData(
          [REVIEWS_QUERY, updatedReview.id],
          updatedReview,
        );
      },
    });

  // 5. Delete a review
  const useDeleteReview = () =>
    useMutation({
      mutationFn: reviewApi.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [REVIEWS_QUERY] });
      },
      onError: (error) => {
        console.error("Delete failed:", error);
      },
    });

  return {
    useGetReviews,
    useGetReview,
    useCreateReview,
    useUpdateReview,
    useDeleteReview,
  };
};
