import { useEffect, useRef, useState } from "react";
import TestimonialCard from "./testmonialcard";

const testimonials = [
  {
    quote:
      "Kifaru Brussels is the perfect blend of work and inspiration. The coworking spaces, cultural touches, and hospitality make it a hub for creativity and connection.",
    author: "Sophie L.",
    location: "Entrepreneur",
    property: "Tech & Bed Kifaru Brussels",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    quote:
      "Our family loved Ocean Kifaru North-Sea! The private jacuzzi and enclosed garden made our stay safe, relaxing, and unforgettable.",
    author: "Mark D.",
    location: "Netherlands",
    property: "Ocean Kifaru North-Sea",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    quote:
      "The Msambweni villa is a slice of paradise. From the infinity pool to the private chefs and concierge service, every detail was perfect.",
    author: "Clara M.",
    location: "International Guest",
    property: "Ocean Kifaru Indian Ocean",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    quote:
      "We enjoyed the Marble Inn for its modern amenities and attentive concierge. Perfect for a short stay in Nyali with easy access to everything.",
    author: "Jan V.",
    location: "Kenya",
    property: "Kifaru Marble Inn Mombasa",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    quote:
      "The rooftop terrace and strategic location of the Close the Gap HUB are ideal for focus, networking, and executive retreats.",
    author: "Emma R.",
    location: "Corporate Leader",
    property: "Close the Gap HUB",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    quote:
      "Kifaru is more than a stay—it's an experience. From Brussels to Msambweni, every property combines comfort and culture.",
    author: "Tom S.",
    location: "Traveler & Changemaker",
    property: "Kifaru Global Experience",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
];

// duplicate for seamless loop
const SLIDES = [...testimonials, ...testimonials];
const SLIDE_DURATION = 6000; // speed (ms)

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index === testimonials.length) {
      // jump back to start WITHOUT animation
      setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.style.transition = "none";
        }
        setIndex(0);
        requestAnimationFrame(() => {
          if (trackRef.current) {
            trackRef.current.style.transition =
              "transform 700ms ease-in-out";
          }
        });
      }, 700);
    }
  }, [index]);

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
            {SLIDES.map((testimonial, i) => (
              <div
                key={i}
                className="min-w-full w-full flex-shrink-0 px-2"
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}