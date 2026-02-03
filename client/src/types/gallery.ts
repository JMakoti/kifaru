export type GalleryCategory =
  | "lifestyle"
  | "property_showcase"
  | "amenities"
  | "location"
  | "events"
  | "dining"
  | "activities"
  | "other";

//  gallery photo
export interface GalleryPhoto {
  id: number;
  image: string;
  title: string;
  category: GalleryCategory;
  order: number;
  is_featured: boolean;
  created_at: Date;
}

export interface GalleryFormData {
  title: string;
  category: GalleryCategory;
  is_featured: boolean;
  imageFile: File | null;
}

// export const IMAGE_CATEGORY_CHOICE: {
//   value: GalleryCategory;
//   label: string;
// }[] = [
//   { value: "property_showcase", label: "Property Showcase" },
//   { value: "lifestyle", label: "Lifestyle" },
//   { value: "amenities", label: "Amenities" },
//   { value: "location", label: "Location" },
//   { value: "events", label: "Events" },
//   { value: "dining", label: "Dining" },
//   { value: "other", label: "Other" },
// ];

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
