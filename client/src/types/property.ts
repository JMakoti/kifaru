export type PropertyCategory = "retreat" | "beachfront" | "urban" | "coworking";

export type ImageCategory =
  | "bedroom"
  | "bathroom"
  | "living_room"
  | "kitchen"
  | "outdoor"
  | "garden"
  | "other";

export type AccommodationType = "master_bedroom" | "full_apartment";

export type GuestType = "international" | "local";

export type StayType = "short_term" | "long_term" | "weekly";

export type FeatureType = "outdoor" | "indoor" | "service" | "unique";

export interface Amenity {
  image: File | string | null;
  label: string;
}

export interface PropertyImage {
  id?: number;
  image: File | string | null;
  category: ImageCategory;
  order: number;
}

export interface PricingOption {
  id?: number;
  accommodation_type: AccommodationType;
  guest_type: GuestType;
  stay_type: StayType;
  number_of_guests: number;
  min_nights: number;
  max_nights: number;
  price_per_night: string;
  weekly_price: string;
  includes_breakfast: boolean;
  includes_fullboard: boolean;
}

export interface Feature {
  id?: number;
  feature_type: FeatureType;
  name: string;
  description: string;
  icon: string;
}

export interface Contact {
  id?: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  whatsapp: string;
}

export interface Highlight {
  text: string;
}

export interface Property {
  id: number;
  name: string;
  slug?: string;
  location: string;
  country: string;
  property_category: PropertyCategory;
  price: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  square_meters: number;
  terrace_size: number;
  max_guests: number;
  min_nights: number;
  check_in_time: string;
  check_out_time: string;
  prepayment_percentage: number;
  cancellation_days: number;
  background_image: File | string | null;
  wifi_password: string;
  amenities: Amenity[];
  property_images: PropertyImage[];
  pricing_options: PricingOption[];
  features: Feature[];
  contacts: Contact[];
  highlights: Highlight[];
  average_rating?: number | null;
}

export const PROPERTY_CATEGORIES: { value: PropertyCategory; label: string }[] =
  [
    { value: "retreat", label: "Retreat" },
    { value: "beachfront", label: "Beachfront" },
    { value: "urban", label: "Urban" },
    { value: "coworking", label: "Co-working" },
  ];

export const IMAGE_CATEGORIES: { value: ImageCategory; label: string }[] = [
  { value: "bedroom", label: "Bedroom" },
  { value: "bathroom", label: "Bathroom" },
  { value: "living_room", label: "Living Room" },
  { value: "kitchen", label: "Kitchen" },
  { value: "garden", label: "Garden" },
  { value: "outdoor", label: "Outdoor" },
  { value: "other", label: "Other" },
];

export const ACCOMMODATION_TYPES: {
  value: AccommodationType;
  label: string;
}[] = [
  { value: "master_bedroom", label: "Master Bedroom" },
  { value: "full_apartment", label: "Full Apartment" },
];

export const GUEST_TYPES: { value: GuestType; label: string }[] = [
  { value: "international", label: "International" },
  { value: "local", label: "Local" },
];

export const STAY_TYPES: { value: StayType; label: string }[] = [
  { value: "short_term", label: "Short Term" },
  { value: "long_term", label: "Long Term" },
  { value: "weekly", label: "Weekly" },
];

export const FEATURE_TYPES: { value: FeatureType; label: string }[] = [
  { value: "outdoor", label: "Outdoor" },
  { value: "indoor", label: "Indoor" },
  { value: "service", label: "Service" },
  { value: "unique", label: "Unique" },
  // { value: "wellness", label: "Wellness" },
  // { value: "entertainment", label: "Entertainment" },
  // { value: "convenience", label: "Convenience" },
];

export const emptyPropertyForm: Property = {
  id: 0,
  name: "",
  location: "",
  country: "",
  property_category: "retreat",
  price: "",
  description: "",
  bedrooms: 0,
  bathrooms: 0,
  square_meters: 0,
  terrace_size: 0,
  max_guests: 0,
  min_nights: 1,
  check_in_time: "15:00",
  check_out_time: "11:00",
  prepayment_percentage: 50,
  cancellation_days: 30,
  background_image: null,
  wifi_password: "",
  amenities: [],
  property_images: [],
  pricing_options: [],
  features: [],
  contacts: [],
  highlights: [],
  average_rating: 0,
};
//property paginated response
export interface PropertyPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// destinations
export interface PropertyDestinationProps {
  property: Property;
  index: number;
  isLeft: boolean;
  isHighlighted: boolean;
  onHover: (index: number | null) => void;
}

//property booking dates
export interface BookingEvent {
  type: "booking" | "maintenance" | string;
  id: number;
  start_date: string;
  end_date: string;
  title: string;
  status: "confirmed" | "pending" | string;
  booking_reference: string;
  guest_name: string;
  reason?: string;
}

export interface PropertyBookingsResponse {
  property_id: number;
  property_name: string;
  start_date: string;
  end_date: string;
  events: BookingEvent[];
}

//property review
export interface PropertyReview {
  id: number;
  property: number;
  property_name: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  avatar: string;
  country: string;
  created_at: string;
}

export interface ReviewPayload {
  property: number;
  reviewer_name: string;
  rating: number;
  comment: string;
  avatar: string | File;
  country: string;
}

export interface ReviewsPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
