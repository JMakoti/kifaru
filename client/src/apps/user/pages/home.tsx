import HeroSection from "../components/home/hero-section";
import {
  lazy,
  type ReactNode,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";

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

function LazyOnVisible({
  children,
  minHeight = 600,
}: {
  children: ReactNode;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || shouldRender) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={ref} style={{ minHeight: shouldRender ? undefined : minHeight }}>
      {shouldRender ? children : null}
    </div>
  );
}

function DeferredSection({
  children,
  minHeight,
}: {
  children: ReactNode;
  minHeight?: number;
}) {
  return (
    <LazyOnVisible minHeight={minHeight}>
      <Suspense fallback={null}>{children}</Suspense>
    </LazyOnVisible>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <DeferredSection minHeight={900}>
        <PropertySection />
      </DeferredSection>
      <DeferredSection minHeight={700}>
        <KifaruExperience />
      </DeferredSection>
      <DeferredSection minHeight={700}>
        <AboutSection />
      </DeferredSection>
      <DeferredSection minHeight={800}>
        <TeamSection />
      </DeferredSection>
      <DeferredSection minHeight={500}>
        <Gallery />
      </DeferredSection>
      <DeferredSection minHeight={600}>
        <TestimonialSection />
      </DeferredSection>
    </div>
  );
}
