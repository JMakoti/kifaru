import {
  ChefHat, Sofa, Bed, TreePine, Shield, ConciergeBell, Check,
  type LucideIcon,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { Amenities } from "@/types/property";

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

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-widest uppercase text-gray-500 font-sans">
            Everything You Need
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-3">
            Amenities & Services
          </h2>
        </div>

        {/* Dynamic Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } transition-all duration-1000`}
        >
          {Object.entries(amenities).map(([category, items], i) => {
            const CategoryIcon = iconMap[category.toLowerCase()] || ChefHat;

            return (
              <div
                key={category}
                className="flex flex-col bg-card p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Category Icon */}
                <div className="w-16 h-16 flex items-center justify-center mb-4 text-gray-900">
                  <CategoryIcon className="w-10 h-10" />
                </div>

                {/* Category Title */}
                <h3 className="text-xl mb-3 text-gray-900 capitalize">
                  {category}
                </h3>

                {/* Items */}
                <ul className="space-y-2">
                  {items.map((item, index) => {
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
    </section>
  );
};

export default AmenitiesSection;
