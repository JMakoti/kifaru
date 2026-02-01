import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
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
} from "date-fns";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (start: Date | null, end: Date | null) => void;
}

export function DateRangePicker({
  startDate,
  endDate,
  onDateChange,
}: DateRangePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selecting, setSelecting] = useState<"start" | "end">("start");

  const nextMonth = addMonths(currentMonth, 1);

  const handleDateClick = (date: Date) => {
    if (selecting === "start") {
      onDateChange(date, null);
      setSelecting("end");
    } else {
      if (startDate && isBefore(date, startDate)) {
        onDateChange(date, null);
        setSelecting("end");
      } else {
        onDateChange(startDate, date);
        setSelecting("start");
      }
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
            const isCurrentMonth = isSameMonth(day, month);
            const isPast = isBefore(day, today) && !isToday(day);
            const isStart = startDate && isSameDay(day, startDate);
            const isEnd = endDate && isSameDay(day, endDate);
            const isInRange =
              startDate &&
              endDate &&
              isAfter(day, startDate) &&
              isBefore(day, endDate);
            const isDisabled = !isCurrentMonth || isPast;

            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => !isDisabled && handleDateClick(day)}
                disabled={isDisabled}
                className={cn(
                  "h-9 w-9 rounded-lg text-sm transition-colors",

                  // normal
                  "text-foreground hover:bg-accent hover:text-accent-foreground",

                  // disabled
                  isDisabled &&
                    "text-muted-foreground opacity-40 hover:bg-transparent cursor-not-allowed",

                  // start / end
                  isStart &&
                    "bg-primary text-primary-foreground rounded-l-lg rounded-r-none",
                  isEnd &&
                    "bg-primary text-primary-foreground rounded-r-lg rounded-l-none",

                  // in range
                  isInRange &&
                    "bg-primary/15 text-foreground rounded-none",

                  // today
                  isToday(day) &&
                    !isStart &&
                    !isEnd &&
                    "ring-1 ring-primary",
                )}
              >
                {format(day, "d")}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-card border border-border rounded-xl">
        {renderCalendar(currentMonth, true, false)}
        {renderCalendar(nextMonth, false, true)}
      </div>
    </div>
  );
}
