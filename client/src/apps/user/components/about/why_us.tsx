import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import luxury from "@/assets/icon/kifaru-comfort.png";
import dining from "@/assets/icon/kifaru-dining.png";
import coaching from "@/assets/icon/kifaru-coaching-icon.png";
import homes from "@/assets/icon/kifaru-homes.png";
import transport from "@/assets/icon/kifaru-transport.png";
import humancentered from "@/assets/icon/kifaru-human-centered.png";

export default function Why_UsSection() {
  const items = [
    {
      title: "Luxury & Comfort Focused",
      description:
        "Guests experience the comfort of consistent, sustainable standards across all properties.",
      icon: <img src={luxury} alt="Luxury icon" className="w-14 h-14" />,
    },
    {
      title: "Flexible Dining Experiences",
      description:
        "Ensuring authentic, nourishing food and beverage experiences rooted in local culture.",
      icon: <img src={dining} alt="Dining icon" className="w-14 h-14" />,
    },
    {
      title: "Personal Coaching Professionals",
      description:
        "Including life coaches, business coaches, and inspirational role models.",
      icon: <img src={coaching} alt="Coaching icon" className="w-14 h-14" />,
    },
    {
      title: "Unique Homes",
      description:
        "Whether you seek a peaceful sanctuary or a sophisticated space to entertain.",
      icon: <img src={homes} alt="Homes icon" className="w-14 h-14" />,
    },
    {
      title: "Reliable & Ethical Mobility Solutions",
      description:
        "Purpose-driven mobility solutions delivering trust, responsibility, and long-term impact.",
      icon: <img src={transport} alt="Transport icon" className="w-14 h-14" />,
    },
    {
      title: "Effortless & Human-centered",
      description: "It is a living network of spaces, people, and purpose.",
      icon: <img src={humancentered} alt="Human-centered icon" className="w-14 h-14" />,
    },
  ];

  return (
    <motion.section
      className="w-full px-6 md:px-20 py-12 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Intro */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
          Why Choose Kifaru?
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Discover what sets us apart and makes every stay an unforgettable experience.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-card border border-border rounded-lg shadow-md p-6 h-70 flex flex-col items-start justify-start">
              <CardContent className="p-0 space-y-4">
                {item.icon}
                <h3 className="text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
