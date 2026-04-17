// import HeroSection from "@/apps/user/components/home/hero-section";
// import AboutSection from "../shared/about-section";
// import PropertySection from "../shared/property-section";
// import KifaruExperience from "../components/home/kifaruexperience";
// import Gallery from "../components/home/gallery";
// import TestimonialSection from "../components/about/testmonials";
// import TeamSection from "../components/home/established";
import LoadingScreen from "@/components/loadingscreen";
import { lazy, Suspense } from "react";

const HeroSection = lazy(() => import("../components/home/hero-section"));
const AboutSection = lazy(() => import("../shared/about-section"));
const PropertySection = lazy(() => import("../shared/property-section"));
const KifaruExperience = lazy(
  () => import("../components/home/kifaruexperience"),
);
const Gallery = lazy(() => import("../components/home/gallery"));
const TestimonialSection = lazy(
  () => import("../components/about/testmonials"),
);
const TeamSection = lazy(() => import("../components/home/established"));

export default function Home() {
  return (
    <div>
      <Suspense
        fallback={
          <div>
            <LoadingScreen />
          </div>
        }
      >
        <HeroSection />
        <PropertySection />
        <KifaruExperience />
        <AboutSection />
        <TeamSection />
        <Gallery />
        <TestimonialSection />
      </Suspense>
    </div>
  );
}
