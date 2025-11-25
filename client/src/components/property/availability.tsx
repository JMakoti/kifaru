// export default function Availability() {
//     const isBooked = (day: Date) =>
//     bookedDates.some((b) => b.toDateString() === day.toDateString());
//   return (
//     <div className="flex gap-4 justify-between">
//       {/* Current Month Calendar */}
//       <div className="w-1/2">
//         <h2 className="text-center text-lg font-semibold mb-2">
//           {date.toLocaleString("default", {
//             month: "long",
//             year: "numeric",
//           })}
//         </h2>
//         <Calendar
//           value={date}
//           defaultView="month"
//           tileDisabled={({ date }) => isBooked(date)}
//           tileClassName={({ date }) =>
//             isBooked(date) ? "booked-date" : "available-date"
//           }
//           activeStartDate={new Date(date.getFullYear(), date.getMonth(), 1)}
//           showNavigation={false}
//         />
//       </div>

//       {/* Next Month Calendar */}
//       <div className="w-1/2">
//         <h2 className="text-center text-lg font-semibold mb-2">
//           {new Date(date.getFullYear(), date.getMonth() + 1, 1).toLocaleString(
//             "default",
//             {
//               month: "long",
//               year: "numeric",
//             }
//           )}
//         </h2>
//         <Calendar
//           value={date}
//           defaultView="month"
//           tileDisabled={({ date }) => isBooked(date)}
//           tileClassName={({ date }) =>
//             isBooked(date) ? "booked-date" : "available-date"
//           }
//           activeStartDate={new Date(date.getFullYear(), date.getMonth() + 1, 1)}
//           showNavigation={false}
//         />
//       </div>
//     </div>
//   );
// }
