"use client";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  CheckCircle2,
  Timer,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInitializePayment } from "@/services/booking.service";

export default function ConfirmPaymentBooking() {
  const navigate = useNavigate();
  const location = useLocation();

  const bookingId = location.state?.bookingId;

  const { mutate: initializePayment, isPending } = useInitializePayment();

  // Set the expiry to 30 minutes from now
  const [expiryTime] = useState(() => Date.now() + 30 * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = Date.now();
      const difference = expiryTime - now;

      if (difference <= 0) {
        setTimeLeft("00:00");
        setIsExpired(true);
        return;
      }

      const mins = Math.floor((difference / 1000 / 60) % 60);
      const secs = Math.floor((difference / 1000) % 60);

      setTimeLeft(
        `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`,
      );
    };

    // Initial call
    calculateTime();

    // Update every second
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [expiryTime]);

  const handlePayment = () => {
    if (!bookingId) {
      console.error("No booking ID found in state");
      return;
    }
    initializePayment({ booking_id: bookingId });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative bg-background rounded-full p-4 border-8 border-green-500/10">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            Reservation Held
          </h1>
          <p className="text-muted-foreground text-sm px-4">
            Thank you! Your booking is reserved. Please pay within the window
            below to prevent automatic cancellation.
          </p>
        </div>

        {/* Expiry Card */}
        <div
          className={`p-6 rounded-3xl border-2 transition-all duration-500 ${
            isExpired
              ? "bg-destructive/5 border-destructive/20 shadow-none"
              : "bg-primary/5 border-primary/10 shadow-lg shadow-primary/5"
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Timer
              className={`w-4 h-4 ${isExpired ? "text-destructive" : "text-primary animate-pulse"}`}
            />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Booking Expires In
            </span>
          </div>

          <div
            className={`text-5xl font-mono font-black tabular-nums ${isExpired ? "text-destructive" : "text-foreground"}`}
          >
            {timeLeft}
          </div>

          {isExpired && (
            <div className="mt-4 flex items-center justify-center gap-2 text-destructive font-bold text-xs uppercase italic">
              <AlertCircle className="w-4 h-4" />
              Reservation Revoked
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            className="w-full h-16 text-lg font-bold shadow-xl transition-all active:scale-95"
            disabled={isExpired || isPending || !bookingId}
            onClick={handlePayment}
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Securing Gateway...
              </>
            ) : isExpired ? (
              "Booking Expired"
            ) : (
              <>
                Make Payment Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            className="w-full text-muted-foreground hover:bg-transparent hover:text-primary"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Property List
          </Button>
        </div>

        {/* Compliance Note */}
        <div className="pt-6 border-t border-border flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            Guaranteed Secure Reservation
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed px-6 italic">
            Note: If payment is not received by 00:00, the system will release
            these dates for other guests immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
