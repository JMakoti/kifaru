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
import { useLocation } from "react-router";

interface StepperProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
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
  const { name } = location.state as { name: string };
  /* Guest Details */
  const [guestData, setGuestData] = useState({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
  });

  /* Stay Details */
  const [destination] = useState(name);
  const [accommodationType, setAccommodationType] = useState("");
  const [guestType, setGuestType] = useState("");
  const [stayType, setStayType] = useState("");

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  /* Submit */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      accommodation_type: accommodationType,
      guest_type: guestType,
      stay_type: stayType,
      check_in: checkIn?.toISOString().split("T")[0],
      check_out: checkOut?.toISOString().split("T")[0],
      number_of_adults: adults,
      number_of_children: children,
      number_of_guests: adults + children,
      destination,
      guest: guestData,
    };

    console.log("Booking Payload:", payload);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Complete Your Booking
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Fill in your details and choose your perfect stay for an
              unforgettable experience
            </p>
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
                      <CardDescription>Who will be staying?</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative w-full">
                    <Input
                      placeholder="Full Name"
                      value={guestData.fullName}
                      onChange={(e) =>
                        setGuestData({ ...guestData, fullName: e.target.value })
                      }
                      required
                      className="pl-10 pr-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                    <User2Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                  <div className="relative w-full">
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={guestData.email}
                      onChange={(e) =>
                        setGuestData({ ...guestData, email: e.target.value })
                      }
                      required
                      className="pl-10 pr-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>

                  <div className="relative w-full">
                    <Input
                      placeholder="ID / Passport Number"
                      value={guestData.idNumber}
                      onChange={(e) =>
                        setGuestData({ ...guestData, idNumber: e.target.value })
                      }
                      className="pl-10 pr-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                    <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>

                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <div className="px-3 border-r flex items-center gap-1">
                      {/* <span className="text-xs font-semibold">+254</span> */}
                      <Phone className="w-3 h-3" />
                    </div>
                    <input
                      className="flex-1 px-3 py-2 outline-none"
                      placeholder="Phone Number"
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
                <CardHeader className="border-b border-border bg-muted/50 rounded-t-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Stay Details</CardTitle>
                      <CardDescription>Where and when?</CardDescription>
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

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <select
                      className="border rounded-lg px-3 py-2"
                      value={accommodationType}
                      onChange={(e) => setAccommodationType(e.target.value)}
                      required
                    >
                      <option value="">Accommodation</option>
                      <option value="full_apartment">Full Apartment</option>
                      <option value="master_bedroom">Master Bedroom</option>
                      <option value="single_room">Single Room</option>
                    </select>

                    <select
                      className="border rounded-lg px-3 py-2"
                      value={guestType}
                      onChange={(e) => setGuestType(e.target.value)}
                      required
                    >
                      <option value="">Guest Type</option>
                      <option value="international">International</option>
                      <option value="local">Local</option>
                    </select>

                    <select
                      className="border rounded-lg px-3 py-2"
                      value={stayType}
                      onChange={(e) => setStayType(e.target.value)}
                      required
                    >
                      <option value="">Stay Type</option>
                      <option value="short_term">Short Term</option>
                      <option value="long_term">Long Term</option>
                    </select>
                  </div>

                  <DateRangePicker
                    startDate={checkIn}
                    endDate={checkOut}
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
                      max={50}
                      onChange={setAdults}
                    />
                    <Stepper
                      label="Children"
                      value={children}
                      min={0}
                      max={50}
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
                className="gap-2 px-10 shadow-lg shadow-primary/20 cursor pointer"
              >
                Proceed to Payment
                {/* navigate( "payment", { state: bookingData }); */}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
