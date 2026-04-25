import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Loader2 } from "lucide-react";
import type { PropertyReview, ReviewPayload } from "@/types/property";
import { useProperties } from "@/services/property.service";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review?: PropertyReview | null;
  onSubmit: (payload: ReviewPayload) => void;
  isLoading?: boolean;
}

const empty: ReviewPayload = {
  property: 0,
  reviewer_name: "",
  rating: 5,
  comment: "",
  avatar: "",
  country: "",
};

export default function ReviewFormDialog({
  open,
  onOpenChange,
  review,
  onSubmit,
  isLoading: isSubmitting,
}: Props) {
  const [form, setForm] = useState(
    review
      ? {
          property: review.property,
          reviewer_name: review.reviewer_name,
          rating: review.rating,
          comment: review.comment,
          avatar: review.avatar,
          country: review.country,
        }
      : { ...empty },
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch properties
  const { data: propertiesData, isLoading: propertiesLoading } =
    useProperties();

  const set = (key: keyof typeof form, value: string | number) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const clearAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview("");
    setForm((f) => ({ ...f, avatar: "" }));
    if (fileRef.current) fileRef.current.value = "";
  };

  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const validateForm = () => {
    const { property, reviewer_name, rating, comment } = form;

    if (!property || !reviewer_name || !rating || !comment) {
      return "All Fields are required";
    }
    if (!property) {
      return "Property are required"; 
    }
    if (!reviewer_name) {
      return "Reviewer Name fields are required";
    }
    if (!rating) {
      return "Rating field are required";
    }
    if (!comment) {
      return "Comment field are required";
    }
  };

  // if (validationError) {
  //     setErrorMessage(validationError);
  //     return;
  //   }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    onSubmit({
      ...form,
      avatar: avatarFile || form.avatar,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" key={review?.id ?? "new-review"}>
        <DialogHeader>
          <DialogTitle>{review ? "Edit Review" : "New Review"}</DialogTitle>
        </DialogHeader>

        {errorMessage && (
          <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-sm text-red-400">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          {/* Country Field */}
          <div className="space-y-1.5">
            <Label>Country</Label>
            <Input
              value={form.country}
              onChange={(e) => set("country", e.target.value)}
              placeholder="e.g. Kenya"
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Rating Field */}
            <div className="space-y-1.5">
              <Label>Rating</Label>
              <Input
                type="number"
                min={1}
                max={5}
                value={form.rating}
                onChange={(e) => set("rating", +e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            {/* Property Select */}
            <div className="space-y-1.5">
              <Label>Property</Label>
              <Select
                value={form.property.toString()}
                onValueChange={(value) => set("property", parseInt(value, 10))}
                disabled={propertiesLoading || isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a property..." />
                </SelectTrigger>
                <SelectContent>
                  {propertiesData?.results?.map((property) => (
                    <SelectItem
                      key={property.id}
                      value={property.id.toString()}
                    >
                      {property.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {propertiesLoading && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" /> Loading
                  properties...
                </p>
              )}
            </div>
          </div>

          {/* User Select */}
          <div className="space-y-1.5">
            <Label>Reviewer (User)</Label>
            <Input
              value={form.reviewer_name}
              onChange={(e) => set("reviewer_name", e.target.value)}
              placeholder="e.g. John Doe"
              disabled={isSubmitting}
            />
          </div>

          {/* Avatar Section */}
          <div className="space-y-1.5">
            <Label>Avatar Image</Label>
            <div className="flex items-center gap-3 p-3 border rounded-md bg-muted/30">
              <div className="relative shrink-0">
                <img
                  src={
                    avatarPreview ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(form.reviewer_name || "?")}`
                  }
                  className="h-12 w-12 rounded-full object-cover bg-background border"
                />
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={clearAvatar}
                    className="absolute -right-1 -top-1 rounded-full bg-destructive p-0.5 text-white shadow-sm"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
              <div className="flex-1">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Comment Field */}
          <div className="space-y-1.5">
            <Label>Guest Comment</Label>
            <Textarea
              rows={3}
              value={form.comment}
              onChange={(e) => set("comment", e.target.value)}
              placeholder="Enter review feedback..."
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              disabled={isSubmitting}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : review ? (
                "Update Review"
              ) : (
                "Create Review"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
