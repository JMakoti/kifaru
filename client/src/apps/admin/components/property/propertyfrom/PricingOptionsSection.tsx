import { Plus, X, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FormField } from "./FormField";
import { FormSection } from "./FormSection";
import { ACCOMMODATION_TYPES, GUEST_TYPES, STAY_TYPES, type PricingOption } from "@/types/property";

interface PricingOptionsSectionProps {
  pricingOptions: PricingOption[];
  onChange: (options: PricingOption[]) => void;
}

export function PricingOptionsSection({ pricingOptions, onChange }: PricingOptionsSectionProps) {
  const addOption = () => {
    onChange([...pricingOptions, {
      accommodation_type: "master_bedroom",
      guest_type: "international",
      stay_type: "short_term",
      number_of_guests: 2,
      min_nights: 1,
      max_nights: 30,
      price_per_night: "",
      weekly_price: "",
      includes_breakfast: false,
      includes_fullboard: false,
    }]);
  };

  const removeOption = (index: number) => {
    onChange(pricingOptions.filter((_, i) => i !== index));
  };

  const updateOption = (index: number, field: keyof PricingOption, value: string | number | boolean) => {
    const updated = [...pricingOptions];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <FormSection 
      title="Pricing Options" 
      description="Configure different pricing tiers for various accommodation types and guest categories"
    >
      <div className="space-y-6">
        {pricingOptions.map((option, index) => (
          <div 
            key={index} 
            className="group relative bg-muted/40 rounded-xl p-6 border border-border/40 hover:border-primary/30 transition-all duration-200 animate-scale-in"
          >
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                Option {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="p-1.5 rounded-lg bg-background/80 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-5">
              {/* Type selectors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="Accommodation Type" htmlFor={`pricing-accom-${index}`}>
                  <Select 
                    value={option.accommodation_type} 
                    onValueChange={(value) => updateOption(index, "accommodation_type", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {ACCOMMODATION_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
                
                <FormField label="Guest Type" htmlFor={`pricing-guest-${index}`}>
                  <Select 
                    value={option.guest_type} 
                    onValueChange={(value) => updateOption(index, "guest_type", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {GUEST_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
                
                <FormField label="Stay Type" htmlFor={`pricing-stay-${index}`}>
                  <Select 
                    value={option.stay_type} 
                    onValueChange={(value) => updateOption(index, "stay_type", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {STAY_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
              </div>
              
              {/* Numbers row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField label="Guests" htmlFor={`pricing-guests-${index}`}>
                  <Input
                    id={`pricing-guests-${index}`}
                    type="number"
                    min={1}
                    value={option.number_of_guests}
                    onChange={(e) => updateOption(index, "number_of_guests", parseInt(e.target.value) || 1)}
                  />
                </FormField>
                
                <FormField label="Min Nights" htmlFor={`pricing-min-${index}`}>
                  <Input
                    id={`pricing-min-${index}`}
                    type="number"
                    min={1}
                    value={option.min_nights}
                    onChange={(e) => updateOption(index, "min_nights", parseInt(e.target.value) || 1)}
                  />
                </FormField>
                
                <FormField label="Max Nights" htmlFor={`pricing-max-${index}`}>
                  <Input
                    id={`pricing-max-${index}`}
                    type="number"
                    min={1}
                    value={option.max_nights}
                    onChange={(e) => updateOption(index, "max_nights", parseInt(e.target.value) || 1)}
                  />
                </FormField>
                
                <FormField label="Nightly Price" htmlFor={`pricing-nightly-${index}`}>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id={`pricing-nightly-${index}`}
                      placeholder="0.00"
                      value={option.price_per_night}
                      onChange={(e) => updateOption(index, "price_per_night", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </FormField>
              </div>
              
              {/* Weekly price and toggles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <FormField label="Weekly Price" htmlFor={`pricing-weekly-${index}`}>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id={`pricing-weekly-${index}`}
                      placeholder="0.00"
                      value={option.weekly_price}
                      onChange={(e) => updateOption(index, "weekly_price", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </FormField>
                
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/40">
                  <Label htmlFor={`pricing-breakfast-${index}`} className="text-sm cursor-pointer">
                    Includes Breakfast
                  </Label>
                  <Switch
                    id={`pricing-breakfast-${index}`}
                    checked={option.includes_breakfast}
                    onCheckedChange={(checked) => updateOption(index, "includes_breakfast", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/40">
                  <Label htmlFor={`pricing-fullboard-${index}`} className="text-sm cursor-pointer">
                    Full Board
                  </Label>
                  <Switch
                    id={`pricing-fullboard-${index}`}
                    checked={option.includes_fullboard}
                    onCheckedChange={(checked) => updateOption(index, "includes_fullboard", checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          onClick={addOption}
          className="w-full border-dashed border-2 hover:border-primary/50 hover:bg-primary/5"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Pricing Option
        </Button>
      </div>
    </FormSection>
  );
}
