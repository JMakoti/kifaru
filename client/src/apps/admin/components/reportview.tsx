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

// const dashboardData = {
//   today: { bookings: 0, revenue: "0.00" },
//   this_month: { bookings: 13, revenue: "10492.00" },
//   all_time: { bookings: 13, revenue: "10492.00", properties: 7 },
//   pending_actions: { pending_bookings: 2, pending_payments: 2 },
//   recent_bookings: [
//     {
//       id: 14,
//       booking_reference: "#BK-2026-0014",
//       property_name: "Tech Bed Kifaru Brussels",
//       guest_name: "Shamayel Karani",
//       check_in: "2026-02-19",
//       total_amount: "200.00",
//       status: "confirmed",
//       created_at: "2026-02-13T20:30:26.873579Z",
//     },
//     {
//       id: 13,
//       booking_reference: "#BK-2026-0013",
//       property_name: "Close The Gap Hub Nyali",
//       guest_name: "Bright Chebor",
//       check_in: "2026-03-17",
//       total_amount: "450.00",
//       status: "confirmed",
//       created_at: "2026-02-13T06:29:09.468674Z",
//     },
//     {
//       id: 12,
//       booking_reference: "#BK-2026-0012",
//       property_name: "Tech Bed Kifaru Brussels",
//       guest_name: "Make Test",
//       check_in: "2026-03-02",
//       total_amount: "1320.00",
//       status: "confirmed",
//       created_at: "2026-02-13T06:11:27.598315Z",
//     },
//     {
//       id: 11,
//       booking_reference: "#BK-2026-0011",
//       property_name: "Kifaru Marble Inn Mombasa",
//       guest_name: "Man Keita",
//       check_in: "2026-03-15",
//       total_amount: "800.00",
//       status: "confirmed",
//       created_at: "2026-02-12T19:19:07.574936Z",
//     },
//     {
//       id: 10,
//       booking_reference: "#BK-2026-0010",
//       property_name: "Close The Gap Hub Nyali",
//       guest_name: "Bright Chebor",
//       check_in: "2026-02-21",
//       total_amount: "375.00",
//       status: "confirmed",
//       created_at: "2026-02-12T17:36:24.827984Z",
//     },
//     {
//       id: 9,
//       booking_reference: "#BK-2026-0009",
//       property_name: "Close The Gap Hub Nyali",
//       guest_name: "ManKeita",
//       check_in: "2026-03-09",
//       total_amount: "525.00",
//       status: "confirmed",
//       created_at: "2026-02-12T16:14:45.543543Z",
//     },
//     {
//       id: 8,
//       booking_reference: "#BK-2026-0008",
//       property_name: "Tech Bed Kifaru Brussels",
//       guest_name: "Bright Chebor",
//       check_in: "2026-02-12",
//       total_amount: "1000.00",
//       status: "confirmed",
//       created_at: "2026-02-12T15:41:32.461834Z",
//     },
//     {
//       id: 7,
//       booking_reference: "#BK-2026-0007",
//       property_name: "Ocean Kifaru Indean Ocean",
//       guest_name: "Bright Chebor",
//       check_in: "2026-02-12",
//       total_amount: "1200.00",
//       status: "cancelled",
//       created_at: "2026-02-12T10:38:10.077554Z",
//     },
//     {
//       id: 6,
//       booking_reference: "#BK-2026-0006",
//       property_name: "Ocean Kifaru North-Sea",
//       guest_name: "John Doe",
//       check_in: "2026-02-12",
//       total_amount: "1197.00",
//       status: "confirmed",
//       created_at: "2026-02-12T10:23:26.953105Z",
//     },
//     {
//       id: 5,
//       booking_reference: "#BK-2026-0005",
//       property_name: "Kifaru Marble Inn Mombasa",
//       guest_name: "Johsafe Mwamuye",
//       check_in: "2026-03-25",
//       total_amount: "500.00",
//       status: "pending",
//       created_at: "2026-02-12T09:55:04.549601Z",
//     },
//   ],
// };

// const d = dashboardData;

interface ReportViewProps {
  dashboard: DashboardResponse;
}

export default function ReportsView({ dashboard }: ReportViewProps) {
  if (!dashboard) return null;
  return (
    <div className="mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Reports
        </h1>
        <p className="mt-1 text-muted-foreground">Kifaru Retreat Report</p>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 space-y-6 sm:px-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Today's Revenue"
            value={`$${Number(dashboard.today.revenue).toLocaleString()}`}
            subtitle={`${dashboard.today.bookings} bookings`}
            icon={CalendarDays}
          />
          <StatCard
            title="This Month"
            value={`$${Number(dashboard.this_month.revenue).toLocaleString()}`}
            subtitle={`${dashboard.this_month.bookings} bookings`}
            icon={TrendingUp}
            accent
          />
          <StatCard
            title="All Time Revenue"
            value={`$${Number(dashboard.all_time.revenue).toLocaleString()}`}
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
            />
            <ReportCard
              title="Bookings Report"
              description="Detailed booking analytics & trends"
              icon={BookOpen}
            />
            <ReportCard
              title="Payments Report"
              description="Revenue breakdown & payment status"
              icon={CreditCard}
            />
          </div>
        </div>

        {/* Recent Bookings */}
        <BookingsTable bookings={dashboard.recent_bookings} />
      </main>
    </div>
  );
}
