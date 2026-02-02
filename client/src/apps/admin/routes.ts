import {
  BarChart2,
  Building2,
  Calendar,
  CreditCard,
  Home,
  Users,
} from "lucide-react";

export const menu = [
  { to: "/admin", label: "Dashboard", icon: Home },
  { to: "/admin/property", label: "Properties", icon: Building2 },
  { to: "/admin/bookings", label: "Bookings", icon: Calendar },
  { to: "/admin/payments", label: "Transactions", icon: CreditCard },
  { to: "/admin/guests", label: "Guests", icon: Users },
  { to: "/admin/reports", label: "Reports", icon: BarChart2 },
];
