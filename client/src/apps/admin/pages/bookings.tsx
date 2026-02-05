import BookingView from "@/apps/admin/components/bookingview";
import { useBookings } from "@/services/booking.service";
import type { Booking } from "@/types/booking.types";

export default function Bookings() {
  // 1. Destructure correctly. 'data' is renamed to 'allBookings' to avoid confusion.
  const { data: allBookings = [] as Booking[], isLoading } = useBookings();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background mt-16">
      <div className="container py-8 px-6">
        {allBookings.length > 0 ? (
          /* 2. Pass the whole array to BookingView. 
             BookingView handles the internal mapping, searching, and totals.
          */
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