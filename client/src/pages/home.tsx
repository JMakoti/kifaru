// import "../styles/global.css";
import AboutSection from "@/components/home/about-section";
import HeroSection from "@/components/home/hero-section";
import PropertySection from "@/components/home/property-section";

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
