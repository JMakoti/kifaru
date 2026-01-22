import rhino from "@/assets/rhino.png";
import zebras from "@/assets/zebras.jpeg";
import { Link, useLocation } from "react-router";
import {
  Car,
  CheckCircle,
  ConciergeBell,
  Leaf,
  Palette,
  Wifi,
} from "lucide-react";
import kifaruExperience from "@/assets/property-1.jpg";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const experiencePoints = [
  {
    title: "Easy and transparent booking",
    description: "Simple, clear pricing with no hidden fees or surprises.",
  },
  {
    title: "One dedicated account manager",
    description:
      "A single point of contact who knows your preferences and needs.",
  },
  {
    title: "End-to-end support",
    description:
      "From inquiry and booking to on-site execution—we handle everything.",
  },
  {
    title: "24/7 follow-up and care",
    description: "On-the-ground support ensuring peace of mind at every stage.",
  },
];

export default function AboutSection() {
  const location = useLocation();
  const aboutRoute = location.pathname.startsWith("/about");

  return (
    <div>
      <div className="about-kifaru flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-8 p-4 md:p-8 w-full">
        {!aboutRoute ? (
          <div className="text-content flex flex-col gap-4 max-w-lg w-full">
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl leading-tight">
              A Recognizable Experience, Wherever You Land
            </h2>

            <p className="text-sm md:text-base leading-relaxed mt-2">
              Whether you are working, resting, or reconnecting, Kifaru ensures
              you feel at home anywhere in the world. Each stay is thoughtfully
              curated to include relevant meetings, intimate gatherings,
              networking opportunities, and purpose-driven connections aligned
              with the guest’s personal and professional journey.
            </p>

            <p className="text-sm md:text-base">
              Each Kifaru location reflects a shared standard of conscious
              luxury:
            </p>

            {/* Icon + Word */}
            <motion.div
              className="grid grid-cols-3 sm:grid-cols-5 gap-6 mt-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {[
                { icon: Palette, label: "Design" },
                { icon: Leaf, label: "Sustainability" },
                { icon: Wifi, label: "Connectivity" },
                { icon: ConciergeBell, label: "Care" },
                { icon: Car, label: "Transportation" },
              ].map(({ icon: Icon, label }) => (
                <motion.div
                  key={label}
                  className="flex flex-col items-center text-center gap-1"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  <span className="text-xs md:text-sm font-medium tracking-wide">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <Button className="w-full sm:w-40 mt-6">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        ) : (
          <div className="text-content flex flex-col gap-4 md:gap-6 lg:gap-10 max-w-lg order-2 lg:order-2 w-full">
            {/* <h3 className="text-lg md:text-xl font-semibold">|| ABOUT US</h3> */}
            <h2 className="font-bold text-2xl font-sans  md:text-3xl lg:text-4xl leading-tight">
              Our Story
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              Debbie and Olivier are the inspirers behind Kifaru Tech & Bed. A
              loving couple, spiritually grounded in the legacy of Desmond Tutu
              and driven by an adventurous heart, they live a life shaped by
              curiosity, compassion, and connection. Together with their
              children, they move between Mombasa, Brussels, and the wider world
              carrying with them a shared mission of creating opportunity where
              it is least accessible, to foster self-development, bridge the
              digital gap, and uncover talent in underserved communities.
            </p>
            <p>
              Kifaru was born from this same spirit. It is, a place of
              inspiration where conviviality, work and the discovery of new
              horizons take centre stage. Kifaru means ‘rhino’ in Swahili. A
              rare icon of the African savannah and an honoured member of the
              Big Five. Like the rhino, the soul of Kifaru Tech & Bed is unique.
              African visitors feel at home and Europeans take a relaxing
              African bath. Kifaru breathes Africa. We leave nothing to chance.
              It is a unique meeting place where state-of-the-art technology is
              combined with a comfortable bed. Small in size, but big in
              satisfaction. The elegant workspace and meeting rooms provide
              tranquillity through natural materials and durable furniture.
              African art embellishes our hub.
            </p>
          </div>
        )}

        <div
          className={`grid grid-cols-3 grid-rows-3 gap-1 md:gap-2 w-full w-full sm:max-w-sm md:max-w-md max-w-xs lg:max-w-lg ${
            aboutRoute ? "order-1 lg:order-1" : "order-1 lg:order-2"
          }`}
        >
          {/* Side K vertical line */}
          <div className="col-start-1 row-start-1 w-full h-20 sm:h-24 md:h-28 lg:h-32 overflow-hidden rounded-sm">
            <img src={zebras} alt="" className="w-full h-full object-contain" />
          </div>

          <div className="col-start-1 row-start-2 w-full h-20 sm:h-24 md:h-28 lg:h-32 overflow-hidden rounded-sm">
            <img src={zebras} alt="" className="w-full h-full object-contain" />
          </div>

          <div className="col-start-1 row-start-3 w-full h-20 sm:h-24 md:h-28 lg:h-32 overflow-hidden rounded-sm">
            <img src={zebras} alt="" className="w-full h-full object-contain" />
          </div>

          {/* Top diagonal of K */}
          <div className="col-start-3 row-start-1 w-full h-20 sm:h-24 md:h-28 lg:h-32 overflow-hidden rounded-sm rounded-br-full">
            <img src={zebras} alt="" className="w-full h-full object-contain" />
          </div>

          {/* Middle joint */}
          <div className="col-start-2 row-start-2 w-full h-20 sm:h-24 md:h-28 lg:h-32 overflow-hidden rounded-sm">
            <img
              src={rhino}
              alt="Featured Rhino"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Bottom diagonal of K */}
          <div className="col-start-3 row-start-3 w-full h-20 sm:h-24 md:h-28 lg:h-32 overflow-hidden rounded-lg rounded-tr-full">
            <img src={zebras} alt="" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      {/* Goals Section */}
      {aboutRoute && (
      <div className="container max-w-6xl mx-auto px-6 mt-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-sans text-sm tracking-[0.2em] uppercase mb-4 block">
              {/* The Kifaru Promise */}
              We Make Every Interaction
            </span>
            <h2 className="heading-section text-foreground mb-6 text-4xl font-bold">
              Effortless & Human-Centered
            </h2>
            <div className="divider-elegant mb-8" />
            <p className="text-elegant text-muted-foreground mb-10">
              Our goal is to make every interaction effortless and
              human-centered. From the moment you reach out, we're here to
              serve.
            </p>

            <ul className="space-y-6">
              {experiencePoints.map((point, index) => (
                <li key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-black group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      {point.title}
                    </h4>
                    <p className="text-body text-muted-foreground text-sm">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative lg:order-first">
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary relative">
              <img
                src={kifaruExperience}
                alt="Kifaru hospitality experience"
                className="w-full h-full object-cover"
              />
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-4 md:right-8 bg-card border border-border/50 rounded-lg p-6 shadow-[var(--shadow-soft)] max-w-[200px]">
              <p className="font-serif text-2xl text-primary mb-1">24/7</p>
              <p className="text-sm text-muted-foreground">
                Care & support on the ground
              </p>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
