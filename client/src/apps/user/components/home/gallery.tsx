"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { GalleryPhoto } from "@/services/property.types";
import { useGallery } from "@/services/property.service";

interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  mobileWidth: string;
  desktopWidth: string;
}

interface ScrollingRowProps {
  items: GalleryItem[];
  speed: number;
  reverse?: boolean;
  isPaused: boolean;
}

function ScrollingRow({
  items,
  speed,
  reverse = false,
  isPaused,
}: ScrollingRowProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-3 md:gap-5"
        animate={{
          x: isPaused ? undefined : reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        }}
      >
        {[...items, ...items].map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className={`relative h-[180px] md:h-[260px] ${item.mobileWidth} ${item.desktopWidth} flex-shrink-0 group overflow-hidden bg-zinc-100 border border-zinc-200 rounded-sm`}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-in-out group-hover:scale-110"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 md:bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
              <div className="px-4 py-2 text-center">
                <p className="text-white text-xs md:text-lg font-bold tracking-[0.2em] uppercase whitespace-normal max-w-[200px]">
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
const mapGalleryPhotosToUI = (photos: GalleryPhoto[]): GalleryItem[] =>
  photos
    .sort((a, b) => a.order - b.order)
    .map((photo, index) => ({
      id: photo.id,
      title: photo.title,
      imageUrl: photo.image,
      mobileWidth: index % 2 === 0 ? "w-[280px]" : "w-[220px]",
      desktopWidth: index % 3 === 0 ? "md:w-[550px]" : "md:w-[350px]",
    }));

export default function KifaruGallery() {
  const [isPaused, setIsPaused] = useState(false);
  const { data = [], isLoading } = useGallery();

  const galleryData = useMemo(() => mapGalleryPhotosToUI(data), [data]);

  const half = Math.ceil(galleryData.length / 2);
  const row1 = galleryData.slice(0, half);
  const row2 = galleryData.slice(half);

  if (isLoading || galleryData.length === 0) return null;

  return (
    <section
      className="bg-white py-12 md:py-24 w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="px-10 mb-12 flex items-baseline justify-between">
        <div className="flex items-baseline gap-4">
          <h2 className="text-3xl font-bold tracking-tighter uppercase text-black">
            Kifaru Gallery
          </h2>
          <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.3em]">
            Archive 2026
          </span>
        </div>
        <div className="hidden md:block h-[1px] flex-grow mx-8 bg-zinc-100" />
      </div>

      <div className="flex flex-col gap-2 md:gap-4">
        <ScrollingRow items={row1} speed={25} isPaused={isPaused} />
        <ScrollingRow items={row2} speed={30} reverse isPaused={isPaused} />
      </div>
    </section>
  );
}
