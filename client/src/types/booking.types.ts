import type { AccommodationType } from "./property";

/**
 * Payload used when CREATING a booking
 */
export interface BookingPayload {
  id?: 0;
  property: number;
  accommodation_type: AccommodationType;
  check_in: string;
  check_out: string;
  number_of_guests: number;
  number_of_adults: number;
  number_of_children: number;
  full_name: string;
  email: string;
  phone: string;
  id_passport_number: string;
  dog_included: boolean;
  jacuzzi_reservation: boolean;
  special_requests?: string;
}

/**
 * Query params for PRICE CALCULATION (GET)
 */
export interface BookingPriceQuery {
  property: number;
  check_in: string;
  check_out: string;
  accommodation_type: AccommodationType;
  number_of_guests?: number;
}

/**
 * Response from /bookings/calculate-price/
 */
export interface BookingPriceResponse {
  guest_type: string;
  stay_type: string;
  price_per_night: string;
  weekly_price: string;
  total_nights: number;
  total_amount: string;
  includes_breakfast: boolean;
  includes_fullboard: boolean;
  property_name: string;
  accommodation_type: AccommodationType;
}

export interface Booking {
  id: number;
  booking_reference: string;
  property_name: string;
  property_location: string;
  property_image: string;
  check_in: string;
  check_out: string;
  total_days: number;
  total_amount: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  payment_status: string | null;
  accommodation_type?: AccommodationType;
  number_of_guests?: number;
  number_of_adults?: number;
  number_of_children?: number;
  full_name?: string;
  email?: string;
  phone?: string;
  created_at: string;
}
