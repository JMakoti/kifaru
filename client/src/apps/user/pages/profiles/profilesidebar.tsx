import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Shield, Mail, Phone, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EditProfileModal } from "./edituserprofile";
import type { User } from "@/types/user.types";
import { useAuth } from "@/providers/useAuth";

interface ProfileSidebarProps {
  user: User;
  onUserUpdate?: (data: FormData) => void;
}

export function ProfileSidebar({ user }: ProfileSidebarProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const name = `${user.first_name} ${user.last_name}`;

  return (
    <>
      <aside className="w-full lg:w-80 shrink-0">
        <div
          className="
    bg-card/95 backdrop-blur rounded-2xl border border-border shadow-sm p-6
    lg:sticky lg:top-24 lg:w-80
  "
        >
          {/* Avatar & Name */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24 ring-4 ring-accent/40">
                <AvatarImage src="" alt={name} />
                <AvatarFallback className="text-2xl font-semibold bg-accent text-accent-foreground">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            <h2 className="text-xl font-semibold tracking-tight">{name}</h2>

            <p className="text-muted-foreground text-sm flex items-center gap-1.5 mt-1">
              <MapPin className="h-4 w-4 text-accent" />
              {user.country_of_residence}
            </p>
          </div>

          <Separator className="mb-6" />

          {/* Verification */}
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Verified Information
            </h3>

            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="gap-1.5 px-3 py-1.5 bg-accent/20 text-accent-foreground"
              >
                <Mail className="h-3.5 w-3.5 text-accent" />
                Email
              </Badge>

              <Badge
                variant="secondary"
                className="gap-1.5 px-3 py-1.5 bg-accent/20 text-accent-foreground"
              >
                <Phone className="h-3.5 w-3.5 text-accent" />
                Phone
              </Badge>

              <Badge
                variant="secondary"
                className="gap-1.5 px-3 py-1.5 bg-accent/20 text-accent-foreground"
              >
                <Shield className="h-3.5 w-3.5 text-accent" />
                Identity
              </Badge>
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Contact Info */}
          <div className="space-y-3 mb-6 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{user.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{user.phone_number}</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => setIsEditModalOpen(true)}
            className="w-full mt-4 border-accent/40 hover:bg-accent/10"
          >
            Edit Profile
          </Button>

          <Button
            variant="ghost"
            size="sm"
            title="Logout"
            onClick={handleLogout}
            className="w-full mt-3 text-destructive cursor-pointer hover:bg-destructive/10 hover:text-destructive"
          >
            <span className="flex items-center gap-2 justify-center">
              Log out
              <LogOut className="w-5 h-5" />
            </span>
          </Button>
        </div>
      </aside>

      <EditProfileModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        user={user}
      />
    </>
  );
}
