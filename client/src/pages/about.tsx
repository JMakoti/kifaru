import AboutSection from "@/components/shared/about-section";
import CTASection from "@/components/about/cta";
import AmenitiesSection from "@/components/about/amenities";
import Why_UsSection from "@/components/about/why_us";
import TestimonialsSection from "@/components/about/testmonials";

export default function About() {
  return (
    <>
      <main className="min-h-40 pt-20">
        <div className="container mx-auto px-6 md:px-12 py-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-8">
            About Kifaru
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Blending luxury, nature, and African culture into unforgettable
            experiences
          </p>
        </div>
      </main>
      {/* About Section */}
      <AboutSection />
      {/* Why Us Section */}
      <Why_UsSection />
      {/* Amenities Section */}
      <AmenitiesSection />
      {/* Testimonial section */}
      <TestimonialsSection />
      {/* Call to Action */}
      <CTASection />
    </>
  );
}
