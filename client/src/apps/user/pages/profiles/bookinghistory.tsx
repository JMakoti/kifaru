import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingCard, { type Booking } from "./bookingcard";

const mockBookings: Booking[] = [
  {
    id: "BK-2024-1213",
    propertyName: "Kifaru Belgium",
    checkIn: new Date(2024, 3, 20),
    checkOut: new Date(2024, 3, 27),
    guests: 4,
    total: 2800.0,
    status: "cancelled",
    paymentMethod: "card",
    bookingDate: new Date(2024, 2, 15, 10, 30),
  },
  {
    id: "BK-2024-1235",
    propertyName: "Kifaru Nyali",
    checkIn: new Date(2024, 3, 18),
    checkOut: new Date(2024, 3, 21),
    guests: 2,
    total: 450.0,
    status: "completed",
    paymentMethod: "bank_transfer",
    bookingDate: new Date(2024, 2, 15, 14, 15),
  },
  {
    id: "BK-2024-1335",
    propertyName: "Kifaru Msambweni",
    checkIn: new Date(2024, 3, 10),
    checkOut: new Date(2024, 3, 17),
    guests: 6,
    total: 1950.0,
    status: "completed",
    paymentMethod: "mobile",
    bookingDate: new Date(2024, 2, 14, 16, 45),
  },
  {
    id: "BK-2024-4235",
    propertyName: "Kifaru Neitherlands",
    checkIn: new Date(2024, 3, 15),
    checkOut: new Date(2024, 3, 16),
    guests: 1,
    total: 120.0,
    status: "upcoming",
    paymentMethod: "card",
    bookingDate: new Date(2024, 2, 14, 9, 20),
  },
];

export function BookingHistory() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredBookings =
    activeTab === "all"
      ? mockBookings
      : mockBookings.filter((b) => b.status === activeTab);

  const counts = {
    all: mockBookings.length,
    upcoming: mockBookings.filter((b) => b.status === "upcoming").length,
    completed: mockBookings.filter((b) => b.status === "completed").length,
    cancelled: mockBookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="flex-1">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Booking History
        </h1>
        <p className="text-muted-foreground">
          View and manage your past and upcoming stays
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-secondary/50 p-1 mb-6">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-card data-[state=active]:shadow-soft"
          >
            All ({counts.all})
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-card data-[state=active]:shadow-soft"
          >
            Upcoming ({counts.upcoming})
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-card data-[state=active]:shadow-soft"
          >
            Completed ({counts.completed})
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className="data-[state=active]:bg-card data-[state=active]:shadow-soft"
          >
            Cancelled ({counts.cancelled})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="space-y-4">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="bg-card rounded-2xl shadow-card p-12 text-center">
                <p className="text-muted-foreground">
                  No bookings found plan your stay with kifaru.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
