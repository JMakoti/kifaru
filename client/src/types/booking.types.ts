import type { AccommodationType } from "./property";

/**
 * Payload used when CREATING a booking
 */
export interface BookingPayload {
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
  phone: string;
}

/**
 * Response from /bookings/calculate-price/
 */
export interface BookingPriceResponse {
  guest_type: string;
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
  payment_status?: string | null; // not called from the backend
  accommodation_type?: AccommodationType;
  guest_type: string;
  stay_type: string;
  number_of_guests?: number;
  number_of_adults?: number;
  number_of_children?: number;
  full_name?: string;
  email?: string;
  phone?: string;
  created_at: string;
}

export interface BookingResponse extends BookingPayload {
  id: number;
}

//booking response
export interface BookingPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Payload to Initialize Payment

export interface InitializePaymentPayload {
  booking_id: number;
}

export interface InitializePaymentResponse {
  message: string;
  payment_id: number;
  authorization_url: string;
  reference: string;
  access_code: string;
}

export type PaymentStatus = "completed" | "pending" | "failed";
export type PaymentMethod = "card" | "mpesa";

export interface Payment {
  id: number;
  booking: number;
  payment_method: PaymentMethod;
  amount: string; 
  currency: string;
  card_number_last4: string | null;
  card_type: string | null;
  transaction_id: string;
  payment_status: PaymentStatus;
  mpesa_receipt_number: string | null;
  mpesa_phone_number: string | null;
  paystack_reference: string;
  paystack_access_code: string;
  authorization_url: string;
  created_at: string; 
  completed_at: string | null;
  failure_reason: string | null;
}

export interface PaginatedPayments<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}


