import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    video:
      "https://res.cloudinary.com/drselhsl4/video/upload/v1768159278/Kifaru/jyxq43ne939bishlyvnn.mp4",
    words: ["Easy &", "Transparent Booking"],
  },
  {
    id: 2,
    video:
      "https://drive.google.com/file/d/1hkhlLOo8AphBjqdiVPau1-krltIFci8B/view?usp=sharing",
    words: ["24/7 Care", "& Support"],
  },
  {
    id: 3,
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-underwater-shot-1200-large.mp4",
    words: ["Dedicated", "Account Managers"],
  },
];

export default function VideoWordStack() {
  const [index, setIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const mainTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
      setWordIndex(0);
    }, 30000);

    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => {
      clearInterval(mainTimer);
      clearInterval(wordTimer);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-[600px] md:min-h-[800px] bg-white overflow-hidden font-sans p-4">
      <div className="absolute inset-0 flex flex-col justify-between items-center opacity-5 md:opacity-10 select-none pointer-events-none py-10">
        <h1 className="text-[18vw] md:text-[15rem] font-black leading-none tracking-tighter">
          KIFARU
        </h1>
        <h1 className="text-[12vw] md:text-[10rem] font-black leading-none tracking-tighter text-center">
          EXPERIENCE
        </h1>
      </div>
      <div className="relative w-full max-w-[320px] sm:max-w-[380px] aspect-[3/4]">
        <div className="absolute inset-0 bg-indigo-200 rounded-[2rem] shadow-lg transform -rotate-3 sm:-rotate-6 translate-x-2 sm:translate-x-4 translate-y-1 sm:translate-y-2" />
        <div className="absolute inset-0 bg-pink-200 rounded-[2rem] shadow-lg transform rotate-2 sm:rotate-3 -translate-x-1 sm:-translate-x-2" />

        <motion.div
          className="absolute inset-0 bg-black rounded-[2rem] shadow-2xl overflow-hidden border-[4px] sm:border-[6px] border-white"
          animate={{ rotate: -1 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full"
            >
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
              <div className="absolute inset-0 p-6 sm:p-8 z-20 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={`${index}-${wordIndex}`}
                    initial={{ y: 15, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -15, opacity: 0, scale: 1.1 }}
                    className={`absolute text-white font-black text-2xl sm:text-3xl italic tracking-tighter drop-shadow-2xl
                      ${wordIndex === 0 ? "top-6 left-6 sm:top-10 sm:left-8" : "bottom-20 right-6 sm:bottom-24 sm:right-8"}`}
                  >
                    {SLIDES[index].words[wordIndex]}
                  </motion.h2>
                </AnimatePresence>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white/50 flex items-center justify-center bg-white/10 backdrop-blur-md">
                  <Play className="text-white fill-white w-5 h-5 sm:w-6 sm:h-6 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center gap-2 sm:gap-3">
                {SLIDES.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      width:
                        i === index ? (window?.innerWidth < 640 ? 24 : 32) : 8,
                      backgroundColor:
                        i === index
                          ? "rgba(255,255,255,1)"
                          : "rgba(255,255,255,0.4)",
                    }}
                    className="h-1.5 sm:h-2 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
