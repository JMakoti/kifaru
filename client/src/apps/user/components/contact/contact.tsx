import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin } from "lucide-react";
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
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Message Sent! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence>
            {properties.map((img, index) =>
              currentImage === index ? (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${img})` }}
                />
              ) : null,
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-background" />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-white drop-shadow-lg">
              Contact Us
            </h1>
            <p className="text-lg md:text-2xl font-light text-white/90 max-w-2xl mx-auto drop-shadow">
              Get in touch with us to start planning your luxury getaway
            </p>
          </motion.div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {properties.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentImage === index
                  ? "bg-white w-8"
                  : "bg-white/50 w-2 hover:bg-white/80"
              }`}
              aria-label={`View property ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="container m-auto py-20 px-3 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="lg:col-span-2 space-y-6"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4 tracking-wide">
                Let’s Plan Your Stay
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you are traveling solo, with family, or with a
                purpose-driven team, we are here to design your ideal Kifaru
                experience.
              </p>

              {/* Contact Info Cards */}
              <div className="space-y-4 py-5">
                {[
                  // { icon: Phone, title: "Call Us", value: "" },
                  {
                    icon: Mail,
                    title: "Email Us",
                    value: "requests@techbedkifaru.be",
                  },
                  {
                    icon: MapPin,
                    title: "Concierge & On-Site Support",
                    value: "Available per location",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    className="flex items-start gap-4 group cursor-pointer transition-all duration-300"
                  >
                    <div className="p-4 rounded-xl bg-accent/30 group-hover:bg-accent/40 transition-all">
                      <item.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <p className="text-md text-muted-foreground mb-1">
                        {item.title}
                      </p>
                      <p className="font-semibold text-lg text-foreground">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Icons */}
              <div>
                <h3 className="font-bold">Reach us Through Our Social Links</h3>
                <div className="flex gap-4 mt-5">
                  {[whatsapp, instagram, facebook].map((icon, idx) => (
                    <motion.img
                      key={idx}
                      src={icon}
                      alt="social icon"
                      loading="lazy"
                      className="w-10 h-10 opacity-80 cursor-pointer"
                      whileHover={{ scale: 1.15, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="lg:col-span-2"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="bg-card/90 backdrop-blur border border-border/60 rounded-2xl p-8 shadow-xl"
              >
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Send us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-md font-medium text-foreground"
                      >
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-background/80 border-border focus:ring-foreground focus:border-foreground"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-md font-medium text-foreground"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-background/80 border-border focus:ring-foreground focus:border-foreground"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-md font-medium text-foreground"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-background/80 border-border focus:ring-foreground focus:border-foreground"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-md font-medium text-foreground"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-background/80 border-border focus:ring-foreground focus:border-foreground min-h-[120px]"
                      placeholder="Tell us about your property needs..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-luxury transition-all duration-300 text-white -semibold py-font6 text-lg"
                  >
                    Send Message
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
