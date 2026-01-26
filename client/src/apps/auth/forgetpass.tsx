import { useState } from "react";
import { Mail } from "lucide-react";
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
import { useForgetPassword } from "@/services/user.service";
import { extractErrorMessage } from "@/lib/extract-error-message";
import kifaru from "@/assets/icon/kifaru.png";

export default function ForgetPass() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const forgetPasswordMutation = useForgetPassword();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    forgetPasswordMutation.mutate({
      email: formData.email,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-muted p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 items-center flex flex-col">
          <img src={kifaru} alt="Kifaru Logo" className="w-20 h-20" />
          <h1 className="text-2xl font-bold text-black-800 mb-2 text-balance">
            Kifaru
          </h1>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle>Reset password</CardTitle>
            <CardDescription>
              Enter your email to reset password
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* SUCCESS MESSAGE */}
            {forgetPasswordMutation.isSuccess && (
              <div className="p-3 text-sm text-green-500 bg-green-50 rounded-md border border-green-200 text-center mb-4">
                {forgetPasswordMutation.data?.message}
              </div>
            )}

            {/* ERROR MESSAGE */}
            {forgetPasswordMutation.isError && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200 text-center mb-4">
                {extractErrorMessage(forgetPasswordMutation.error)}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    disabled={forgetPasswordMutation.isPending}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={forgetPasswordMutation.isPending}
              >
                {forgetPasswordMutation.isPending ? "Sending..." : "Send Email"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
