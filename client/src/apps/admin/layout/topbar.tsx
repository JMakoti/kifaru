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

  //GET USER DEATAILS
  const { user } = useAuth();

  return (
    <header className="w-full border-b bg-background/60 backdrop-blur-sm">
      <div className="max-w-[1120px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Admin</h2>
          <p className="text-sm text-muted-foreground hidden sm:block">
            Control panel
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1">
                    <Badge className="!px-1 !py-0.5 text-[10px] ">
                      {notifications.length}
                    </Badge>
                  </span>
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
                      className="flex items-start justify-between gap-2 p-2 rounded hover:bg-accent"
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

          <div className="ml-5 flex items-center justify-center gap-2">
            <Avatar className="h-10 w-10 ring-4 ring-primary/10">
              {/* <AvatarImage src={} alt="Admin" /> */}
              <AvatarFallback className="text-xl font-semibold">
                {user
                  ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
                  : "AD"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline font-bold italic">
              {user ? `${user.first_name} ${user.last_name}` : "Admin"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
