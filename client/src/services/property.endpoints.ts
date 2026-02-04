import type { Property, PropertyReview } from "@/types/property";
import { api } from "./user.endpoints";
import type { GalleryPhoto } from "@/types/gallery";
import { buildPropertyFormData } from "@/apps/admin/utils/formdata";

// ENDPOINTS
const GET_PROPERTIES = "/properties/";
const GET_DETAILS = "/properties";
const GET_GALLERY = "/gallery/";
// const UPDATE_PROPERTY = "";
const DELETE_PROPERTY = "/properties";
const CREATE_PROPERTY = "/properties/";
const GET_REVIEWS = "/reviews/";

// get propertties
export const fetchProperties = async (): Promise<Property[]> => {
  const { data } = await api.get(GET_PROPERTIES);
  return data;
};

// get properties details
export const getDetails = async (slug: string): Promise<Property> => {
  const { data } = await api.get(`${GET_DETAILS}/${slug}/`);
  return data;
};

//get reviews
export const fetchReviews = async (): Promise<PropertyReview[]> => {
  const { data } = await api.get(GET_REVIEWS);
  return data;
};

// create property
export const createProperty = async (data: Property) => {
  const formData = buildPropertyFormData(data);
  const response = await api.post(CREATE_PROPERTY, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// delete property
export const deleteProperty = (slug: string) =>
  api.delete(`${DELETE_PROPERTY}/${slug}/`);

//get specificed property booked date

//get reviews
export const fetchGallery = async (): Promise<GalleryPhoto[]> => {
  const { data } = await api.get(GET_GALLERY);
  return data;
};
