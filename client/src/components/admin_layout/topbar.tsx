"use client";

import { Bell, LogOut, User, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import rhino from "@/assets/icon/icon.ico";
import { Link } from "react-router";

export default function Topbar() {
  const notifications = [
    { id: 1, title: "New booking received", time: "2h ago" },
    { id: 2, title: "Payment succeeded", time: "1d ago" },
  ];

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
                    <Badge className="!px-1 !py-0.5 text-[10px]">
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

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <Avatar>
                  <AvatarImage src={rhino} alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8}>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link to="/admin/profile">
                  <div className="flex flex-row">
                    <User className="mr-2" /> Profile
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/admin/settings">
                  <div className="flex flex-row">
                    <Settings className="mr-2" /> Settings
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem data-variant="destructive">
                <LogOut className="mr-2" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
