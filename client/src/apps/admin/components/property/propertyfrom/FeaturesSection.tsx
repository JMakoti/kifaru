import { Plus, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "./FormField";
import { FormSection } from "./FormSection";
import type { Feature, FeatureType } from "@/types/property";
import { FEATURE_TYPES } from "@/types/property";

interface FeaturesSectionProps {
  features: Feature[];
  onChange: (features: Feature[]) => void;
}

export function FeaturesSection({ features, onChange }: FeaturesSectionProps) {
  const addFeature = () => {
    onChange([
      ...features,
      {
        feature_type: "outdoor",
        name: "",
        description: "",
        icon: "",
      },
    ]);
  };

  const removeFeature = (index: number) => {
    onChange(features.filter((_, i) => i !== index));
  };

  const updateFeature = (
    index: number,
    field: keyof Feature,
    value: string,
  ) => {
    const updated = [...features];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <FormSection
      title="Property Features"
      description="Highlight unique features and selling points of your property"
    >
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative bg-secondary/30 rounded-xl p-5 border border-border/40 hover:border-primary/30 transition-all duration-200 animate-scale-in"
          >
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-background/80 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  label="Feature Type"
                  htmlFor={`feature-type-${index}`}
                >
                  <Select
                    value={feature.feature_type}
                    onValueChange={(value) =>
                      updateFeature(index, "feature_type", value as FeatureType)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FEATURE_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Name" htmlFor={`feature-name-${index}`}>
                  <Input
                    id={`feature-name-${index}`}
                    placeholder="e.g., Infinity Pool"
                    value={feature.name}
                    onChange={(e) =>
                      updateFeature(index, "name", e.target.value)
                    }
                  />
                </FormField>

                <FormField
                  label="Icon (optional)"
                  htmlFor={`feature-icon-${index}`}
                >
                  <div className="relative">
                    <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id={`feature-icon-${index}`}
                      placeholder="Icon name or URL"
                      value={feature.icon}
                      onChange={(e) =>
                        updateFeature(index, "icon", e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                </FormField>
              </div>

              <FormField label="Description" htmlFor={`feature-desc-${index}`}>
                <Textarea
                  id={`feature-desc-${index}`}
                  placeholder="Describe this feature..."
                  value={feature.description}
                  onChange={(e) =>
                    updateFeature(index, "description", e.target.value)
                  }
                  className="resize-none min-h-[80px]"
                />
              </FormField>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addFeature}
          className="w-full border-dashed border-2 hover:border-primary/50 hover:bg-primary/5"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Feature
        </Button>
      </div>
    </FormSection>
  );
}
