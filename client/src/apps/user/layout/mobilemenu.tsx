import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router";
import navLinks from "../routes";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useProperties } from "@/services/property.service";
import { useAuth } from "@/providers/useAuth";
import { useMemo } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Mobilemenu({ isOpen, onClose }: MobileMenuProps) {
  const { isAuthenticated, user } = useAuth();
  const { data, isLoading, isError } = useProperties();

  const propertyList = useMemo(() => data?.results || [], [data]);

  if (!isOpen) return null;

  return (
    <div>
      <div className="md:hidden absolute top-16 w-full border-b shadow-lg bg-[var(--kifaru-body)]/95 backdrop-blur-md z-50">
        <div className="flex flex-col space-y-2 px-4 py-4">
          {navLinks.map((link) =>
            link.label === "Properties" ? (
              <div className="py-2" key={link.label}>
                <div className="flex items-center justify-between text-white font-semibold">
                  <span>{link.label}</span>
                </div>
                <div className="pl-4 mt-2 border-l border-[var(--border)] space-y-2">
                  {isLoading && <p className="text-white">Loading...</p>}
                  {isError && <p className="text-red-500">Failed to load</p>}
                  {propertyList.map((property) => (
                    <Link
                      key={property.id}
                      to={`/property/${property.slug}`}
                      onClick={onClose}
                      className="block text-white text-sm hover:text-[var(--kifaru-accent)] py-1 transition-colors"
                    >
                      {property.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `py-2 text-white font-medium transition-colors ${
                    isActive
                      ? "text-[var(--kifaru-accent)]"
                      : "hover:text-[var(--kifaru-accent)]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ),
          )}

          {isAuthenticated ? (
            <Link to="/profile" onClick={onClose}>
              <div className="flex items-center gap-3 mt-4">
                <Avatar className="h-12 w-12 cursor-pointer">
                  <AvatarFallback className="font-semibold text-white">
                    {user?.first_name?.[0]}
                    {user?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            </Link>
          ) : (
            <div className="flex gap-2 mt-4">
              <Button
                className="bg-[var(--kifaru-primary)] hover:bg-[var(--kifaru-primary)]/90 text-white flex-1"
                asChild
              >
                <Link to="/auth" onClick={onClose}>
                  Login
                </Link>
              </Button>
              <Button
                className="bg-[var(--kifaru-accent)] hover:bg-[var(--kifaru-accent)]/90 text-white flex-1"
                asChild
              >
                <Link to="/auth/register" onClick={onClose}>
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
