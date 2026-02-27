import HeroSection from "@/apps/user/components/home/hero-section";
import AboutSection from "../shared/about-section";
import PropertySection from "../shared/property-section";
import KifaruExperience from "../components/home/kifaruexperience";
import Gallery from "../components/home/gallery";
import TestimonialSection from "../components/about/testmonials";
import TeamSection from "../components/home/established";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PropertySection />
      <KifaruExperience />
      <AboutSection />
      <TeamSection />
      <Gallery />
      <TestimonialSection />
    </div>
  );
}