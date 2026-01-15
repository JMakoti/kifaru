import { Button } from "@/components/ui/button";
import leftDeco from "@/assets/images/decos/cta2.png";
import rightDeco from "@/assets/images/decos/cta1.png";
import { Link } from "react-router";

export default function CTASection() {
  return (
    <div>
      <section className="container m-3 mx-auto p-4 md:py-6 min-h-[60vh] flex items-center justify-center bg-primary rounded-3xl relative overflow-hidden rounded-tr-none rounded-bl-none">
        {/* Left Top Corner Image */}
        <div className="absolute -top-10 -left-10 z-0">
          <img
            src={leftDeco}
            alt="Decoration"
            className="w-50 h-50 object-cover"
          />
        </div>

        {/* Bottom Right Corner Image */}
        <div className="absolute -bottom-10 -right-10 z-0">
          <img
            src={rightDeco}
            alt="Decoration"
            className="w-50 h-50 object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            {/* Start Your Journey With A Trusted
            <br />
            Partner Like Kifaru */}
            Join hundreds of satisfied guests <br /> across our global properties
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button
              size="lg"
              className="bg-white text-primary px-8 py-6 text-lg font-semibold rounded-full hover:bg-primary hover:text-white hover:border"
            >
              <Link to={"/property"}>Explore Properties</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
