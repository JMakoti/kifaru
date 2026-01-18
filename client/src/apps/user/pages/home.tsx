import HeroSection from "@/apps/user/components/home/hero-section";
import AboutSection from "../shared/about-section";
import PropertySection from "../shared/property-section";

export default function Home() {
  return (
    <div>
      {/* hero section */}
      <HeroSection />

      {/* about us section */}
      <AboutSection />

      {/* property section */}
      <PropertySection />
    </div>
  );
}
