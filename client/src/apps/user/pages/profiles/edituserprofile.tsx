import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "react-toastify";
import type { User } from "@/services/user.types";
import { useUpdateProfile } from "@/services/user.service";
import { useAuth } from "@/providers/authprovider";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export function EditProfileModal({
  open,
  onOpenChange,
  user,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    country_of_residence: user.country_of_residence || "",
    email: user.email,
    phone_number: user.phone_number || "",
    whatsapp_number: user.whatsapp_number || "",
    preferred_language: user.preferred_language || "",
  });
  const { refreshUser } = useAuth();
  const mutation = useUpdateProfile();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // basic validation
    if (!formData.first_name.trim())
      return toast.error("First name is required");
    if (!formData.email.includes("@")) return toast.error("Invalid email");

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value as string);
    });

    mutation.mutate(payload, {
      onSuccess: async () => {
        await refreshUser();
        onOpenChange(false);
      },
      onError: () => {},
    });
  };

  const name = `${formData.first_name} ${formData.last_name}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl
          bg-card text-foreground rounded-xl shadow-md
          p-6 sm:p-8
          max-h-[90vh] overflow-y-auto
        "
      >
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information and contact details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="py-4">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 ring-4 ring-primary/20">
              <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                value={formData.first_name}
                onChange={(e) => handleChange("first_name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                value={formData.last_name}
                onChange={(e) => handleChange("last_name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.country_of_residence}
                onChange={(e) =>
                  handleChange("country_of_residence", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone_number}
                onChange={(e) => handleChange("phone_number", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                type="tel"
                value={formData.whatsapp_number}
                onChange={(e) =>
                  handleChange("whatsapp_number", e.target.value)
                }
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Input
                id="language"
                value={formData.preferred_language}
                onChange={(e) =>
                  handleChange("preferred_language", e.target.value)
                }
              />
            </div>
          </div>

          {/* Buttons */}
          <DialogFooter className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
