import { Users, BedDouble, Bath, Ruler } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useEffect, useState } from "react";
import type { Property } from "@/types/property";

interface StayProps {
  property: Property;
}

const AnimatedCounter = ({
  target,
  isActive,
}: {
  target: number;
  isActive: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let start = 0;
    const duration = 1200;
    const step = Math.max(1, Math.floor(duration / target));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [isActive, target]);

  return <span>{count}</span>;
};

const StayDetails = ({ property }: StayProps) => {
  const { ref, isInView } = useInView();

  const stats = [
    { icon: Users, label: "Guests", value: property.max_guests ?? 0 },
    { icon: BedDouble, label: "Bedrooms", value: property.bedrooms ?? 0 },
    { icon: Bath, label: "Bathrooms", value: property.bathrooms ?? 0 },
    { icon: Ruler, label: "Square Meters", value: property.square_meters ?? 0 },
  ];

  return (
    <section
      className="relative bg-background py-20 px-6 md:px-12 lg:px-20"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto text-center mb-14">
        <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground font-sans">
          Your Stay
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary mt-3">
          The Experience
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex items-center justify-center space-x-4 p-4 transition-all bg-card duration-1000 ease-out transform ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            {/* Icon */}
            <div className="w-20 h-20 flex items-center justify-center text-primary">
              <stat.icon className="w-15 h-15" />
            </div>

            {/* Value & Label */}
            <div className="flex flex-col items-start">
              <div className="text-3xl font-serif">
                <AnimatedCounter target={stat.value} isActive={isInView} />
              </div>
              <div className="text-sm text-muted-foreground font-sans font-medium">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StayDetails;
