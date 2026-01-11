// import TestimonialCard from "./testmonialcardprop";
import testimonialBg from "@/assets/images/Interior.jpg";
import propertyImage from "@/assets/property-2.jpg"

export default function TestimonialSection() {
  return (
    <div className="relative lg:order-first w-full px-6 md:px-20">
      {/* Main image container with gradient */}
      <div className="h-100 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary relative">
        <img
          src={testimonialBg}
          alt="Kifaru hospitality experience"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
        {/* Text overlay */}
        <div className="absolute inset-0 flex items-end p-4 text-white">
          <h3 className="text-lg font-bold">Our Guests Love Kifaru</h3>
        </div>
      </div>

      {/* Floating accent card */}
      <div className="absolute -top-6 -right-8 md:right-6 border rounded-lg shadow-[var(--shadow-soft)] max-w-[200px]">
        <img src={propertyImage} alt="Kifaru property highlight" className="w-full h-full object-cover rounded-lg" />
      </div>
    </div>
  );
}
