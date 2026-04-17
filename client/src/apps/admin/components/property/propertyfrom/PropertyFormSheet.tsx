import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileInput } from "@/components/ui/file-input";
import { FormSection } from "./FormSection";
import { FormField } from "./FormField";
import { StepIndicator } from "./StepIndicator";
import { AmenitiesSection } from "./AmenitiesSection";
import { ImagesSection } from "./ImagesSection";
import { PricingOptionsSection } from "./PricingOptionsSection";
import { FeaturesSection } from "./FeaturesSection";
import { ContactsSection } from "./ContactsSection";
import { HighlightsSection } from "./HighlightsSection";
import {
  emptyPropertyForm,
  PROPERTY_CATEGORIES,
  type Property,
} from "@/types/property";
import {
  Building2,
  MapPin,
  Image as ImageIcon,
  Sparkles,
  Users,
  ChevronLeft,
  ChevronRight,
  Save,
  Plus,
  Home,
  Wifi,
  Clock,
  Star,
  Loader2,
  EuroIcon,
} from "lucide-react";
import {
  useCreateProperty,
  useUpdateProperty,
} from "@/services/property.service";

const steps = [
  {
    id: "basic",
    label: "Basic Info",
    icon: <Building2 className="w-3.5 h-3.5" />,
  },
  { id: "details", label: "Details", icon: <Home className="w-3.5 h-3.5" /> },
  {
    id: "pricing",
    label: "Pricing",
    icon: <EuroIcon className="w-3.5 h-3.5" />,
  },
  {
    id: "highlights",
    label: "Highlights",
    icon: <Star className="w-3.5 h-3.5" />,
  },
  {
    id: "amenities",
    label: "Amenities",
    icon: <Sparkles className="w-3.5 h-3.5" />,
  },
  {
    id: "images",
    label: "Images",
    icon: <ImageIcon className="w-3.5 h-3.5" />,
  },
  {
    id: "pricingOptions",
    label: "Rates",
    icon: <EuroIcon className="w-3.5 h-3.5" />,
  },
  {
    id: "features",
    label: "Features",
    icon: <Sparkles className="w-3.5 h-3.5" />,
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: <Users className="w-3.5 h-3.5" />,
  },
];

interface PropertyFormSheetProps {
  property?: Property;
  onSuccess?: () => void;
  open?: boolean; // Add this
  onOpenChange?: (open: boolean) => void; // Add this
}

