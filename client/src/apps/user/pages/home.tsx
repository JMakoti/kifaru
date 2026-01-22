import HeroSection from "@/apps/user/components/home/hero-section";
import AboutSection from "../shared/about-section";
import PropertySection from "../shared/property-section";
import KifaruExperience from "../components/home/kifaruexperience";
import Gallery from "../components/home/gallery";

export default function Home() {
  return (
    <div>
      {/* hero section */}
      <HeroSection />
      {/* Location section */}
      <PropertySection />

      <KifaruExperience />

      {/* about us section */}
      <AboutSection />

      <Gallery />
    </div>
  );
}
