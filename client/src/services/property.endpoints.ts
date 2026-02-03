import type { PropertyFormData } from "@/types/property";
import type { GalleryPhoto, Property, PropertyReview } from "./property.types";
import { api } from "./user.endpoints";

// ENDPOINTS
const GET_PROPERTIES = "/properties/";
const GET_DETAILS = "/properties";
const GET_GALLERY = "/gallery/";
// const UPDATE_PROPERTY = "";
// const DELETE_PROPERTY = "";
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
export const createProperty = async (data: PropertyFormData) => {
  const response = await api.post(CREATE_PROPERTY, data);
  return response.data;
};

//get specificed property booked date


//get reviews
export const fetchGallery = async (): Promise<GalleryPhoto[]> => {
  const { data } = await api.get(GET_GALLERY);
  return data;
};
