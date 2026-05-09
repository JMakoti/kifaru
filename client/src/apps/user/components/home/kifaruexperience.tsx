import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import surf from "@/assets/images/jet_skiing.webp";
import culture from "@/assets/amenities/ma-cultural.webp";

const SLIDES = [
  {
    id: 1,
    video: "",
    fallbackImage: surf,
    words: ["Easy &", "Transparent Booking"],
  },
  {
    id: 2,
    video: "",
    fallbackImage: culture,
    words: ["24/7 Care", "& Support"],
  },
  {
    id: 3,
    video: "",
    fallbackImage: surf,
    words: ["Dedicated", "Account Managers"],
  },
];

const isVideoSource = (src: string) =>
  /\.(mp4|webm|ogg)(\?.*)?$/i.test(src) || src.includes("/video/upload/");

export default function VideoWordStack() {
  const [index, setIndex] = useState(0);
  const currentSlide = SLIDES[index];
  const shouldShowVideo = currentSlide.video && isVideoSource(currentSlide.video);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 30000);
    return () => clearInterval(slideTimer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] md:min-h-screen bg-white overflow-hidden p-4 sm:p-8">
      {/* Background Titles - Uses clamp() for fluid typography across all screens */}
      <div className="absolute inset-0 flex flex-col justify-between items-center opacity-10 md:opacity-20 select-none pointer-events-none py-4 md:py-12 z-0">
        <h1 className="text-[22vw] 2xl:text-[20rem] font-black leading-none tracking-tighter text-black">
          KIFARU
        </h1>
        <h1 className="text-[15vw] 2xl:text-[14rem] font-black leading-none tracking-tighter text-center text-black">
          EXPERIENCE
        </h1>
      </div>

      <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] lg:max-w-[450px] aspect-[3/4] z-10">
        <div className="absolute inset-0 bg-indigo-200 rounded-[1.5rem] sm:rounded-[2rem] shadow-lg transform -rotate-3 sm:-rotate-6 translate-x-2 sm:translate-x-4 translate-y-1 sm:translate-y-2" />
        <div className="absolute inset-0 bg-pink-200 rounded-[1.5rem] sm:rounded-[2rem] shadow-lg transform rotate-2 sm:rotate-3 -translate-x-1 sm:-translate-x-2" />

        {/* Main Video Card */}
        <div className="absolute inset-0 bg-black rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl overflow-hidden border-[4px] sm:border-[8px] border-white">
          <img
            src={currentSlide.fallbackImage}
            alt={currentSlide.words.join(" ")}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {shouldShowVideo && (
            <video
              key={currentSlide.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={currentSlide.fallbackImage}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={currentSlide.video} type="video/mp4" />
            </video>
          )}

          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

          {/* Interactive Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="group cursor-pointer w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-md transition-transform hover:scale-110">
              <Play className="text-white fill-white w-6 h-6 sm:w-8 sm:h-8 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
