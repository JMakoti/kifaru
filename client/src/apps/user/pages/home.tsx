import HeroSection from "@/apps/user/components/home/hero-section";
import AboutSection from "../shared/about-section";
import PropertySection from "../shared/property-section";
import KifaruExperience from "../components/home/kifaruexperience";
import Gallery from "../components/home/gallery";
import TestimonialSection from "../components/about/testmonials";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PropertySection />
      <KifaruExperience />
      <AboutSection />
      <Gallery />
      <TestimonialSection />
    </div>
  );
}
