"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Edit,
  Trash2,
  Building2,
  DollarSign,
  MapPin,
  Bed,
  Users,
  Star,
  Eye,
} from "lucide-react";
import { useDeleteProperty, useProperties } from "@/services/property.service";
import LoadingScreen from "@/components/loadingscreen";
import { PropertyFormSheet } from "./propertyfrom";
import type { PropertyCategory } from "@/types/property";

interface PropertyView {
  id?: number;
  name: string;
  slug?: string;
  type: PropertyCategory;
  location: string;
  pricePerNight: number;
  bedrooms: number;
  maxGuests: number;
  rating: number;
}

export default function PropertiesView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingProperty, setDeletingProperty] = useState<string | null>(null);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data: propertyList = [], isLoading, refetch } = useProperties();
  const { mutateAsync } = useDeleteProperty();

  if (isLoading) return <LoadingScreen />;

  // Map API data to UI-friendly property view
  const properties: PropertyView[] = propertyList.map((prop) => ({
    id: prop.id,
    name: prop.name,
    slug: prop.slug,
    type: prop.property_category || "urban",
    location: prop.location,
    pricePerNight: parseInt(prop.price) || 200,
    bedrooms: prop.bedrooms || 1,
    maxGuests: prop.max_guests || 1,
    rating: prop.average_rating || 4.5,
  }));

  const editingProperty = editingSlug
    ? propertyList.find((p) => p.slug === editingSlug)
    : undefined;

  const filteredProperties = properties.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalProperties = properties.length;
  const avgNightlyRate =
    properties.reduce((sum, p) => sum + p.pricePerNight, 0) /
    (properties.length || 1);

  const handleEdit = (slug: string) => {
    setEditingSlug(slug);
    setIsSheetOpen(true);
  };

  const handleDelete = async (slug?: string) => {
    if (!slug) return;
    setDeletingProperty(slug);
    try {
      await mutateAsync(slug);
      await refetch();
    } finally {
      setDeletingProperty(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">
            Kifaru Holiday Rentals
          </h1>
          <p className="text-muted-foreground">
            Manage your vacation properties and bookings
          </p>
        </div>

        <PropertyFormSheet
          key={editingSlug || "new"}
          property={editingProperty}
          open={isSheetOpen}
          onOpenChange={(open) => {
            setIsSheetOpen(open);
            if (!open) setEditingSlug(null);
          }}
          onSuccess={() => {
            setIsSheetOpen(false);
            setEditingSlug(null);
            refetch();
          }}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-soft h-30">
          <CardContent className="py-3 px-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Properties
              </p>
              <p className="text-2xl font-bold font-heading">
                {totalProperties}
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft h-30">
          <CardContent className="py-3 px-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Avg. Nightly Rate
              </p>
              <p className="text-2xl font-bold font-heading">
                €{Math.round(avgNightlyRate)}
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Property List */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-2xl">
            Property Listings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, type, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProperties.map((property, index) => (
              <Card
                key={property.id}
                className="shadow-soft hover-lift card-interactive animate-fade-in border p-2"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {property.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {property.type}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="truncate">{property.location}</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{property.rating}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">
                          Per night
                        </p>
                        <p className="font-semibold font-heading">
                          € {property.pricePerNight}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <Bed className="h-3 w-3" />
                          <span>Beds</span>
                        </div>
                        <p className="font-semibold font-heading">
                          {property.bedrooms}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <Users className="h-3 w-3" />
                          <span>Guests</span>
                        </div>
                        <p className="font-semibold font-heading">
                          {property.maxGuests}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 mt-auto">
                    <Button size="sm" variant="outline">
                      <Eye className="mr-1 h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => property.slug && handleEdit(property.slug)}
                    >
                      <Edit className="mr-1 h-4 w-4" />
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      disabled={
                        !property.slug || deletingProperty === property.slug
                      }
                      onClick={() => handleDelete(property.slug)}
                    >
                      <Trash2 className="h-4 w-4" />
                      {deletingProperty === property.slug
                        ? "Deleting..."
                        : "Delete"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 font-heading">
                No properties found
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Start by adding your first property"}
              </p>
              <PropertyFormSheet />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
