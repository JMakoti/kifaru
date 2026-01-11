import { Quote } from "lucide-react";

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
    <div className="mx-auto relative bg-card rounded-2xl p-8 shadow-sm border border-border/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
      <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

      <div className="mb-6">
        <Quote className="w-10 h-10 text-black/60" strokeWidth={1.5} />
      </div>
      <div className="inline-block mb-4">
        <span className="text-sm font-medium text-black">
          {property}
        </span>
      </div>

      <blockquote className="text-foreground/90 text-lg leading-relaxed mb-8 font-light">
        “{quote}”
      </blockquote>
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={image}
            alt={author}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-black/20 group-hover:ring-accent/40 transition-all duration-300"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
            <span className="text-accent-foreground text-xs">✓</span>
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
  );
}
