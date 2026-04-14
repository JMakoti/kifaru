import { Link } from "react-router";
import { Button } from "../../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import kifaruhero from "@/assets/kifaruhero.mp4";
import herobg from "@/assets/images/hero-bg.jpg";

const subHeading = [
  "Where purpose, place, and people meet.",
  "Distinct destinations, united by one philosophy",
  "Where each property tells a story of place, culture, and intention",
  "Sustainable luxury without compromise",
  "A network of changemakers, creators, and leaders",
  "Peace of mind built into every detail",
  "Where each encounter leaves a lasting impression",
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % subHeading.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="relative overflow-hidden min-h-[600px] flex items-center justify-center">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-20"
          poster={herobg}
        >
          <source src={kifaruhero} type="video/mp4" />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('" + herobg + "')",
            }}
          ></div>
        </video>

        <div className="absolute inset-0 bg-black/40 -z-10"></div>

        <div className="container-custom section-padding relative z-10 flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-center">
            <span className="text-gradient-blue">Kifaru Impact Retreat</span>
            <br />
            <span className="block mt-4 text-3xl font-medium h-[1.5em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={subHeading[index]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block text-gradient-blue"
                >
                  {subHeading[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <div className="mt-20 md:mt-10 flex flex-col sm:flex-row gap-4">
            <Button
              className="bg-[var(--kifaru-accent)] hover:text-white  text-xl text-primary flex items-center gap-2 animate-pulse px-4 py-3"
              asChild
            >
              <Link to="/property">Explore Our Retreats</Link>
            </Button>
            <Button
              className="bg-white hover:bg-gray-100 text-primary-600 text-xl  flex items-center gap-2 px-4 py-3"
              asChild
            >
              <Link to="/contact">
                Plan Your Stay <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
