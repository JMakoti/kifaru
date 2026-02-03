export type GalleryCategory = 
  | "property_showcase" 
  | "interior_design" 
  | "architecture" 
  | "landscape" 
  | "lifestyle";

export interface GalleryImage {
  id: number;
  image: string;
  title: string;
  category: GalleryCategory;
  order: number;
  is_featured: boolean;
  created_at: string;
}

export interface GalleryFormData {
  title: string;
  category: GalleryCategory;
  is_featured: boolean;
  imageFile: File | null;
}

export const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  property_showcase: "Property Showcase",
  interior_design: "Interior Design",
  architecture: "Architecture",
  landscape: "Landscape",
  lifestyle: "Lifestyle",
};