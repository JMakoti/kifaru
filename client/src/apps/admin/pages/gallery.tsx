import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import type {
  GalleryCategory,
  GalleryFormData,
  GalleryImage,
} from "@/types/gallery";
import { GalleryHeader } from "../components/gallery/GalleryHeader";
import { EmptyState } from "../components/gallery/EmptyState";
import { GalleryCard } from "../components/gallery/GalleryCard";
import { GalleryModal } from "../components/gallery/GalleryModal";
import { DeleteConfirmDialog } from "../components/gallery/DeleteConfirmDialog";

// Sample data with generated images
const initialImages: GalleryImage[] = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dlktscrkj/image/upload/v1/gallery/hnxe7yifzedfzplmgeht",
    title: "Oceanfront Villa Estate",
    category: "property_showcase",
    order: 1,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dlktscrkj/image/upload/v1/gallery/kw1rfxcofbieivpn1saf",
    title: "Modern Living Room",
    category: "interior_design",
    order: 2,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dlktscrkj/image/upload/v1/gallery/u6adqdc8tr3q79kx82cj",
    title: "Urban Corporate Tower",
    category: "architecture",
    order: 3,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
];

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [deletingImage, setDeletingImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    GalleryCategory | "all"
  >("all");

  const filteredImages = useMemo(() => {
    if (selectedCategory === "all") return images;
    return images.filter((img) => img.category === selectedCategory);
  }, [images, selectedCategory]);

  const handleAddNew = () => {
    setEditingImage(null);
    setIsModalOpen(true);
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setIsModalOpen(true);
  };

  const handleDelete = (image: GalleryImage) => {
    setDeletingImage(image);
  };

  const confirmDelete = () => {
    if (deletingImage) {
      setImages(images.filter((img) => img.id !== deletingImage.id));
      toast.success(`"${deletingImage.title}" deleted successfully`);
      setDeletingImage(null);
    }
  };

  const handleToggleFeatured = (image: GalleryImage) => {
    setImages(
      images.map((img) =>
        img.id === image.id ? { ...img, is_featured: !img.is_featured } : img,
      ),
    );
    toast.success(
      image.is_featured
        ? `"${image.title}" removed from featured`
        : `"${image.title}" marked as featured`,
    );
  };

  const handleSubmit = (formData: GalleryFormData) => {
    if (editingImage) {
      // Update existing
      setImages(
        images.map((img) =>
          img.id === editingImage.id
            ? {
                ...img,
                title: formData.title,
                category: formData.category,
                is_featured: formData.is_featured,
                image: formData.imageFile
                  ? URL.createObjectURL(formData.imageFile)
                  : img.image,
              }
            : img,
        ),
      );
      toast.success(`"${formData.title}" updated successfully`);
    } else {
      // Create new
      const newImage: GalleryImage = {
        id: Date.now(),
        title: formData.title,
        category: formData.category,
        is_featured: formData.is_featured,
        image: formData.imageFile
          ? URL.createObjectURL(formData.imageFile)
          : "/placeholder.svg",
        order: images.length + 1,
        created_at: new Date().toISOString(),
      };
      setImages([...images, newImage]);
      toast.success(`"${formData.title}" added to gallery`);
    }
  };

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
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          editImage={editingImage}
        />

        <DeleteConfirmDialog
          open={!!deletingImage}
          onClose={() => setDeletingImage(null)}
          onConfirm={confirmDelete}
          image={deletingImage}
        />
      </div>
    </div>
  );
}
