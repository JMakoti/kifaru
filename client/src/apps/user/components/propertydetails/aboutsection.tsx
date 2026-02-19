import { resolveImageSrc } from "@/hooks/resolveImage";
import { useInView } from "@/hooks/useInView";
import type { Property } from "@/types/property";

interface AboutProps {
  property: Property;
}

const AboutSection = ({ property }: AboutProps)  => {
  const { ref, isInView } = useInView();

  if (!property.description) return null;

  return (
    <section
      className="relative bg-background py-20 px-6 md:px-12 lg:px-20"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text */}
        <div
          className={`space-y-6 transition-all duration-1000 ease-out ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
            About the Property
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
             {property.name}
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>{property.description}</p>
            <p>{property.location_description}</p>
          </div>
        </div>

        {/* Image */}
        <div
          className={`relative transition-all duration-1000 ease-out ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          <img
            src={resolveImageSrc(property.property_images[1]?.image)}
            alt={property.name}
            className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-3xl shadow-2xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
