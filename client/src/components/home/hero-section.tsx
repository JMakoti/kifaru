import { Link } from "react-router";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
export default function HeroSection() {
  return (
    <div>
      <div className="relative overflow-hidden min-h-[500px] flex items-center">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-20"
          poster="https://res.cloudinary.com/drselhsl4/image/upload/v1763483919/Kifaru/k096rs8b5wqru5dwghax.jpg"
        >
          <source
            // src="https://res.cloudinary.com/drselhsl4/video/upload/v1763482246/Kifaru/rkmfrnnwjiwowqtztql0.mp4"
            src="https://res.cloudinary.com/drselhsl4/video/upload/v1768159278/Kifaru/jyxq43ne939bishlyvnn.mp4"
            type="video/mp4"
          />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/drselhsl4/image/upload/v1763483919/Kifaru/k096rs8b5wqru5dwghax.jpg')",
            }}
          ></div>
        </video>

        <div className="absolute inset-0 bg-black/40 -z-10"></div>

        <div className="container-custom section-padding relative z-10 m-5">
          <div className="max-w-3xl mx-auto md:mx-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              <span className="text-gradient-blue">Kifaru Impact Retreat</span>
              <br />
              <span className="text-3xl font-medium">Where purpose, place, and people meet.</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl">
              A living network of refined retreat spaces across Africa and
              Europe designed for entrepreneurs, changemakers, and leaders who
              seek meaningful impact without compromising comfort, beauty, or
              authenticity.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-white hover:text-white text-primary flex items-center gap-2 text-base animate-pulse"
                asChild
              >
                <Link to="/property">Explore Our Retreats</Link>
              </Button>
              <Button
                className="bg-white hover:bg-gray-100 text-primary-600 flex items-center gap-2 text-base"
                asChild
              >
                <Link to="/contact">
                  Plan Your Stay <ArrowRight size={16} />
                </Link>
              </Button>
              {/* <Button
              className="bg-white hover:bg-gray-100 text-primary-600 flex items-center gap-2 text-base"
              asChild
            >
              <Link to="/property">
                Book Now 
              </Link>
            </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
