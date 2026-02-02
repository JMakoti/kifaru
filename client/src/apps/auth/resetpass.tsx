import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { extractErrorMessage } from "@/lib/extract-error-message";
import { useResetPassword } from "@/services/user.service";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import kifaru from "@/assets/icon/kifaru.png";

export default function ResetPasswordPage() {
  const resetPassword = useResetPassword();
  const [formData, setFormData] = useState({
    password: "",
    password_confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    await resetPassword.mutateAsync({
      uidb64: uidb64!,
      token: token!,
      password: formData.password,
      password_confirm: formData.password_confirm,
    });

    navigate("/login");
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
            {/* SUCCESS MESSAGE */}
            {resetPassword.isSuccess && (
              <div className="p-3 text-sm text-green-500 bg-green-50 rounded-md border border-green-200 text-center mb-4">
                {resetPassword.data.message}
              </div>
            )}

            {/* ERROR MESSAGE */}
            {resetPassword.isError && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200 text-center mb-4">
                {extractErrorMessage(resetPassword.error)}
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
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                    onClick={() => setShowPassword(!showPassword)}
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password_confirm: e.target.value,
                      })
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={resetPassword.isPending}
              >
                {resetPassword.isPending ? "Resetting..." : "Reset password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
