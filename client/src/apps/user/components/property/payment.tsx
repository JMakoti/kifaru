import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  CreditCard,
  Building2,
  Smartphone,
  User,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import Confirmbooking from "./confirmbooking";

const user = [
  {
    id: "1234",
    fullname: "Test Person",
    avatar: "",
    email: "test@gmail.com",
    phone: "254789675432",
  },
];

const Overview = [
  {
    dayz: "10 days",
    amount: "$ 4,500",
  },
];

export default function Payment() {
  const [activeTab, setActiveTab] = useState<"card" | "bank" | "mpesa">("card");
  const [paymentComplete, setPaymentComplete] = useState(false);

  const tabs = [
    { id: "card" as const, label: "Card", icon: CreditCard },
    { id: "bank" as const, label: "Bank", icon: Building2 },
    { id: "mpesa" as const, label: "M-Pesa", icon: Smartphone },
  ];

  if (paymentComplete) {
    return (
      <div>
        <Confirmbooking />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-1">
            Booking Reference
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            #BK-2025-1234
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Details */}
          <div className="flex flex-col w-full lg:w-1/2 gap-6">
            {/* Personal Details Card */}
            <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-card-foreground">
                  Personal Details
                </h2>
              </div>

              {user.map((person, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
                >
                  <Avatar className="w-20 h-20 ring-2 ring-primary/10">
                    <AvatarImage src={person.avatar} alt={person.fullname} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-2xl">
                      {person.fullname
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-2 text-sm">
                    <div className="flex flex-col sm:flex-row sm:gap-3">
                      <span className="text-muted-foreground w-24">
                        Full Name
                      </span>
                      <span className="font-medium text-foreground">
                        {person.fullname}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-3">
                      <span className="text-muted-foreground w-24">Email</span>
                      <span className="font-medium text-foreground">
                        {person.email}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-3">
                      <span className="text-muted-foreground w-24">Phone</span>
                      <span className="font-medium text-foreground">
                        {person.phone}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Booking Details Card */}
            <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-card-foreground">
                  Booking Details
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Venue</p>
                    <p className="font-medium text-foreground">
                      Kifaru Msambweni
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Msambweni, Kenya
                    </p>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Check In</p>
                      <p className="font-medium text-foreground">20 Dec 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Check Out</p>
                      <p className="font-medium text-foreground">30 Dec 2025</p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Days</span>
                  <span className="font-semibold text-foreground">10 Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="font-semibold text-primary">$ 4,500</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden sticky top-6">
              {/* Payment Overview Header */}
              <div className="bg-primary/5 p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-card-foreground mb-4">
                  Payment Overview
                </h2>
                {Overview.map((pay, index) => (
                  <div key={index}>
                    <p className="text-muted-foreground mb-1">
                      Booked for {pay.dayz}
                    </p>
                    <p className="text-4xl font-bold text-primary">
                      {pay.amount}
                    </p>
                  </div>
                ))}
              </div>

              {/* Payment Methods */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Payment Method
                </h3>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                          activeTab === tab.id
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <div className="min-h-[120px] mb-6">
                  {activeTab === "card" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Card Number
                        </label>
                        <Input type="text" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Expiry Date
                          </label>
                          <Input type="text" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            CVV
                          </label>
                          <Input type="text" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "bank" && (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">
                          Transfer to:
                        </p>
                        <p className="font-medium text-foreground">
                          Kifaru Resorts Ltd
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Account: 1234567890
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Bank: Kenya Commercial Bank
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Please use your booking ID as the payment reference.
                      </p>
                    </div>
                  )}

                  {activeTab === "mpesa" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="mpesa"
                          className="text-sm font-medium text-foreground"
                        >
                          M-Pesa Phone Number
                        </label>
                        <Input
                          id="mpesa"
                          type="tel"
                          placeholder="+254 7XX XXX XXX"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        You will receive an M-Pesa prompt to complete the
                        payment.
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  size="lg"
                  className="w-full font-semibold"
                  onClick={() => setPaymentComplete(true)}
                >
                  Confirm Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
