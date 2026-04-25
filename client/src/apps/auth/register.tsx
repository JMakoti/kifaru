import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { extractErrorMessage } from "@/lib/extract-error-message";
import type { AuthResponse } from "@/types/user.types";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import kifaru from "@/assets/icon/kifaru.png";
import { useAuth } from "@/providers/useAuth";

function getPasswordErrors(password: string): string[] {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }
  if (password.length > 24) {
    errors.push("Password must be at most 24 characters long");
  }
  if (/\s/.test(password)) {
    errors.push("Password cannot contain spaces");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  return errors;
}

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
    phone_number: "",
    whatsapp_number: "",
  });

  const validateForm = () => {
    const {
      first_name,
      last_name,
      email,
      password,
      password_confirm,
      phone_number,
    } = formData;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !password_confirm ||
      !phone_number
    ) {
      return "All fields are required";
    }

    if (!first_name) {
      return "First Name field required";
    }

    if (!last_name) {
      return "Last Name required";
    }

    if (!email) {
      return "Email required";
    }

    if (!password) {
      return "Pasword is required";
    }

    if (!phone_number) {
      return "Phone number required";
    }

    // Reject simple sequential numbers like 12345678
    const isSequential = (pwd: string) => {
      const seq = "1234567890";
      const rev = "0987654321";
      const pass = "password";
      return seq.includes(pwd) || rev.includes(pwd) || pass.includes(pwd);
    };

    if (isSequential(password)) {
      return "Password is too weak (avoid sequential numbers)";
    }

    if (password !== password_confirm) {
      return "Passwords do not match";
    }

    return null;
  };

  const passwordErrors = useMemo(() => {
    return getPasswordErrors(formData.password);
  }, [formData.password]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { register, isRegistering } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response: AuthResponse = await register(formData);
      setSuccessMessage(response?.message ?? null);

      setTimeout(() => {
        navigate("/auth", { replace: true });
      }, 1500);
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-muted p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 items-center flex flex-col">
          <img src={kifaru} alt="Kifaru Logo" className="w-20 h-20" />
          {/* <p className="text-muted-foreground">
            Start your plans journey today
          </p> */}
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle>Create Account</CardTitle>
          </CardHeader>

          <CardContent>
            {/* Success message */}
            {successMessage && (
              <div className="p-3 text-sm text-green-500 bg-green-50 rounded-md border border-green-200 text-center mb-4">
                {successMessage}
              </div>
            )}

            {/* Error message */}
            {errorMessage && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200 text-center mb-4">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      placeholder="John"
                      value={formData.first_name}
                      onChange={(e) =>
                        setFormData({ ...formData, first_name: e.target.value })
                      }
                      // required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input
                    placeholder="Doe"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                    // required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    className="pl-10"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    // required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  placeholder="+254745678900"
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone_number: e.target.value,
                    })
                  }
                  // required
                />
              </div>

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
                    // required
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

              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    className="pl-10 pr-10"
                    placeholder="••••••••"
                    value={formData.password_confirm}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password_confirm: e.target.value,
                      })
                    }
                    // required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>

              {passwordErrors.length > 0 && (
                <ul style={{ color: "red" }}>
                  {passwordErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isRegistering}
              >
                {isRegistering ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <Separator className="my-4" />

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/auth" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
