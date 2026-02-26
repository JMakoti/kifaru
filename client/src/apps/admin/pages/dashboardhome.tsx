import { useDashboardStats } from "@/services/user.service";
import AdminDashboardView from "../components/dashboardview";
import LoadingScreen from "@/components/loadingscreen";

export default function DashboardHome() {
  const { data, isLoading, error } = useDashboardStats();

  if (isLoading) return <LoadingScreen />;
  if (error) return <p>Error loading dashboard</p>;

  if (!data) return null;

  return (
    <>
      <main className="min-h-screen bg-background mt-15">
        <div className="container py-8 px-6">
          <AdminDashboardView data={data} />
        </div>
      </main>
    </>
  );
}
