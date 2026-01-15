import { useEffect, useState } from "react";
import Calendar from "react-calendar";

interface BookedDates {
  check_in: string;
  check_out: string;
}

export default function Availability({
  bookedRanges,
}: {
  bookedRanges: BookedDates[];
}) {
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [currentDate] = useState(new Date());

  // Expand a range into individual days
  const expandedBookedDates = (check_in: string, check_out: string): Date[] => {
    const checkinDate = new Date(check_in);
    const checkoutDate = new Date(check_out);
    const dates: Date[] = [];

    let current = new Date(checkinDate);
    while (current <= checkoutDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  // Expand all ranges on mount/update
  useEffect(() => {
    const expanded = bookedRanges.flatMap((range) =>
      expandedBookedDates(range.check_in, range.check_out)
    );
    setBookedDates(expanded);
  }, [bookedRanges]);

  // Check if a day is booked
  const isBooked = (day: Date) =>
    bookedDates.some((b) => b.toDateString() === day.toDateString());

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6 justify-center flex-wrap">
        <div className="flex items-center gap-2">
          <div className="booked-date">01</div>
          <div className="w-4 h-4 rounded bg-primary"></div>
          <span className="text-sm text-muted-foreground">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="available-date">01</div>
          <div className="w-4 h-4 rounded bg-secondary border border-border"></div>
          <span className="text-sm text-muted-foreground">Available</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row gap-4 justify-between">
        {/* Current Month */}
        <div className="w-full sm:w-full md:w-1/2 lg:w-1/2">
          <h2 className="text-center text-lg font-semibold mb-2">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>

          <Calendar
            value={currentDate}
            defaultView="month"
            tileDisabled={({ date }) => isBooked(date)}
            tileClassName={({ date }) =>
              isBooked(date) ? "booked-date" : "available-date"
            }
            activeStartDate={
              new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
            }
            tileContent={() => null}
            showNavigation={false}
          />
        </div>

        {/* Next Month */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-center text-lg font-semibold mb-2">
            {new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              1
            ).toLocaleString("default", { month: "long", year: "numeric" })}
          </h2>

          <Calendar
            value={currentDate}
            defaultView="month"
            tileDisabled={({ date }) => isBooked(date)}
            tileClassName={({ date }) =>
              isBooked(date) ? "booked-date" : "available-date"
            }
            tileContent={() => null}
            activeStartDate={
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
            }
            showNavigation={false}
          />
        </div>
      </div>
    </div>
  );
}
