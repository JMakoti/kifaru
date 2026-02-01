import { Button } from "../../../../components/ui/button";
import { CalendarCheck } from "lucide-react";
export default function BookingRequest() {
  return (
    <>
      {/* SUBMIT BUTTON */}
      <Button
        size="lg"
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mb-3 cursor-pointer"
      >
        <CalendarCheck className="mr-2 w-5 h-5" />
        Request Booking
      </Button>
    </>
  );
}
