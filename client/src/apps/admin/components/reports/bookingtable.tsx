import type { RecentBooking } from "@/types/reports";
import { format } from "date-fns";

const statusStyles: Record<string, string> = {
  confirmed: "bg-nature/10 text-nature",
  pending: "bg-chart-4/20 text-chart-1",
  cancelled: "bg-destructive/10 text-destructive",
};

const BookingsTable = ({ bookings }: { bookings: RecentBooking[] }) => (
  <div className="rounded-lg border bg-card overflow-hidden bg-card/50">
    <div className="p-5 border-b">
      <h2 className="text-lg font-semibold text-card-foreground">Recent Bookings</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Reference</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Property</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Guest</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Check-in</th>
            <th className="px-4 py-3 text-right font-medium text-muted-foreground">Amount</th>
            <th className="px-4 py-3 text-center font-medium text-muted-foreground">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.slice(0, 10).map((b) => (
            <tr key={b.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 font-medium">{b.booking_reference}</td>
              <td className="px-4 py-3 max-w-[200px] truncate">{b.property_name}</td>
              <td className="px-4 py-3">{b.guest_name}</td>
              <td className="px-4 py-3">{format(new Date(b.check_in), "MMM d, yyyy")}</td>
              <td className="px-4 py-3 text-right font-medium">€{Number(b.total_amount).toLocaleString()}</td>
              <td className="px-4 py-3 text-center">
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[b.status] || ""}`}>
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default BookingsTable;
