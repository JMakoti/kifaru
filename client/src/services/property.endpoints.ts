import type { Property, PropertyReview } from "./property.types";
import { api } from "./user.endpoints";

// ENDPOINTS
const GET_PROPERTIES = "/properties/";
const GET_DETAILS = "/properties";
// const UPDATE_PROPERTY = "";
// const DELETE_PROPERTY = "";
// const CREATE_PROPERTY = "";

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
