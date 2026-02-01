import type { BookingPayload } from "./booking.types";
import { api } from "./user.endpoints";

// ENDPOINTS
const REQUEST_BOOKING = "/bookings/";
// const GET_BOOKING = "/bookings/";
// const GET_BOOKINGDETAILS = "/bookings/:id/";

//create booking
export const createBooking = async (data: BookingPayload) => {
  const response = await api.post(REQUEST_BOOKING, data);
  return response.data;
};
