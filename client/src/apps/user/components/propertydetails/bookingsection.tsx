"use client";

import { CalendarCheck, Mail, MessageCircle, Phone } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { Contact, Property } from "@/types/property";
import { resolveImageSrc } from "@/hooks/resolveImage";
import { useNavigate } from "react-router";

interface BookingProps {
  contacts?: Contact[];
  property: Property;
}

const ReadyToBook = ({ contacts, property }: BookingProps) => {
  const { ref, isInView } = useInView();

  const primaryContact = contacts?.[0];
  const email = primaryContact?.email;
  const phone = primaryContact?.phone;
  const whatsapp = primaryContact?.whatsapp;

  const navigate = useNavigate();

  const handleBookingClick = () => {
    // redirect if property is msambweni
    const name = property.name?.trim().toLowerCase() || "";
    const location = property.location?.trim().toLowerCase() || "";

    // Check for keywords in name & location
    const isOceanKifaru =
      name.includes("ocean kifaru") || name.includes("msambweni");
    const isMsambweni =
      location.includes("msambweni") || location.includes("south coast");

    if (isOceanKifaru && isMsambweni) {
      window.location.assign("https://oneocean.co.ke/");
      return;
    }
    // redirect for netherland in season
    const inSeasonMonths = [3, 4, 5, 6, 7, 8]; // April (3) to September (8)
    const currentMonth = new Date().getMonth();

    const isOceanNetherlands =
      name.includes("ocean kifaru") || name.includes("north sea");
    const isNetherlands =
      location.includes("netherlands") || location.includes("cadzand");
    if (
      isOceanNetherlands &&
      isNetherlands &&
      inSeasonMonths.includes(currentMonth)
    ) {
      // Redirect to local partner for in-season
      window.location.assign(
        "https://www.villamer.nl/accommodaties/sincfal-28-cadzand",
      );
      return;
    }

    // Otherwise, use internal navigation
    navigate(`/property/${property.slug}/booking`, {
      state: {
        id: property.id,
        name: property.name,
        max_guests: property.max_guests,
        slug: property.slug,
      },
    });
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={resolveImageSrc(property.background_image)}
          alt={property.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Content */}
      <div
        className={`max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10 text-center transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
          Ready to Book Your Stay?
        </h2>
        <p className="text-white/70 text-lg mb-12 max-w-xl mx-auto font-sans">
          Choose your preferred way to get in touch with us and start planning
          your dream getaway.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleBookingClick}
            className="flex items-center gap-2 px-5 py-3 bg-accent text-white font-semibold text-sm uppercase tracking-wider rounded transition-colors hover:bg-accent cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            Check Availability
          </button>

          {/* Email */}
          {email && (
            <a
              href={`mailto:${email}?subject=Inquiry about ${encodeURIComponent(
                property.name,
              )}`}
              className="flex items-center gap-2 px-5 py-3 border border-white/40 text-white font-semibold text-sm uppercase tracking-wider rounded hover:bg-white/10 hover:border-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact via Email
            </a>
          )}

          {/* WhatsApp */}
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=Inquiry about ${encodeURIComponent(
                property.name,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 border border-white/40 text-white font-semibold text-sm uppercase tracking-wider rounded hover:bg-white/10 hover:border-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          )}

          {/* Phone */}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 px-5 py-3 border border-white/40 text-white font-semibold text-sm uppercase tracking-wider rounded hover:bg-white/10 hover:border-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              Direct Call
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReadyToBook;
