import "../styles/global.css";
import AboutSection from "@/components/home/about-section";
import HeroSection from "@/components/home/hero-section";

export default function Home() {
  return (
    <div>
      {/* hero section */}
      <HeroSection />

      {/* properties section */}
      {/* <section>
        <div className="properties">
          <h1>Properties Section</h1>
        </div>
      </section> */}

      {/* about us section */}
      <AboutSection />
    </div>
  );
}
