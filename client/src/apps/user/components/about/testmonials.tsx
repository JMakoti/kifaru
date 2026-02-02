import { useEffect, useMemo, useRef, useState } from "react";
import TestimonialCard from "./testmonialcard";
import { useReviews } from "@/services/property.service";
import type { PropertyReview } from "@/services/property.types";
import LoadingScreen from "@/components/loadingscreen";

const SLIDE_DURATION = 6000;
const mapReviewsToTestimonials = (reviews: PropertyReview[]) =>
  reviews.map((r) => ({
    quote: r.comment,
    author: r.reviewer_name,
    location: r.country || "Guest",
    property: r.property_name,
    image: r.avatar,
  }));

export default function TestimonialSection() {
  const { data = [], isLoading } = useReviews();
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const testimonials = useMemo(() => mapReviewsToTestimonials(data), [data]);

  // duplicate for seamless loop
  const slides = useMemo(
    () => [...testimonials, ...testimonials],
    [testimonials],
  );

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    if (index === testimonials.length) {
      setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.style.transition = "none";
        }
        setIndex(0);
        requestAnimationFrame(() => {
          if (trackRef.current) {
            trackRef.current.style.transition = "transform 700ms ease-in-out";
          }
        });
      }, 700);
    }
  }, [index, testimonials.length]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-background py-24 px-4">
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-black font-medium tracking-widest uppercase text-sm mb-4">
            Guest Experiences
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            Stories from Our Guests
          </h2>
        </div>

        {/* Slider */}
        <div className="relative w-full">
          <div
            ref={trackRef}
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((testimonial, i) => (
              <div key={i} className="min-w-full w-full flex-shrink-0 px-2">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`h-1 w-1 rounded-full transition-all duration-500 ${
                i === index % testimonials.length ? "bg-black" : "bg-black/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
