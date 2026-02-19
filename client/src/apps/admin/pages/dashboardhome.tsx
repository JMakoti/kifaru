import AdminDashboardView from "../components/dashboardview";

export default function DashboardHome() {
  return (
    <>
      <main className="min-h-screen bg-background mt-15">
        <div className="container py-8 px-6">
          <AdminDashboardView />
        </div>
      </main>
    </>
  );
}
