import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router";
import navLinks from "../routes";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Mobilemenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div>
      <div className="md:hidden bg-accent absolute top-16 w-full border-b shadow-lg">
        <div className="flex flex-col space-y-2 px-4 py-4">
          {navLinks.map((link) =>
            link.children ? (
              <div className="py-2" key={link.label}>
                <div className="flex items-center justify-between text-foreground">
                  <span className="text-foreground">{link.label}</span>
                </div>
                <div className="pl-4 mt-2 border-l border-gray-200 space-y-2">
                  {link.children.map((property) => (
                    <Link
                      key={property.to}
                      to={property.to}
                      className="block text-sm text-gray-600 hover:text-primary py-1"
                      onClick={onClose}
                    >
                      {property.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className="text-foreground hover:text-primary transition-colors py-2"
              >
                {link.label}
              </NavLink>
            )
          )}

          <div className="flex gap-2 mt-2">
            <Button
              className="bg-primary hover:bg-primary/90 text-white flex-1"
              asChild
            >
              <Link to="/signup" onClick={onClose}>
                SignUp
              </Link>
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-white flex-1"
              asChild
            >
              <Link to="/login" onClick={onClose}>
                Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
