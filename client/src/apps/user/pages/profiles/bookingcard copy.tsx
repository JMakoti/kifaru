// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Eye, Calendar, MapPin, Users } from "lucide-react";
// import type { Booking } from "@/types/booking.types";

// interface PropertyBookingProps {
//   booking: Booking;
// }

// export default function BookingCard({ booking }: PropertyBookingProps) {
//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr);
//     if (isNaN(date.getTime())) return "TBD";
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "2-digit",
//       year: "numeric",
//     });
//   };

//   const calculateNights = (start: string, end: string) => {
//     const d1 = new Date(start);
//     const d2 = new Date(end);
//     const diff = Math.abs(d2.getTime() - d1.getTime());
//     return Math.ceil(diff / (1000 * 60 * 60 * 24));
//   };

//   return (
//     <Card className="border border-border rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
//       <CardContent className="p-5 space-y-4">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
//               {booking.booking_reference}
//             </span>
//           </div>
//           <Badge
//             variant="outline"
//             className="capitalize px-3 py-1 bg-primary/5 text-primary border-primary/20"
//           >
//             {booking.accommodation_type?.replace("_", " ") || "Accommodation"}
//           </Badge>
//         </div>

//         {/* Property Info */}
//         <div className="bg-muted/30 rounded-xl p-4 space-y-3 border border-border/50">
//           <div className="flex items-center gap-2">
//             <MapPin className="w-4 h-4 text-primary" />
//             <span className="font-bold text-foreground">
//               {booking.property_name}
//             </span>
//           </div>

//           <div className="grid grid-cols-2 gap-4 text-sm">
//             <div className="space-y-1">
//               <p className="text-muted-foreground text-xs flex items-center gap-1">
//                 <Calendar className="w-3 h-3" /> Check-in
//               </p>
//               <p className="font-semibold">{formatDate(booking.check_in)}</p>
//             </div>

//             <div className="space-y-1">
//               <p className="text-muted-foreground text-xs flex items-center gap-1">
//                 <Calendar className="w-3 h-3" /> Check-out
//               </p>
//               <p className="font-semibold">{formatDate(booking.check_out)}</p>
//             </div>
//           </div>

//           <div className="flex items-center justify-between text-sm border-t border-border/60 pt-3">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-1 text-muted-foreground">
//                 <Users className="w-4 h-4" />
//                 <span className="text-foreground font-medium">
//                   {booking.number_of_guests}
//                 </span>
//               </div>
//               <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
//                 ({booking.number_of_adults}A / {booking.number_of_children}C)
//               </span>
//             </div>
//             <span className="text-primary font-semibold">
//               {calculateNights(booking.check_in, booking.check_out)} Night(s)
//             </span>
//           </div>
//         </div>

//         {/* Guest Summary (Brief) */}
//         <div className="flex items-center gap-2 px-1">
//           <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
//             {(booking.full_name || booking.property_name || "B").charAt(0)}
//           </div>
//           <div className="flex flex-col">
//             <span className="text-sm font-medium leading-none">
//               {booking.full_name}
//             </span>
//             <span className="text-[11px] text-muted-foreground">
//               {booking.email}
//             </span>
//           </div>
//         </div>

//         {/* Price & Action */}
//         <div className="flex items-center justify-between pt-2 border-t border-dashed">
//           <div>
//             <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
//               Total Amount
//             </p>
//             <p className="text-xl font-black text-foreground">
//               ${booking.total_amount?.toLocaleString() || "0.00"}
//             </p>
//           </div>
//           <Button size="sm" className="rounded-lg px-5">
//             <Eye className="w-4 h-4 mr-2" />
//             Details
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
