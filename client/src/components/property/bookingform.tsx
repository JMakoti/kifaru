import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Toaster, toast } from "sonner";
import { CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router";

export default function BookingForm({
  price,
  onPriceChange,
}: {
  price: String;
  onPriceChange: (data: { nights: number; total: number }) => void;
}) {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [guests, setGuests] = useState<string>("");

  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);

      const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

      if (diff > 0) {
        const totalAmount = diff * Number(price);

        // Send values to parent Booking component
        onPriceChange({ nights: diff, total: totalAmount });
        return;
      }
    }
    onPriceChange({ nights: 0, total: 0 });
  }, [checkIn, checkOut, price]);

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCheckIn(value);

    if (checkOut && checkOut < value) {
      setCheckOut("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!guests || Number(guests) <= 0) {
      toast.error("Please enter the number of guests.");
      return;
    }

    if (!checkIn || !checkOut) {
      toast.warning("Please select both check-in and check-out dates.");
      return;
    }

    if (checkOut < checkIn) {
      toast.error("Check-Out date cannot be earlier than Check-In.");
      return;
    }

    const bookingData = {
      check_in: checkIn,
      check_out: checkOut,
      guests: Number(guests),
    };

    navigate("/payment", { state: bookingData });
    toast.success(
      "Reservation Completed , Make payments to Finalize the Booking"
    );
  };

  return (
    <>
      <Toaster position="bottom-right" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* CHECK-IN */}
        <div className="space-y-2">
          <label
            htmlFor="checkin"
            className="block text-left text-sm font-medium text-foreground"
          >
            Check In *
          </label>
          <Input
            id="checkin"
            type="date"
            min={today}
            value={checkIn}
            onChange={handleCheckInChange}
          />
        </div>

        {/* CHECK-OUT */}
        <div className="space-y-2">
          <label
            htmlFor="checkout"
            className="text-sm block text-left font-medium text-foreground"
          >
            Check Out *
          </label>
          <Input
            id="checkout"
            type="date"
            min={checkIn || today}
            disabled={!checkIn}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        {/* GUESTS */}
        <div className="space-y-2">
          <label
            htmlFor="guests"
            className="block text-left text-sm font-medium text-foreground"
          >
            Guests
          </label>
          <Input
            id="guests"
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <Button
          size="lg"
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mb-3"
        >
          <CalendarCheck className="mr-2 w-5 h-5" />
          Book Now
        </Button>
      </form>
    </>
  );
}
