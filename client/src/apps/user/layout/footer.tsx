import { Link, useLocation } from "react-router-dom";
import navLinks from "@/apps/user/routes";
import logo from "@/assets/icon/kifaru.png";
import { useProperties } from "@/services/property.service";
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function Footer() {
  const location = useLocation();
  const propertyRoute = location.pathname.split("/")[2];

  const { data } = useProperties();
  const propertyList = useMemo(() => data?.results || [], [data]);

  const trimWords = (text: string, wordCount: number) => {
    return text.split(" ").slice(0, wordCount).join(" ") + "...";
  };

  const defaultFooterRoutes = [
    "/",
    "/about",
    "/property",
    "/services",
    "/contact",
  ];

  const isDefaultFooterRoute = defaultFooterRoutes.includes(location.pathname);
  const currentProperty = propertyList.find((p) => p.slug === propertyRoute);

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const linkHover = { scale: 1.05, color: "#F59E0B" };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      className={`relative w-full pt-12 pb-6 mt-12 text-white`}
      style={
        !isDefaultFooterRoute && currentProperty?.background_image
          ? {
              backgroundImage: `url(${currentProperty.background_image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : { backgroundColor: "var(--kifaru-body)" }
      }
    >
      {/* Overlay for property footers */}
      {!isDefaultFooterRoute && currentProperty?.background_image && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      )}

      <div className="relative z-10 container mx-auto px-3 md:px-9">
        {isDefaultFooterRoute ? (
          <motion.div
            className="grid md:grid-cols-4 gap-4 mb-10"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {/* Brand */}
            <motion.div variants={fadeUp}>
              <div className="flex flex-row items-center gap-2 mb-4">
                <img
                  src={logo}
                  alt="Kifaru Logo"
                  className="w-16 h-16 object-contain"
                />
                <h2 className="text-3xl font-bold text-white">Kifaru</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                Blending luxury, nature, and African culture into unforgettable
                experiences.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold text-white mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.to}
                    whileHover={linkHover}
                    className="transition-colors"
                  >
                    <Link to={link.to}>{link.label}</Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Destinations */}
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold text-white mb-3">
                Destinations
              </h3>
              <ul className="space-y-2">
                {propertyList.slice(0, 5).map((property) => (
                  <motion.li
                    key={property.id}
                    whileHover={linkHover}
                    className="transition-colors"
                  >
                    <Link to={`/property/${property.slug}`}>
                      {property.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
              <ul className="space-y-2 text-lg text-gray-300">
                <li>Email: requests@techbedkifaru.be</li>
                {/* <li>Phone: +254 708 533 033</li> */}
                {/* <li>Location: Nairobi, Kenya</li> */}
                <Link to="/auth/login">Admin</Link>
              </ul>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div className="text-center" variants={fadeUp}>
            <h2 className="text-2xl font-bold text-white mb-4">
              {currentProperty?.name || "Kifaru"}
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-md mx-auto">
              {(currentProperty?.description &&
                trimWords(currentProperty.description, 15)) ||
                "Experience luxury and nature in our exclusive properties."}
            </p>

            <motion.div className="flex justify-center space-x-6 mb-6">
              {navLinks.map((link) => (
                <motion.li
                  key={link.to}
                  className="list-none"
                  whileHover={linkHover}
                >
                  <Link
                    to={link.to}
                    className="text-lg transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.div>

            <div className="border-t border-gray-600 pt-6">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Kifaru. All rights reserved.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.footer>
  );
}
