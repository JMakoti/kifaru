import TransactionView from "@/apps/admin/components/transactionview";

export default function Transcations() {
  return (
    <>
      <div className="min-h-screen bg-background mt-16">
        <div className="container py-8 px-6">
          <TransactionView />
        </div>
      </div>
    </>
  );
}
