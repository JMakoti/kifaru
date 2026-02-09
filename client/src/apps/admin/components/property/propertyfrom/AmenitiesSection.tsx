import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";
import { FormSection } from "./FormSection";
import type { Amenity } from "@/types/property";
import { FileInput } from "@/components/ui/file-input";

interface AmenitiesSectionProps {
  amenities: Amenity[];
  onChange: (amenities: Amenity[]) => void;
}

export function AmenitiesSection({ amenities, onChange }: AmenitiesSectionProps) {
  const addAmenity = () => {
    onChange([...amenities, { image: null, label: "" }]);
  };

  const removeAmenity = (index: number) => {
    onChange(amenities.filter((_, i) => i !== index));
  };

  const updateAmenity = (index: number, field: keyof Amenity, value: File | string | null) => {
    const updated = [...amenities];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <FormSection 
      title="Amenities" 
      description="Add the amenities available at this property"
    >
      <div className="space-y-4">
        {amenities.map((amenity, index) => (
          <div 
            key={index} 
            className="group relative bg-secondary/30 rounded-xl p-5 border border-border/40 hover:border-primary/30 transition-all duration-200 animate-scale-in"
          >
            <button
              type="button"
              onClick={() => removeAmenity(index)}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-background/80 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="space-y-4">
              <FormField label="Label" htmlFor={`amenity-label-${index}`}>
                <Input
                  id={`amenity-label-${index}`}
                  placeholder="e.g., Pool, Gym, Spa"
                  value={amenity.label}
                  onChange={(e) => updateAmenity(index, "label", e.target.value)}
                />
              </FormField>
              
              <FormField label="Image" htmlFor={`amenity-image-${index}`}>
                <FileInput
                  id={`amenity-image-${index}`}
                  value={amenity.image}
                  onChange={(file) => updateAmenity(index, "image", file)}
                  accept="image/*"
                  fileOnly
                />
              </FormField>
            </div>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          onClick={addAmenity}
          className="w-full border-dashed border-2 hover:border-primary/50 hover:bg-primary/5"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Amenity
        </Button>
      </div>
    </FormSection>
  );
}
