import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function CTASection() {
  return (
    <section
      className="
        container m-3 mx-auto p-4 md:py-6 min-h-[60vh]
        flex items-center justify-center
        bg-gradient-to-br from-accent via-accent/90 to-muted
        rounded-3xl relative overflow-hidden
        rounded-tr-none rounded-bl-none
      "
    >
      {/* Content */}
      <div className="relative z-10 text-center text-primary container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
          Join hundreds of satisfied guests
          <br />
          across our global properties
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Button
            size="lg"
            className="
              bg-white text-primary
              px-8 py-6 text-lg font-semibold rounded-full
              hover:bg-primary hover:text-white
              hover:border hover:border-white/20
              transition-all duration-300
            "
          >
            <Link to="/property">Explore Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
