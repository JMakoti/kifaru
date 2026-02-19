import { useReportDash } from "@/services/reports.services";
import ReportsView from "../components/reportview";

export default function Reports() {
  const { data, isLoading, error } = useReportDash();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background mt-14">
        <div className="container py-8 px-6">
          <p>Loading reports...</p>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-background mt-14">
        <div className="container py-8 px-6">
          <p>Failed to load reports.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-background mt-14">
        <div className="container py-8 px-6">
          <ReportsView dashboard={data}/>
        </div>
      </main>
    </>
  );
}
