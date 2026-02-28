import {
  BarChart2,
  Building2,
  Calendar,
  CreditCard,
  GalleryThumbnails,
  Home,
  ThumbsUp,
  Users,
} from "lucide-react";

export const menu = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/dashboard/property", label: "Properties", icon: Building2 },
  { to: "/dashboard/gallery", label: "Gallery", icon: GalleryThumbnails },
  { to: "/dashboard/bookings", label: "Bookings", icon: Calendar },
  { to: "/dashboard/payments", label: "Transactions", icon: CreditCard },
  { to: "/dashboard/reviews", label: "Reviews", icon: ThumbsUp },
  { to: "/dashboard/guests", label: "Guests", icon: Users },
  { to: "/dashboard/reports", label: "Reports", icon: BarChart2 },
];
