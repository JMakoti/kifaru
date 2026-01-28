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
import AddPropertyForm from "./addproperty";
import { useProperties } from "@/services/property.service";
import type {
  Property as APIProperty,
  PropertyCategory,
} from "@/services/property.types";
import LoadingScreen from "@/components/loadingscreen";

interface PropertyView {
  id: number;
  name: string;
  type: PropertyCategory;
  location: string;
  pricePerNight: number;
  bedrooms: number;
  maxGuests: number;
  rating: number;
  status: "available" | "booked" | "blocked" | "maintenance";
  bookedDaysFromToday: number;
}

export default function PropertiesView() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: fetchedProperties = [], isLoading } = useProperties();

  const properties: PropertyView[] = useMemo(() => {
    const today = new Date();

    return fetchedProperties.map((prop: APIProperty) => {
      const bedrooms = prop.bedrooms || 1;
      const maxGuests = prop.max_guests || 1;
      const rating = prop.average_rating || 4.5;

      type Status = "available" | "booked" | "blocked" | "maintenance";

      function getPropertyStatus(prop: APIProperty, bufferDays = 1): Status {
        // Assume blocked/maintenance flags exist on API object
        if ((prop as any).status === "blocked") return "blocked";
        if ((prop as any).status === "maintenance") return "maintenance";

        // Check booked dates if any
        if (
          !(prop as any).booked_dates ||
          (prop as any).booked_dates.length === 0
        )
          return "available";

        const isBookedToday = (prop as any).booked_dates.some((range: any) => {
          const checkIn = new Date(range.check_in);
          const checkOut = new Date(range.check_out);

          const bufferedCheckout = new Date(checkOut);
          bufferedCheckout.setDate(bufferedCheckout.getDate() + bufferDays);

          return today >= checkIn && today <= bufferedCheckout;
        });

        return isBookedToday ? "booked" : "available";
      }

      function getBookedDaysFromToday(
        prop: APIProperty,
        status: Status,
        bufferDays = 1,
      ): number {
        if (status !== "booked") return 0;
        if (!(prop as any).booked_dates) return 0;

        let total = 0;
        (prop as any).booked_dates.forEach((range: any) => {
          const checkIn = new Date(range.check_in);
          const checkOut = new Date(range.check_out);

          const bufferedCheckout = new Date(checkOut);
          bufferedCheckout.setDate(bufferedCheckout.getDate() + bufferDays);

          if (bufferedCheckout < today) return;

          const start = checkIn < today ? today : checkIn;
          const diff =
            (bufferedCheckout.getTime() - start.getTime()) /
            (1000 * 60 * 60 * 24);
          if (diff > 0) total += Math.ceil(diff);
        });

        return total;
      }

      const status = getPropertyStatus(prop);
      const bookedDaysFromToday = getBookedDaysFromToday(prop, status);

      return {
        id: prop.id,
        name: prop.name,
        type: prop.property_category || "urban",
        location: prop.location,
        pricePerNight: parseInt(prop.price) || 200,
        bedrooms,
        maxGuests,
        rating,
        status,
        bookedDaysFromToday,
      };
    });
  }, [fetchedProperties]);

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
      properties.length || 0,
  );
  const availableCount = properties.filter(
    (p) => p.status === "available",
  ).length;

  if (isLoading)
    return <LoadingScreen/>

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
        <AddPropertyForm />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-soft h-30" style={{ animationDelay: "0.1s" }}>
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

        <Card className="shadow-soft h-30" style={{ animationDelay: "0.2s" }}>
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

        <Card className="shadow-soft h-30" style={{ animationDelay: "0.3s" }}>
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
      <Card style={{ animationDelay: "0.4s" }}>
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

                  {/* Buttons at the bottom */}
                  <div className="flex gap-2 pt-2 mt-auto">
                    <Button size="sm" variant="outline">
                      <Eye className="mr-1 h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="mr-1 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
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
              <AddPropertyForm />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
