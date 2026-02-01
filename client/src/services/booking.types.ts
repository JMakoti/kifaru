
export type AccommodationType =
  | "master_bedroom"
  | "single_room"
  | "full_apartment"

// export interface Booking{

// }



export interface BookingPayload {
  property: number;
  accommodation_type: AccommodationType;
  check_in: string; // YYYY-MM-DD
  check_out: string; // YYYY-MM-DD
  number_of_guests: number;
  number_of_adults: number;
  number_of_children: number;
  dog_included: boolean;
  jacuzzi_reservation: boolean;
  special_requests?: string;
}
