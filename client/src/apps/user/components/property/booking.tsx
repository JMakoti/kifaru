import { Link } from "react-router";
import BookingForm from "./bookingform";
import { useState } from "react";

export default function Booking({
  price,
  location,
  country,
}: {
  location: String;
  price: String;
  country: String;
  status: String;
}) {
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  return (
    <div className="lg:col-span-1">
      <div className="bg-white border border-gray-200 rounded-lg shadow p-6 sticky top-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">
            <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm text-gray-700">
              <div className="font-semibold">
                {nights === 0 ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold">Ksh. {price}</span>
                    <span className="text-gray-500 text-xs align-sub tracking-tight">
                      / Per Day
                    </span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold">
                      Ksh. {totalPrice.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-xs align-sub tracking-tight">
                      {nights > 0 && (
                        <p>
                          / {nights} Day {nights > 1 ? "s" : ""}
                        </p>
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </h3>

          <div className="mb-6 text-sm text-gray-600">
            <div>
              {location}, {country}
            </div>
          </div>

          {/* Divider */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-sm space-y-2"></div>
          <BookingForm
            price={price}
            onPriceChange={({ nights, total }) => {
              setNights(nights);
              setTotalPrice(total);
            }}
          />

          <p className="text-xs text-gray-500 mt-3">
            Secure booking process • Instant confirmation
          </p>
        </div>

        {/* <div className="mt-6 pt-4 border-t border-gray-200 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Status</span>
            <span className={"text-green-600"}>{status}</span>
          </div>
        </div> */}

        <div className="mt-6 text-center text-sm text-gray-500">
          Need help?{" "}
          <Link to="/contact" className="text-indigo-600 hover:text-indigo-800">
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
