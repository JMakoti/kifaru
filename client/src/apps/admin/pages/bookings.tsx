import BookingView from "@/apps/admin/components/bookingview";

export default function Bookings() {
  return (
    <>
      <div className="min-h-screen bg-background mt-16">
        <div className="container py-8 px-6">
          <BookingView />
        </div>
      </div>
    </>
  );
}
