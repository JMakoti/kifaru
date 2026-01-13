import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import { Toaster, toast } from "sonner";

import whatsapp from "@/assets/icon/cl-whatsapp.png";
import instagram from "@/assets/icon/cl-instagram.png";
import facebook from "@/assets/icon/cl-facebook.png";

const properties = [property1, property2, property3];

export default function ContactDetailsSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % properties.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    toast.success("Message Sent! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      {/* Hero Section - Image Carousel */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          {properties.map((img, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: currentImage === index ? 1 : 0,
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-overlay/50 via-overlay/70 to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-center leading-tight">
              Contact Us
            </h1>
            <p className="text-2xl font-light max-w-2xl mx-auto">
              Get in touch with us to start planning your luxury getaway
            </p>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {properties.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentImage === index
                  ? "bg-primary w-8"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`View property ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="container m-auto py-20 px-3">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Left Column - Contact Info */}
            <div className="lg:col-span-2 space-y-4 animate-slide-up">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Let’s Plan Your Stay
                </h2>
                <p className="text-lg text-muted-foreground">
                  Whether you are traveling solo, with family, or with a
                  purpose-driven team, we are here to design your ideal Kifaru
                  experience.
                </p>
                <div className="mt-4 mb-4">
                  <h3 className="text-2xl text-black font-bold">
                    What you can expect
                  </h3>
                  <div className="text-lg text-muted-foreground">
                    <ul className="list-disc list-inside">
                      <li>One dedicated account manager</li>
                      <li>Transparent booking and clear communication</li>
                      <li>End-to-end support from inquiry to departure</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 group cursor-pointer transition-all duration-300">
                  <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Call Us
                    </p>
                    <p className="font-semibold text-lg text-foreground">
                      +254 708 533 033
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group cursor-pointer transition-all duration-300">
                  <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Email Us
                    </p>
                    <p className="font-semibold text-lg text-foreground">
                      requests@techbedkifaru.be
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group cursor-pointer transition-all duration-300">
                  <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Concierge & On-Site Support
                    </p>
                    <p className="font-semibold text-lg text-foreground">
                      Available per location
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold">
                  Reach us Throught Our Social Links
                </h3>
                <div className="flex gap-4 mt-5">
                  <div>
                    <img src={whatsapp} alt="Whatsapp" className="w-10 h-10" />
                  </div>
                  <div>
                    <img
                      src={instagram}
                      alt="Instagram"
                      className="w-10 h-10"
                    />
                  </div>
                  <div>
                    <img src={facebook} alt="Facebook" className="w-10 h-10" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div
              className="lg:col-span-2 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Send us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-foreground"
                      >
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-background border-border focus:border-primary focus:ring-primary"
                        placeholder="Your Name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-foreground"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-background border-border focus:border-primary focus:ring-primary"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-foreground"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-background border-border focus:border-primary focus:ring-primary"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-foreground"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-background border-border focus:border-primary focus:ring-primary min-h-[120px]"
                      placeholder="Tell us about your property needs..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-luxury transition-all duration-300 text-white font-semibold py-6 text-lg"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
