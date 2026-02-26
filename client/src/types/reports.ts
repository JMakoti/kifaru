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

// PAYMENTS REPORT

type PaymentStatus = "completed" | "pending" | "failed";

export interface PaymentSummary {
  total_payments: number;
  completed_payments: number;
  pending_payments: number;
  failed_payments: number;
  completed_amount: string;
  pending_amount: string;
  failed_amount: string;
  success_rate: number;
  failure_rate: number;
}

export interface PaymentByStatus {
  payment_status: PaymentStatus;
  count: number;
  total_amount: number;
}

export interface PaymentByMethod {
  payment_method: string;
  count: number;
  total_amount: number;
}

export interface PaymentsData {
  summary: PaymentSummary;
  by_status: PaymentByStatus[];
  by_method: PaymentByMethod[];
}

// BOOKINGS REPORT
export interface BookingSummary {
  total_bookings: number;
  confirmed_bookings: number;
  pending_bookings: number;
  cancelled_bookings: number;
  completed_bookings: number;
  user_bookings: number;
  guest_bookings: number;
  total_revenue: string;
  confirmed_revenue: string;
  pending_revenue: string;
  avg_booking_value: string;
  avg_stay_duration: number;
  conversion_rate: number;
}

export interface BookingByStatus {
  status: string;
  count: number;
  revenue: number;
}

export interface BookingByProperty {
  property__id: number;
  property__name: string;
  property__location: string;
  booking_count: number;
  total_revenue: number;
  avg_booking_value: number;
  avg_stay: number;
}

export interface BookingByAccommodation {
  accommodation_type: string;
  count: number;
  revenue: number;
}

export interface DailyTrend {
  date: string;
  booking_count: number;
  revenue: number;
}

export interface BookingsData {
  summary: BookingSummary;
  by_status: BookingByStatus[];
  by_property: BookingByProperty[];
  by_accommodation_type: BookingByAccommodation[];
  daily_trend: DailyTrend[];
}

// PROPERTIES REPORT
export interface Property {
  property_id: number;
  property_name: string;
  location: string;
  total_bookings: number;
  confirmed_bookings: number;
  total_revenue: string;
  confirmed_revenue: string;
  avg_booking_value: string;
  avg_stay_duration: number;
  occupancy_rate_30days: number;
}

export interface PropertyData {
  properties: Property[];
  total_properties: number;
}

