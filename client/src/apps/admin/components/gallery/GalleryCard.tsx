import { motion } from "framer-motion";
import { Star, Pencil, Trash2 } from "lucide-react";
import { CATEGORY_LABELS, type GalleryPhoto } from "@/types/gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { resolveImageSrc } from "@/hooks/resolveImage";

interface GalleryCardProps {
  image: GalleryPhoto;
  onEdit: (image: GalleryPhoto) => void;
  onDelete: (image: GalleryPhoto) => void;
  onToggleFeatured: (image: GalleryPhoto) => void;
}

export function GalleryCard({
  image,
  onEdit,
  onDelete,
  onToggleFeatured,
}: GalleryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-xl bg-card border border-border shadow-soft"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={resolveImageSrc(image.image)}
          alt={image.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured Badge */}
        {image.is_featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground border-0 gap-1 shadow-gold">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </Badge>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={() => onToggleFeatured(image)}
          >
            <Star
              className={`h-4 w-4 ${image.is_featured ? "fill-primary text-primary" : ""}`}
            />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={() => onEdit(image)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => onDelete(image)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-lg font-medium text-foreground truncate">
          {image.title}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <Badge variant="outline" className="text-xs font-normal">
            {CATEGORY_LABELS[image.category]}
          </Badge>
          <span className="text-xs text-muted-foreground">#{image.order}</span>
        </div>
      </div>
    </motion.div>
  );
}
