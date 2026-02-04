import { useState, useRef, useEffect } from "react";
import { MapPin, ArrowRight, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useProperties } from "@/services/property.service";
import LoadingScreen from "@/components/loadingscreen";
import type { Property, PropertyDestinationProps } from "@/types/property";
import { resolveImageSrc } from "@/hooks/resolveImage";

function PropertyDestination({
  property,
  index,
  isLeft,
  isHighlighted,
  onHover,
}: PropertyDestinationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const images =
    property.property_images?.length > 0
      ? property.property_images.map((img) => img.image)
      : [property.background_image];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1,
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <motion.div
      ref={ref}
      className={`relative ${isLeft ? "md:pr-24" : "md:pl-24"}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: 0.1,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <Link to={`/property/${property.slug}`} className="group block">
        <motion.div
          className={`
            luxury-card
            max-w-sm mx-auto md:mx-0
            ${isLeft ? "md:ml-auto" : "md:mr-auto"}
          `}
          whileHover={{
            scale: 1.02,
            y: -5,
          }}
          animate={{
            boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Image Container */}
          <div className="relative overflow-hidden rounded-t-2xl">
            <motion.img
              src={resolveImageSrc(images[currentImageIndex])}
              alt={property.name}
              className="w-full h-52 object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

            {/* Location Badge */}
            {/* Location Badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 bg-[var(--kifaru-accent)]/90 text-white text-sm font-semibold rounded-full shadow-lg">
              <MapPin className="w-4 h-4" />
              <span>
                {property.location}, {property.country}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3
              className={`text-xl font-serif font-bold mb-2 ${isLeft ? "md:text-right" : "text-left"} text-[var(--foreground)]`}
            >
              {property.name}
            </h3>
            <p
              className={`text-sm mb-4 line-clamp-2 ${isLeft ? "md:text-right" : "text-left"} text-[var(--muted-foreground)]`}
            >
              {property.description}
            </p>

            <motion.div
              className={`flex items-center gap-2 font-semibold text-sm ${isLeft ? "md:justify-end" : "justify-start"} text-[var(--kifaru-accent)]`}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span>Explore</span>
              <ArrowRight className="w-4 h-4 text-[var(--kifaru-accent)]" />
            </motion.div>
          </div>
        </motion.div>
      </Link>

      {/* Connection Line to Road - Desktop */}
      <motion.div
        className={`
          hidden md:flex items-center absolute top-1/2 -translate-y-1/2
          ${isLeft ? "right-0 flex-row" : "left-0 flex-row-reverse"}
        `}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.4 }}
        style={{ originX: isLeft ? 1 : 0 }}
      >
        {/* Connector line */}
        <motion.div
          className="w-20 h-1 rounded-full"
          animate={{
            background:
              "linear-gradient(90deg, hsl(30 15% 55%), hsl(25 20% 40%))",
            boxShadow: isHighlighted
              ? "0 0 20px hsl(38 70% 50% / 0.5)"
              : "none",
          }}
          transition={{ duration: 0.3 }}
        />
        {/* Endpoint dot */}
        <motion.div
          className="w-4 h-4 rounded-full border-2 bg-card"
          animate={{
            backgroundColor: "hsl(38 70% 50%)",
            borderColor: "hsl(30 15% 55%)",
            scale: isHighlighted ? 1.4 : 1,
            boxShadow: isHighlighted
              ? "0 0 20px hsl(38 70% 50% / 0.7)"
              : "none",
          }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </motion.div>
    </motion.div>
  );
}

// Animated Road SVG Component
function AnimatedRoad({
  hoveredIndex,
  properties,
}: {
  hoveredIndex: number | null;
  properties: Property[];
}) {
  const roadRef = useRef(null);
  const isInView = useInView(roadRef, { once: true, amount: 0.2 });

  return (
    <div
      ref={roadRef}
      className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-40 z-0 pointer-events-none"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 160 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Road Shadow/Glow */}
        <motion.path
          d="M80 1000 L80 0"
          stroke="hsl(0 0% 50% / 0.1)"
          strokeWidth="38"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />

        {/* Main Road */}
        <motion.path
          d="M80 1000 L80 0"
          stroke="hsl(0 0% 0% / 0.25)"
          strokeWidth="30"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
        />

        {/* Center Dashed Line */}
        <motion.path
          d="M80 1000 L80 0"
          stroke="hsl(0 0% 100% / 0.15)"
          strokeWidth="5"
          strokeDasharray="15 10"
          fill="none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
        />

        {/* Fork Lines - Alternating */}
        {properties.map((_, i) => {
          const y = 100 + i * 200;
          const isLeft = i % 2 === 0;
          const endX = isLeft ? 0 : 160;
          const ctrlX = isLeft ? 40 : 120;

          return (
            <g key={i}>
              {/* Fork glow on hover */}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.path
                    d={`M80 ${y} Q${ctrlX} ${y} ${endX} ${y}`}
                    stroke="hsl(0 0% 20% / 0.15)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ filter: "blur(10px)" }}
                  />
                )}
              </AnimatePresence>

              {/* Fork path */}
              <motion.path
                d={`M80 ${y} Q${ctrlX} ${y} ${endX} ${y}`}
                stroke={
                  hoveredIndex === i
                    ? "hsl(0 0% 20% / 0.15)"
                    : "hsl(0 0% 0% / 0.25)"
                }
                strokeWidth="15"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{
                  pathLength: { duration: 0.4, delay: 0.8 + i * 0.2 },
                  opacity: { duration: 0.2, delay: 0.8 + i * 0.2 },
                }}
              />

              {/* Junction dot */}
              <motion.circle
                cx="80"
                cy={y}
                r={hoveredIndex === i ? 8 : 6}
                fill={
                  hoveredIndex === i
                    ? "hsl(0 0% 20% / 0.15)"
                    : "hsl(0 0% 50% / 0.1)"
                }
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isInView
                    ? {
                        scale: 1,
                        opacity: 1,
                        filter:
                          hoveredIndex === i
                            ? "drop-shadow(0 0 10px hsl(0 0% 20% / 0.15))"
                            : "none",
                      }
                    : {}
                }
                transition={{
                  delay: 1 + i * 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
              />
            </g>
          );
        })}

        {/* Start point marker with pulse */}
        <motion.circle
          cx="80"
          cy="950"
          fill="hsl(0 0% 20% / 0.15)"
          initial={{ r: 0 }}
          animate={isInView ? { r: 12 } : {}}
          transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
          style={{
            filter: "drop-shadow(0 0 15px hsl(var(--road-glow) / 0.8))",
          }}
        />

        {/* Pulsing ring */}
        <motion.circle
          cx="80"
          cy="950"
          fill="none"
          stroke="hsl(0 0% 20% / 0.15)"
          strokeWidth="2"
          initial={{ r: 12, opacity: 0 }}
          animate={
            isInView
              ? {
                  r: [12, 30],
                  opacity: [0.7, 0],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1,
          }}
        />
      </svg>
    </div>
  );
}

export default function PropertySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { data = [], isLoading } = useProperties();

  if (isLoading) return <LoadingScreen />;
  // if (isError) return <p>{(error as Error).message}</p>;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-background via-sand-light/30 to-background"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-10 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Section Header */}
      <motion.div
        className="container mx-auto text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 text-accent font-medium mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Compass className="w-5 h-5 text-black" />
          </motion.div>
          <span className="uppercase tracking-wider text-sm text-black">
            Begin Your Journey
          </span>
        </motion.div>
        <motion.h2
          className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Discover Our Destinations
        </motion.h2>
        <motion.p
          className="text-muted-foreground max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Follow the path to extraordinary experiences. Each destination offers
          a unique blend of luxury, culture, and unforgettable moments.
        </motion.p>
      </motion.div>

      {/* Road Journey Container */}
      <div className="container mx-auto relative min-h-[900px]">
        <AnimatedRoad hoveredIndex={hoveredIndex} properties={data} />

        {/* Properties Grid */}
        <div className="relative z-10 grid md:grid-cols-2 gap-y-6 md:gap-y-0 gap-x-8 max-w-6xl mx-auto">
          {data?.map((property, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={property.id}
                className={isLeft ? "md:col-start-1" : "md:col-start-2"}
                style={{ gridRow: index + 1 }}
              >
                <PropertyDestination
                  property={property}
                  index={index}
                  isLeft={isLeft}
                  isHighlighted={hoveredIndex === index}
                  onHover={setHoveredIndex}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
