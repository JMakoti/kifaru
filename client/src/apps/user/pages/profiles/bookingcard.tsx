import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";
import type { Booking } from "@/types/booking.types";

interface PropertyBooking {
  booking: Booking;
}

export default function BookingCard({ booking }: PropertyBooking) {
  const getStatusStyle = () => {
    switch (booking.status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
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

  // const getPaymentIcon = (
  //   method: PropertyBooking["booking"]["paymentMethod"],
  // ) => {
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

  return (
    <Card className="border border-border rounded-2xl shadow-sm hover:shadow-md transition">
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{booking.booking_reference}</h3>
          <Badge className={getStatusStyle()}>{booking.status}</Badge>
        </div>

        {/* Property Info */}
        <div className="bg-muted/40 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{booking.property_name}</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Check-in</p>
                <p className="font-medium">{formatDate(booking.check_in)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Check-out</p>
                <p className="font-medium">{formatDate(booking.check_out)}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm border-t border-border/60 pt-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="text-foreground font-medium">
                  {booking.number_of_guests}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                ({booking.number_of_adults}A / {booking.number_of_children}C)
              </span>
            </div>
            <span className="text-primary font-semibold">
              {booking.total_days} Night(s)
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {getPaymentIcon(booking.paymentMethod)}
            <span className="capitalize">
              {booking.paymentMethod.replace("_", " ")}
            </span>
            <span>•</span>
            <span>{formatDateTime(booking.bookingDate)}</span>
          </div> */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground"></div>

          <div className="text-right">
            <p className="text-2xl font-semibold">${booking.total_amount}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>

        {/* Action */}
        {/* <Button
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
        </Button> */}
      </CardContent>
    </Card>
  );
}
