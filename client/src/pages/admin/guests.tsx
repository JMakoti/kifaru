import CustomersView from "@/components/admin/customer/customerview";

export default function Guests() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container py-8 px-6">
          <CustomersView />
        </div>
      </div>

      {/* <main className="min-h-screen pt-20">
        <div className="container mx-auto px-6 md:px-12 py-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-8">
            Guests
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            View and manage guest information, track check-ins and check-outs, and ensure a seamless experience for every visitor.
          </p>
        </div>
      </main> */}
    </>
  );
}
