import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import kifaru from "@/assets/icon/kifaru.png";
import { CircleCheck, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type CheckEmailState = {
  email?: string;
  message?: string;
};

export default function CheckEmail() {
  const location = useLocation();
  const state = (location.state ?? {}) as CheckEmailState;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-muted p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 items-center flex flex-col">
          <img src={kifaru} alt="Kifaru Logo" className="w-20 h-20" />
          <h1 className="text-2xl font-bold text-black-800 mb-2 text-balance">
            Kifaru
          </h1>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CircleCheck className="h-7 w-7" />
            </div>
            <CardTitle>Check Your Email</CardTitle>
            <CardDescription>
              {state.message ??
                "We sent password reset instructions to your email."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {state.email && (
              <div className="flex items-center gap-3 rounded-md border bg-muted/40 p-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-foreground">
                  {state.email}
                </span>
              </div>
            )}

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                Open the email and click the reset link to create a new
                password.
              </p>
              <p>
                If you do not see it, check your spam or junk folder. The link
                may expire, so use it as soon as possible.
              </p>
            </div>

            <Button asChild className="w-full" size="lg">
              <Link to="/auth">Return to login</Link>
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Did not get the email?{" "}
              <Link
                to="/auth/forgot-pass"
                className="text-primary hover:underline"
              >
                Try again
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
