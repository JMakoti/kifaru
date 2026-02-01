import { useMutation } from "@tanstack/react-query";
import { createBooking } from "./booking.endpoints";
import type { BookingPayload } from "./booking.types";

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: (data: BookingPayload) => createBooking(data),
  });
};
