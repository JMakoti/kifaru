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
  Eye,
} from "lucide-react";
import { PropertyFormSheet } from "./propertyfrom";
import type { Property } from "@/types/property";
// import { Link } from "react-router";

interface PropertyView {
  properties: Property[];
  onDelete: (slug?: string) => Promise<void>;
  deletingProperty: string | null;
}

export default function PropertiesView({
  properties,
  onDelete,
  deletingProperty,
}: PropertyView) {
  const [searchTerm, setSearchTerm] = useState("");

  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  if (!properties) return null;

  const editingProperty = editingSlug
    ? properties.find((p) => p.slug === editingSlug)
    : undefined;

  const filteredProperties = properties.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalProperties = properties.length;
  const avgNightlyRate =
    properties.reduce((sum, p) => sum + Number(p.price), 0) /
    (properties.length || 1);

  const handleEdit = (slug: string) => {
    setEditingSlug(slug);
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">Kifaru Retreats</h1>
          <p className="text-muted-foreground">
            Manage your vacation properties and bookings
          </p>
        </div>
        <p className="cursor-pointer select-none">
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
              // refetch();
            }}
          />
        </p>
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
                className="shadow-soft hover-lift card-interactive animate-fade-in border p-3 rounded-2xl"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <CardContent className="p-4 flex flex-col h-full space-y-4">
                  {/* Top Section */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {property.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {property.property_category} • {property.country}
                      </p>
                    </div>

                    {property.average_rating !== null &&
                      property.average_rating !== undefined && (
                        <div className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-3 py-1 rounded-full text-xs font-medium">
                          <span className="text-yellow-500">★</span>
                          {property.average_rating.toFixed(1)}
                        </div>
                      )}
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{property.location}</span>
                  </div>

                  {/* Price Section */}
                  <div className="bg-muted/40 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground">
                      Nightly Price
                    </p>
                    <p className="text-xl font-bold font-heading">
                      € {Number(property.price).toLocaleString()}
                    </p>
                  </div>

                  {/* Property Stats */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Bedrooms</p>
                      <p className="font-semibold">{property.bedrooms}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Bathrooms</p>
                      <p className="font-semibold">{property.bathrooms}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Max Guests
                      </p>
                      <p className="font-semibold">
                        {property.max_guests ?? "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Min Nights
                      </p>
                      <p className="font-semibold">{property.min_nights}</p>
                    </div>
                  </div>

                  {/* Policy Section */}
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Cancellation: {property.cancellation_days} days</p>
                    <p>Prepayment: {property.prepayment_percentage}%</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 mt-auto">
                    {/* <Link
                      to={`/admin/property/${property.slug}`}
                      className="group block"
                    > */}
                      <Button size="sm" variant="outline">
                        <Eye className="mr-1 h-4 w-4" />
                        View
                      </Button>
                    {/* </Link> */}

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
                      onClick={() => onDelete(property.slug)}
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
            <div className="text-center py-12 cursor-default select-none">
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
