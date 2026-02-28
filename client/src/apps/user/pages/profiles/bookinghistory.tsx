import BookingCard from "./bookingcard";
import { useMyBookings } from "@/services/booking.service";
import { Loader2, AlertCircle } from "lucide-react";

export function BookingHistory() {
  const { data: bookings = [], isLoading, isError } = useMyBookings();

  if (isLoading) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Fetching your bookings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center border border-destructive/20 bg-destructive/5 rounded-2xl gap-3">
        <AlertCircle className="w-8 h-8 text-destructive" />
        <div>
          <p className="text-destructive font-semibold">Unable to load history</p>
          <p className="text-sm text-muted-foreground">Please check your connection and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Booking History
        </h1>
        <p className="text-muted-foreground text-sm">
          View all your stays with Kifaru ({bookings.length})
        </p>
      </div>

      <div className="space-y-4">
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <BookingCard 
              key={booking.id || index} 
              booking={booking} 
            />
          ))
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