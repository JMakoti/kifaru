import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATEGORY_LABELS,
  type GalleryCategory,
  type GalleryFormData,
  type GalleryImage,
} from "@/types/gallery";

interface GalleryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: GalleryFormData) => void;
  editImage?: GalleryImage | null;
}

const getInitialFormData = (
  editImage?: GalleryImage | null,
): GalleryFormData => ({
  title: editImage?.title ?? "",
  category: editImage?.category ?? "property_showcase",
  is_featured: editImage?.is_featured ?? false,
  imageFile: null,
});

export function GalleryModal({
  open,
  onClose,
  onSubmit,
  editImage,
}: GalleryModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] =
    useState<GalleryFormData>(getInitialFormData());
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!open) return;

    setFormData(getInitialFormData(editImage));
    setPreview(editImage?.image ?? null);
  }, [open, editImage]);

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    setFormData((prev) => ({ ...prev, imageFile: file }));

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {editImage ? "Edit Image" : "Add New Image"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Image</Label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              className={`relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed
                ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }
                ${preview ? "aspect-video" : "py-12"}
              `}
            >
              <AnimatePresence>
                {preview ? (
                  <motion.div className="relative h-full">
                    <img src={preview} className="h-full w-full object-cover" />
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreview(null);
                        setFormData((p) => ({ ...p, imageFile: null }));
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center gap-3 py-10">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drop image here or click to browse
                    </p>
                  </div>
                )}
              </AnimatePresence>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData((p) => ({ ...p, title: e.target.value }))
              }
              required
            />
          </div>

          {/* Category */}
          <div>
            <Label>Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((p) => ({
                  ...p,
                  category: value as GalleryCategory,
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-full">
                {Object.entries(CATEGORY_LABELS).map(([v, l]) => (
                  <SelectItem key={v} value={v}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Featured */}
          <div className="flex justify-between border rounded-lg p-4">
            <div>
              <Label>Featured</Label>
              <p className="text-sm text-muted-foreground">
                Display prominently
              </p>
            </div>
            <Switch
              checked={formData.is_featured}
              onCheckedChange={(v) =>
                setFormData((p) => ({ ...p, is_featured: v }))
              }
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editImage ? "Save Changes" : "Add Image"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
