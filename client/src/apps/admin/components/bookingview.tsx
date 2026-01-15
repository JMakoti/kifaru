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
  CreditCard,
} from "lucide-react";

interface PropertyBooking {
  id: string;
  guestName: string;
  guestEmail?: string;
  propertyName: string;
  propertyType: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  total: number;
  status: "confirmed" | "pending" | "cancelled";
  paymentMethod: "mobile" | "card" | "bank_transfer";
  bookingDate: Date;
}

export default function BookingView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [booking] = useState<PropertyBooking[]>([
    {
      id: "BK-2024-1213",
      guestName: "Alice Johnson",
      guestEmail: "alice@example.com",
      propertyName: "Kifaru Belgium",
      propertyType: "Villa",
      checkIn: new Date(2024, 3, 20),
      checkOut: new Date(2024, 3, 27),
      guests: 4,
      total: 2800.0,
      status: "confirmed",
      paymentMethod: "card",
      bookingDate: new Date(2024, 2, 15, 10, 30),
    },
    {
      id: "BK-2024-1235",
      guestName: "Bob Smith",
      guestEmail: "bob@example.com",
      propertyName: "Kifaru Nyali",
      propertyType: "Apartment",
      checkIn: new Date(2024, 3, 18),
      checkOut: new Date(2024, 3, 21),
      guests: 2,
      total: 450.0,
      status: "pending",
      paymentMethod: "bank_transfer",
      bookingDate: new Date(2024, 2, 15, 14, 15),
    },
    {
      id: "BK-2024-1335",
      guestName: "Carol Davis",
      guestEmail: "carol@example.com",
      propertyName: "Kifaru Msambweni",
      propertyType: "Cabin",
      checkIn: new Date(2024, 3, 10),
      checkOut: new Date(2024, 3, 17),
      guests: 6,
      total: 1950.0,
      status: "confirmed",
      paymentMethod: "mobile",
      bookingDate: new Date(2024, 2, 14, 16, 45),
    },
    {
      id: "BK-2024-4235",
      guestName: "David Wilson",
      propertyName: "Kifaru Neitherlands",
      propertyType: "Studio",
      checkIn: new Date(2024, 3, 15),
      checkOut: new Date(2024, 3, 16),
      guests: 1,
      total: 120.0,
      status: "cancelled",
      paymentMethod: "card",
      bookingDate: new Date(2024, 2, 14, 9, 20),
    },
  ]);

  const formatDate = (date: Date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const formatDateTime = (date: Date) => {
    const dateStr = formatDate(date);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${dateStr} at ${hours}:${minutes}`;
  };

  const filteredBooking = booking.filter(
    (booking) =>
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toString().includes(searchTerm) ||
      booking.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.propertyType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: PropertyBooking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentIcon = (method: PropertyBooking["paymentMethod"]) => {
    switch (method) {
      case "card":
        return <CreditCard className="h-4 w-4" />;
      case "mobile":
        return <DollarSign className="h-4 w-4" />;
      case "bank_transfer":
        return <Home className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const calculateNights = (checkIn: Date, checkOut: Date) => {
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalBookings = booking.filter((b) => b.status === "confirmed").length;
  const totalRevenue = booking
    .filter((b) => b.status === "confirmed")
    .reduce((sum, booking) => sum + booking.total, 0);
  const pendingBookings = booking.filter((b) => b.status === "pending").length;

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
        {/* <NewSaleForm /> */}
        <p>Booking Form</p>
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
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
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
      <div className="shadow-soft">
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
            {filteredBooking.map((booking) => (
              <Card
                key={booking.id}
                className="shadow-soft hover:shadow-medium transition-all"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">
                            Booking #{booking.id}
                          </h3>
                          <p className="text-muted-foreground">
                            {booking.guestName}
                          </p>
                          {booking.guestEmail && (
                            <p className="text-sm text-muted-foreground">
                              {booking.guestEmail}
                            </p>
                          )}
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>

                      <div className="space-y-1">
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">
                              {booking.propertyName}
                            </span>
                            <Badge variant="outline" className="ml-auto">
                              {booking.propertyType}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <div>
                                <div className="text-gray-600">Check-in</div>
                                <div className="font-medium">
                                  {formatDate(booking.checkIn)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <div>
                                <div className="text-gray-600">Check-out</div>
                                <div className="font-medium">
                                  {formatDate(booking.checkOut)}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm pt-2 border-t">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-500" />
                              <span>
                                {booking.guests} guest
                                {booking.guests > 1 ? "s" : ""}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                {calculateNights(
                                  booking.checkIn,
                                  booking.checkOut
                                )}{" "}
                                night
                                {calculateNights(
                                  booking.checkIn,
                                  booking.checkOut
                                ) > 1
                                  ? "s"
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          {getPaymentIcon(booking.paymentMethod)}
                          <span className="capitalize">
                            {booking.paymentMethod.replace("_", " ")}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span>{formatDateTime(booking.bookingDate)}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-black-600">
                            ${booking.total.toFixed(2)}
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

          {filteredBooking.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Home className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No bookings found</p>
              <p className="text-sm">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Start creating your first booking"}
              </p>
              <p>Booking Form</p>
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
}
