import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type PropertyReview,
  type Property,
  type GalleryPhoto,
} from "./property.types";
import {
  createProperty,
  fetchGallery,
  fetchProperties,
  fetchReviews,
  getDetails,
} from "./property.endpoints";
import type { PropertyFormData } from "@/types/property";

export const PROPERTY_QUERY_KEY = ["properties"];
export const PROPERTY_DETAILS_QUERY_KEY = ["property-details"];
export const REVIEWS_QUERY = ["reviews"];
export const GALLERY_QUERY = ["gallery"];

export const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PropertyFormData) => createProperty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTY_QUERY_KEY });
    },
  });
};

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

export const useReviews = () => {
  return useQuery<PropertyReview[]>({
    queryKey: REVIEWS_QUERY,
    queryFn: fetchReviews,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export const useGallery = () => {
  return useQuery<GalleryPhoto[]>({
    queryKey: GALLERY_QUERY,
    queryFn: fetchGallery,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
