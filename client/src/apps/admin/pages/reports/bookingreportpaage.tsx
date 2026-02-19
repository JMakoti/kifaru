import LoadingScreen from "@/components/loadingscreen";
import { useBookingsReport } from "@/services/reports.services";
import { ArrowLeft, Download } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import * as XLSX from "xlsx";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

const BookingsReport = () => {
  const navigate = useNavigate();

  const {
    data: bookingsData,
    isLoading,
    isError,
    refetch,
  } = useBookingsReport();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) return <LoadingScreen />;
  if (isError || !bookingsData) return <div>Error loading bookings data.</div>;

  const exportToExcel = () => {
    const summarySheet = XLSX.utils.json_to_sheet([bookingsData.summary]);
    const propertySheet = XLSX.utils.json_to_sheet(bookingsData.by_property);
    const statusSheet = XLSX.utils.json_to_sheet(bookingsData.by_status);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");
    XLSX.utils.book_append_sheet(workbook, propertySheet, "By Property");
    XLSX.utils.book_append_sheet(workbook, statusSheet, "By Status");

    XLSX.writeFile(
      workbook,
      `Bookings_Report_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };

  const statusChartData = bookingsData.by_status.map((s) => ({
    name: s.status.charAt(0).toUpperCase() + s.status.slice(1),
    bookings: s.count,
    revenue: s.revenue,
  }));

  const propertyChartData = bookingsData.by_property.map((p) => ({
    name: p.property__name.split(" ").slice(0, 2).join(" "),
    bookings: p.booking_count,
    revenue: p.total_revenue,
  }));

  const accommodationData = bookingsData.by_accommodation_type.map((a) => ({
    name: a.accommodation_type
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    value: a.count,
  }));

  const dailyTrendData = bookingsData.daily_trend.map((d) => ({
    date: new Date(d.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    bookings: d.booking_count,
    revenue: d.revenue,
  }));

  return (
    <div className="min-h-screen bg-background mt-15">
      <header className="border-b px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Bookings Report
              </h1>
              <p className="text-sm text-muted-foreground">
                Comprehensive booking analytics and trends
              </p>
            </div>
          </div>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
          >
            <Download className="h-4 w-4" />
            Download Report
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 space-y-6 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Total Bookings
            </div>
            <div className="text-3xl font-bold text-foreground">
              {bookingsData.summary.total_bookings}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {bookingsData.summary.confirmed_bookings} confirmed
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Total Revenue
            </div>
            <div className="text-3xl font-bold text-accent">
              €{Number(bookingsData.summary.total_revenue).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              €{Number(bookingsData.summary.confirmed_revenue).toLocaleString()}{" "}
              confirmed
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Avg Booking Value
            </div>
            <div className="text-3xl font-bold text-green-600">
              €{Number(bookingsData.summary.avg_booking_value).toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {bookingsData.summary.avg_stay_duration} days avg stay
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Conversion Rate
            </div>
            <div className="text-3xl font-bold text-purple-600">
              {bookingsData.summary.conversion_rate}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {bookingsData.summary.pending_bookings} pending
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Bookings by Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Bar dataKey="bookings" fill="#3b82f6" name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Accommodation Types
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={accommodationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {accommodationData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Daily Booking Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3b82f6"
                  fill="#93c5fd"
                  name="Bookings"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Revenue by Property
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={propertyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Bar dataKey="bookings" fill="#8b5cf6" name="Bookings" />
                <Bar dataKey="revenue" fill="#10b981" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingsReport;
