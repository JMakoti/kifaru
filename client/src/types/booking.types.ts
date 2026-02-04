export type AccommodationType =
  | "master_bedroom"
  | "single_room"
  | "full_apartment";

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
