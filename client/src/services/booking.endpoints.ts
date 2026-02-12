import type {
  Booking,
  BookingPaginatedResponse,
  BookingPayload,
  BookingPriceQuery,
  BookingPriceResponse,
  BookingResponse,
  InitializePaymentPayload,
  InitializePaymentResponse,
} from "@/types/booking.types";
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
  // create: async (data: BookingPayload): Promise<BookingPayload> => {
  //   const response = await api.post<BookingPayload>(`${BOOKINGS}/`, data);
  //   console.log("Backend Raw Response:", response.data);
  //   return response.data;
  // },
  create: async (data: BookingPayload): Promise<BookingResponse> => {
    const response = await api.post<BookingResponse>(`${BOOKINGS}/`, data);
    console.log("Full response.data from Backend:", response.data);
    return response.data;
  },

  getAll: async (): Promise<Booking[]> => {
    const response = await api.get<BookingPaginatedResponse<Booking>>(
      `${BOOKINGS}/`,
    );
    return response.data.results;
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

  myBookings: async (): Promise<Booking[]> => {
    const response = await api.get<BookingPaginatedResponse<Booking>>(
      `${MY_BOOKINGS}/`,
    );
    return response.data.results;
  },
};

// Payment Api
export const paymentApi = {
  //initialize payment
  initialize: async (
    payload: InitializePaymentPayload,
  ): Promise<InitializePaymentResponse> => {
    const { data } = await api.post("/payments/initialize/", payload);
    return data;
  },
};
