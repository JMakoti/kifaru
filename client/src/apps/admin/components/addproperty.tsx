import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

export default function AddPropertyForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    pricePerNight: "",
    bedrooms: "",
    maxGuests: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      name: "",
      type: "",
      pricePerNight: "",
      bedrooms: "",
      maxGuests: "",
      location: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Property
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-heading">Add New Property</DialogTitle>
          <DialogDescription>
            Add a new vacation rental to your listings.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Property Name</Label>
            <Input
              id="name"
              placeholder="e.g., Oceanfront Beach Villa"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., Malibu, California"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Property Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="cabin">Cabin</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="cottage">Cottage</SelectItem>
                <SelectItem value="bungalow">Bungalow</SelectItem>
                <SelectItem value="lake-house">Lake House</SelectItem>
                <SelectItem value="beach-house">Beach House</SelectItem>
                <SelectItem value="chalet">Chalet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="pricePerNight">$/Night</Label>
              <Input
                id="pricePerNight"
                type="number"
                placeholder="0"
                value={formData.pricePerNight}
                onChange={(e) =>
                  setFormData({ ...formData, pricePerNight: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Beds</Label>
              <Input
                id="bedrooms"
                type="number"
                placeholder="0"
                value={formData.bedrooms}
                onChange={(e) =>
                  setFormData({ ...formData, bedrooms: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxGuests">Guests</Label>
              <Input
                id="maxGuests"
                type="number"
                placeholder="0"
                value={formData.maxGuests}
                onChange={(e) =>
                  setFormData({ ...formData, maxGuests: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Property</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
