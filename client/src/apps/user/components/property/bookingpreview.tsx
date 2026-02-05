"use client";

import { useLocation, useNavigate } from "react-router";
import { format, parseISO } from "date-fns";
import {
  MapPin,
  Clock,
  ArrowLeft,
  ShieldCheck,
  Users,
  Moon,
  Loader2,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCreateBooking } from "@/services/booking.service";
import type { BookingPayload } from "@/types/booking.types";
import type { AccommodationType } from "@/types/property";

interface BookingState {
  property_id: number;
  property_name: string;
  accommodation_type: string;
  stay_type: string;
  check_in: string;
  check_out: string;
  number_of_adults: number;
  number_of_children: number;
  destination: string;
  slug: string;
  guest: {
    fullName: string;
    email: string;
    phone: string;
    idNumber: string;
  };
  pricing: {
    total_amount: number;
    total_nights: number;
    currency: string;
  };
}

export default function BookingPreviewPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state as BookingState;

  // Initialize Mutation
  const createBookingMutation = useCreateBooking();

  if (!booking) {
    return (
      <div className="p-20 text-center flex flex-col items-center gap-4">
        <p className="text-muted-foreground">No booking details found.</p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }

  const handleConfirmBooking = () => {
    // Apply the type here to fix the "unused" and "any" errors
    const payload: BookingPayload = {
      property: booking.property_id,
      accommodation_type: booking.accommodation_type as AccommodationType,
      check_in: booking.check_in,
      check_out: booking.check_out,
      full_name: booking.guest.fullName,
      email: booking.guest.email,
      phone: booking.guest.phone,
      id_passport_number: booking.guest.idNumber,
      number_of_adults: booking.number_of_adults,
      number_of_children: booking.number_of_children,
      number_of_guests: booking.number_of_adults + booking.number_of_children,
      dog_included: false,
      jacuzzi_reservation: false,
      special_requests: "",
    };
    
    createBookingMutation.mutate(payload, {
      onSuccess: () => {
        navigate(`/property/${booking.slug}/payment`);
      },

      onError: (error) => {
        console.error("Booking failed:", error.message);
      },
    });
  };

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Edit Selection
          </button>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            Secure Confirmation
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Column - Guest Info (1/4) */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl bg-card border border-border p-6 shadow-sm">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="w-20 h-20 ring-4 ring-primary/5 mb-4">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                    {booking.guest.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-bold">{booking.guest.fullName}</h2>
                <p className="text-xs text-muted-foreground">Primary Guest</p>
              </div>

              <div className="space-y-4 border-t pt-6">
                <SidebarItem label="Email" value={booking.guest.email} />
                <SidebarItem label="Phone" value={booking.guest.phone} />
                <SidebarItem label="ID Number" value={booking.guest.idNumber} />
              </div>
            </div>
          </aside>

          {/* Right Column - Stay Details (3/4) */}
          <main className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden flex flex-col">
              <div className="p-8 space-y-8 flex-1">
                {/* Property & Type */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                        Property
                      </p>
                      <h3 className="text-2xl font-black text-foreground">
                        {booking.destination}
                      </h3>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-bold uppercase">
                        {booking.accommodation_type.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground font-bold uppercase">
                        Stay Type
                      </p>
                      <p className="font-bold capitalize">
                        {booking.stay_type.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dates & Occupancy Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <DateBox
                    label="Check In"
                    date={booking.check_in}
                    sub={format(parseISO(booking.check_in), "EEEE")}
                  />
                  <DateBox
                    label="Check Out"
                    date={booking.check_out}
                    sub={format(parseISO(booking.check_out), "EEEE")}
                  />
                  <div className="bg-muted/30 p-5 rounded-2xl border border-border/50 flex flex-col justify-center">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase mb-2 flex items-center gap-2">
                      <Users className="w-3 h-3" /> Occupancy
                    </p>
                    <p className="font-bold text-sm">
                      {booking.number_of_adults} Adults,{" "}
                      {booking.number_of_children} Children
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Payment & Confirm Section */}
              <div className="bg-muted/50 border-t border-border p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-tight">
                      Total Duration
                    </p>
                    <div className="flex items-center gap-2 font-bold text-lg text-foreground">
                      <Moon className="w-4 h-4 text-primary" />
                      {booking.pricing.total_nights} Nights
                    </div>
                  </div>
                  <div className="w-px h-10 bg-border hidden md:block" />
                  <div className="flex flex-col">
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-tight">
                      Amount Payable
                    </p>
                    <p className="text-3xl font-black text-primary">
                      {/* {booking.pricing.currency}{" "} */}$
                      {booking.pricing.total_amount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full md:w-auto px-12 h-14 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                  onClick={handleConfirmBooking}
                  disabled={createBookingMutation.isPending}
                >
                  {createBookingMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    "Confirm & Book Now"
                  )}
                </Button>
              </div>
            </div>

            <p className="text-center text-[10px] text-muted-foreground">
              By confirming, you agree to the property house rules and
              cancellation policy.
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] text-muted-foreground font-bold uppercase">
        {label}
      </p>
      <p className="text-sm font-semibold truncate">{value}</p>
    </div>
  );
}

function DateBox({
  label,
  date,
  sub,
}: {
  label: string;
  date: string;
  sub: string;
}) {
  return (
    <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
      <p className="text-[10px] text-muted-foreground font-bold uppercase mb-2 flex items-center gap-2">
        <Clock className="w-3 h-3" /> {label}
      </p>
      <p className="text-lg font-bold font-mono">
        {format(parseISO(date), "dd MMM yyyy")}
      </p>
      <p className="text-xs text-primary font-medium">{sub}</p>
    </div>
  );
}
