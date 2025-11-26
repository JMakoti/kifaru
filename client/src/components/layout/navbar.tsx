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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
              <Link to="/signup">SignUp</Link>
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              asChild
            >
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-foreground hover:text-primary focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-16 w-full border-b shadow-lg">
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
                        onClick={toggleMenu}
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
                  onClick={toggleMenu}
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
                <Link to="/signup" onClick={toggleMenu}>
                  SignUp
                </Link>
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-white flex-1"
                asChild
              >
                <Link to="/login" onClick={toggleMenu}>
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
