import BookingView from "@/apps/admin/components/bookingview";
import LoadingScreen from "@/components/loadingscreen";
import { useBookings } from "@/services/booking.service";
import type { Booking } from "@/types/booking.types";
import { useEffect } from "react";

export default function Bookings() {
  const {
    data: allBookings = [] as Booking[],
    isLoading,
    refetch,
  } = useBookings();

  console.log("All Bookings:", allBookings); // Debugging log

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background mt-16">
      <div className="container py-8 px-6">
        {allBookings.length > 0 ? (
          <BookingView data={allBookings} />
        ) : (
          <div className="bg-card rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">
              You haven't made any bookings yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
