export interface Property {
  id: number;
  name: string;
  slug: string;
  location: string;
  country: string;
  property_category: PropertyCategory;
  price: string;

  description: string;
  long_description?: string;

  bedrooms: number | null;
  bathrooms: number | null;
  square_meters: number | null;
  terrace_size: number | null;

  max_guests: number | null;
  min_nights: number;

  check_in_time: string;
  check_out_time: string;

  prepayment_percentage: number;
  cancellation_days: number;

  background_image: string;
  wifi_password: string;

  amenities: Amenity[];
  images: PropertyImage[];
  pricing_options: PricingOption[];
  features: Feature[];
  contacts: Contact[];
  network_properties: NetworkProperty[];

  average_rating: number | null;

  created_at: string;
  updated_at: string;
}

export type PropertyCategory = "coworking" | "beachfront" | "urban";

export interface Amenity {
  image: string;
  label: string;
  icon?: string;
}

export interface PropertyImage {
  id: number;
  image: string;
  order: number;
  category?: string;
}

export interface PricingOption {
  id: number;

  accommodation_type: "full_apartment" | "master_bedroom" | "single_bedroom";
  guest_type: "international" | "local";
  stay_type: "short_term" | "long_term" | "weekly";

  number_of_guests: number | null;

  min_nights: number;
  max_nights: number | null;

  price_per_night: string;
  weekly_price: string | null;

  includes_breakfast: boolean;
  includes_fullboard: boolean;
}

export interface Feature {
  id: number;
  feature_type: "indoor" | "outdoor";
  name: string;
  description: string;
  icon?: string;
}

export interface Contact {
  id: number;
  name: string;
  role: string;
  email?: string;
  phone?: string | null;
  whatsapp?: string | null;
}

export interface NetworkProperty {
  id: number;
  related_property: number;
  related_property_name: string;
  related_property_slug: string;
  travel_time_minutes: number;
  transport_available: boolean;
  description: string | null;
}

export interface PropertyDestinationProps {
  property: Property;
  index: number;
  isLeft: boolean;
  isHighlighted: boolean;
  onHover: (index: number | null) => void;
}

export interface PropertyReview {
  id: number;
  property: number;
  property_name: string;
  user: number;
  reviewer_name: string;
  rating: number;
  comment: string;
  avatar: string;
  country: string;
  created_at: Date;
}

export interface GalleryPhoto {
  id: number;
  image: string;
  title: string;
  category: string;
  order: number;
  is_featured: boolean;
  created_at: Date;
}
