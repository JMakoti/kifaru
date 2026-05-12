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
    const gap = Number.parseFloat(
      window.getComputedStyle(containerRef.current).columnGap,
    );
    const cardWidth = containerRef.current.firstChild
      ? (containerRef.current.firstChild as HTMLElement).clientWidth + gap
      : 300;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const trimWords = (text: string, wordCount: number) => {
    return text.split(" ").slice(0, wordCount).join(" ") + "...";
  };

  return (
    <section className="relative bg-gray-50 py-14 sm:py-16 md:py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-12 md:mb-16">
          <span className="text-sm font-medium tracking-widest uppercase text-gray-500">
            Discover
          </span>
          <h2 className="mt-3 text-3xl leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Explore More Properties
          </h2>
        </div>

        {/* Scroll Arrows */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scrollByWidth("left")}
            className="absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow transition hover:bg-white sm:left-0"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700 sm:h-6 sm:w-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollByWidth("right")}
            className="absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow transition hover:bg-white sm:right-0"
          >
            <ChevronRight className="h-5 w-5 text-gray-700 sm:h-6 sm:w-6" />
          </button>

          {/* Property Grid (scrollable) */}
          <div
            ref={containerRef}
            className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth px-1 py-4 sm:gap-6 md:gap-8 md:px-0"
          >
            {filteredProperties.map((p) => (
              <div
                key={p.name}
                className="flex w-[calc(100vw-3rem)] max-w-[300px] flex-shrink-0 flex-col overflow-hidden rounded-lg bg-white shadow-md sm:w-[300px] md:w-[350px] md:max-w-none lg:w-[400px]"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden sm:h-64">
                  <img
                    src={resolveImageSrc(p.background_image)}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <Link to={`/property/${p.slug}`} className="group block">
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="mb-2 flex items-center gap-1.5 text-md text-gray-500">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{p.location}</span>
                    </div>
                    <h3 className="text-xl mb-2 text-gray-900">{p.name}</h3>
                    <p className="text-md text-gray-600 mb-4 leading-relaxed flex-1">
                      {p.description && trimWords(p.description, 15)}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-xl text-gray-900">
                          €{p.price}
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
