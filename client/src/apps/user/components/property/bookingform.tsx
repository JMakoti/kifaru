"use client";

import { useState } from "react";
import {
  User,
  MapPin,
  Search,
  ArrowRight,
  Minus,
  Plus,
  Mail,
  User2Icon,
  IdCard,
  Phone,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "./DateRangePicker";
import { useLocation, useNavigate } from "react-router";
import { usePropertyBookings } from "@/services/property.service";
import { useCalculateBookingPrice } from "@/services/booking.service";
import { ACCOMMODATION_TYPES, type AccommodationType } from "@/types/property";
import { useAuth } from "@/providers/useAuth";
import { format } from "date-fns";

interface StepperProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

interface ApiError {
  response?: {
    data?: {
      success: boolean;
      error_type: string;
      message: string;
      suggestion: string;
      details: {
        property_name: string;
        your_nights: number;
        your_stay_type: string;
      };
    };
  };
}

function Stepper({ label, value, min, max, onChange }: StepperProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <div className="flex-1 text-center">
          <span className="text-2xl font-bold">{value}</span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default function BookingForm() {
  const location = useLocation();
  const { user, isLoading: authLoading } = useAuth();

  const { id, slug, name, max_guests } = location.state as {
    id: number;
    name: string;
    max_guests: number | null;
    slug: string;
  };

  //guest data
  const [guestData, setGuestData] = useState({
    fullName: user
      ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
      : "",
    email: user?.email || "",
    phone: user?.phone_number || "",
    idNumber: "",
  });

  /* Stay Details */
  const [destination] = useState(name);
  const [accommodationType, setAccommodationType] = useState<
    AccommodationType | ""
  >("");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  /*Calendar Queries */
  const { data: bookingData } = usePropertyBookings(id);
  // Price Calculation Query
  const {
    data: pricing,
    isFetching: isCalculating,
    error: pricingError,
  } = useCalculateBookingPrice({
    property: id,
    check_in: checkIn ? format(checkIn, "yyyy-MM-dd") : "",
    check_out: checkOut ? format(checkOut, "yyyy-MM-dd") : "",
    accommodation_type: accommodationType as AccommodationType,
    number_of_guests: adults + children,
    phone: guestData.phone,
  });
  const navigate = useNavigate();

  /* Submit */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pricing) return;

    const payload = {
      property_id: id,
      property_name: name,
      accommodation_type: accommodationType,
      check_in: checkIn ? format(checkIn, "yyyy-MM-dd") : "",
      check_out: checkOut ? format(checkOut, "yyyy-MM-dd") : "",
      number_of_adults: adults,
      number_of_children: children,
      number_of_guests: adults + children,
      destination,
      guest: guestData,
      pricing: pricing,
      slug: slug,
    };

    navigate(`/property/${slug}/preview`, { state: payload });

    console.log("Booking Payload:", payload);
  };

  const safeMaxGuests = max_guests ?? 1;
  const apiErrorData = (pricingError as ApiError)?.response?.data;

  return (
    <div className="min-h-screen bg-background">
      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Complete Your Booking
            </h1>
            {authLoading ? (
              <p className="text-sm text-muted-foreground animate-pulse">
                Loading your profile...
              </p>
            ) : user ? (
              <p className="text-sm text-green-600 font-medium">
                Welcome back! We've pre-filled your details from your account.
              </p>
            ) : (
              <p className="text-muted-foreground text-lg max-w-2xl">
                Fill in your details for an unforgettable experience.
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Guest Details */}
              <Card>
                <CardHeader className="border-b border-border bg-muted/50 rounded-t-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Guest Details</CardTitle>
                      <CardDescription className="text-md">
                        Who will be staying?
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Payment & Cancellation Info */}
                  <div className="p-4 rounded-lg border border-border bg-muted/40 space-y-4">
                    {/* Payment Methods */}
                    <div>
                      <h4 className="text-md font-semibold text-foreground mb-2">
                        Payment Methods
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-sm rounded-full bg-background border border-border">
                          Card
                        </span>
                        <span className="px-3 py-1 text-sm rounded-full bg-background border border-border">
                          PayPal
                        </span>
                        <span className="px-3 py-1 text-sm rounded-full bg-background border border-border">
                          IBAN Transfer
                        </span>
                        <span className="px-3 py-1 text-sm rounded-full bg-background border border-border">
                          M-Pesa
                        </span>
                      </div>
                    </div>

                    {/* Cancellation Policy */}
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        Cancellation Policy
                      </h4>
                      <ul className="text-md text-muted-foreground space-y-1 list-disc list-inside">
                        <li>50% prepayment required</li>
                        <li>Free cancellation up to 30 days before arrival</li>
                        <li>Special terms available for returning guests</li>
                      </ul>
                    </div>
                  </div>

                  {/* Guest Inputs */}
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <div className="px-4 border-r border-border flex items-center">
                      <User2Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <Input
                      placeholder="Full Name"
                      value={guestData.fullName}
                      onChange={(e) =>
                        setGuestData({ ...guestData, fullName: e.target.value })
                      }
                      required
                      className="flex-1 h-10 px-5 bg-card text-foreground"
                    />
                  </div>

                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <div className="px-4 border-r border-border flex items-center">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={guestData.email}
                      onChange={(e) =>
                        setGuestData({ ...guestData, email: e.target.value })
                      }
                      required
                      className="flex-1 h-10 px-5 bg-card text-foreground"
                    />
                  </div>

                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <div className="px-4 border-r border-border flex items-center">
                      <IdCard className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <Input
                      placeholder="ID / Passport Number"
                      value={guestData.idNumber}
                      onChange={(e) =>
                        setGuestData({ ...guestData, idNumber: e.target.value })
                      }
                      className="flex-1 h-10 px-5 bg-card text-foreground"
                    />
                  </div>

                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <div className="px-4 border-r border-border flex items-center">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                    </div>

                    <Input
                      className="flex-1 h-10 px-5 bg-card text-foreground"
                      placeholder="Phone Number e.g. 254712345678"
                      value={guestData.phone}
                      onChange={(e) =>
                        setGuestData({ ...guestData, phone: e.target.value })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* BOOKING DETAILS */}
              <Card>
                {pricingError && (
                  <div className="mx-6 mt-4 p-4 rounded-lg border border-amber-500/50 bg-amber-500/10 text-amber-900 dark:text-amber-200 flex gap-3 items-start animate-in fade-in slide-in-from-top-2">
                    <div className="w-13 h-13 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-md leading-none">
                        Stay Duration Policy
                      </p>
                      <p className="text-md leading-relaxed">
                        {apiErrorData?.message ||
                          "Something went wrong with your stay booking."}
                      </p>

                      {apiErrorData?.suggestion && (
                        <div className="mt-2 flex items-center gap-2 text-md font-medium text-amber-700 dark:text-amber-300">
                          <span className="bg-amber-500/20 px-1.5 py-0.5 rounded uppercase text-md">
                            Tip
                          </span>
                          {apiErrorData.suggestion}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <CardHeader className="border-b border-border bg-muted/50 rounded-t-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Stay Details</CardTitle>
                      <CardDescription className="text-md">
                        Where and when?
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      className="w-full border rounded-lg pl-10 pr-3 py-2 bg-gray-100 cursor-not-allowed text-foreground"
                      placeholder="Destination / Property"
                      value={name}
                      disabled
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <select
                      className="w-full border rounded-lg px-3 py-2 bg-background"
                      value={accommodationType}
                      onChange={(e) =>
                        setAccommodationType(
                          e.target.value as AccommodationType,
                        )
                      }
                      required
                    >
                      <option value="">Accommodation</option>
                      {ACCOMMODATION_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <DateRangePicker
                    startDate={checkIn}
                    endDate={checkOut}
                    bookedEvents={bookingData?.events || []}
                    onDateChange={(start, end) => {
                      setCheckIn(start);
                      setCheckOut(end);
                    }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Stepper
                      label="Adults"
                      value={adults}
                      min={1}
                      max={Math.max(1, safeMaxGuests - children)}
                      onChange={setAdults}
                    />

                    <Stepper
                      label="Children"
                      value={children}
                      min={0}
                      max={Math.max(0, safeMaxGuests - adults)}
                      onChange={setChildren}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Submit Section */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-card rounded-xl border border-border shadow-sm">
              <div>
                <p className="text-foreground font-medium">Ready to proceed?</p>
                <p className="text-sm text-muted-foreground">
                  Review your details and continue to payment
                </p>
              </div>
              <Button
                type="submit"
                size="lg"
                className="gap-2 px-10 shadow-lg shadow-primary/20 cursor-pointer min-w-[200px]"
                onClick={handleSubmit}
                disabled={isCalculating || !pricing}
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    Preview Your Booking
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