export function PropertyFormSheet({
  property,
  onSuccess,
  open: externalOpen,
  onOpenChange: setExternalOpen,
}: PropertyFormSheetProps) {
  // const [open, setOpen] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled ? setExternalOpen! : setInternalOpen;

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Property>(
    () => property || emptyPropertyForm,
  );

  // In PropertyFormSheet.tsx - update the initialization
  // const [formData, setFormData] = useState<Property>(() => {
  //   if (property && property.slug) {
  //     return {
  //       ...property,
  //       highlights: property.highlights || [],
  //       property_images: property.property_images.map(img => ({
  //         ...img,
  //         image: img.image
  //       })),
  //     };
  //   }
  //   // This is a create operation
  //   return emptyPropertyForm;
  // });

  const createMutation = useCreateProperty();
  const updateMutation = useUpdateProperty();

  // const isEditing = !!property?.slug;
  const isEditing = Boolean(property?.slug);
  const isPending = createMutation.isPending || updateMutation.isPending;

  const updateField = <K extends keyof Property>(
    field: K,
    value: Property[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      if (isEditing && formData.slug) {
        await updateMutation.mutateAsync({
          slug: formData.slug,
          property: formData,
        });
      } else {
        await createMutation.mutateAsync(formData);
      }
      setOpen(false);
      if (!isEditing) {
        setFormData(emptyPropertyForm);
        setCurrentStep(0);
      }
      onSuccess?.();
    } catch (error) {
      // Error handling is done in the mutation hooks
      console.error("Failed to save property:", error);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen && !isEditing) {
      setFormData(emptyPropertyForm);
      setCurrentStep(0);
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case "basic":
        return (
          <FormSection
            title="Basic Information"
            description="Enter the essential details of your property"
          >
            <FormField label="Property Name" htmlFor="name" required>
              <Input
                id="name"
                placeholder="e.g., Oceanfront Beach Villa"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </FormField>

            <FormField label="Tagline" htmlFor="tagline">
              <Input
                id="tagline"
                placeholder="A short, catchy description"
                value={formData.tagline || ""}
                onChange={(e) => updateField("tagline", e.target.value)}
              />
            </FormField>

            <FormField label="Description" htmlFor="description">
              <Textarea
                id="description"
                placeholder="Describe your property in detail..."
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Location" htmlFor="location">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="City, Region"
                    value={formData.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </FormField>

              <FormField label="Country" htmlFor="country">
                <Input
                  id="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={(e) => updateField("country", e.target.value)}
                />
              </FormField>
            </div>

            <FormField
              label="Location Description"
              htmlFor="location_description"
            >
              <Textarea
                id="location_description"
                placeholder="Describe your property location in detail..."
                value={formData.location_description}
                onChange={(e) =>
                  updateField("location_description", e.target.value)
                }
                className="min-h-[80px] resize-none"
              />
            </FormField>

            <FormField label="Property Category" htmlFor="category">
              <Select
                value={formData.property_category}
                onValueChange={(value) =>
                  updateField(
                    "property_category",
                    value as Property["property_category"],
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {PROPERTY_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </FormSection>
        );

      case "details":
        return (
          <FormSection
            title="Property Details"
            description="Specify the physical attributes of your property"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FormField label="Bedrooms" htmlFor="bedrooms">
                <Input
                  id="bedrooms"
                  type="number"
                  min={0}
                  value={formData.bedrooms || ""}
                  onChange={(e) =>
                    updateField("bedrooms", parseInt(e.target.value) || 0)
                  }
                />
              </FormField>

              <FormField label="Bathrooms" htmlFor="bathrooms">
                <Input
                  id="bathrooms"
                  type="number"
                  min={0}
                  value={formData.bathrooms || ""}
                  onChange={(e) =>
                    updateField("bathrooms", parseInt(e.target.value) || 0)
                  }
                />
              </FormField>

              <FormField label="Max Guests" htmlFor="maxGuests">
                <Input
                  id="maxGuests"
                  type="number"
                  min={1}
                  value={formData.max_guests || ""}
                  onChange={(e) =>
                    updateField("max_guests", parseInt(e.target.value) || 0)
                  }
                />
              </FormField>

              <FormField label="Min Nights" htmlFor="minNights">
                <Input
                  id="minNights"
                  type="number"
                  min={1}
                  value={formData.min_nights || ""}
                  onChange={(e) =>
                    updateField("min_nights", parseInt(e.target.value) || 1)
                  }
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Square Meters"
                htmlFor="squareMeters"
                hint="Total living area"
              >
                <Input
                  id="squareMeters"
                  type="number"
                  min={0}
                  placeholder="e.g., 250"
                  value={formData.square_meters || ""}
                  onChange={(e) =>
                    updateField("square_meters", parseInt(e.target.value) || 0)
                  }
                />
              </FormField>

              <FormField label="Terrace Size (m²)" htmlFor="terraceSize">
                <Input
                  id="terraceSize"
                  type="number"
                  min={0}
                  placeholder="e.g., 50"
                  value={formData.terrace_size || ""}
                  onChange={(e) =>
                    updateField("terrace_size", parseInt(e.target.value) || 0)
                  }
                />
              </FormField>
            </div>

            <div className="space-y-4">
              <FormField label="Background Image" htmlFor="backgroundImage">
                <FileInput
                  id="backgroundImage"
                  value={formData.background_image}
                  onChange={(file) => updateField("background_image", file)}
                  accept="image/*"
                  fileOnly
                  className="w-full"
                />
              </FormField>

              <FormField label="WiFi Password" htmlFor="wifiPassword">
                <div className="relative">
                  <Wifi className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="wifiPassword"
                    placeholder="Guest WiFi password"
                    value={formData.wifi_password}
                    onChange={(e) =>
                      updateField("wifi_password", e.target.value)
                    }
                    className="pl-10"
                  />
                </div>
              </FormField>
            </div>
          </FormSection>
        );

      case "pricing":
        return (
          <FormSection
            title="Pricing & Booking"
            description="Set up pricing and booking policies"
          >
            <FormField
              label="Base Price"
              htmlFor="basePrice"
              hint="Default nightly rate"
            >
              <div className="relative">
                <EuroIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="basePrice"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  className="pl-10 text-lg font-medium"
                />
              </div>
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Check-in Time" htmlFor="checkIn">
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="checkIn"
                    type="time"
                    value={formData.check_in_time}
                    onChange={(e) =>
                      updateField("check_in_time", e.target.value)
                    }
                    className="pl-10"
                  />
                </div>
              </FormField>

              <FormField label="Check-out Time" htmlFor="checkOut">
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="checkOut"
                    type="time"
                    value={formData.check_out_time}
                    onChange={(e) =>
                      updateField("check_out_time", e.target.value)
                    }
                    className="pl-10"
                  />
                </div>
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Prepayment Percentage"
                htmlFor="prepayment"
                hint="Required deposit percentage"
              >
                <div className="relative">
                  <Input
                    id="prepayment"
                    type="number"
                    min={0}
                    max={100}
                    value={formData.prepayment_percentage}
                    onChange={(e) =>
                      updateField(
                        "prepayment_percentage",
                        parseInt(e.target.value) || 0,
                      )
                    }
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    %
                  </span>
                </div>
              </FormField>

              <FormField
                label="Cancellation Days"
                htmlFor="cancellation"
                hint="Days before check-in for free cancellation"
              >
                <Input
                  id="cancellation"
                  type="number"
                  min={0}
                  value={formData.cancellation_days}
                  onChange={(e) =>
                    updateField(
                      "cancellation_days",
                      parseInt(e.target.value) || 0,
                    )
                  }
                />
              </FormField>
            </div>
          </FormSection>
        );

      case "highlights":
        return (
          <HighlightsSection
            highlights={formData.highlights}
            onChange={(highlights) => updateField("highlights", highlights)}
          />
        );

      case "amenities":
        return (
          <AmenitiesSection
            amenities={formData.amenities ?? {}}
            onChange={(amenities) => updateField("amenities", amenities)}
          />
        );

      case "images":
        return (
          <ImagesSection
            images={formData.property_images}
            onChange={(images) => updateField("property_images", images)}
          />
        );

      case "pricingOptions":
        return (
          <PricingOptionsSection
            pricingOptions={formData.pricing_options}
            onChange={(options) => updateField("pricing_options", options)}
          />
        );

      case "features":
        return (
          <FeaturesSection
            features={formData.features}
            onChange={(features) => updateField("features", features)}
          />
        );

      case "contacts":
        return (
          <ContactsSection
            contacts={formData.contacts}
            onChange={(contacts) => updateField("contacts", contacts)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="w-5 h-5" />
          {isEditing ? "Edit Property" : "Add Property"}
        </Button>
      </SheetTrigger>

      <SheetContent
        className="p-0 flex flex-col w-screen
            md:w-[85vw]
            xl:w-[75vw]
            max-w-none"
      >
        {/* Header */}
        <div className="border-b border-border/50 p-6 pb-4 bg-gradient-to-b from-secondary/30 to-transparent">
          <div className="flex items-center justify-between gap-4">
            <SheetHeader className="text-left">
              <SheetTitle className="text-2xl font-display">
                {isEditing ? "Edit Property" : "Add New Property"}
              </SheetTitle>
              <SheetDescription>
                Complete each section to create your premium property listing
              </SheetDescription>
            </SheetHeader>

            {/* Return button */}
            <Button
              variant="ghost"
              className="rounded-full px-5 shrink-0 bg-primary text-primary-foreground cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Return to property
            </Button>
          </div>

          {/* Step Progress */}
          <div className="mt-6">
            <StepIndicator
              steps={steps}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 min-h-0 px-6 bg-background">
          <div className="py-6">{renderStepContent()}</div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-border/50 p-6 bg-gradient-to-t from-secondary/20 to-transparent">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0 || isPending}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>

            {currentStep < steps.length - 1 ? (
              <Button onClick={nextStep} className="gap-2" disabled={isPending}>
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="gap-2"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Property
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
