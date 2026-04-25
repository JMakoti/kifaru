import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
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
import bglogin from "@/assets/images/kifaru-adminbg.jpeg";
import { extractErrorMessage } from "@/lib/extract-error-message";
import kifaru from "@/assets/icon/kifaru.png";
import { useAuth } from "@/providers/useAuth";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login, isLoggingIn, error } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const validateForm = () => {
    const { email, password } = formData;

    if (!email || !password) {
      return "All fields are required";
    }
    if (!email) {
      return "All fields are required";
    }
    if (!password) {
      return "All fields are required";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    setErrorMessage(null);

    try {
      await login(formData);
      await queryClient.refetchQueries({ queryKey: ["auth-user"] });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-center bg-cover relative"
      style={{ backgroundImage: `url(${bglogin})` }}
    >
      {/* Darker overlay for contrast */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center">
          <img src={kifaru} alt="Kifaru Logo" className="w-20 h-20" />
        </div>

        <Card className="border border-white/10 bg-background/90 backdrop-blur shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-foreground">Admin Dashboard</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            {errorMessage && (
              <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-sm text-red-400">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground/80">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10 bg-muted/40 border-muted focus:border-primary"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={isLoggingIn}
                    // required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground/80">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-muted/40 border-muted focus:border-primary"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    disabled={isLoggingIn}
                    // required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-sm text-red-400">
                  {error.message || "Invalid credentials. Please try again."}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isLoggingIn}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoggingIn ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
