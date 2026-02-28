"use client";

import { resolveImageSrc } from "@/hooks/resolveImage";
import { useInView } from "@/hooks/useInView";
import type { PropertyImage } from "@/types/property";
import { useEffect, useRef, useState } from "react";

interface GalleryProps {
  gallery?: PropertyImage[];
}
const GallerySection = ({ gallery }: GalleryProps) => {
  const [showAll, setShowAll] = useState(false);
  const { ref, isInView } = useInView();
  const containerRef = useRef<HTMLDivElement>(null);

  // Infinite scroll
  useEffect(() => {
    let animationFrame: number;

    const scroll = () => {
      if (!containerRef.current) return;

      containerRef.current.scrollLeft += 1;
      if (
        containerRef.current.scrollLeft >=
        containerRef.current.scrollWidth / 2
      ) {
        containerRef.current.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  if (!gallery || gallery.length === 0) return null;
  const visible = showAll ? gallery : gallery.slice(0, 6);

  return (
    <section
      className="bg-background py-20 px-6 md:px-12 lg:px-20 bg-gray-50 overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-widest uppercase text-gray-500">
            Visual Tour
          </span>
          <h2 className="text-4xl md:text-5xl text-gray-900 mt-3">
            Gallery
          </h2>
        </div>

        <div
          ref={containerRef}
          className={`flex-1 overflow-y-auto px-6 py-6 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } transition-all duration-1000`}
        >
          {visible.length === 0 ? (
            <p className="text-muted-foreground">
              No photos available for this category.
            </p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {visible.map((photo, index) => {
                const itemsPerRow = 3;

                const rowIndex = Math.floor(index / itemsPerRow);
                const positionInRow = index % itemsPerRow;

                // Rotate large image position
                const largePosition = rowIndex % itemsPerRow;

                const isLarge = positionInRow === largePosition;

                const mobileWidth = "w-[300px]";
                const desktopWidth = isLarge ? "md:w-[450px]" : "md:w-[300px]";

                return (
                  <div
                    key={index}
                    className={`rounded-lg overflow-hidden group cursor-pointer ${mobileWidth} ${desktopWidth}`}
                  >
                    <div className="w-full h-[180px] sm:h-[200px] md:h-[240px] lg:h-[280px] overflow-hidden rounded-lg">
                      <img
                        src={resolveImageSrc(photo.image)}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {!showAll && gallery.length > 6 && (
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

export default GallerySection;
