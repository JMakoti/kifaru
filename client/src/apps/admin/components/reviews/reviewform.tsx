import { useState, useRef, useMemo } from "react";
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
  // 1. Fetch Real Data
  const { data, isLoading: loadingProps } = useProperties();
  const propertyList = useMemo(() => data?.results || [], [data]);

  //   const [form, setForm] = useState(empty);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          {/* Country Field */}
          <div className="space-y-1.5">
            <Label>Country</Label>
            <Input
              value={form.country}
              onChange={(e) => set("country", e.target.value)}
              placeholder="e.g. Kenya"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Property Select */}
            <div className="space-y-1.5">
              <Label>Property</Label>
              <Select
                disabled={isSubmitting || loadingProps}
                value={form.property ? String(form.property) : ""}
                onValueChange={(v) => set("property", +v)}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      loadingProps ? "Loading..." : "Select property"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {propertyList.map((p) => (
                    <SelectItem key={p.id} value={String(p.id)}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rating Field */}
            <div className="space-y-1.5">
              <Label>Rating</Label>
              <Input
                type="number"
                min={1}
                max={5}
                value={form.rating}
                onChange={(e) => set("rating", +e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* User Select */}
          <div className="space-y-1.5">
            <Label>Reviewer (User)</Label>
            <Input
              value={form.reviewer_name}
              onChange={(e) => set("reviewer_name", e.target.value)}
              placeholder="e.g. John Doe"
              required
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
                {/* <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isSubmitting}
                  onClick={() => fileRef.current?.click()}
                  className="w-full"
                  
                >

                  <Upload className="mr-2 h-3.5 w-3.5" />
                  Upload Photo
                </Button> */}
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
              required
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
