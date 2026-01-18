import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Shield, Mail, Phone, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EditProfileModal } from "./edituserprofile";
import type { User } from "@/services/user.types";
import { useAuth } from "@/providers/authprovider";

interface ProfileSidebarProps {
  user: User;
  onUserUpdate?: (data: FormData) => void;
}

export function ProfileSidebar({ user, onUserUpdate }: ProfileSidebarProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSave = (data: FormData) => {
    // send to API / parent handler
    onUserUpdate?.(data);
  };

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
        <div className="bg-card rounded-2xl shadow-card p-6 sticky top-6">
          {/* Avatar & Name */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24 ring-4 ring-primary/10">
                <AvatarImage src="" alt={name} />
                <AvatarFallback className="text-2xl font-semibold bg-primary text-primary-foreground">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              {/* {user.verified && (
                <div className="absolute -bottom-1 -right-1 bg-success text-success-foreground rounded-full p-1.5">
                  <BadgeCheck className="h-4 w-4" />
                </div>
              )} */}
            </div>

            <h2 className="text-xl font-semibold">{name}</h2>

            <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
              <MapPin className="h-3.5 w-3.5" />
              {user.country_of_residence}
            </p>
          </div>

          <Separator className="mb-6" />

          {/* Verification */}
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-medium">Verified Information</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5">
                <Mail className="h-3.5 w-3.5" />
                Email
              </Badge>
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5">
                <Phone className="h-3.5 w-3.5" />
                Phone
              </Badge>
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5">
                <Shield className="h-3.5 w-3.5" />
                Identity
              </Badge>
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Contact Info */}
          <div className="space-y-3 mb-6 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{user.phone_number}</span>
            </div>
            {/* <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Member since {user.memberSince}
              </span>
            </div> */}
          </div>

          <Button
            className="w-full"
            variant="outline"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Profile
          </Button>

          <Button
            variant="ghost"
            size="sm"
            title="Logout"
            onClick={handleLogout}
            className="w-full h-8 lg:h-10 p-0 mt-4 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <span className="flex items-center gap-2 w-full justify-center">
              <span className="group-data-[collapsible=icon]:hidden">
                Log out
              </span>
              <LogOut className="w-5 h-5" />
            </span>
          </Button>
        </div>
      </aside>

      <EditProfileModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        user={user}
        onSave={handleSave}
      />
    </>
  );
}
