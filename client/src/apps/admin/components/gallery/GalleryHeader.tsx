import { Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY_LABELS, type GalleryCategory } from "@/types/gallery";

interface GalleryHeaderProps {
  onAddNew: () => void;
  selectedCategory: GalleryCategory | "all";
  onCategoryChange: (category: GalleryCategory | "all") => void;
  totalCount: number;
}

export function GalleryHeader({
  onAddNew,
  selectedCategory,
  onCategoryChange,
}: GalleryHeaderProps) {
  return (
    <div className="border-b border-border bg-background/50 backdrop-blur-xl sticky top-0 z-10">
      <div className="container py-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold font-heading text-foreground">
              Image Gallery
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select
                value={selectedCategory}
                onValueChange={(value) =>
                  onCategoryChange(value as GalleryCategory | "all")
                }
              >
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={onAddNew}
              className="bg-primary hover:bg-primary/90 shadow-gold gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
