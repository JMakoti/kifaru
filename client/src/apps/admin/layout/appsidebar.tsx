import { NavLink } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "../../../components/ui/sidebar";
import { Button } from "../../../components/ui/button";
import {
  LogOut,
  Home,
  Calendar,
  CreditCard,
  Users,
  BarChart2,
  Settings,
  Building2,
  User,
} from "lucide-react";
import rhino from "@/assets/icon/icon.ico";

export default function AppSidebar({
  children,
}: {
  children?: React.ReactNode;
}) {
  const menu = [
    { to: "/admin", label: "Dashboard", icon: Home },
    { to: "/admin/property", label: "Properties", icon: Building2 },
    { to: "/admin/bookings", label: "Bookings", icon: Calendar },
    { to: "/admin/payments", label: "Transactions", icon: CreditCard },
    { to: "/admin/guests", label: "Guests", icon: Users },
    { to: "/admin/reports", label: "Reports", icon: BarChart2 },
  ];

  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="bg-white/5 text-sidebar-foreground z-50 fixed"
        style={{
          ["--sidebar-width" as any]: "16rem",
          ["--sidebar-width-icon" as any]: "3.5rem",
        }}
      >
        <SidebarHeader>
          <div className="flex items-center justify-between gap-2 p-2 group-data-[collapsible=icon]:justify-center">
            <div className="flex items-center gap-2 text-lg font-bold">
              <img
                src={rhino}
                loading="lazy"
                alt="Kifaru"
                className="w-8 h-6 group-data-[collapsible=icon]:w-6 group-data-[collapsible=icon]:h-6"
              />
              <span className="hidden md:inline group-data-[collapsible=icon]:hidden">
                Kifaru
              </span>
            </div>
            <div className="flex items-center">
              <SidebarTrigger />
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <nav className="p-2">
            <ul className="flex flex-col gap-1">
              {menu.map((m) => {
                const Icon = m.icon as any;
                return (
                  <li key={m.to}>
                    <NavLink
                      to={m.to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground"
                        } group-data-[collapsible=icon]:justify-center`
                      }
                    >
                      <Icon className="w-5 h-5" title={m.label} />
                      <span className="truncate group-data-[collapsible=icon]:hidden">
                        {m.label}
                      </span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </SidebarContent>

        <SidebarFooter>
          <div className="p-2">
            <NavLink
              to="/admin/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground"
                } group-data-[collapsible=icon]:justify-center`
              }
            >
              <User className="w-5 h-5" />
              <span className="truncate group-data-[collapsible=icon]:hidden">
                Profile
              </span>
            </NavLink>
          </div>
          <div className="p-2">
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground"
                } group-data-[collapsible=icon]:justify-center`
              }
            >
              <Settings className="w-5 h-5" />
              <span className="truncate group-data-[collapsible=icon]:hidden">
                Settings
              </span>
            </NavLink>
          </div>
          <div className="p-2">
            <Button
              variant="ghost"
              size="sm"
              title="Logout"
              className="w-full h-8 lg:h-10 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <span className="flex items-center gap-2 w-full justify-center">
                <span className="group-data-[collapsible=icon]:hidden">
                  Log out
                </span>
                <LogOut className="w-5 h-5" />
              </span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Render page content inside SidebarInset so the main content responds to sidebar state */}
      {children && <SidebarInset>{children}</SidebarInset>}
    </SidebarProvider>
  );
}
