import type { BookingPayload, BookingPriceQuery, BookingPriceResponse } from "@/types/booking.types";
import { api } from "./user.endpoints";
const BOOKINGS = "/bookings";
const MY_BOOKINGS = "/bookings/my-bookings";
const CALCULATE_PRICE = "/bookings/calculate-price";

export const bookingApi = {
  /* --------------------------------
   * PRICE CALCULATION (GET)
   * -------------------------------- */
  calculatePrice: async (
    params: BookingPriceQuery,
  ): Promise<BookingPriceResponse> => {
    const response = await api.get<BookingPriceResponse>(
      `${CALCULATE_PRICE}/`,
      { params },
    );
    return response.data;
  },

  /* --------------------------------
   * BOOKINGS CRUD
   * -------------------------------- */
  create: async (data: BookingPayload): Promise<BookingPayload> => {
    const response = await api.post<BookingPayload>(`${BOOKINGS}/`, data);
    return response.data;
  },

  getAll: async (): Promise<BookingPayload[]> => {
    const response = await api.get<BookingPayload[]>(`${BOOKINGS}/`);
    return response.data;
  },

  getById: async (id: number): Promise<BookingPayload> => {
    const response = await api.get<BookingPayload>(`${BOOKINGS}/${id}/`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`${BOOKINGS}/${id}/`);
  },

  cancel: async (id: number): Promise<void> => {
    await api.post(`${BOOKINGS}/${id}/cancel/`);
  },

  myBookings: async (): Promise<BookingPayload[]> => {
    const response = await api.get<BookingPayload[]>(`${MY_BOOKINGS}/`);
    return response.data;
  },
};
