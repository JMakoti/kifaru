import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  isToday,
  startOfWeek,
  endOfWeek,
  parseISO,
  startOfDay,
} from "date-fns";
import type { BookingEvent } from "@/types/property";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  bookedEvents: BookingEvent[];
  onDateChange: (start: Date | null, end: Date | null) => void;
}

export function DateRangePicker({
  startDate,
  endDate,
  bookedEvents,
  onDateChange,
}: DateRangePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const [bookingError, setBookingError] = useState<string>("");

  const nextMonth = addMonths(currentMonth, 1);

  // Filter only active/blocking bookings (confirmed and pending, exclude cancelled)
  const activeBookings = bookedEvents.filter(
    (event) => event.status !== "cancelled" && event.type === "booking",
  );

  // Check if a specific date is booked
  const isDateBooked = (day: Date) => {
    return activeBookings.some((event) => {
      if (!event.start_date || !event.end_date) return false;
      const eventStart = startOfDay(parseISO(event.start_date));
      const eventEnd = startOfDay(parseISO(event.end_date));
      // Exclude end date - checkout date available for next guest
      return (
        (isAfter(day, eventStart) || isSameDay(day, eventStart)) &&
        isBefore(day, eventEnd)
      );
    });
  };

  // Get booking info for tooltip/error messages
  const getBookingInfo = (day: Date) => {
    return activeBookings.find((event) => {
      if (!event.start_date || !event.end_date) return false;
      const eventStart = startOfDay(parseISO(event.start_date));
      const eventEnd = startOfDay(parseISO(event.end_date));
      return (
        (isAfter(day, eventStart) || isSameDay(day, eventStart)) &&
        isBefore(day, eventEnd)
      );
    });
  };

  // Improved overlap detection
  const hasBookingInRange = (
    rangeStart: Date,
    rangeEnd: Date,
  ): BookingEvent | null => {
    const checkStart = startOfDay(rangeStart);
    const checkEnd = startOfDay(rangeEnd);

    return (
      activeBookings.find((event) => {
        if (!event.start_date || !event.end_date) return false;
        const eventStart = startOfDay(parseISO(event.start_date));
        const eventEnd = startOfDay(parseISO(event.end_date));

        // Check if any part of the selected range overlaps with booking
        // Exclude end date from condition check
        return isBefore(checkStart, eventEnd) && isAfter(checkEnd, eventStart);
      }) || null
    );
  };

  const handleDateClick = (date: Date) => {
    const normalizedDate = startOfDay(date);
    setBookingError("");

    if (selecting === "start") {
      // Check if start date itself is booked
      if (isDateBooked(normalizedDate)) {
        const booking = getBookingInfo(normalizedDate);
        setBookingError(
          `This date is booked by ${booking?.guest_name || "another guest"}`,
        );
        return;
      }
      onDateChange(normalizedDate, null);
      setSelecting("end");
    } else {
      if (!startDate) return;

      // Ensure end date is after start date
      if (isBefore(normalizedDate, startDate)) {
        onDateChange(normalizedDate, null);
        setSelecting("end");
        return;
      }

      // Check if selected range contains any bookings
      const conflictingBooking = hasBookingInRange(startDate, normalizedDate);
      if (conflictingBooking) {
        setBookingError(
          `Booking conflict: ${format(
            parseISO(conflictingBooking.start_date),
            "MMM d",
          )} - ${format(parseISO(conflictingBooking.end_date), "MMM d")} is already booked`,
        );
        return;
      }

      onDateChange(startDate, normalizedDate);
      setSelecting("start");
    }
  };

  const renderCalendar = (
    month: Date,
    showPrevNav: boolean,
    showNextNav: boolean,
  ) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    const today = new Date();

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <button
            type="button"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className={cn(
              "p-1 rounded-lg hover:bg-accent transition-colors",
              !showPrevNav && "invisible",
            )}
          >
            <ChevronLeft className="size-5 text-muted-foreground" />
          </button>
          <span className="font-semibold text-sm">
            {format(month, "MMMM yyyy")}
          </span>
          <button
            type="button"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className={cn(
              "p-1 rounded-lg hover:bg-accent transition-colors",
              !showNextNav && "invisible",
            )}
          >
            <ChevronRight className="size-5 text-muted-foreground" />
          </button>
        </div>

        <div className="grid grid-cols-7 text-center text-xs font-semibold text-muted-foreground mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <span key={day} className="py-2">
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const isBooked = isDateBooked(day);
            const isCurrentMonth = isSameMonth(day, month);
            const isPast = isBefore(day, today) && !isToday(day);
            const isStart = startDate && isSameDay(day, startDate);
            const isEnd = endDate && isSameDay(day, endDate);
            const isInRange =
              startDate &&
              endDate &&
              isAfter(day, startDate) &&
              isBefore(day, endDate);

            const isDisabled = !isCurrentMonth || isPast || isBooked;

            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => !isDisabled && handleDateClick(day)}
                disabled={isDisabled}
                title={
                  isBooked && isCurrentMonth
                    ? `Booked: ${getBookingInfo(day)?.guest_name || "Guest"}`
                    : undefined
                }
                className={cn(
                  "relative h-9 w-9 rounded-lg text-sm transition-colors",

                  // normal
                  "text-foreground hover:bg-accent hover:text-accent-foreground",

                  isBooked &&
                    "bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 opacity-75 cursor-not-allowed border border-red-300 dark:border-red-700",

                  // disabled
                  !isCurrentMonth && "opacity-0 pointer-events-none",
                  isPast &&
                    "text-muted-foreground opacity-40 cursor-not-allowed",

                  // start / end
                  isStart &&
                    "bg-primary text-primary-foreground rounded-l-lg rounded-r-none",
                  isEnd &&
                    "bg-primary text-primary-foreground rounded-r-lg rounded-l-none",

                  // in range
                  isInRange && "bg-primary/15 text-foreground rounded-none",

                  // today
                  isToday(day) && !isStart && !isEnd && "ring-1 ring-primary",
                )}
              >
                {format(day, "d")}
                {isBooked && isCurrentMonth && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Calendar className="size-5 text-primary" />
        When is your stay?
      </h3>

      {/* Date Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div
          className={cn(
            "p-4 rounded-xl border-2 cursor-pointer transition-all",
            selecting === "start"
              ? "border-primary bg-primary/10"
              : "border-border bg-muted/40",
          )}
          onClick={() => setSelecting("start")}
        >
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Check in
          </p>
          <p className="text-sm font-semibold">
            {startDate ? format(startDate, "MMM d, yyyy") : "Select date"}
          </p>
        </div>
        <div
          className={cn(
            "p-4 rounded-xl border-2 cursor-pointer transition-all",
            selecting === "end"
              ? "border-primary bg-primary/10"
              : "border-border bg-muted/40",
          )}
          onClick={() => setSelecting("end")}
        >
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Check out
          </p>
          <p className="text-sm font-semibold">
            {endDate ? format(endDate, "MMM d, yyyy") : "Select date"}
          </p>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-3">
        {bookingError && (
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{bookingError}</span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-card border border-border rounded-xl">
          {renderCalendar(currentMonth, true, false)}
          {renderCalendar(nextMonth, false, true)}
        </div>
      </div>
    </div>
  );
}
