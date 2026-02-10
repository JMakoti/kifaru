"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Edit,
  Trash2,
  Building2,
  DollarSign,
  Home,
  MapPin,
  Bed,
  Users,
  Star,
  Eye,
} from "lucide-react";
import { useDeleteProperty, useProperties } from "@/services/property.service";
import LoadingScreen from "@/components/loadingscreen";
import { PropertyFormSheet } from "./propertyfrom";
import type {
  Property as APIProperty,
  PropertyCategory,
} from "@/types/property";

// Extend APIProperty to include optional fields for our UI
interface ExtendedAPIProperty extends APIProperty {
  status?: "available" | "booked" | "blocked" | "maintenance";
  booked_dates?: { check_in: string; check_out: string }[];
}

// Derived property type for rendering
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
  status: "available" | "booked" | "blocked" | "maintenance";
}

export default function PropertiesView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingProperty, setDeletingProperty] = useState<string | null>(null);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // New state
  const { data, isLoading, refetch } = useProperties();
  const { mutateAsync } = useDeleteProperty();

  // Map API data to UI-friendly property view
  const propertyList = useMemo(() => data?.results || [], [data]);

  const properties: PropertyView[] = useMemo(() => {
    const today = new Date();

    return propertyList.map((prop) => {
      const bedrooms = prop.bedrooms || 1;
      const maxGuests = prop.max_guests || 1;
      const rating = prop.average_rating || 4.5;

      const getPropertyStatus = (prop: ExtendedAPIProperty, bufferDays = 1) => {
        if (prop.status === "blocked") return "blocked";
        if (prop.status === "maintenance") return "maintenance";

        if (!prop.booked_dates || prop.booked_dates.length === 0)
          return "available";

        const isBookedToday = prop.booked_dates.some((range) => {
          const checkIn = new Date(range.check_in);
          const checkOut = new Date(range.check_out);
          const bufferedCheckout = new Date(checkOut);
          bufferedCheckout.setDate(bufferedCheckout.getDate() + bufferDays);

          return today >= checkIn && today <= bufferedCheckout;
        });

        return isBookedToday ? "booked" : "available";
      };

      const status = getPropertyStatus(prop);

      return {
        id: prop.id,
        name: prop.name,
        slug: prop.slug,
        type: prop.property_category || "urban",
        location: prop.location,
        pricePerNight: parseInt(prop.price) || 200,
        bedrooms,
        maxGuests,
        rating,
        status,
      };
    });
  }, [propertyList]);

  const editingProperty = useMemo(() => {
    if (!editingSlug) return undefined;
    return propertyList.find((p) => p.slug === editingSlug);
  }, [editingSlug, propertyList]);

  const filteredProperties = properties.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: PropertyView["status"]) => {
    switch (status) {
      case "available":
        return "bg-emerald/50 text-emerald-600";
      case "booked":
        return "bg-blue/20 text-blue-600";
      case "blocked":
        return "bg-amber/20 text-amber-600";
      case "maintenance":
        return "bg-orange/20 text-orange-600";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const totalProperties = properties.length;
  const avgNightlyRate = Math.round(
    properties.reduce((sum, p) => sum + p.pricePerNight, 0) /
      (properties.length || 1),
  );
  const availableCount = properties.filter(
    (p) => p.status === "available",
  ).length;

  if (isLoading) return <LoadingScreen />;

  const handleEdit = (slug: string) => {
    if (!slug) return;
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
        {/* <PropertyFormSheet
          property={editingProperty}
          onSuccess={() => {
            setEditingSlug(null);
            refetch();
          }}
        /> */}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                ${avgNightlyRate}
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft h-30">
          <CardContent className="py-3 px-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Available Now
              </p>
              <p className="text-2xl font-bold font-heading text-primary">
                {availableCount}
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Home className="h-6 w-6 text-primary" />
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
                      <Badge className={getStatusColor(property.status)}>
                        {property.status}
                      </Badge>
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
                          $ {property.pricePerNight}
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
