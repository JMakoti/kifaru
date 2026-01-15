import TransactionView from "@/apps/admin/components/transactionview";

export default function Transcations() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container py-8 px-6">
          <TransactionView />
        </div>
      </div>
      {/* <main className="min-h-screen pt-20">
        <div className="container mx-auto px-6 md:px-12 py-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-8">
            Transactions
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Track and manage all payment transactions securely. View payment history and resolve issues quickly from this panel.
          </p>
        </div>
      </main> */}
    </>
  );
}
