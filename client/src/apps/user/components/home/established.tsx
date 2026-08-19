import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram, Facebook } from "lucide-react";
import george from "@/assets/team/Victor.webp"
import oliver from "@/assets/team/olivier.webp"
import debbie from "@/assets/team/debbie.webp"
import alexander from "@/assets/team/Alexander2.webp"

const teamMembers = [
  {
    image:oliver,
    name: "Olivier Vanden Eynde",
    title: "Partner",
    quote:
      "Olivier Vanden Eynde is a pioneer in development cooperation, combining social impact with entrepreneurship across Europe and Kenya.",
    socials: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      facebook: "#",
    },
  },
  {
    image:debbie,
    name: "Debbie",
    title: "Partner",
    quote:
      "After a decade of rich experiences in finance and entrepreneurship, Debbie embraced her passion for building ventures and co-founded 'Close the Gap Kenya' with Olivier",
    socials: {
      linkedin: "#",
      twitter: "#",
      facebook: "#",
    },
  },
  {
    image: alexander,
    name: "Alexander",
    title: "Junior",
    quote:
      "Alexander is a true 'born global', having grown up in Amsterdam, Brussels, and Mombasa, thriving in diverse cultures and languages.",
    socials: {
      linkedin: "#",
      instagram: "#",
      facebook: "#",
    },
  },
  {
    image: george,
    name: "Victor Georges Vanden",
    title: "Junior",
    quote:
      "Victor is a true 'born global', having grown up in Amsterdam, Brussels, and Mombasa, thriving in diverse cultures and languages.",
    socials: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      facebook: "#",
    },
  },
];

interface PersonCardProps {
  image: string;
  name: string;
  title: string;
  quote: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  delay?: number;
}

const PersonCard = ({
  image,
  name,
  title,
  quote,
  socials,
  delay = 0,
}: PersonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-500 hover:border-primary/30 hover:shadow-[var(--shadow-glow)]">
        <div className="relative h-80 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80" />

          <motion.div className="absolute inset-0 flex items-center justify-center p-6 bg-card/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-center text-foreground/90 italic text-md leading-relaxed font-light">
              "{quote}"
            </p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 relative">
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-semibold text-foreground font-[var(--font-display)] tracking-wide">
                {name}
              </h3>
              <p className="text-sm text-primary font-medium uppercase tracking-widest mt-1">
                {title}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                >
                  <Linkedin size={16} />
                </a>
              )}
              {socials.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                >
                  <Facebook size={16} />
                </a>
              )}
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                >
                  <Twitter size={16} />
                </a>
              )}
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                >
                  <Instagram size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function TeamSection() {
  return (
    <section className="py-24 px-6 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient">
            Meet Our Visionaries
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Passionate minds crafting digital experiences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <PersonCard key={member.name} {...member} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
