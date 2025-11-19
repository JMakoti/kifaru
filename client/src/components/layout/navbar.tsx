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
// import { useIsMobile } from "@/hooks/use-mobile";
import logo from "../../assets/icon/rhino.ico";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-brown/90 backdrop-blur-sm border-b shadow-sm">
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
        <div className="hidden md:flex md:items-center md:gap-4 lg:gap-6">
          <NavLink
            to="/"
            className="px-2 py-1 text-foreground hover:text-primary transition-colors"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="px-2 py-1 text-foreground hover:text-primary transition-colors"
          >
            About
          </NavLink>

          {/* Properties Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent h-auto px-2 py-1 hover:bg-transparent hover:text-primary data-[state=open]:bg-transparent">
                  Properties
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-2 w-[500px] gap-3 p-4">
                    <Link
                      to="/property/belgium"
                      className="block p-2 space-y-1 rounded-md hover:bg-gray-100"
                    >
                      <div className="font-medium">Belgium</div>
                      <div className="text-sm text-gray-600">
                        Check Out Our Belgium Properties
                      </div>
                    </Link>
                    <Link
                      to="/property/brussels"
                      className="block p-2 space-y-1 rounded-md hover:bg-gray-100"
                    >
                      <div className="font-medium">Brussels</div>
                      <div className="text-sm text-gray-600">
                        Check Out Our Brussels Properties
                      </div>
                    </Link>
                    <Link
                      to="/property/msambweni"
                      className="block p-2 space-y-1 rounded-md hover:bg-gray-100"
                    >
                      <div className="font-medium">Msambweni</div>
                      <div className="text-sm text-gray-600">
                        Check Out Our Msambweni Properties
                      </div>
                    </Link>
                    <Link
                      to="/property/nairobi"
                      className="block p-2 space-y-1 rounded-md hover:bg-gray-100"
                    >
                      <div className="font-medium">Nairobi</div>
                      <div className="text-sm text-gray-600">
                        Check Out Our Nairobi Properties
                      </div>
                    </Link>
                    <Link
                      to="/property/nertherlands"
                      className="block p-2 space-y-1 rounded-md hover:bg-gray-100"
                    >
                      <div className="font-medium">Nertherlands</div>
                      <div className="text-sm text-gray-600">
                        Check Out Our Nertherlands Properties
                      </div>
                    </Link>

                    <Link
                      to="/property/nyali"
                      className="block p-2 space-y-1 rounded-md hover:bg-gray-100"
                    >
                      <div className="font-medium">Nyali</div>
                      <div className="text-sm text-gray-600">
                        Check Out Our Nyali Properties
                      </div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavLink
            to="/services"
            className="px-2 py-1 text-foreground hover:text-primary transition-colors"
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className="px-2 py-1 text-foreground hover:text-primary transition-colors"
          >
            Contact
          </NavLink>

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
            <NavLink
              to="/"
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={toggleMenu}
            >
              About
            </NavLink>

            {/* Properties Mobile Menu */}
            <div className="py-2">
              <div className="flex items-center justify-between text-foreground">
                <span className="text-foreground">Properties</span>
              </div>
              <div className="pl-4 mt-2 border-l border-gray-200 space-y-2">
                <Link
                  to="/property/belgium"
                  className="block text-sm text-gray-600 hover:text-primary py-1"
                  onClick={toggleMenu}
                >
                  Belgium
                </Link>
                <Link
                  to="/property/brussels"
                  className="block text-sm text-gray-600 hover:text-primary py-1"
                  onClick={toggleMenu}
                >
                  Brussels
                </Link>
                <Link
                  to="/property/msambweni"
                  className="block text-sm text-gray-600 hover:text-primary py-1"
                  onClick={toggleMenu}
                >
                  Msambweni
                </Link>
                <Link
                  to="/property/nairobi"
                  className="block text-sm text-gray-600 hover:text-primary py-1"
                  onClick={toggleMenu}
                >
                  Nairobi
                </Link>
                <Link
                  to="/property/nertherlands"
                  className="block text-sm text-gray-600 hover:text-primary py-1"
                  onClick={toggleMenu}
                >
                  Nertherlands
                </Link>
                <Link
                  to="/property/nyali"
                  className="block text-sm text-gray-600 hover:text-primary py-1"
                  onClick={toggleMenu}
                >
                  Nyali
                </Link>
              </div>
            </div>

            <NavLink
              to="/services"
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={toggleMenu}
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={toggleMenu}
            >
              Contact
            </NavLink>

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
