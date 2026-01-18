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
import type { User } from "@/services/user.types";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
  onSave: (data: FormData) => void;
}

export function EditProfileModal({
  open,
  onOpenChange,
  user,
  onSave,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<{
    first_name: string;
    last_name: string;
    country_of_residence?: string;
    email: string;
    phone_number?: string;
    whatsapp_number?: string;
    preffered_language?: string;
  }>({
    first_name: user.first_name,
    last_name: user.last_name,
    country_of_residence: user.country_of_residence || "",
    email: user.email,
    phone_number: user.phone_number || "",
    whatsapp_number: user.whatsapp_number || "",
    preffered_language: user.preferred_language || "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.first_name.trim()) return;
    if (!formData.email.includes("@")) return;

    const payload = new FormData();
    payload.append("first_name", formData.first_name);
    payload.append("last_name", formData.last_name);
    payload.append("country_of_residence", formData.country_of_residence || "");
    payload.append("email", formData.email);
    payload.append("phone_number", formData.phone_number || "");
    payload.append("whatsapp_number", formData.whatsapp_number || "");

    onSave(payload);
    onOpenChange(false);
  };

  const name = `${formData.first_name} ${formData.last_name}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information and contact details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <label className="relative group cursor-pointer">
                <Avatar className="h-20 w-20 ring-4 ring-primary/10">
                  {/* <AvatarImage
                    src=""
                    alt={name}
                  /> */}
                  <AvatarFallback className="text-lg font-semibold">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </label>
            </div>

            {/* Name */}
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

            {/* Location */}
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

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone_number}
                onChange={(e) => handleChange("phone_number", e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
