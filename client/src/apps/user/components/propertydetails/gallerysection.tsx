"use client";

import { resolveImageSrc } from "@/hooks/resolveImage";
import { useInView } from "@/hooks/useInView";
import type { PropertyImage } from "@/types/property";
import { useMemo, useState } from "react";

interface GalleryProps {
  gallery?: PropertyImage[];
}
const GallerySection = ({ gallery }: GalleryProps) => {
  const [showAll, setShowAll] = useState(false);
  const { ref, isInView } = useInView();
  const orderedGallery = useMemo(
    () => [...(gallery ?? [])].sort((a, b) => a.order - b.order),
    [gallery],
  );

  if (orderedGallery.length === 0) return null;
  const visible = showAll ? orderedGallery : orderedGallery.slice(0, 6);

  return (
    <section
      className="overflow-hidden bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-20"
      ref={ref}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-12 md:mb-16">
          <span className="text-sm font-medium tracking-widest uppercase text-gray-500">
            Visual Tour
          </span>
          <h2 className="mt-3 text-3xl leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Gallery
          </h2>
        </div>

        <div
          className={`px-0 py-2 sm:py-4 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } transition-all duration-1000`}
        >
          {visible.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No photos available for this category.
            </p>
          ) : (
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              {visible.map((photo, index) => {
                const itemsPerRow = 3;

                const rowIndex = Math.floor(index / itemsPerRow);
                const positionInRow = index % itemsPerRow;

                // Rotate large image position
                const largePosition = rowIndex % itemsPerRow;

                const isLarge = positionInRow === largePosition;
                const desktopWidth = isLarge ? "md:w-[440px]" : "md:w-[310px]";

                return (
                  <div
                    key={index}
                    className={`group mx-auto w-full max-w-[calc(100vw-2rem)] cursor-pointer overflow-hidden rounded-lg sm:max-w-[calc(100vw-3rem)] md:mx-0 md:max-w-none ${desktopWidth}`}
                  >
                    <div
                      className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-200 md:aspect-auto md:h-[240px] lg:h-[280px]"
                    >
                      <img
                        src={resolveImageSrc(photo.image)}
                        alt={`Gallery ${index + 1}`}
                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {!showAll && orderedGallery.length > 6 && (
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
