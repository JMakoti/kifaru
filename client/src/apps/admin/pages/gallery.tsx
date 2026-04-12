import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import type {
  GalleryCategory,
  GalleryFormData,
  GalleryPhoto,
} from "@/types/gallery";
import { GalleryHeader } from "../components/gallery/GalleryHeader";
import { EmptyState } from "../components/gallery/EmptyState";
import { GalleryCard } from "../components/gallery/GalleryCard";
import { GalleryModal } from "../components/gallery/GalleryModal";
import { DeleteConfirmDialog } from "../components/gallery/DeleteConfirmDialog";
import {
  useCreateGallery,
  useDeleteGallery,
  useGalleryList,
  useUpdateGallery,
} from "@/services/gallery.sevice";
import LoadingScreen from "@/components/loadingscreen";

export default function Gallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryPhoto | null>(null);
  const [deletingImage, setDeletingImage] = useState<GalleryPhoto | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    GalleryCategory | "all"
  >("all");

  //queries
  const { data, isLoading } = useGalleryList();
  const createGallery = useCreateGallery();
  const updateGallery = useUpdateGallery();
  const deleteGallery = useDeleteGallery();

  const images = useMemo(() => data?.results || [], [data]);

  //filter images
  const filteredImages = useMemo(() => {
    if (selectedCategory === "all") return images;
    return images.filter((img) => img.category === selectedCategory);
  }, [images, selectedCategory]);

  const handleAddNew = () => {
    setEditingImage(null);
    setIsModalOpen(true);
  };

  const handleEdit = (image: GalleryPhoto) => {
    setEditingImage(image);
    setIsModalOpen(true);
  };

  const handleDelete = (image: GalleryPhoto) => {
    setDeletingImage(image);
  };

  const confirmDelete = () => {
    if (!deletingImage) return;

    deleteGallery.mutate(deletingImage.id, {
      onSuccess: () => {
        toast.success(`"${deletingImage.title}" deleted successfully`);
        setDeletingImage(null);
      },
    });
  };

  const handleToggleFeatured = (image: GalleryPhoto) => {
    // Partial update for PATCH
    const data: Partial<GalleryFormData> = {
      is_featured: !image.is_featured,
    };

    updateGallery.mutate(
      { id: image.id, data },
      {
        onSuccess: () => {
          toast.success(
            image.is_featured
              ? `"${image.title}" removed from featured`
              : `"${image.title}" marked as featured`,
          );
        },
      },
    );
  };

  const handleSubmit = (formData: GalleryFormData) => {
    if (editingImage) {
      updateGallery.mutate(
        { id: editingImage.id, data: formData },
        {
          onSuccess: () => {
            toast.success(`"${formData.title}" updated successfully`);
            setIsModalOpen(false);
            setEditingImage(null);
          },
        },
      );
    } else {
      createGallery.mutate(formData, {
        onSuccess: () => {
          toast.success(`"${formData.title}" added to gallery`);
          setIsModalOpen(false);
        },
      });
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background mt-15">
      <div className="container py-8 px-6">
        <GalleryHeader
          onAddNew={handleAddNew}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          totalCount={images.length}
        />

        <main className="container py-8">
          {filteredImages.length === 0 ? (
            <EmptyState onAddNew={handleAddNew} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image) => (
                  <GalleryCard
                    key={image.id}
                    image={image}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleFeatured={handleToggleFeatured}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </main>

        <GalleryModal
          key={
            editingImage ? editingImage.id : isModalOpen ? "new-open" : "new"
          }
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingImage(null);
          }}
          onSubmit={handleSubmit}
          editImage={editingImage}
          isSubmitting={createGallery.isPending || updateGallery.isPending}
        />

        <DeleteConfirmDialog
          open={!!deletingImage}
          onClose={() => setDeletingImage(null)}
          onConfirm={confirmDelete}
          image={deletingImage}
          isDeleting={deleteGallery.isPending}
        />
      </div>
    </div>
  );
}
