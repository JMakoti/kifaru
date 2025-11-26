import { Link } from "react-router";
import { Button } from "../ui/button";
import { CalendarCheck } from "lucide-react";

export default function Booking({
  price,
  location,
  country,
  status,
}: {
  location: String;
  price: String;
  country: String;
  status: String;
}) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white border border-gray-200 rounded-lg shadow p-6 sticky top-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">
            Ksh. {price}
            <span className="text-gray-600 text-base"> per Day</span>
          </h3>

          <div className="mb-6 text-sm text-gray-600">
            <div>
              {location}, {country}
            </div>
          </div>

          <Button
            asChild
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mb-3"
          >
            <Link to="/contact">
              <CalendarCheck className="mr-2 w-5 h-5" />
              Book Now
            </Link>
          </Button>

          <p className="text-xs text-gray-500 mt-3">
            Secure booking process • Instant confirmation
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Status</span>
            <span className={"text-green-600"}>{status}</span>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Need help?{" "}
          <a href="#" className="text-indigo-600 hover:text-indigo-800">
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
}
