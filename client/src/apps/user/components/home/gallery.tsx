"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  mobileWidth: string;
  desktopWidth: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 1,
    title: "Ocean Kifaru Indian Ocean",
    imageUrl:
      "https://res.cloudinary.com/drselhsl4/image/upload/v1769108215/Kifaru/KifaruGallery/znxgb9uxeajnj1wvwonk.jpg",
    mobileWidth: "w-[280px]",
    desktopWidth: "md:w-[550px]",
  },
  {
    id: 2,
    title: "Kifaru Beligium",
    imageUrl:
      "https://res.cloudinary.com/drselhsl4/image/upload/v1769107862/Kifaru/KifaruGallery/o90addoqleyd2hhc4p2b.jpg",
    mobileWidth: "w-[200px]",
    desktopWidth: "md:w-[300px]",
  },
  {
    id: 3,
    title: "Kifaru Beligium",
    imageUrl:
      "https://res.cloudinary.com/drselhsl4/image/upload/v1769107914/Kifaru/KifaruGallery/szcndfazzvayvc0yjvxu.jpg",
    mobileWidth: "w-[240px]",
    desktopWidth: "md:w-[400px]",
  },
  {
    id: 4,
    title: "Ocean Kifaru Indian Ocean",
    imageUrl:
      "https://res.cloudinary.com/drselhsl4/image/upload/v1769108212/Kifaru/KifaruGallery/exhzotyue5u6hma5nytf.jpg",
    mobileWidth: "w-[300px]",
    desktopWidth: "md:w-[600px]",
  },
  {
    id: 5,
    title: "Tech & Bed Kifaru Brussels",
    imageUrl:
      "https://res.cloudinary.com/drselhsl4/image/upload/v1769107834/Kifaru/KifaruGallery/musx5o2xlveqguyl4ldk.jpg",
    mobileWidth: "w-[260px]",
    desktopWidth: "md:w-[450px]",
  },
  {
    id: 6,
    title: "Ocean Kifaru Indian Ocean",
    imageUrl:
      "https://res.cloudinary.com/drselhsl4/image/upload/v1763483919/Kifaru/k096rs8b5wqru5dwghax.jpg",
    mobileWidth: "w-[280px]",
    desktopWidth: "md:w-[520px]",
  },
  {
    id: 7,
    title: "Kifaru Marbe Inn",
    imageUrl:
      "https://res.cloudinary.com/drselhsl4/image/upload/v1769107877/Kifaru/KifaruGallery/wredu87akirqkhj5sw6u.jpg",
    mobileWidth: "w-[220px]",
    desktopWidth: "md:w-[350px]",
  },
  {
    id: 8,
    title: "Close the Gap Hub",
    imageUrl:
      "https://res.cloudinary.com/drselhsl4/image/upload/v1769109253/Kifaru/KifaruGallery/d1cszhpzcr9wnbiwspzo.jpg",
    mobileWidth: "w-[280px]",
    desktopWidth: "md:w-[500px]",
  },
  {
    id: 9,
    title: "Ocean Kifaru Indian Ocean",
    imageUrl:
      "https://res.cloudinary.com/drselhsl4/image/upload/v1769111772/Kifaru/KifaruGallery/fxkwbqmcbi07zc68iukl.jpg",
    mobileWidth: "w-[290px]",
    desktopWidth: "md:w-[550px]",
  },
];



export default function KifaruGallery() {
  const [isPaused, setIsPaused] = useState(false);

  const half = Math.ceil(galleryData.length / 2);
  const row1 = galleryData.slice(0, half);
  const row2 = galleryData.slice(half);

  const ScrollingRow = ({
    items,
    speed,
    reverse = false,
  }: {
    items: GalleryItem[];
    speed: number;
    reverse?: boolean;
  }) => (
    <div className="flex mb-4 overflow-hidden mask-fade-edges">
      <motion.div
        className="flex gap-3 md:gap-4 px-2"
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{
          x: isPaused ? undefined : reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
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
        <ScrollingRow items={row1} speed={25} />
        <ScrollingRow items={row2} speed={30} reverse />
      </div>
    </section>
  );
}
