import type {
  Property,
  PropertyBookingsResponse,
  PropertyReview,
} from "@/types/property";
import { api } from "./user.endpoints";
import { buildPropertyFormData } from "@/apps/admin/utils/formdata";

// ENDPOINTS
const PROPERTY = "/properties";
const REVIEWS = "/reviews/";

// get propertties
// export const fetchProperties = async (): Promise<Property[]> => {
//   const { data } = await api.get(PROPERTY);
//   return data;
// };

// // get properties details
// export const getDetails = async (slug: string): Promise<Property> => {
//   const { data } = await api.get(`${GET_DETAILS}/${slug}/`);
//   return data;
// };

// //get reviews
// export const fetchReviews = async (): Promise<PropertyReview[]> => {
//   const { data } = await api.get(REVIEWS);
//   return data;
// };

// // create property
// export const createProperty = async (data: Property) => {
//   const formData = buildPropertyFormData(data);
//   const response = await api.post(CREATE_PROPERTY, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return response.data;
// };

// // delete property
// export const deleteProperty = (slug: string) =>
//   api.delete(`${DELETE_PROPERTY}/${slug}/`);

//get specificed property booked date
// export const getBookedDates = async (
//   id: number | string,
// ): Promise<PropertyBookingsResponse> => {
//   const response = await api.get<PropertyBookingsResponse>(
//     `${PROPERTY}/${id}/calendar/`,
//   );
//   return response.data;
// };

// Property API endpoints
export const propertyApi = {
  // Create a new property
  create: async (property: Property): Promise<Property> => {
    const formData = buildPropertyFormData(property);
    const response = await api.post<Property>(`${PROPERTY}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Update an existing property
  update: async (slug: string, property: Property): Promise<Property> => {
    const formData = buildPropertyFormData(property);
    const response = await api.patch<Property>(
      `${PROPERTY}/${slug}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  // Get all properties
  getAll: async (): Promise<Property[]> => {
    const response = await api.get<Property[]>(`${PROPERTY}/`);
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

// Reviews API endpoints
export const reviewApi = {
  //get reviews
  getAll: async (): Promise<PropertyReview[]> => {
    const { data } = await api.get(REVIEWS);
    return data;
  },
};
