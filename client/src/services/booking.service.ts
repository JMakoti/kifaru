import type {
  BookingPayload,
  BookingPriceQuery,
  InitializePaymentPayload,
  InitializePaymentResponse,
} from "@/types/booking.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookingApi, paymentApi } from "./booking.endpoints";
import type { AxiosError } from "axios";

//  QUERY KEYS
const BOOKING_KEYS = {
  all: ["bookings"] as const,
  my: ["my-bookings"] as const,
  detail: (id: number) => ["bookings", id] as const,
  price: (params?: BookingPriceQuery) => ["booking-price", params] as const,
};

//  QUERIES
export const useBookings = () =>
  useQuery({
    queryKey: BOOKING_KEYS.all,
    queryFn: bookingApi.getAll,
  });

export const useMyBookings = () =>
  useQuery({
    queryKey: BOOKING_KEYS.my,
    queryFn: bookingApi.myBookings,
  });

export const useBooking = (id: number) =>
  useQuery({
    queryKey: BOOKING_KEYS.detail(id),
    queryFn: () => bookingApi.getById(id),
    enabled: !!id,
  });

export const useCalculateBookingPrice = (params?: BookingPriceQuery) =>
  useQuery({
    queryKey: BOOKING_KEYS.price(params),
    queryFn: () => bookingApi.calculatePrice(params!),
    enabled:
      !!params?.property && //property id
      !!params?.check_in &&
      !!params?.check_out &&
      !!params?.accommodation_type &&
      !!params?.number_of_guests &&
      !!params?.phone,
    staleTime: 60_000,
  });

// MUTATIONS

// export const useCreateBooking = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (data: BookingPayload) => bookingApi.create(data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: BOOKING_KEYS.all });
//       queryClient.invalidateQueries({ queryKey: BOOKING_KEYS.my });
//     },
//   });
// };

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BookingPayload) => bookingApi.create(data),
    onSuccess: (data) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: BOOKING_KEYS.all });
      queryClient.invalidateQueries({ queryKey: BOOKING_KEYS.my });

      // Log here to see if the hook sees the ID
      console.log("Hook level success, ID:", data?.id);

      // Return data so the component's mutate call can see it
      return data;
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => bookingApi.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKING_KEYS.all });
      queryClient.invalidateQueries({ queryKey: BOOKING_KEYS.my });
    },
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => bookingApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKING_KEYS.all });
    },
  });
};

//initialize payment
export const useInitializePayment = () => {
  return useMutation<
    InitializePaymentResponse,
    AxiosError<{ message: string }>, 
    InitializePaymentPayload
  >({
    mutationFn: paymentApi.initialize,
    onSuccess: (data) => {
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        console.error("Payment initialization failed: URL missing in response");
      }
    },
    onError: (error) => {
      // Use the typed error message from the backend if available
      const backendMessage = error.response?.data?.message;
      console.error(
        "Payment initialization failed:",
        backendMessage || error.message,
      );
    },
  });
};
