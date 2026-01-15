import { Link } from "react-router";
import { Button } from "../../../../components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function Confirmbooking() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-2 md:py-4">
      <div className="container mx-auto px-4 md:px-6 max-w-lg text-center">
        <div className="rounded-xl bg-card border border-border p-8 md:p-12 shadow-sm">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Thanks for your payment!
          </h1>
          <p className="text-muted-foreground mb-2">
            Your booking has been confirmed.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Booking Reference:{" "}
            <span className="font-semibold text-foreground">#BK-2025-1234</span>
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            A confirmation email has been sent to your registered email address.
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link to="/">Back to Home Page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
