import TestimonialCard from "./testmonialcard";

const testimonials = [
  {
    quote: "Kifaru Brussels is the perfect blend of work and inspiration. The coworking spaces, cultural touches, and hospitality make it a hub for creativity and connection.",
    author: "Sophie L.",
    location: "Entrepreneur",
    property: "Tech & Bed Kifaru Brussels",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  // {
  //   quote: "Our family loved Ocean Kifaru North-Sea! The private jacuzzi and enclosed garden made our stay safe, relaxing, and unforgettable.",
  //   author: "Mark D.",
  //   location: "Netherlands",
  //   property: "Ocean Kifaru North-Sea",
  //   image: "https://randomuser.me/api/portraits/men/75.jpg",
  // },
  // {
  //   quote: "The Msambweni villa is a slice of paradise. From the infinity pool to the private chefs and concierge service, every detail was perfect.",
  //   author: "Clara M.",
  //   location: "International Guest",
  //   property: "Ocean Kifaru Indian Ocean",
  //   image: "https://randomuser.me/api/portraits/women/65.jpg",
  // },
  // {
  //   quote: "We enjoyed the Marble Inn for its modern amenities and attentive concierge. Perfect for a short stay in Nyali with easy access to everything.",
  //   author: "Jan V.",
  //   location: "Kenya",
  //   property: "Kifaru Marble Inn Mombasa",
  //   image: "https://randomuser.me/api/portraits/men/44.jpg",
  // },
  // {
  //   quote: "The rooftop terrace and strategic location of the Close the Gap HUB are ideal for focus, networking, and executive retreats. Truly a professional's haven.",
  //   author: "Emma R.",
  //   location: "Corporate Leader",
  //   property: "Close the Gap HUB",
  //   image: "https://randomuser.me/api/portraits/women/72.jpg",
  // },
  // {
  //   quote: "Kifaru is more than a stay—it's an experience. From Brussels to Msambweni, every property combines comfort, culture, and meaningful connections.",
  //   author: "Tom S.",
  //   location: "Traveler & Changemaker",
  //   property: "Kifaru Global Experience",
  //   image: "https://randomuser.me/api/portraits/men/52.jpg",
  // },
];

const TestimonialSection = () => {
  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-black font-medium tracking-widest uppercase text-sm mb-4">
            Guest Experiences
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Stories from Our Guests
          </h2>
        </div>
        
        {/* Testimonials grid */}
        {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 */}
        <div className="">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
