"use client";

import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { useAuth } from "@/providers/useAuth";

export default function Topbar() {
  // GET USER DETAILS
  const { user } = useAuth();

  return (
    <header className="w-full border-b bg-background/60 backdrop-blur-sm fixed z-50">
      <div className="max-w-[1020px] px-4 py-3 flex items-center justify-between gap-4">
        {/* Left side: Title */}
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Admin</h2>
          <p className="text-sm text-muted-foreground hidden sm:block">
            Control panel
          </p>
        </div>

        {/* Right side: Notifications & User */}
        <div className="flex items-center gap-4">
          {/* User Avatar */}
          <div className="flex items-center gap-2 ml-4">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarFallback className="text-lg font-semibold">
                {user
                  ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
                  : "AD"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline font-semibold italic">
              {user ? `${user.first_name} ${user.last_name}` : "Admin"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
