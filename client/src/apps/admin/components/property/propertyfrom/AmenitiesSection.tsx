import { Plus, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";
import { FormSection } from "./FormSection";
import type { Amenity } from "@/types/property";

interface AmenitiesSectionProps {
  amenities: Amenity[];
  onChange: (amenities: Amenity[]) => void;
}

export function AmenitiesSection({
  amenities,
  onChange,
}: AmenitiesSectionProps) {
  const addAmenity = () => {
    onChange([...amenities, { image: null, label: "" }]); 
  };

  const removeAmenity = (index: number) => {
    onChange(amenities.filter((_, i) => i !== index));
  };

  const updateAmenity = (
    index: number,
    field: keyof Amenity,
    value: string,
  ) => {
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
            className="group relative bg-muted/40 rounded-xl p-5 border border-border hover:border-primary/40 transition-all duration-200 animate-scale-in"
          >
            <button
              type="button"
              onClick={() => removeAmenity(index)}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-card text-muted-foreground hover:text-destructive hover:bg-destructive/15 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Label" htmlFor={`amenity-label-${index}`}>
                <Input
                  id={`amenity-label-${index}`}
                  placeholder="e.g., Pool, Gym, Spa"
                  value={amenity.label}
                  onChange={(e) =>
                    updateAmenity(index, "label", e.target.value)
                  }
                />
              </FormField>

              <FormField label="Image" htmlFor={`amenity-image-${index}`}>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id={`amenity-image-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      updateAmenity(
                        index,
                        "image",
                        e.target.files?.[0]?.name || "",
                      )
                    }
                    className="pl-10 file:border-0 file:bg-transparent file:text-sm file:text-muted-foreground hover:file:text-primary"
                  />
                </div>
              </FormField>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addAmenity}
          className="w-full border-dashed border-2 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Amenity
        </Button>
      </div>
    </FormSection>
  );
}
