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
    if (target <= 0) return;
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

  return <span>{target <= 0 ? 0 : count}</span>;
};

const StayDetails = ({ property }: StayProps) => {
  const { ref, isInView } = useInView();

  const stats = [
    { icon: Users, label: "Guests", value: property.max_guests ?? 0 },
    { icon: BedDouble, label: "Bedrooms", value: property.bedrooms ?? 0 },
    { icon: Bath, label: "Bathrooms", value: property.bathrooms ?? 0 },
    { icon: Ruler, label: "Square Meters", value: property.square_meters ?? 0 },
  ].filter((stat) => stat.value > 0);

  if (stats.length === 0) return null;

  return (
    <section
      className="relative bg-background px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:px-16 lg:py-20"
      ref={ref}
    >
      <div className="mx-auto mb-8 max-w-7xl text-center sm:mb-10 lg:mb-14">
        <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
          Your Stay
        </span>
        <h2 className="mt-3 text-3xl leading-tight text-primary sm:text-4xl lg:text-5xl">
          The Experience
        </h2>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 justify-center gap-4 sm:grid-cols-2 sm:gap-5 lg:flex lg:flex-wrap lg:gap-6">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex min-h-28 items-center justify-start gap-4 rounded-xl bg-card p-4 transition-all duration-1000 ease-out sm:min-h-32 sm:justify-center sm:p-5 lg:min-h-36 lg:w-64 xl:w-72 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            {/* Icon */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center text-primary sm:h-16 sm:w-16 lg:h-20 lg:w-20">
              <stat.icon className="h-10 w-10 sm:h-12 sm:w-12 lg:h-15 lg:w-15" />
            </div>

            {/* Value & Label */}
            <div className="flex min-w-0 flex-col items-start">
              <div className="text-2xl leading-none sm:text-3xl">
                <AnimatedCounter target={stat.value} isActive={isInView} />
              </div>
              <div className="mt-1 text-base font-medium leading-tight text-muted-foreground sm:text-lg">
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
