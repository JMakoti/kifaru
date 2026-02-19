"use client";

import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { Property } from "@/types/property";
import { resolveImageSrc } from "@/hooks/resolveImage";
import { useRef } from "react";
import { Link } from "react-router";

interface ExploreMoreProps {
  properties: Property[];
  currentPropertyId: number;
}

const ExploreMore = ({ properties, currentPropertyId }: ExploreMoreProps) => {
  const { ref } = useInView();
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProperties = properties.filter(
    (p) => p.id !== currentPropertyId,
  );

  const scrollByWidth = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const cardWidth = containerRef.current.firstChild
      ? (containerRef.current.firstChild as HTMLElement).clientWidth + 32 // +gap
      : 300;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="relative py-24 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-widest uppercase text-gray-500">
            Discover
          </span>
          <h2 className="text-4xl md:text-5xl text-gray-900 mt-3">
            Explore More Properties
          </h2>
        </div>

        {/* Scroll Arrows */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scrollByWidth("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-2 shadow hover:bg-white transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollByWidth("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-2 shadow hover:bg-white transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Property Grid (scrollable) */}
          <div
            ref={containerRef}
            className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide py-4"
          >
            {filteredProperties.map((p) => (
              <div
                key={p.name}
                className="bg-white rounded-lg overflow-hidden shadow-md flex-shrink-0 w-[300px] md:w-[350px] lg:w-[400px] flex flex-col"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={resolveImageSrc(p.background_image)}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <Link to={`/property/${p.slug}`} className="group block">
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 text-gray-500 text-md mb-2">
                      <MapPin className="w-3 h-3" />
                      {p.location}
                    </div>
                    <h3 className="text-xl mb-2 text-gray-900">{p.name}</h3>
                    <p className="text-md text-gray-600 mb-4 leading-relaxed flex-1">
                      {p.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-xl text-gray-900">
                          ${p.price}
                        </span>
                        <span className="text-xs text-gray-500"> / night</span>
                      </div>

                      <button className="flex items-center gap-1.5 text-md font-medium text-gray-900 hover:gap-3 transition-all cursor-pointer">
                        View Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreMore;
