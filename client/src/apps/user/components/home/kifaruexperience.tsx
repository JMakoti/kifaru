import { useState, useEffect } from "react";
import { Play } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    video:
      "https://res.cloudinary.com/drselhsl4/video/upload/v1769583865/Kifaru/kifaruvideos/kigpowsxbbohu1infyij.mp4",
    words: ["Easy &", "Transparent Booking"],
  },
  {
    id: 2,
    video:
      "https://res.cloudinary.com/drselhsl4/video/upload/v1769583936/Kifaru/kifaruvideos/gie2yfewwyy4yhvnz3zy.mp4",
    words: ["24/7 Care", "& Support"],
  },
  {
    id: 3,
    video:
      "https://res.cloudinary.com/drselhsl4/video/upload/v1769583900/Kifaru/kifaruvideos/krhqxd8msvs2vausokow.mp4",
    words: ["Dedicated", "Account Managers"],
  },
];

export default function VideoWordStack() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 30000);
    return () => clearInterval(slideTimer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] md:min-h-screen bg-white overflow-hidden font-sans p-4 sm:p-8">
      {/* Background Titles - Uses clamp() for fluid typography across all screens */}
      <div className="absolute inset-0 flex flex-col justify-between items-center opacity-10 md:opacity-20 select-none pointer-events-none py-4 md:py-12 z-0">
        <h1 className="text-[22vw] 2xl:text-[20rem] font-black leading-none tracking-tighter text-black">
          KIFARU
        </h1>
        <h1 className="text-[15vw] 2xl:text-[14rem] font-black leading-none tracking-tighter text-center text-black">
          EXPERIENCE
        </h1>
      </div>

      {/* Video Card Container - Responsive scaling based on viewport */}
      <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] lg:max-w-[450px] aspect-[3/4] z-10">
        {/* Decorative Background Layers - Scaled transforms for smaller screens */}
        <div className="absolute inset-0 bg-indigo-200 rounded-[1.5rem] sm:rounded-[2rem] shadow-lg transform -rotate-3 sm:-rotate-6 translate-x-2 sm:translate-x-4 translate-y-1 sm:translate-y-2" />
        <div className="absolute inset-0 bg-pink-200 rounded-[1.5rem] sm:rounded-[2rem] shadow-lg transform rotate-2 sm:rotate-3 -translate-x-1 sm:-translate-x-2" />

        {/* Main Video Card */}
        <div className="absolute inset-0 bg-black rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl overflow-hidden border-[4px] sm:border-[8px] border-white">
          <video
            key={SLIDES[index].video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={SLIDES[index].video} type="video/mp4" />
          </video>

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
