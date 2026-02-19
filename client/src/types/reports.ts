import type { BookingStatus } from "./booking.types";

export interface RevenueStats {
  bookings: number;
  revenue: string;
}

export interface AllTimeStats extends RevenueStats {
  properties: number;
}

export interface PendingActions {
  pending_bookings: number;
  pending_payments: number;
}

export interface RecentBooking {
  id: number;
  booking_reference: string;
  property_name: string;
  guest_name: string;
  check_in: string;
  total_amount: string;
  status: BookingStatus;
  created_at: string;
}

export interface DashboardResponse {
  today: RevenueStats;
  this_month: RevenueStats;
  all_time: AllTimeStats;
  pending_actions: PendingActions;
  recent_bookings: RecentBooking[];
}
