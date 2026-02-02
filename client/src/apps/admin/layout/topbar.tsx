"use client";

import { Bell } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../components/ui/popover";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { useAuth } from "@/providers/useAuth";

export default function Topbar() {
  const notifications = [
    { id: 1, title: "New booking received", time: "2h ago" },
    { id: 2, title: "Payment succeeded", time: "1d ago" },
  ];

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
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" aria-hidden="true" />
                {notifications.length > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 !px-1 !py-0.5 text-[10px]"
                    variant="destructive"
                  >
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Notifications</h3>
                <div className="flex flex-col gap-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="flex items-start justify-between gap-2 p-2 rounded hover:bg-accent hover:bg-opacity-20 transition-colors"
                    >
                      <div>
                        <div className="text-sm font-medium">{n.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {n.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

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
