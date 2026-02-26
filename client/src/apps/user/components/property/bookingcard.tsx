// import type { Contact } from "@/types/property";
// import BookingRequest from "./bookingrequest";
// import * as LucideIcons from "lucide-react";
// import { useNavigate } from "react-router";

// interface BookingProps {
//   location: string;
//   country: string;
//   name: string;
//   id: number;
//   max_guests: number | null;
//   min_nights: number;
//   slug: string;
//   propertyContacts: Contact[];
// }

// export default function BookingCard({
//   location,
//   country,
//   name,
//   slug,
//   id,
//   max_guests,
//   min_nights,
//   propertyContacts,
// }: BookingProps & { slug: string }) {
//   const navigate = useNavigate();

//   const handleBookingClick = () => {
//     navigate(`/property/${slug}/booking`, {
//       state: { id, name, max_guests, min_nights, slug },
//     });
//   };

//   return (
//     <div className="lg:col-span-1">
//       {/* Booking Sidebar */}
//       <div className="bg-card border border-border rounded-lg shadow p-6 sticky top-6 space-y-6">
//         {/* Property Info */}
//         <div className="text-center space-y-2">
//           <h3 className="text-xl font-bold text-foreground">{name}</h3>
//           <p className="text-sm text-foreground">
//             {location}, {country}
//           </p>
//         </div>

//         {/* Booking Request Button */}
//         <div onClick={handleBookingClick} className="cursor-pointer">
//           <BookingRequest />
//         </div>

//         {/* Contact Person Section */}
//         {propertyContacts.length > 0 && (
//           <div>
//             <h5 className="text-md font-semibold mb-3 text-foreground">
//               Contact Person
//             </h5>

//             <div className="flex flex-col gap-3">
//               {propertyContacts.map((contact, i) => (
//                 <div
//                   key={i}
//                   className="flex flex-col gap-2 p-3 rounded-xl bg-secondary/20
//                              hover:bg-secondary/30 transition-all"
//                 >
//                   {/* Header */}
//                   <div className="flex items-center gap-3">
//                     <div
//                       className="w-10 h-10 rounded-full
//                                  bg-gradient-to-br from-primary/80 to-primary/40
//                                  flex items-center justify-center
//                                  text-white font-semibold text-base"
//                     >
//                       {contact.name.charAt(0)}
//                     </div>
//                     <div className="flex flex-col">
//                       <h4 className="text-sm font-semibold text-foreground">
//                         {contact.name}
//                       </h4>
//                       <p className="text-xs text-muted-foreground">
//                         {contact.role}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Contact info */}
//                   <div className="flex flex-col gap-1 text-xs">
//                     {contact.email && (
//                       <a
//                         href={`mailto:${contact.email}`}
//                         className="flex items-center gap-1 text-muted-foreground hover:text-primary transition"
//                       >
//                         <LucideIcons.Mail className="w-3 h-3" />
//                         {contact.email}
//                       </a>
//                     )}
//                     {contact.phone && (
//                       <a
//                         href={`tel:${contact.phone}`}
//                         className="flex items-center gap-1 text-muted-foreground hover:text-primary transition"
//                       >
//                         <LucideIcons.Phone className="w-3 h-3" />
//                         {contact.phone}
//                       </a>
//                     )}
//                     {contact.whatsapp && (
//                       <a
//                         href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center gap-1 text-green-600 hover:text-green-700 transition"
//                       >
//                         <LucideIcons.MessageCircle className="w-3 h-3" />
//                         WhatsApp
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Footer Note */}
//         <p className="text-xs text-center text-muted-foreground mt-4">
//           Secure booking process • Instant confirmation
//         </p>
//       </div>
//     </div>
//   );
// }
