import type {
  Property,
  PropertyBookingsResponse,
  PropertyPaginatedResponse,
  PropertyReview,
  ReviewPayload,
  ReviewsPaginatedResponse,
} from "@/types/property";
import { api } from "./user.endpoints";
// import { buildPropertyFormData } from "@/apps/admin/utils/formdata";

// ENDPOINTS
const PROPERTY = "/properties";
const REVIEWS = "/reviews";

// Property API endpoints
export const propertyApi = {
  // Create a new property
  // create: async (property: Property): Promise<Property> => {
  //   const formData = buildPropertyFormData(property);
  //   const response = await api.post<Property>(`${PROPERTY}/`, formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  //   return response.data;
  // },

  // Update an existing property
  // update: async (slug: string, property: Property): Promise<Property> => {
  //   const formData = buildPropertyFormData(property);
  //   const response = await api.patch<Property>(
  //     `${PROPERTY}/${slug}/`,
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     },
  //   );
  //   return response.data;
  // },

  // Get all properties
  getAll: async (): Promise<PropertyPaginatedResponse<Property>> => {
    const response = await api.get<PropertyPaginatedResponse<Property>>(
      `${PROPERTY}/`,
    );
    return response.data;
  },

  // Get a single property by ID
  getById: async (slug: string): Promise<Property> => {
    const response = await api.get<Property>(`${PROPERTY}/${slug}/`);
    return response.data;
  },

  // Delete a property
  delete: async (slug: string): Promise<void> => {
    await api.delete(`${PROPERTY}/${slug}/`);
  },

  // Get specificed property booked date
  getBookedDates: async (
    id: number | string,
  ): Promise<PropertyBookingsResponse> => {
    const response = await api.get<PropertyBookingsResponse>(
      `${PROPERTY}/${id}/calendar/`,
    );
    return response.data;
  },
};

export const reviewApi = {
  //get reviews
  getAll: async (): Promise<ReviewsPaginatedResponse<PropertyReview>> => {
    const { data } = await api.get<ReviewsPaginatedResponse<PropertyReview>>(
      `${REVIEWS}/`,
    );
    return data;
  },

  //get specific review
  getById: async (id: number): Promise<PropertyReview> => {
    const { data } = await api.get(`${REVIEWS}/${id}/`);
    return data;
  },

  //create a new review
  create: async (payload: ReviewPayload): Promise<PropertyReview> => {
    // Use FormData if sending a File object
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });

    const { data } = await api.post(`${REVIEWS}/`, formData);
    return data;
  },

  //update the review
  update: async (
    id: number,
    payload: Partial<ReviewPayload>,
  ): Promise<PropertyReview> => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      // Only append if value exists to avoid overwriting with null/undefined
      if (value !== undefined && value !== null) {
        formData.append(key, value as string | Blob);
      }
    });

    const { data } = await api.patch(`${REVIEWS}/${id}/`, formData);
    return data;
  },

  //delete a specific review
  delete: async (id: number): Promise<void> => {
    await api.delete(`${REVIEWS}/${id}/`);
  },
};
