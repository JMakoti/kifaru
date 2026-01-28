import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Calendar,
  DollarSign,
  Home,
  MapPin,
  Users,
  CreditCard,
} from "lucide-react";

export type Booking = {
  id: string;
  propertyName: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  total: number;
  status: "upcoming" | "completed" | "cancelled";
  paymentMethod: "mobile" | "card" | "bank_transfer";
  bookingDate: Date;
};

interface PropertyBooking {
  booking: Booking;
}

export default function BookingCard({ booking }: PropertyBooking) {
  const getStatusStyle = () => {
    switch (booking.status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "upcoming":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
    }
  };

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

  const getPaymentIcon = (
    method: PropertyBooking["booking"]["paymentMethod"],
  ) => {
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

  return (
    <Card className="border border-border rounded-2xl shadow-sm hover:shadow-md transition">
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">#{booking.id}</h3>
          <Badge className={getStatusStyle()}>{booking.status}</Badge>
        </div>

        {/* Property Info */}
        <div className="bg-muted/40 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{booking.propertyName}</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Check-in</p>
                <p className="font-medium">{formatDate(booking.checkIn)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Check-out</p>
                <p className="font-medium">{formatDate(booking.checkOut)}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm border-t pt-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>
                {booking.guests} guest{booking.guests > 1 && "s"}
              </span>
            </div>
            <span className="text-muted-foreground">
              {calculateNights(booking.checkIn, booking.checkOut)} night(s)
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {getPaymentIcon(booking.paymentMethod)}
            <span className="capitalize">
              {booking.paymentMethod.replace("_", " ")}
            </span>
            <span>•</span>
            <span>{formatDateTime(booking.bookingDate)}</span>
          </div>

          <div className="text-right">
            <p className="text-2xl font-semibold">
              ${booking.total.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>

        {/* Action */}
        <Button
          className="w-full"
          size="sm"
          variant={booking.status === "upcoming" ? "default" : "outline"}
        >
          {booking.status === "upcoming" ? (
            <span className="flex items-center gap-2">
              <Eye className="w-4 h-4" /> View Details
            </span>
          ) : (
            "Book Again"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
