import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GalleryFormData, GalleryPhoto, PropertyGalleryResponse } from "@/types/gallery";
import { galleryApi } from "./gallery.endpoints";

// --- QUERY KEYS ---

export const galleryKeys = {
  all: ["gallery"] as const,
  lists: () => [...galleryKeys.all, "list"] as const,
  list: () => [...galleryKeys.lists()] as const,
  details: () => [...galleryKeys.all, "detail"] as const,
  detail: (id: number) => [...galleryKeys.details(), id] as const,
};

// --- GET ALL ---

export const useGalleryList = () => {
  return useQuery<PropertyGalleryResponse<GalleryPhoto>>({
    queryKey: galleryKeys.list(),
    queryFn: galleryApi.getAll,
    staleTime: 1000 * 60 * 5, 
    retry: 2,
  });
};

// --- GET BY ID ---

export const useGallery = (id: number) => {
  return useQuery<GalleryPhoto>({
    queryKey: galleryKeys.detail(id),
    queryFn: () => galleryApi.getById(id),
    enabled: !!id,
  });
};

// --- CREATE ---

// export const useCreateGallery = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: galleryApi.create,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: galleryKeys.list(),
//       });
//     },
//   });
// };

export const useCreateGallery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<GalleryFormData, "order">) => {
      const images =
        queryClient.getQueryData<GalleryPhoto[]>(galleryKeys.list()) || [];
      const newOrder =
        images.length > 0 ? Math.max(...images.map((i) => i.order)) + 1 : 1;
      return galleryApi.create({ ...data, order: newOrder });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: galleryKeys.list(),exact: true, });
    },
  });
};
// --- UPDATE ---

export const useUpdateGallery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<GalleryFormData>;
    }) => galleryApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: galleryKeys.list(),
        exact: true,
      });

      queryClient.invalidateQueries({
        queryKey: galleryKeys.detail(variables.id),
        exact: true,
      });
    },
  });
};

// --- DELETE ---

export const useDeleteGallery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: galleryApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: galleryKeys.list(),
        exact: true,
      });
    },
  });
};
