import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const smallCards = [
  {
    title: "Coastal Retreats",
    desc: "Peaceful beachfront escapes where soft waves, warm sands, and endless horizons create moments that feel timeless.",
    img: "https://res.cloudinary.com/drselhsl4/image/upload/v1764184034/Kifaru/amenities/plsj8c3cj11rdttfwjt6.jpg",
  },
  {
    title: "Holistic Spa & Wellness",
    desc: "Immersive wellness sanctuaries offering soothing therapies, calming aromas, and deeply restorative experiences.",
    img: "https://res.cloudinary.com/drselhsl4/image/upload/v1764184137/Kifaru/amenities/nuhz8ilchupjdl13rrsq.jpg",
  },
  {
    title: "Cultural Art & Heritage Spaces",
    desc: "Curated spaces celebrating local artistry, storytelling, and heritage—where culture is preserved, honored, and beautifully showcased.",
    img: "https://res.cloudinary.com/drselhsl4/image/upload/v1764184624/Kifaru/amenities/dtai9yryhuwim62nuoxt.jpg",
  },
  {
    title: "Scenic Infinity Pools",
    desc: "Elegant waterscapes designed to blur the line between sky and earth, offering serene dips and breathtaking views.",
    img: "https://res.cloudinary.com/drselhsl4/image/upload/v1764184030/Kifaru/amenities/wwgmiqajunkoxkfkitx0.jpg",
  },
  {
    title: "Nature-Inspired Lounges",
    desc: "Warm, calming lounges crafted with earthy textures and soft lighting, inviting you to pause, unwind, and reconnect.",
    img: "https://res.cloudinary.com/drselhsl4/image/upload/v1764184037/Kifaru/amenities/klu065euk0nv29cd915l.jpg",
  },
];

export default function AmenitiesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [main, setMain] = useState(smallCards[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -260, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 260, behavior: "smooth" });

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const children = Array.from(container.children);
      let closest = 0;
      let minOffset = Infinity;

      children.forEach((child, i) => {
        const offset = Math.abs(
          child.getBoundingClientRect().left -
            container.getBoundingClientRect().left
        );
        if (offset < minOffset) {
          minOffset = offset;
          closest = i;
        }
      });

      setActiveIndex(closest);
      setMain(smallCards[closest]);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="container mx-auto px-2 py-12">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <div className="lg:col-span-1">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <AnimatePresence mode="wait">
              <motion.img
                key={main.img}
                src={main.img}
                className="w-full h-[300px] md:h-[360px] lg:h-[400px] object-cover"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </AnimatePresence>

            <div className="absolute left-0 bottom-0 p-6 w-full bg-gradient-to-t from-black/70">
              <h3 className="text-white text-xl md:text-2xl font-semibold">
                {main.title}
              </h3>
              <p className="text-white/85 mt-2 text-sm md:text-base max-w-sm">
                {main.desc}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE SECTION */}
        <div className="flex flex-col mt-12">
          <h2 className="text-2xl md:text-4xl font-bold">
            Amenities & Features
          </h2>
          <p className="mt-3 text-gray-600">
            Discover a world of luxury with amenities designed for comfort and
            lifestyle.
          </p>

          <div className="relative mt-6">
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 scroll-smooth"
            >
              {smallCards.map((c, i) => (
                <motion.div
                  key={i}
                  onClick={() => {
                    setActiveIndex(i);
                    setMain(c);
                  }}
                  whileHover={{ scale: 1.04 }}
                  animate={{ scale: i === activeIndex ? 1.05 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="min-w-[200px] md:min-w-[210px] lg:min-w-[220px] bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer"
                >
                  <img
                    src={c.img}
                    className="w-full h-[140px] object-cover"
                    alt={c.title}
                  />
                  <div className="p-3">
                    <h4 className="text-base font-medium">{c.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scroll Arrows */}
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollLeft}
              className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md z-20"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={scrollRight}
              className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md z-20"
            >
              <ArrowRight className="w-5 h-5 text-gray-700" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
