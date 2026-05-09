import {
  ChefHat,
  Sofa,
  Bed,
  TreePine,
  Shield,
  ConciergeBell,
  Check,
  type LucideIcon,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { Amenities, AmenityItem } from "@/types/property";

interface AmenitiesProps {
  amenities: Amenities;
}

const iconMap: Record<string, LucideIcon> = {
  kitchen: ChefHat,
  bedroom: Bed,
  livingroom: Sofa,
  outdoor: TreePine,
  security: Shield,
  services: ConciergeBell,
};

const AmenitiesSection = ({ amenities }: AmenitiesProps) => {
  const { ref, isInView } = useInView();

  if (!amenities) return null;

  // Get all categories
  const categories = Object.entries(amenities);
  const totalCategories = categories.length;

  // Determine grid layout and card splitting logic
  let gridClasses = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
  let justifyCenter = false;
  let cardSizeClass = "";
  let cardsToRender: Array<{
    category: string;
    items: AmenityItem[];
    title: string;
    isSpecial?: boolean;
  }> = [];

  if (totalCategories === 1) {
    // Single category - check if we need to split
    const [categoryName, items] = categories[0];
    if (items.length > 4) {
      // Split into 2 cards
      const midPoint = Math.ceil(items.length / 2);
      cardsToRender = [
        {
          category: categoryName,
          items: items.slice(0, midPoint),
          title: `${categoryName}`,
        },
        {
          category: categoryName,
          items: items.slice(midPoint),
          title: `${categoryName}`,
        },
      ];
      gridClasses =
        "grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-4xl mx-auto";
      justifyCenter = true;
      cardSizeClass = "md:col-span-1"; // Make cards larger in 2-column layout
    } else {
      cardsToRender = [{ category: categoryName, items, title: categoryName }];
      gridClasses = "grid grid-cols-1 justify-center max-w-2xl mx-auto";
      justifyCenter = true;
      cardSizeClass = "w-full max-w-lg"; // Single large card
    }
  } else if (totalCategories === 2) {
    // Two categories - center them
    cardsToRender = categories.map(([category, items]) => ({
      category,
      items,
      title: category,
    }));
    gridClasses =
      "grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-4xl mx-auto";
    justifyCenter = true;
    cardSizeClass = "md:col-span-1"; // Make cards larger
  } else if (totalCategories === 3) {
    // Three categories - center them
    cardsToRender = categories.map(([category, items]) => ({
      category,
      items,
      title: category,
    }));
    gridClasses =
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto";
    justifyCenter = true;
  } else if (totalCategories === 4) {
    // Four categories - first 3 normal, 4th centered and large
    const allCards = categories.map(([category, items]) => ({
      category,
      items,
      title: category,
    }));
    cardsToRender = [
      ...allCards.slice(0, 3),
      { ...allCards[3], isSpecial: true },
    ];
    gridClasses = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
  } else {
    // Five or more - original layout
    cardsToRender = categories.map(([category, items]) => ({
      category,
      items,
      title: category,
    }));
  }

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-widest uppercase text-gray-500">
            Everything You Need
          </span>
          <h2 className="text-4xl md:text-5xl text-gray-900 mt-3">
            Amenities & Services
          </h2>
        </div>

        {/* Dynamic Grid */}
        <div className="space-y-12">
          <div
            className={`${gridClasses} ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } transition-all duration-1000 ${justifyCenter ? "justify-center" : ""}`}
          >
            {cardsToRender
              .filter((card) => !card.isSpecial)
              .map((card, i) => {
                return (
                  <div
                    key={`${card.category}-${i}`}
                    className={`flex flex-col bg-card p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 ${cardSizeClass}`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    {/* Category Title */}
                    <h3 className="text-xl mb-3 text-gray-900 capitalize">
                      {card.title}
                    </h3>

                    {/* Items */}
                    <ul className="space-y-2">
                      {card.items.map((item, index) => {
                        const ItemIcon =
                          iconMap[item.icon.toLowerCase()] || Check;

                        return (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <ItemIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
                            {item.title}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
          </div>

          {/* Special Cards - Centered and Large */}
          {cardsToRender.filter((card) => card.isSpecial).length > 0 && (
            <div
              className={`flex justify-center ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} transition-all duration-1000`}
            >
              <div className="w-full max-w-2xl space-y-8">
                {cardsToRender
                  .filter((card) => card.isSpecial)
                  .map((card, i) => {
                    return (
                      <div
                        key={`${card.category}-special-${i}`}
                        className="flex flex-col bg-card p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                        style={{
                          transitionDelay: `${(cardsToRender.length - 1 + i) * 100}ms`,
                        }}
                      >
                        {/* Category Title */}
                        <h3 className="text-xl mb-3 text-gray-900 capitalize">
                          {card.title}
                        </h3>

                        {/* Items */}
                        <ul className="space-y-2">
                          {card.items.map((item, index) => {
                            const ItemIcon =
                              iconMap[item.icon.toLowerCase()] || Check;

                            return (
                              <li
                                key={index}
                                className="flex items-center gap-2 text-sm text-gray-600"
                              >
                                <ItemIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
                                {item.title}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
