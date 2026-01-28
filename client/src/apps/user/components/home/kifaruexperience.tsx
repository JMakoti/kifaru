import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
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

// Generate random horizontal offsets, either left (-) or right (+)
// const randomHorizontalOffset = () => (Math.random() < 0.5 ? -1 : 1) * (100 + Math.random() * 50);

export default function VideoWordStack() {
  const [index, setIndex] = useState(0);
  // const [wordOffsets, setWordOffsets] = useState(SLIDES[0].words.map(() => 0));

  // Change slide every 30s
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
      // setWordOffsets(SLIDES[(index + 1) % SLIDES.length].words.map(() => 0));
    }, 30000);
    return () => clearInterval(slideTimer);
  }, [index]);

  // Float words continuously every 2s
  // useEffect(() => {
  //   const floatTimer = setInterval(() => {
  //     setWordOffsets(SLIDES[index].words.map(() => randomHorizontalOffset()));
  //   }, 2000);
  //   return () => clearInterval(floatTimer);
  // }, [index]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[600px] md:min-h-[800px] bg-white overflow-visible font-sans p-4">
      {/* Background Titles */}
      <div className="absolute inset-0 flex flex-col justify-between items-center opacity-70 md:opacity-70 select-none pointer-events-none py-10">
        <h1 className="text-[18vw] md:text-[15rem] font-black leading-none tracking-tighter text-black">
          KIFARU
        </h1>
        <h1 className="text-[12vw] md:text-[10rem] font-black leading-none tracking-tighter text-center text-black">
          EXPERIENCE
        </h1>
      </div>

      {/* Video Card */}
      <div className="relative w-full max-w-[320px] sm:max-w-[380px] aspect-[3/4]">
        <div className="absolute inset-0 bg-indigo-200 rounded-[2rem] shadow-lg transform -rotate-3 sm:-rotate-6 translate-x-2 sm:translate-x-4 translate-y-1 sm:translate-y-2" />
        <div className="absolute inset-0 bg-pink-200 rounded-[2rem] shadow-lg transform rotate-2 sm:rotate-3 -translate-x-1 sm:-translate-x-2" />

        <div className="absolute inset-0 bg-black rounded-[2rem] shadow-2xl overflow-hidden border-[4px] sm:border-[6px] border-white">
          <video
            key={SLIDES[index].video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-110"
          >
            <source src={SLIDES[index].video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white/50 flex items-center justify-center bg-white/10 backdrop-blur-md">
              <Play className="text-white fill-white w-5 h-5 sm:w-6 sm:h-6 ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Words Centered Vertically */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        {SLIDES[index].words.map((word, i) => (
          <motion.h2
            key={`${index}-${i}`}
            animate={{
              x: wordOffsets[i], // horizontal float only
              y: Math.random() * 20 - 10, // slight vertical jitter
            }}
            initial={{ x: 0, y: 0 }}
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: 2,
            }}
            className={`absolute text-2xl sm:text-3xl font-black italic tracking-tighter text-black drop-shadow-lg`}
          >
            {word}
          </motion.h2>
        ))}
      </div> */}
    </div>
  );
}
