"use client";

import { useInView } from "@/hooks/useInView";
import type { PricingOption, Property } from "@/types/property";
import { useNavigate } from "react-router";

interface PackageProps {
  packages?: PricingOption[];
  property: Property;
}

const PackagesSection = ({ packages, property }: PackageProps) => {
  const { ref, isInView } = useInView();
  const navigate = useNavigate();
  if (!packages || packages.length === 0) return null;

  const formatAccommodationType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleBookingClick = () => {
    navigate(`/property/${property.slug}/booking`, {
      state: {
        id: property.id,
        name: property.name,
        max_guests: property.max_guests,
        slug: property.slug,
        prepayment_percentage: property.prepayment_percentage,
        cancellation_days: property.cancellation_days,
      },
    });
  };

  const location = property.location?.toLowerCase() ?? "";
  const description = property.location_description?.toLowerCase() ?? "";
  const name = property.name?.toLowerCase() ?? "";

  // ONLY Close the Gap HUB
  const isCloseTheGap =
    name.includes("close the gap") ||
    name.includes("Close the Gap Hub") ||
    location.includes("close the gap") ||
    description.includes("tamarind hotel") ||
    description.includes("nyali bridge") ||
    description.includes("mombasa creek");

  const packageCount = packages.length;
  const packagesLayoutClass =
    packageCount === 1
      ? "grid grid-cols-1 max-w-2xl mx-auto"
      : packageCount === 2
        ? "grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto"
        : "grid grid-cols-1 md:grid-cols-3";

  return (
    <section className="bg-background py-20 px-6 md:px-12 lg:px-20" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-sm font-medium tracking-widest uppercase text-gray-500">
            Choose Your Stay
          </span>
          <h2 className="text-4xl md:text-5xl text-gray-900 mt-3">
            Property Packages
          </h2>
        </div>

        {/* Packages Grid */}
        <div
          className={`${packagesLayoutClass} gap-6 items-stretch transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {packages.map((pkg) => (
            <div
              key={pkg.accommodation_type}
              className={`bg-card flex flex-col border border-gray-200`}
            >
              <div className="p-8 flex flex-col flex-1">
                {/* Package Name */}
                <h3 className="text-2xl mb-6 text-gray-900">
                  {formatAccommodationType(pkg.accommodation_type)}
                </h3>

                {/* Pricing */}
                <div className="space-y-2 mb-6">
                  {pkg.price_per_night && (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl text-gray-900">
                        €{pkg.price_per_night}
                      </span>
                      <span className="text-sm text-gray-500">/ night</span>
                    </div>
                  )}

                  <div className="text-3xl text-gray-900">
                    {pkg.weekly_price && (
                      <div className="text-3xl text-gray-900">
                        €{pkg.weekly_price.toLocaleString()}
                        <span className="text-sm text-gray-500">/ week</span>
                      </div>
                    )}
                    
                  </div>
                  <div className="text-xs text-gray-400">
                    {pkg.min_nights} nights
                  </div>
                </div>

                {/* Services */}
                <div className="border-t border-gray-200 pt-6 mb-8 flex-1">
                  <ul className="space-y-3">
                  </ul>
                </div>

                <button
                  onClick={!isCloseTheGap ? handleBookingClick : undefined}
                  disabled={isCloseTheGap}
                  className={`uppercase flex items-center justify-center py-3 text-sm tracking-wider rounded transition-colors
    ${
      isCloseTheGap
        ? "border-2 border-gray-300 text-gray-600 bg-gray-50 font-bold uppercase cursor-not-allowed"
        : "bg-accent text-white hover:bg-accent font-semibold cursor-pointer"
    }`}
                >
                  {isCloseTheGap ? "Coming Soon..." : "Reserve Package"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
