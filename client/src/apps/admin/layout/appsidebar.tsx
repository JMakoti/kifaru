import { NavLink, useNavigate } from "react-router-dom";
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
import { LogOut, User } from "lucide-react";
import rhino from "@/assets/icon/kifaru.png";
import { useAuth } from "@/providers/useAuth";
import { menu } from "../routes";

export default function AppSidebar({
  children,
}: {
  children?: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="bg-white/5 text-sidebar-foreground z-50 fixed"
        style={
          {
            "--sidebar-width": "16rem",
            "--sidebar-width-icon": "3.5rem",
          } as React.CSSProperties
        }
      >
        <SidebarHeader>
          <div className="flex items-center justify-between gap-2 p-2 group-data-[collapsible=icon]:justify-center">
            <div className="flex items-center gap-2 text-lg font-bold">
              <img
                src={rhino}
                loading="lazy"
                alt="Kifaru"
                className="w-15 h-15 group-data-[collapsible=icon]:w-6 group-data-[collapsible=icon]:h-6"
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
                const Icon = m.icon;
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
                      {/* Icon always visible */}
                      <Icon className="w-5 h-5" aria-label={m.label} />
                      {/* Label hidden on mobile */}
                      <span className="truncate hidden md:inline group-data-[collapsible=icon]:hidden">
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
          {/* Profile Link */}
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
              <span className="truncate hidden md:inline group-data-[collapsible=icon]:hidden">
                Profile
              </span>
            </NavLink>
          </div>

          {/* Logout Button */}
          <div className="p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full h-8 lg:h-10 p-0 mt-4 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
            >
              <span className="flex items-center gap-2 w-full justify-center">
                <span className="hidden md:inline group-data-[collapsible=icon]:hidden">
                  Log out
                </span>
                <LogOut className="w-5 h-5" />
              </span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Page content */}
      {children && <SidebarInset>{children}</SidebarInset>}
    </SidebarProvider>
  );
}
