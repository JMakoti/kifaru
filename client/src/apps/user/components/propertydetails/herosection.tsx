import { useState, useEffect, useCallback, useMemo } from "react";
import { MapPin } from "lucide-react";
import type { Property } from "@/types/property";
import { resolveImageSrc } from "@/hooks/resolveImage";
import { useNavigate } from "react-router";

interface HeroCarouselProps {
  property: Property;
}

export default function HeroCarousel({ property }: HeroCarouselProps) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const slides = useMemo(() => {
    if (!property?.property_images?.length) {
      return [
        {
          image: "/fallback-hero.jpg",
          location: property?.location || "",
          title: property?.name || "",
          tagline: property?.tagline || "",
        },
      ];
    }

    return property.property_images.map((image) => ({
      image: image.image,
      location: property.location,
      title: property.name,
      tagline: property.tagline,
    }));
  }, [property]);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  const slide = slides[current];

  if (!slide) return null;

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
    <section className="relative w-full overflow-hidden h-[60vh] md:h-[80vh] lg:h-[100vh]">
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={resolveImageSrc(s.image)}
            alt={property.name}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <div key={current} className="animate-fade-up max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6 text-white/80">
            <MapPin className="w-4 h-4" />
            <span className="text-xs sm:text-sm tracking-widest uppercase font-medium">
              {slide.location}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight leading-tight">
            {slide.title}
          </h1>

          {slide.tagline && (
            <p className="text-base sm:text-lg md:text-xl text-white/80 font-light mb-10 max-w-2xl mx-auto">
              {slide.tagline}
            </p>
          )}

          <button
            onClick={handleBookingClick}
            className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold bg-white text-black transition hover:bg-white/90 cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-white w-8"
                  : "bg-white/40 w-2 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
