import LoadingScreen from "@/components/loadingscreen";
import { usePaymentsReport } from "@/services/reports.services";
import type {
  PaymentByMethod,
  PaymentByStatus,
  PaymentsData,
} from "@/types/reports";
import { ArrowLeft, Download } from "lucide-react";
import { useEffect } from "react";
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
} from "recharts";
import * as XLSX from "xlsx";

const COLORS = {
  completed: "#10b981",
  pending: "#f59e0b",
  failed: "#ef4444",
};

const METHOD_COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#f97316", "#22c55e"];

const PaymentsReport = () => {
  const navigate = useNavigate();

  const {
    data: paymentsData,
    isLoading,
    isError,
    refetch,
  } = usePaymentsReport<PaymentsData>();

  useEffect(() => {
      const interval = setInterval(() => {
        refetch();
      }, 30000);
      return () => clearInterval(interval);
    }, [refetch]);

  if (isLoading) return <LoadingScreen />;
  if (isError || !paymentsData) return <div>Error loading payments data.</div>;

  const exportToExcel = () => {
    const summarySheet = XLSX.utils.json_to_sheet([paymentsData.summary]);
    const statusSheet = XLSX.utils.json_to_sheet(paymentsData.by_status);
    const methodSheet = XLSX.utils.json_to_sheet(paymentsData.by_method);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");
    XLSX.utils.book_append_sheet(workbook, statusSheet, "By Status");
    XLSX.utils.book_append_sheet(workbook, methodSheet, "By Method");

    XLSX.writeFile(
      workbook,
      `Payments_Report_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };

  const statusChartData = paymentsData.by_status.map((s: PaymentByStatus) => ({
    name: s.payment_status.charAt(0).toUpperCase() + s.payment_status.slice(1),
    count: s.count,
    amount: s.total_amount,
    status: s.payment_status,
  }));

  const methodPieData = paymentsData.by_method?.map(
    (item: PaymentByMethod) => ({
      name: item.payment_method.toUpperCase(),
      value: item.count,
    }),
  );

  const successRate = [
    { name: "Successful", value: paymentsData.summary.success_rate },
    {
      name: "Failed",
      value: paymentsData.summary.failure_rate,
    },
    {
      name: "Pending",
      value:
        100 -
        paymentsData.summary.success_rate -
        paymentsData.summary.failure_rate,
    },
  ];

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
                Payments Report
              </h1>
              <p className="text-sm text-muted-foreground">
                Revenue breakdown and payment status analysis
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
              Total Payments
            </div>
            <div className="text-3xl font-bold text-foreground">
              {paymentsData.summary.total_payments}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {paymentsData.summary.completed_payments} completed
            </div>
          </div>
          <div className="rounded-lg border border-green-200 bg-green-100/20 p-6 shadow-sm">
            <div className="text-sm font-medium text-green-700 mb-2">
              Completed Amount
            </div>
            <div className="text-3xl font-bold text-green-700">
              €{Number(paymentsData.summary.completed_amount).toLocaleString()}
            </div>
            <div className="text-xs text-green-600 mt-1">
              {paymentsData.summary.completed_payments} transactions
            </div>
          </div>
          <div className="rounded-lg border border-yellow-200 bg-yellow-100/20 p-6 shadow-sm">
            <div className="text-sm font-medium text-yellow-700 mb-2">
              Pending Amount
            </div>
            <div className="text-3xl font-bold text-yellow-700">
              €{Number(paymentsData.summary.pending_amount).toLocaleString()}
            </div>
            <div className="text-xs text-yellow-600 mt-1">
              {paymentsData.summary.pending_payments} transactions
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Success Rate
            </div>
            <div className="text-3xl font-bold text-accent">
              {paymentsData.summary.success_rate}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {paymentsData.summary.failure_rate}% failure rate
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Payment Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={methodPieData}
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
                  {methodPieData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={METHOD_COLORS[index % METHOD_COLORS.length]}
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

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Success Rate Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={successRate}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#ef4444" />
                  <Cell fill="#f59e0b" />
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
              Payment Amount by Status
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
                <Bar dataKey="count" name="Count">
                  {statusChartData.map((entry, index) => (
                    <Cell
                      key={`count-${index}`}
                      fill={COLORS[entry.status as keyof typeof COLORS]}
                    />
                  ))}
                </Bar>

                <Bar dataKey="amount" name="Amount (€)">
                  {statusChartData.map((entry, index) => (
                    <Cell
                      key={`amount-${index}`}
                      fill={COLORS[entry.status as keyof typeof COLORS]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentsReport;
