import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logo from "../../assets/icon/icon.ico";
import navLinks from "../../lib/routes";
import Mobilemenu from "./mobilemenu";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-accent/80 backdrop-blur-sm border-b shadow-sm">
      <div className="container-custom flex items-center justify-between h-16 md:h-20 pr-4 pl-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Kifaru Logo"
              className="w-15 h-15 object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-4 lg:gap-6 hover:bg-transparent">
          {navLinks.map((link) =>
            link.children ? (
              <NavigationMenu key={link.label} className="bg-transparent">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className="bg-transparent shadow-none h-auto px-2 py-1 font-semibold hover:bg-transparent hover:text-primary 
        data-[state=open]:bg-transparent"
                    >
                      {link.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="backdrop-blur-md bg-white/20 dark:bg-black/20 shadow-none border-none">
                      <div className="grid grid-cols-2 w-[450px] gap-3 p-4">
                        {link.children.map((property) => (
                          <Link
                            key={property.to}
                            to={property.to}
                            className="block p-2 space-y-1 rounded-md hover:bg-gray-100"
                          >
                            <div className="font-medium">{property.label}</div>
                            <div className="text-sm text-gray-600">
                              {property.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className="px-2 py-1 text-foreground hover:text-primary  font-semibold transition-colors"
              >
                {link.label}
              </NavLink>
            )
          )}

          <div className="flex items-center gap-2 ml-2">
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              asChild
            >
              <Link to="/auth/register">SignUp</Link>
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              asChild
            >
              <Link to="/auth">Login</Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="text-foreground hover:text-primary focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <Mobilemenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
}
