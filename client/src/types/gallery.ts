export type GalleryCategory =
  | "lifestyle"
  | "property_showcase"
  | "amenities"
  | "location"
  | "events"
  | "dining"
  | "activities"
  | "other";

// gallery update

export type GalleryUpdatePayload = Partial<GalleryFormData>;

//  gallery photo
export interface GalleryPhoto {
  id: number;
  image: string;
  title: string;
  category: GalleryCategory;
  order: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: Date;
}

export interface GalleryFormData {
  image: File | null;
  title: string;
  category: GalleryCategory;
  order: number;
  is_featured: boolean;
  is_active: boolean;
}

export const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  property_showcase: "Property Showcase",
  amenities: "Amenities",
  location: "Location",
  events: "Events",
  lifestyle: "Lifestyle",
  dining: "Dining",
  activities: "Activities",
  other: "Other",
};
