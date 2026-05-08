import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { extractErrorMessage } from "@/lib/extract-error-message";
import { useResetPassword } from "@/services/user.service";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import kifaru from "@/assets/icon/kifaru.png";

function getPasswordErrors(password: string): string[] {
  const errors: string[] = [];

  if (!password) {
    errors.push("Password is required");
    return errors;
  }
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
  if (/^(.)\1+$/.test(password)) {
    errors.push("Password cannot use the same character repeatedly");
  }
  if (password.toLowerCase().includes("password")) {
    errors.push("Password cannot contain the word password");
  }
  return errors;
}

function isSequentialPassword(password: string): boolean {
  const normalizedPassword = password.toLowerCase();
  const sequences = ["1234567890", "0987654321", "abcdefghijklmnopqrstuvwxyz"];

  return sequences.some((sequence) =>
    sequence.includes(normalizedPassword),
  );
}

export default function ResetPasswordPage() {
  const resetPassword = useResetPassword();
  const [formData, setFormData] = useState({
    password: "",
    password_confirm: "",
  });
  const validateForm = () => {
    const { password, password_confirm } = formData;

    if (!password || !password_confirm) {
      return "Both password fields are required";
    }

    const passwordValidationErrors = getPasswordErrors(password);
    if (passwordValidationErrors.length > 0) {
      return passwordValidationErrors[0];
    }

    if (password !== password_confirm) {
      return "Passwords do not match";
    }

    if (isSequentialPassword(password)) {
      return "Password is too weak. Avoid sequential characters or numbers";
    }

    return null;
  };

  const passwordErrors = useMemo(() => {
    if (!formData.password) {
      return [];
    }
    return getPasswordErrors(formData.password);
  }, [formData.password]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const { uidb64, token } = useParams<{
    uidb64: string;
    token: string;
  }>();

  if (!uidb64 || !token) {
    return <p>Invalid password reset link.</p>;
  }

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
      const response = await resetPassword.mutateAsync({
        uidb64: uidb64!,
        token: token!,
        password: formData.password,
        password_confirm: formData.password_confirm,
      });

      setSuccessMessage(response.message || "Password reset successfully");
      setFormData({
        password: "",
        password_confirm: "",
      });

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
          <p className="text-muted-foreground mt-2">Reset Your Password</p>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle>Change Your Password</CardTitle>
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
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      setErrorMessage(null);
                    }}
                    required
                    disabled={resetPassword.isPending || Boolean(successMessage)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={resetPassword.isPending || Boolean(successMessage)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={formData.password_confirm}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        password_confirm: e.target.value,
                      });
                      setErrorMessage(null);
                    }}
                    required
                    disabled={resetPassword.isPending || Boolean(successMessage)}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={resetPassword.isPending || Boolean(successMessage)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {!successMessage && passwordErrors.length > 0 && (
                <ul className="space-y-1 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-500">
                  {passwordErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={resetPassword.isPending || Boolean(successMessage)}
              >
                {resetPassword.isPending
                  ? "Resetting..."
                  : successMessage
                    ? "Password reset"
                    : "Reset password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
