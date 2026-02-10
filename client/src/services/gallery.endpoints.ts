import type { GalleryFormData, GalleryPhoto, PropertyGalleryResponse } from "@/types/gallery";
import { api } from "./user.endpoints";

const GALLERY = "/gallery";

export const galleryApi = {
  // --- GET all ---
  getAll: async (): Promise<PropertyGalleryResponse<GalleryPhoto>> => {
  const response = await api.get<PropertyGalleryResponse<GalleryPhoto>>(`${GALLERY}/`);
  return response.data;
},

  // --- GET by ID ---
  getById: async (id: number): Promise<GalleryPhoto> => {
    const response = await api.get<GalleryPhoto>(`${GALLERY}/${id}/`);
    return response.data;
  },

  // --- CREATE ---
  create: async (data: GalleryFormData): Promise<GalleryPhoto> => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("order", String(data.order));
    formData.append("is_featured", String(data.is_featured));
    formData.append("is_active", String(data.is_active));
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    const response = await api.post<GalleryPhoto>(`${GALLERY}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // --- UPDATE (PATCH) ---
  update: async (
    id: number,
    data: Partial<GalleryFormData>,
  ): Promise<GalleryPhoto> => {
    const formData = new FormData();

    // Handle standard fields
    if (data.title) formData.append("title", data.title);
    if (data.category) formData.append("category", data.category);
    if (data.order !== undefined) formData.append("order", String(data.order));
    if (data.is_featured !== undefined)
      formData.append("is_featured", String(data.is_featured));
    if (data.is_active !== undefined)
      formData.append("is_active", String(data.is_active));
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    const response = await api.patch<GalleryPhoto>(
      `${GALLERY}/${id}/`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  },

  // --- DELETE ---
  delete: async (id: number): Promise<void> => {
    await api.delete(`${GALLERY}/${id}/`);
  },
};
