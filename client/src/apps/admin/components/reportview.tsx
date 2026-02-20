import {
  CalendarDays,
  TrendingUp,
  Building2,
  Clock,
  CreditCard,
  Home,
  BookOpen,
} from "lucide-react";
import StatCard from "./reports/statcard";
import ReportCard from "./reports/reportcard";
import BookingsTable from "./reports/bookingtable";
import type { DashboardResponse } from "@/types/reports";

interface ReportViewProps {
  dashboard: DashboardResponse;
}

export default function ReportsView({ dashboard }: ReportViewProps) {
  if (!dashboard) return null;
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Reports
        </h1>
        <p className="mt-1 text-muted-foreground">Kifaru Retreat Report</p>
      </div>

      <main className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Today's Revenue"
            value={`€${Number(dashboard.today.revenue).toLocaleString()}`}
            subtitle={`${dashboard.today.bookings} bookings`}
            icon={CalendarDays}
          />
          <StatCard
            title="This Month"
            value={`€${Number(dashboard.this_month.revenue).toLocaleString()}`}
            subtitle={`${dashboard.this_month.bookings} bookings`}
            icon={TrendingUp}
            accent
          />
          <StatCard
            title="All Time Revenue"
            value={`€ ${Number(dashboard.all_time.revenue).toLocaleString()}`}
            subtitle={`${dashboard.all_time.properties} properties · ${dashboard.all_time.bookings} bookings`}
            icon={Building2}
          />
          <StatCard
            title="Pending Actions"
            value={
              dashboard.pending_actions.pending_bookings +
              dashboard.pending_actions.pending_payments
            }
            subtitle={`${dashboard.pending_actions.pending_bookings} bookings · ${dashboard.pending_actions.pending_payments} payments`}
            icon={Clock}
          />
        </div>

        {/* Report Cards */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Reports</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <ReportCard
              title="Properties Report"
              description="View all property performance & occupancy"
              icon={Home}
              href="/admin/reports/properties"
            />

            <ReportCard
              title="Bookings Report"
              description="Detailed booking analytics & trends"
              icon={BookOpen}
              href="/admin/reports/bookings"
            />
            <ReportCard
              title="Payments Report"
              description="Revenue breakdown & payment status"
              icon={CreditCard}
              href="/admin/reports/payments"
            />
          </div>
        </div>

        {/* Recent Bookings */}
        <BookingsTable bookings={dashboard.recent_bookings} />
      </main>
    </div>
  );
}
