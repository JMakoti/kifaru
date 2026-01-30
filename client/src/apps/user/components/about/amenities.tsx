import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const smallCards = [
  {
    title: "Coworking & co-growing spaces",
    desc: "Kifaru is a bold coworking space that takes you out of your comfort zone and on a creative journey",
    img: "https://techbedkifaru.be/wp-content/uploads/2020/11/WhatsApp-Image-2020-10-09-at-11.50.44-3-1-605x465.jpeg",
  },
  {
    title: "WaterSport",
    desc: "There’s plenty to enjoy on the water! You can go sailing, kitesurfing, and surfing on the North Sea",
    img: "https://www.villamer.nl/assets/uploads/watersport_cadzand/_900x600_crop_center-center_80_none/2392/strandsport.webp",
  },
  {
    title: "Coastal Retreats",
    desc: "Peaceful beachfront escapes where soft waves, warm sands, and endless horizons create moments that feel timeless.",
    img: "https://res.cloudinary.com/drselhsl4/image/upload/v1764184034/Kifaru/amenities/plsj8c3cj11rdttfwjt6.jpg",
  },
  {
    title: "African wine tastings & curated events",
    desc: "African tastings of wines and curated cultural experiences designed to delight all senses.",
    img: "https://techbedkifaru.be/wp-content/uploads/2020/11/scott-warman-rrYF1RfotSM-unsplash-bewerkt.jpg",
  },
  {
    title: "Cultural Art & Heritage Spaces",
    desc: "Spaces celebrating local artistry, storytelling, and heritage.",
    img: "https://res.cloudinary.com/drselhsl4/image/upload/v1764184624/Kifaru/amenities/dtai9yryhuwim62nuoxt.jpg",
  },
];

const LOOPED = [...smallCards, ...smallCards, ...smallCards];
const TOTAL = smallCards.length;

export default function AmenitiesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(TOTAL);

  const main = smallCards[activeIndex % TOTAL];

  /* ---------------- AUTO CAROUSEL ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* ----------- INITIAL SCROLL POSITION ------------ */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = 230; // same as thumbnail min width + gap
    container.scrollLeft = cardWidth * TOTAL;
  }, []);

  /* ----------- SCROLL TO ACTIVE CARD ------------ */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = 230;

    container.scrollTo({
      left: activeIndex * cardWidth,
      behavior: "smooth",
    });

    // reset silently to middle for infinite loop
    if (activeIndex >= TOTAL * 2) {
      setTimeout(() => {
        container.scrollLeft = cardWidth * TOTAL;
        setActiveIndex(TOTAL);
      }, 400);
    }

    if (activeIndex < TOTAL) {
      setTimeout(() => {
        container.scrollLeft = cardWidth * TOTAL;
        setActiveIndex(TOTAL);
      }, 400);
    }
  }, [activeIndex]);

  const scrollLeft = () => setActiveIndex((i) => i - 1);
  const scrollRight = () => setActiveIndex((i) => i + 1);

  return (
    <section className="container mx-auto px-2 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* MAIN CARD */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <AnimatePresence mode="wait">
            <motion.img
              key={main.img}
              src={main.img}
              className="w-full h-[400px] object-cover"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>

          <div className="absolute bottom-0 p-6 w-full bg-gradient-to-t from-black/70 to-transparent">
            <h3 className="text-white text-2xl font-semibold">
              {main.title}
            </h3>
            <p className="text-white/80 mt-2 max-w-md">{main.desc}</p>
          </div>
        </div>

        {/* THUMBNAILS */}
        <div>
          <h2 className="text-3xl font-semibold">Amenities & Features</h2>
          <p className="text-muted-foreground mt-2 max-w-md">
            Designed for comfort, culture, and unforgettable experiences.
          </p>

          <div className="relative mt-6">
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto scrollbar-hide"
            >
              {LOOPED.map((c, i) => (
                <motion.div
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  animate={{ scale: i === activeIndex ? 1.05 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="min-w-[220px] rounded-xl overflow-hidden bg-card border cursor-pointer"
                >
                  <img src={c.img} className="w-full h-[140px] object-cover" />
                  <div className="p-3">
                    <h4 className="font-medium">{c.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Controls */}
            <Button
              size="icon"
              variant="ghost"
              onClick={scrollLeft}
              className="absolute -left-3 top-1/2 -translate-y-1/2"
            >
              <ArrowLeft />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={scrollRight}
              className="absolute -right-3 top-1/2 -translate-y-1/2"
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
