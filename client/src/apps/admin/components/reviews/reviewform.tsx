import { useState, useEffect, useRef } from "react";
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
import { Upload, X } from "lucide-react";
import type { PropertyReview, ReviewPayload } from "@/types/property";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review?: PropertyReview | null;
  onSubmit: (payload: ReviewPayload) => void;
}

const empty: Omit<ReviewPayload, "avatar"> & { avatar: string } = {
  property: 0,
  user: 0,
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
}: Props) {
  const [form, setForm] = useState<
    Omit<ReviewPayload, "avatar"> & { avatar: string }
  >(empty);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (review) {
      setForm({
        property: review.property,
        user: review.user,
        reviewer_name: review.reviewer_name,
        rating: review.rating,
        comment: review.comment,
        avatar: review.avatar,
        country: review.country,
      });
      setAvatarPreview(review.avatar || "");
      setAvatarFile(null);
    } else {
      setForm(empty);
      setAvatarPreview("");
      setAvatarFile(null);
    }
  }, [review, open]);

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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{review ? "Edit Review" : "New Review"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Reviewer Name</Label>
              <Input
                value={form.reviewer_name}
                onChange={(e) => set("reviewer_name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Country</Label>
              <Input
                value={form.country}
                onChange={(e) => set("country", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Property ID</Label>
              <Input
                type="number"
                value={form.property}
                onChange={(e) => set("property", +e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>User ID</Label>
              <Input
                type="number"
                value={form.user}
                onChange={(e) => set("user", +e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Rating (1-5)</Label>
              <Input
                type="number"
                min={1}
                max={5}
                value={form.rating}
                onChange={(e) => set("rating", +e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Avatar</Label>
            <div className="flex items-center gap-3">
              {avatarPreview ? (
                <div className="relative">
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={clearAvatar}
                    className="absolute -right-1 -top-1 rounded-full bg-destructive p-0.5 text-primary-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : null}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileRef.current?.click()}
              >
                <Upload className="mr-1.5 h-3.5 w-3.5" /> Choose File
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {avatarFile && (
                <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                  {avatarFile.name}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Comment</Label>
            <Textarea
              rows={3}
              value={form.comment}
              onChange={(e) => set("comment", e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">{review ? "Update" : "Create"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
