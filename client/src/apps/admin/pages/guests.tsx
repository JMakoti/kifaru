import CustomersView from "@/apps/admin/components/customerview";

export default function Guests() {
  return (
    <>
      <div className="min-h-screen bg-background mt-15">
        <div className="container py-8 px-6">
          <CustomersView />
        </div>
      </div>
    </>
  );
}
