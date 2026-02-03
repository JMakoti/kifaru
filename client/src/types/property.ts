export type PropertyCategory = "retreat" | "beachfront" | "urban" | "coworking" | "mountain" | "countryside";

export type ImageCategory = "bedroom" | "bathroom" | "living" | "kitchen" | "exterior" | "amenity" | "view";

export type AccommodationType = "master_bedroom" | "standard_bedroom" | "shared_room" | "entire_property";

export type GuestType = "international" | "local" | "corporate";

export type StayType = "short_term" | "long_term" | "monthly";

export type FeatureType = "outdoor" | "indoor" | "wellness" | "entertainment" | "convenience";

export interface Amenity {
  image: File | null;
  label: string;
}

export interface PropertyImage {
  id?: number;
  image: File | null;
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

export interface PropertyFormData {
  id?: number;
  name: string;
  slug: string;
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
  background_image:  File | null;
  wifi_password: string;
  amenities: Amenity[];
  images: PropertyImage[];
  pricing_options: PricingOption[];
  features: Feature[];
  contacts: Contact[];
}

export const PROPERTY_CATEGORIES: { value: PropertyCategory; label: string }[] = [
  { value: "retreat", label: "Retreat" },
  { value: "beachfront", label: "Beachfront" },
  { value: "urban", label: "Urban" },
  { value: "coworking", label: "Co-working" },
  { value: "mountain", label: "Mountain" },
  { value: "countryside", label: "Countryside" },
];

export const IMAGE_CATEGORIES: { value: ImageCategory; label: string }[] = [
  { value: "bedroom", label: "Bedroom" },
  { value: "bathroom", label: "Bathroom" },
  { value: "living", label: "Living Room" },
  { value: "kitchen", label: "Kitchen" },
  { value: "exterior", label: "Exterior" },
  { value: "amenity", label: "Amenity" },
  { value: "view", label: "View" },
];

export const ACCOMMODATION_TYPES: { value: AccommodationType; label: string }[] = [
  { value: "master_bedroom", label: "Master Bedroom" },
  { value: "standard_bedroom", label: "Standard Bedroom" },
  { value: "shared_room", label: "Shared Room" },
  { value: "entire_property", label: "Entire Property" },
];

export const GUEST_TYPES: { value: GuestType; label: string }[] = [
  { value: "international", label: "International" },
  { value: "local", label: "Local" },
  { value: "corporate", label: "Corporate" },
];

export const STAY_TYPES: { value: StayType; label: string }[] = [
  { value: "short_term", label: "Short Term" },
  { value: "long_term", label: "Long Term" },
  { value: "monthly", label: "Monthly" },
];

export const FEATURE_TYPES: { value: FeatureType; label: string }[] = [
  { value: "outdoor", label: "Outdoor" },
  { value: "indoor", label: "Indoor" },
  { value: "wellness", label: "Wellness" },
  { value: "entertainment", label: "Entertainment" },
  { value: "convenience", label: "Convenience" },
];

export const emptyPropertyForm: PropertyFormData = {
  name: "",
  slug: "",
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
  images: [],
  pricing_options: [],
  features: [],
  contacts: [],
};
