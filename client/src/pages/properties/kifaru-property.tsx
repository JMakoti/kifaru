import PropertySection from "@/components/home/property-section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function KifaruProperty() {
  return (
    <>
      <main className="min-h-screen pt-20">
        {/* <div className="container mx-auto px-6 md:px-12 py-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-8">
            Our Properties
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Blending luxury, nature, and African culture into unforgettable
            experiences
          </p>
        </div> */}

        <section>
          <PropertySection />
        </section>

        <section className="py-16 px-6 bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Ready to Experience Kifaru?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Our team is ready to help you plan your perfect luxury getaway
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
