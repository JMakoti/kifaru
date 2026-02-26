import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import type { Highlight } from "@/types/property";
import { resolveImageSrc } from "@/hooks/resolveImage";

interface HighlightProps {
  highlights?: Highlight[];
}

const PropertyHighlights = ({ highlights = [] }: HighlightProps) => {
  const [showAll, setShowAll] = useState(false);
  const { ref, isInView } = useInView();

  if (!highlights.length) return null;

  const visible = showAll ? highlights : highlights.slice(0, 4);

  return (
    <section className="py-12 sm:py-16 bg-gray-50/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-medium tracking-widest uppercase text-gray-500">
            Discover
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
            Property Highlights
          </h2>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {visible.map((h, i) => (
            <div
              key={h.title}
              className="relative overflow-hidden rounded-lg group aspect-[4/5]"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <img
                src={resolveImageSrc(h.image)}
                alt={h.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end p-6 z-10 bg-gradient-to-t from-black/40 to-transparent">
                <h3 className="text-white text-xl font-semibold drop-shadow">
                  {h.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {!showAll && highlights.length > 4 && (
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center px-5 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 cursor-pointer"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyHighlights;
