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

  const getStatusColor = (status: PropertyBooking["booking"]["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "upcoming":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentIcon = (
    method: PropertyBooking["booking"]["paymentMethod"]
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
      <div>
        <CardContent>
          <div className="">
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
                          #{booking.id}
                        </h3>
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

                    <Button
                      className="w-full"
                      variant={
                        booking.status === "upcoming" ? "default" : "outline"
                      }
                      size="sm"
                    >
                      {booking.status === "upcoming" ? (
                        <div className="flex">
                          <Eye className="w-4 h-4 mr-2" /> View Details
                        </div>
                      ) : (
                        "Book Again"
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </div>
  );
}
