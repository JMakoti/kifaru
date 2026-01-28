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
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Booking History
        </h1>
        <p className="text-muted-foreground text-sm">
          View and manage your past and upcoming stays
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Tabs */}
        <TabsList className="bg-muted/60 rounded-xl p-1 flex flex-wrap gap-1">
          {(["all", "upcoming", "completed", "cancelled"] as const).map(
            (tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="
                  capitalize rounded-lg px-4 py-2
                  data-[state=active]:bg-card
                  data-[state=active]:shadow-sm
                "
              >
                {tab} ({counts[tab]})
              </TabsTrigger>
            ),
          )}
        </TabsList>

        {/* Content */}
        <TabsContent value={activeTab} className="mt-4">
          <div className="space-y-4">
            {filteredBookings.length ? (
              filteredBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="bg-card rounded-2xl border border-border p-10 text-center">
                <p className="text-muted-foreground">
                  No bookings found. Plan your next stay with Kifaru.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
