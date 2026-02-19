import LoadingScreen from "@/components/loadingscreen";
import { usePropertiesReport } from "@/services/reports.services";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router";
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
  LineChart,
  Line,
} from "recharts";
import * as XLSX from "xlsx";

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

const PropertyReport = () => {
  const navigate = useNavigate();
  const { data: propertyData, isLoading, isError } = usePropertiesReport();

  if (isLoading) return <LoadingScreen />;
  if (isError || !propertyData) return <div>Error loading property data.</div>;

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(propertyData.properties);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Properties");
    XLSX.writeFile(
      workbook,
      `Properties_Report_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };

  const activeProperties = propertyData.properties.filter(
    (p) => p.total_bookings > 0,
  );

  const revenueData = activeProperties.map((p) => ({
    name: p.property_name.split(" ").slice(0, 2).join(" "),
    revenue: Number(p.total_revenue),
    confirmed: Number(p.confirmed_revenue),
  }));

  const occupancyData = activeProperties.map((p) => ({
    name: p.property_name.split(" ").slice(0, 2).join(" "),
    occupancy: p.occupancy_rate_30days,
  }));

  const bookingsDistribution = activeProperties.map((p) => ({
    name: p.property_name.split(" ").slice(0, 2).join(" "),
    value: p.total_bookings,
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
                Properties Report
              </h1>
              <p className="text-sm text-muted-foreground">
                Performance analysis for {propertyData.total_properties}{" "}
                properties
              </p>
            </div>
          </div>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
          >
            <Download className="h-4 w-4" />
            Export to Excel
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 space-y-6 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Total Properties
            </div>
            <div className="text-3xl font-bold text-foreground">
              {propertyData.total_properties}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Active Properties
            </div>
            <div className="text-3xl font-bold text-green-600">
              {activeProperties.length}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Total Revenue
            </div>
            <div className="text-3xl font-bold text-foreground">
              $
              {activeProperties
                .reduce((sum, p) => sum + Number(p.total_revenue), 0)
                .toLocaleString()}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Avg Occupancy
            </div>
            <div className="text-3xl font-bold text-accent">
              {(
                activeProperties.reduce(
                  (sum, p) => sum + p.occupancy_rate_30days,
                  0,
                ) / activeProperties.length
              ).toFixed(1)}
              %
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Revenue by Property
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
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
                <Bar dataKey="revenue" fill="#3b82f6" name="Total Revenue" />
                <Bar
                  dataKey="confirmed"
                  fill="#10b981"
                  name="Confirmed Revenue"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Bookings Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bookingsDistribution}
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
                  {bookingsDistribution.map((_, index) => (
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
              Occupancy Rate (30 Days)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={occupancyData}>
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
                  label={{
                    value: "Occupancy %",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="occupancy"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyReport;
