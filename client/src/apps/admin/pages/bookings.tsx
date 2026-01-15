import BookingView from "@/apps/admin/components/bookingview";

export default function Bookings() {
  return (
    <>
    <div className="min-h-screen bg-background">
            <div className="container py-8 px-6">
              <BookingView/>
            </div>
          </div>
      {/* <main className="min-h-screen pt-20">
        <div className="container mx-auto px-6 md:px-12 py-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-8">
            Bookings
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Manage and review all property bookings efficiently from this dashboard. Stay updated on guest reservations and booking statuses in real time.
          </p>
        </div>
      </main> */}
    </>
  );
}
