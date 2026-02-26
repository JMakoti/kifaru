import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { extractErrorMessage } from "@/lib/extract-error-message";
import type { AuthResponse } from "@/types/user.types";
import kifaru from "@/assets/icon/kifaru.png";
import { useAuth } from "@/providers/useAuth";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response: AuthResponse = await login(formData);
      await queryClient.refetchQueries({ queryKey: ["auth-user"] });

      navigate("/profile", { replace: true });

      if (response?.message) {
        toast.success(response.message);
      }
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-secondary/30 p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="
    absolute top-6 left-6
    flex items-center gap-2
    px-4 py-2
    rounded-full
    border border-border
    bg-background/70 backdrop-blur
    text-foreground/70
    shadow-sm
    transition
    hover:text-foreground
    hover:bg-accent/40
    hover:border-accent
  "
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 flex flex-col items-center">
          <img src={kifaru} alt="Kifaru Logo" className="w-20 h-20 mb-2" />
          <p className="text-muted-foreground">Welcome back to Kifaru</p>
        </div>

        <Card className="border border-border shadow-xl rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Error message */}
            {errorMessage && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20 text-center mb-4">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    className="pl-10"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    disabled={isLoading}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full rounded-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <Separator className="my-6" />

            <div className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                to="/auth/register"
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
