import { Plus, X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileInput } from "@/components/ui/file-input";
import { FormField } from "./FormField";
import { FormSection } from "./FormSection";
import type { PropertyImage, ImageCategory } from "@/types/property";
import { IMAGE_CATEGORIES } from "@/types/property";

interface ImagesSectionProps {
  images: PropertyImage[];
  onChange: (images: PropertyImage[]) => void;
}

export function ImagesSection({ images, onChange }: ImagesSectionProps) {
  const addImage = () => {
    const newOrder = images.length > 0 ? Math.max(...images.map(i => i.order)) + 1 : 1;
    onChange([...images, { image: null, category: "bedroom", order: newOrder }]);
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const updateImage = (index: number, field: keyof PropertyImage, value: File | string | number | null) => {
    const updated = [...images];
    updated[index] = { ...updated[index], [field]: value } as PropertyImage;
    onChange(updated);
  };

  return (
    <FormSection 
      title="Property Images" 
      description="Upload images showcasing different areas of your property"
    >
      <div className="space-y-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="group relative bg-secondary/30 rounded-xl p-5 border border-border/40 hover:border-primary/30 transition-all duration-200 animate-scale-in"
          >
            <div className="absolute top-4 left-4 cursor-grab text-muted-foreground/50">
              <GripVertical className="w-4 h-4" />
            </div>
            
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-background/80 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="space-y-4 pl-6">
              <FormField label="Image" htmlFor={`image-file-${index}`}>
                <FileInput
                  id={`image-file-${index}`}
                  value={image.image}
                  onChange={(file) => updateImage(index, "image", file)}
                  accept="image/*"
                  fileOnly
                />
              </FormField>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Category" htmlFor={`image-category-${index}`}>
                  <Select 
                    value={image.category} 
                    onValueChange={(value) => updateImage(index, "category", value as ImageCategory)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {IMAGE_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
                
                <FormField label="Order" htmlFor={`image-order-${index}`}>
                  <Input
                    id={`image-order-${index}`}
                    type="number"
                    min={1}
                    value={image.order}
                    onChange={(e) => updateImage(index, "order", parseInt(e.target.value) || 1)}
                  />
                </FormField>
              </div>
            </div>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          onClick={addImage}
          className="w-full border-dashed border-2 hover:border-primary/50 hover:bg-primary/5"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Image
        </Button>
      </div>
    </FormSection>
  );
}
