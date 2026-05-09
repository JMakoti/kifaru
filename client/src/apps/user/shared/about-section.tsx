import rhino from "@/assets/images/rhino.webp";
import { Link, useLocation } from "react-router";
import {
  Car,
  CheckCircle,
  ConciergeBell,
  Leaf,
  Palette,
  Wifi,
} from "lucide-react";
import kifaruExperience from "@/assets/images/kifaru-about.webp";
import techandbedLogo from "@/assets/images/techandbed-logo.webp";
import oceankifaru from "@/assets/images/ocean-kifaru-logo.webp";
import msambwenikifaru from "@/assets/images/msabweni.webp";
import closethegap from "@/assets/images/jet_skiing.webp";
import nyali from "@/assets/images/nyali.webp"

import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

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
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-content flex flex-col gap-4 max-w-lg w-full"
          >
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl leading-tight">
              A Recognizable Experience, Wherever You Land
            </h2>

            <p className="text-md md:text-xl leading-relaxed mt-2">
              Whether you are working, resting, or reconnecting, Kifaru ensures
              you feel at home anywhere in the world. Each stay is thoughtfully
              curated to include relevant meetings, intimate gatherings,
              networking opportunities, and purpose-driven connections aligned
              with the guest’s personal and professional journey.
            </p>

            <p className="text-md md:text-xl">
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
                  <Icon className="w-8 h-8 md:w-9 md:h-9 text-primary" />
                  <span className="text-xs md:text-sm font-medium tracking-wide">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <Button className="w-full sm:w-60 mt-6 text-md md:text-lg" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-content flex flex-col gap-4 md:gap-6 lg:gap-10 max-w-lg order-1 lg:order-1 w-full"
          >
            <h2 className="text-foreground font-bold text-2xl md:text-3xl lg:text-4xl">
              Our Story
            </h2>

            <p className="text-foreground/80 text-md md:text-xl leading-relaxed">
              Debbie and Olivier are the inspirers behind Kifaru Tech & Bed.
              Guided by compassion, curiosity, and connection, their journey
              spans continents with a mission to create opportunity where it is
              least accessible.
            </p>

            <p className="text-muted-foreground text-md md:text-xl leading-relaxed">
              Kifaru—meaning “rhino” in Swahili—is a place of inspiration where
              work, rest, and discovery meet. Small in scale, big in impact.
              African soul, European calm.
            </p>
          </motion.div>
        )}

        <div
          className={`grid grid-cols-3 grid-rows-3 gap-2 md:gap-2 w-full w-full sm:max-w-sm md:max-w-md max-w-xs lg:max-w-lg ${
            aboutRoute ? "order-1 lg:order-1" : "order-1 lg:order-1"
          }`}
        >
          {/* Side K vertical line */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.5 }}
            className="col-start-1 row-start-1 w-full aspect-square overflow-hidden rounded-sm"
          >
            <img
              src={techandbedLogo}
              alt="Kifaru Tech & Bed"
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.5 }}
            className="col-start-1 row-start-2 w-full aspect-square overflow-hidden rounded-sm"
          >
            <img
              src={oceankifaru}
              alt="Ocean Kifaru"
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.5 }}
            className="col-start-1 row-start-3 w-full aspect-square overflow-hidden rounded-sm"
          >
            <img
              src={msambwenikifaru}
              alt="Msambweni Kifaru"
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Top diagonal of K */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.5 }}
            className="col-start-3 row-start-1 w-full aspect-square overflow-hidden rounded-sm rounded-br-full"
          >
            <img
              src={nyali}
              alt="Nyali Kifaru"
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Middle joint */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.5 }}
            className="col-start-2 row-start-2 w-full aspect-square overflow-hidden rounded-sm"
          >
            <img
              src={rhino}
              loading="lazy"
              alt="Kifaru Tech & Bed"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Bottom diagonal of K */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.5 }}
            className="col-start-3 row-start-3 w-full aspect-square overflow-hidden rounded-lg rounded-tr-full"
          >
            <img
              src={closethegap} 
              alt="Close the Gap Kifaru"
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>
      </div>

      {/* Goals Section */}
      {aboutRoute && (
        <div className="container max-w-6xl mx-auto px-6 mt-6 mb-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm tracking-[0.2em] uppercase mb-4 block">
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

              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {experiencePoints.map((point, index) => (
                  <li key={index} className="flex gap-4 group">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-black group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="text-lg text-lg text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                        {point.title}
                      </h4>
                      <p className="text-body text-md text-muted-foreground">
                        {point.description}
                      </p>
                    </div>
                  </li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative lg:order-first"
            >
              <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary relative">
                <img
                  src={kifaruExperience}
                  loading="lazy"
                  alt="Kifaru hospitality experience"
                  className="w-full h-full object-cover"
                />
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
              </div>

              {/* Floating accent card */}
              <div className="absolute -bottom-6 -right-4 md:right-8 bg-card border border-border/50 rounded-lg p-6 shadow-[var(--shadow-soft)] max-w-[200px]">
                <p className="text-2xl text-primary mb-1">24/7</p>
                <p className="text-md text-muted-foreground">
                  Care & support on the ground
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
