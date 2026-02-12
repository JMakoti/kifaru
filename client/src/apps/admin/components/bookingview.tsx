import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Eye,
  Calendar,
  DollarSign,
  Home,
  MapPin,
  Users,
} from "lucide-react";
import type { Booking } from "@/types/booking.types";

interface PropertyBooking {
  data: Booking[];
}

export default function BookingView({ data }: PropertyBooking) {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "confirmed":
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "TBD";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // const filteredBooking = booking.filter(
  //   (booking) =>
  //     booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     booking.id.toString().includes(searchTerm) ||
  //     booking.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     booking.propertyType.toLowerCase().includes(searchTerm.toLowerCase()),
  // );

  // const getPaymentIcon = (method: PropertyBooking["paymentMethod"]) => {
  //   switch (method) {
  //     case "card":
  //       return <CreditCard className="h-4 w-4" />;
  //     case "mobile":
  //       return <DollarSign className="h-4 w-4" />;
  //     case "bank_transfer":
  //       return <Home className="w-4 h-4" />;
  //     default:
  //       return null;
  //   }
  // };

  const totalBookings = data.filter(
    (b) => b.status === "confirmed" || b.status === "completed",
  ).length;

  const totalRevenue = data
    .filter((b) => b.status === "confirmed" || b.status === "completed")
    .reduce((sum, b) => sum + parseFloat(b.total_amount || "0"), 0);

  const pendingBookings = data.filter((b) => b.status === "pending").length;

  //filtered booking
  const filteredBookings = data.filter(
    (b) =>
      b.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.booking_reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.property_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">
            Property Booking Management
          </h1>
          <p className="text-muted-foreground">
            Track and manage your property reservations
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Booking
                </p>
                <p className="text-2xl font-bold">{totalBookings}</p>
              </div>
              <Home className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">€{totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Booking
                </p>
                <p className="text-2xl font-bold text-vendor">
                  {pendingBookings}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-vendor" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Booking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by guest name, booking ID, property..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredBookings.map((b) => (
              <Card
                key={b.id}
                className="shadow-soft hover:shadow-medium transition-all"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {b.booking_reference}
                          </h3>
                          <p className="text-muted-foreground">{b.full_name}</p>
                          {b.email && (
                            <p className="text-sm text-muted-foreground">
                              {b.email}
                            </p>
                          )}
                        </div>
                        <Badge className={getStatusStyle(b.status)}>
                          {b.status}
                        </Badge>
                      </div>

                      <div className="space-y-1">
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">
                              {b.property_name}
                            </span>
                            <Badge variant="outline" className="ml-auto">
                              {b.accommodation_type}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <div>
                                <div className="text-gray-600">Check-in</div>
                                <div className="font-medium">
                                  {formatDate(b.check_in)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <div>
                                <div className="text-gray-600">Check-out</div>
                                <div className="font-medium">
                                  {formatDate(b.check_out)}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm pt-2 border-t">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Users className="w-4 h-4" />
                                <span className="text-foreground font-medium">
                                  {b.number_of_guests}
                                </span>
                              </div>
                              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                                ({b.number_of_adults}A / {b.number_of_children}
                                C)
                              </span>
                            </div>
                            <div>
                              <span className="text-primary font-semibold">
                                {b.total_days} Night(s)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                        {getPaymentIcon(booking.paymentMethod)}
                        <span className="capitalize">
                          {booking.paymentMethod.replace("_", " ")}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span>{formatDateTime(booking.bookingDate)}</span>
                      </div> */}
                        <div className="flex items-center gap-2 text-sm text-gray-600"></div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-black-600">
                            €{b.total_amount}
                          </div>
                          <div className="text-xs text-gray-500">Total</div>
                        </div>
                      </div>

                      <Button className="w-full" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Home className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No bookings found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
