import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";
import { FormSection } from "./FormSection";
import type { Amenities, AmenityItem } from "@/types/property";

interface AmenitiesSectionProps {
  amenities: Amenities;
  onChange: (amenities: Amenities) => void;
}

export function AmenitiesSection({ amenities, onChange }: AmenitiesSectionProps) {
  const [newCategoryName, setNewCategoryName] = useState("");

  // Add a new category with user input
  const addCategory = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed || amenities[trimmed]) return; // avoid empty or duplicate
    onChange({ ...amenities, [trimmed]: [] });
    setNewCategoryName("");
  };

  // Remove a category
  const removeCategory = (category: string) => {
    const updated = { ...amenities };
    delete updated[category];
    onChange(updated);
  };

  // Add an item to a category
  const addItem = (category: string) => {
    const updated = { ...amenities };
    updated[category] = [...(updated[category] || []), { icon: "", title: "" }];
    onChange(updated);
  };

  // Remove an item from a category
  const removeItem = (category: string, index: number) => {
    const updated = { ...amenities };
    updated[category] = updated[category].filter((_, i) => i !== index);
    onChange(updated);
  };

  // Update an item field
  const updateItem = (category: string, index: number, field: keyof AmenityItem, value: string) => {
    const updated = { ...amenities };
    updated[category][index] = { ...updated[category][index], [field]: value };
    onChange(updated);
  };

  return (
    <FormSection title="Amenities" description="Add the amenities available at this property">
      <div className="space-y-6">
        {Object.entries(amenities).map(([category, items]) => (
          <div key={category} className="p-4 border border-border/40 rounded-xl bg-secondary/30 relative">
            {/* Category Header */}
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-lg">{category}</h4>
              <button
                type="button"
                onClick={() => removeCategory(category)}
                className="p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 items-end">
                  <FormField label="Icon" htmlFor={`amenity-${category}-icon-${index}`}>
                    <Input
                      id={`amenity-${category}-icon-${index}`}
                      placeholder="e.g., microwave"
                      value={item.icon}
                      onChange={(e) => updateItem(category, index, "icon", e.target.value)}
                    />
                  </FormField>
                  <FormField label="Title" htmlFor={`amenity-${category}-title-${index}`}>
                    <Input
                      id={`amenity-${category}-title-${index}`}
                      placeholder="e.g., Microwave"
                      value={item.title}
                      onChange={(e) => updateItem(category, index, "title", e.target.value)}
                    />
                  </FormField>
                  <button
                    type="button"
                    onClick={() => removeItem(category, index)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add item button */}
            <Button
              type="button"
              variant="outline"
              onClick={() => addItem(category)}
              className="mt-3 w-full border-dashed border-2 hover:border-primary/50 hover:bg-primary/5"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        ))}

        {/* Add new category input */}
        <div className="flex gap-2">
          <Input
            placeholder="New category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Button type="button" onClick={addCategory} className="flex-shrink-0">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>
    </FormSection>
  );
}
