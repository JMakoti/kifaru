import { useState } from "react";
import { Mail, BubblesIcon } from "lucide-react";
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

export default function ForgetPass() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-muted p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <div className="flex justify-center mb-1">
              <BubblesIcon className="h-8 w-8 text-black-600" />
            </div>
          </div>
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
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                <BubblesIcon className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
