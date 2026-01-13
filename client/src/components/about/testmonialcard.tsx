import { Quote } from "lucide-react";
import propertyImage from "@/assets/property-2.jpg";

interface TestimonialCardProps {
  quote: string;
  author: string;
  location: string;
  property: string;
  image: string;
}

export default function TestimonialCard({
  quote,
  author,
  location,
  property,
  image,
}: TestimonialCardProps) {
  return (
    <div className="relative mx-auto w-full max-w-5xl bg-card rounded-2xl border border-border/50 px-5 sm:px-8 md:px-16 py-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      
      {/* Content */}
      <div className="relative z-10 md:pr-64">
        <Quote className="mb-5 h-8 w-8 sm:h-10 sm:w-10 text-black/60" strokeWidth={1.5} />

        <span className="mb-3 inline-block text-sm font-medium text-black">
          {property}
        </span>

        <blockquote className="mb-8 text-base sm:text-lg md:text-xl leading-relaxed font-light text-foreground/90">
          “{quote}”
        </blockquote>

        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={image}
              alt={author}
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover ring-2 ring-black/20"
            />
            <div className="absolute -bottom-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-accent">
              <span className="text-[10px] sm:text-xs text-accent-foreground">
                ✓
              </span>
            </div>
          </div>

          <div>
            <p className="font-serif font-semibold text-foreground">
              {author}
            </p>
            <p className="text-sm text-muted-foreground">
              {location}
            </p>
          </div>
        </div>
      </div>

      {/* Property Image */}
      <div className="mt-6 hidden sm:block md:absolute md:-top-16 md:right-6">
        <div className="h-48 w-40 md:h-72 md:w-52 overflow-hidden rounded-lg border shadow-[var(--shadow-soft)]">
          <img
            src={propertyImage}
            loading="lazy"
            alt="Kifaru property highlight"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
