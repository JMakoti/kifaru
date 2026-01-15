import { Link, useLocation } from "react-router-dom";
import navLinks from "@/apps/user/routes";
import logo from "@/assets/icon/icon2.ico";

export default function Footer() {
  const location = useLocation();
  const propertyRoute = location.pathname.split("/")[2];

  const defaultFooterRoutes = [
    "/",
    "/about",
    "/property",
    "/services",
    "/contact",
  ];

  const propertyBackgrounds: Record<string, string> = {
    belgium:
      "https://res.cloudinary.com/drselhsl4/image/upload/v1763579325/Kifaru/footer/r5kbema8zofdpe9lrd1d.jpg",
    brussels:
      "https://res.cloudinary.com/drselhsl4/image/upload/v1763579315/Kifaru/footer/t35vtihaw8ypl7xoh4re.png",
    msambweni:
      "https://res.cloudinary.com/drselhsl4/image/upload/v1763483919/Kifaru/k096rs8b5wqru5dwghax.jpg",
    nairobi:
      "https://res.cloudinary.com/drselhsl4/image/upload/v1763579322/Kifaru/footer/thkmpw0jqaoy1jmuhrrv.png",
    netherlands:
      "https://res.cloudinary.com/drselhsl4/image/upload/v1763579324/Kifaru/footer/ruuacm1gqzth7h6d5kcy.jpg",
    nyali:
      "https://res.cloudinary.com/drselhsl4/image/upload/v1763579344/Kifaru/footer/nma70pofugzuvgosjobv.png",
  };

  const propertyBackgroundUrl =
    propertyRoute && propertyBackgrounds[propertyRoute]
      ? propertyBackgrounds[propertyRoute]
      : undefined;

  const isDefaultFooterRoute = defaultFooterRoutes.includes(location.pathname);
  return (
    <footer
      className={`relative w-full text-gray-300 pt-12 pb-6 mt-12 ${
        isDefaultFooterRoute ? "bg-primary" : "bg-cover bg-center bg-no-repeat"
      }`}
      style={
        !isDefaultFooterRoute && propertyBackgroundUrl
          ? { backgroundImage: `url(${propertyBackgroundUrl})` }
          : undefined
      }
    >
      {!isDefaultFooterRoute && propertyBackgroundUrl && (
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      )}
      <div className=" relative z-10">
        {isDefaultFooterRoute ? (
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-4 gap-8 mb-10">
              {/* Brand */}
              <div>
                <div className="flex flex-row gap-2 mb-4">
                <img
                  src={logo}
                  alt="Kifaru Logo"
                  className="w-10 h-10 object-contain"
                />
                <h2 className="text-4xl font-bold text-white">Kifaru</h2>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Blending luxury, nature, and African culture into
                  unforgettable experiences.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Destinations */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Destinations
                </h3>
                {navLinks.map((link) =>
                  link.children ? (
                    <ul className="space-y-2" key={link.label}>
                      {link.children.map((property) => (
                        <li key={property.to}>
                          <Link
                            to={property.to}
                            className="hover:text-white transition-colors"
                          >
                            {property.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null
                )}
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Contact
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>Email: requests@techbedkifaru.be</li>
                  <li>Phone: +254 708 533 033</li>
                  <li>Location: Nairobi, Kenya</li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Kifaru. All rights reserved.
              </p>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-3 md:mt-0">
                <Link
                  to="/privacy"
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Kifaru</h2>
              <p className="text-sm text-gray-300 mb-6 max-w-md mx-auto">
                Experience luxury and nature in{" "}
                {propertyRoute
                  ? propertyRoute.charAt(0).toUpperCase() +
                    propertyRoute.slice(1)
                  : "our exclusive properties"}
              </p>

              <div className="flex justify-center space-x-6 mb-6">
                {navLinks.map((link) => (
                  <li key={link.to} className="list-none">
                    <Link
                      to={link.to}
                      className="hover:text-white text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </div>

              <div className="border-t border-gray-600 pt-6">
                <p className="text-sm text-gray-400">
                  © {new Date().getFullYear()} Kifaru. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
