import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-gray-300 pt-12 pb-6 mt-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Kifaru</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Blending luxury, nature, and African culture into unforgettable
              experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Destinations
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/property/belgium" className="hover:text-white">
                  Belgium
                </Link>
              </li>
              <li>
                <Link to="/property/brussels" className="hover:text-white">
                  Brussels
                </Link>
              </li>
              <li>
                <Link to="/property/msambweni" className="hover:text-white">
                  Msambweni
                </Link>
              </li>
              <li>
                <Link to="/property/nairobi" className="hover:text-white">
                  Nairobi
                </Link>
              </li>
              <li>
                <Link
                  to="/property/nertherlands"
                  className="hover:text-white"
                >
                  Nertherlands
                </Link>
              </li>
              <li>
                <Link to="/property/nyali" className="hover:text-white">
                  Nyali
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@kifaru.com</li>
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
          <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 mt-3 md:mt-0">Privacy Policy</p>
            <p className="text-sm text-gray-500 mt-3 md:mt-0">
              Terms of Service
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
