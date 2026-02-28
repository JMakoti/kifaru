import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, NavLink, useMatch } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/icon/kifaru.png";
import navLinks from "../routes";
import Mobilemenu from "./mobilemenu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useProperties } from "@/services/property.service";
import { useAuth } from "@/providers/useAuth";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Detect property details page
  const propertyMatch = useMatch("/property/:slug");
  const isPropertyDetailsPage = !!propertyMatch;

  // Fetch properties dynamically
  const { data, isLoading, isError } = useProperties();
  const propertyList = useMemo(() => data?.results || [], [data]);

  return (
    <nav className="sticky top-0 z-40 w-full bg-[var(--kifaru-body)]/80 backdrop-blur-md border-b border-[var(--border)] shadow-sm">
      <div className="container-custom flex items-center justify-between h-16 md:h-20 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Kifaru Logo"
              className="w-20 h-20 object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-4 lg:gap-6 text-white text-lg">
          {navLinks.map((link) => {
            // Hide Properties nav on property details page
            if (link.label === "Properties" && isPropertyDetailsPage) {
              return null;
            }

            // Properties dropdown
            if (link.label === "Properties") {
              return (
                <NavigationMenu key={link.label} className="bg-transparent">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent shadow-none h-auto px-2 py-1 font-semibold text-white hover:text-[var(--kifaru-accent)] data-[state=open]:text-[var(--kifaru-accent)] text-md hover:bg-transparent hover:text-white">
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="backdrop-blur-md bg-[var(--kifaru-body)]/95 border border-[var(--border)] shadow-lg rounded-lg p-2">
                        <div className="grid grid-cols-2 w-[350px] gap-2 p-3 max-h-[400px] overflow-y-auto">
                          {isLoading && (
                            <p className="text-white">Loading...</p>
                          )}
                          {isError && (
                            <p className="text-red-500">
                              Failed to load properties
                            </p>
                          )}
                          {propertyList.map((property) => (
                            <Link
                              key={property.id}
                              to={`/property/${property.slug}`}
                              className="block p-2 space-y-1 rounded-md hover:bg-[var(--kifaru-accent)]/20 transition-colors"
                            >
                              <div className="font-medium text-white text-sm">
                                {property.location}
                              </div>
                              <div className="text-sm text-white/90">
                                {property.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              );
            }

            // Normal nav links
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-1 font-semibold transition-colors ${
                    isActive
                      ? "text-[var(--kifaru-accent)]"
                      : "text-white hover:text-[var(--kifaru-accent)]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            );
          })}

          {/* User Auth / Avatar */}
          {isAuthenticated ? (
            <Link
              to={user?.role === "admin" ? "/dashboard/profile" : "/profile"}
              className="ml-4"
            >
              <Avatar className="h-12 w-12 cursor-pointer">
                <AvatarFallback className="font-semibold text-white">
                  {user?.first_name?.[0] ?? ""}
                  {user?.last_name?.[0] ?? ""}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Button
                className="bg-[var(--kifaru-primary)] hover:bg-[var(--kifaru-primary)]/90 text-white text-md"
                asChild
              >
                <Link to="/auth">Login</Link>
              </Button>
              <Button
                className="bg-[var(--kifaru-accent)] hover:bg-[var(--kifaru-accent)]/90 text-white text-md"
                asChild
              >
                <Link to="/auth/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="text-white hover:text-[var(--kifaru-accent)] focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} color="white" />
            ) : (
              <Menu size={24} color="white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <Mobilemenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
}
