import AboutSection from "../shared/about-section";
import CTASection from "@/apps/user/components/about/cta";
import AmenitiesSection from "@/apps/user/components/about/amenities";
import Why_UsSection from "@/apps/user/components/about/why_us";
import TestimonialSection from "@/apps/user/components/about/testmonials";
import { motion } from "framer-motion";
import propertybg from "@/assets/images/aboutbg.jpg";

export default function About() {
  return (
    <>
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${propertybg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-background" />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-white drop-shadow-lg">
              About Us
            </h1>
            <p className="text-lg md:text-2xl font-light text-white/90 max-w-2xl mx-auto drop-shadow">
              Blending luxury, nature, and African culture into unforgettable
              experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />
      {/* Why Us Section */}
      <Why_UsSection />
      {/* Amenities Section */}
      <AmenitiesSection />
      {/* Testimonial section */}
      <TestimonialSection />
      {/* Call to Action */}
      <CTASection />
    </>
  );
}
