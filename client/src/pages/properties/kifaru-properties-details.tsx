import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import {
  Building2,
  CalendarCheck,
  Car,
  Coffee,
  DoorClosed,
  Dumbbell,
  MapPin,
  ShowerHead,
  Square,
  User2,
  Utensils,
  Wifi,
  Wind,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import msambweni from "../../assets/images/properties/msambweni-hero.jpg";
import msambweni1 from "../../assets/images/footers/footer-msambweni.png";
import msambweni2 from "../../assets/images/properties/nyali-hero.jpg";
import msambweni3 from "../../assets/images/properties/msambweni-hero.jpg";
import msambweni4 from "../../assets/images/Interior.jpg";
import msambweni5 from "../../assets/images/interior3.jpg";
import palmTree from "../../assets/palmtree.png";

export default function KifaruPropertyDetails() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "description" | "features" | "availability" | "maps" | "reviews"
  >("description");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [spaceId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const images = [
    msambweni,
    msambweni1,
    msambweni2,
    msambweni3,
    msambweni4,
    msambweni5,
  ].filter(Boolean) as string[];

  const toggleAnimation = () => {
    setAnimated(!animated);
    setTimeout(() => {
      setAnimated(false);
    }, 200);
  };

  const nextImage = () => {
    toggleAnimation();
    setCurrentImageIndex((i) => (i + 1) % images.length);
  };
  const prevImage = () => {
    toggleAnimation();
    setCurrentImageIndex((i) => (i - 1 + images.length) % images.length);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Kifaru Msambweni</h1>
          <div className="flex gap-2 mt-2 text-gray-600">
            {" "}
            <MapPin /> South Coast, Msambweni, Kenya
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        {images.length > 0 ? (
          <div className="relative h-96 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={images[currentImageIndex]}
              alt="Kifaru Msambweni"
              className={`w-full h-full object-cover cursor-pointer
              transition-all duration-300 ease-out
              ${
                animated
                  ? "opacity-0 translate-y-5"
                  : "opacity-100 translate-y-0"
              }`}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}

            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        ) : (
          <div className="h-96 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No images available</span>
          </div>
        )}
      </div>

      {/* Tabs and Booking */}
      <div
        className="bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${palmTree})` }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`py-4 font-medium text-sm ${
                    activeTab === "description"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("features")}
                  className={`py-4 font-medium text-sm ${
                    activeTab === "features"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Amenities
                </button>
                <button
                  onClick={() => setActiveTab("availability")}
                  className={`py-4 font-medium text-sm ${
                    activeTab === "availability"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Availability
                </button>
                <button
                  onClick={() => setActiveTab("maps")}
                  className={`py-4 font-medium text-sm ${
                    activeTab === "maps"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Maps
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`py-4 font-medium text-sm ${
                    activeTab === "reviews"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Reviews
                </button>
              </nav>
            </div>

            {/* Tab Panels */}
            <div className="mb-8">
              {/* Description Tab */}
              {activeTab === "description" && (
                <div>
                  {/* <h3 className="text-xl font-semibold mb-3"> </h3> */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Highlights</h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30">
                        <User2 className="w-5 h-5 text-primary" />
                        <span className="font-medium">4 Guests</span>
                      </div>

                      <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30">
                        <DoorClosed className="w-5 h-5 text-primary" />
                        <span className="font-medium">2 Bedrooms</span>
                      </div>

                      <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30">
                        <ShowerHead className="w-5 h-5 text-primary" />
                        <span className="font-medium">3 Bathrooms</span>
                      </div>

                      <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30">
                        <Square className="w-5 h-5 text-primary" />
                        <span className="font-medium">Area: 75.0 m²</span>
                      </div>

                      <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30">
                        <Building2 className="w-5 h-5 text-primary" />
                        <span className="font-medium">Holiday home</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-3">
                      About this space
                    </h3>
                    <p className="text-gray-600">
                      Discover paradise at Kifaru Msambweni Beach, where the
                      Indian Ocean meets unparalleled luxury. Our beachfront
                      resort offers private villas with ocean views, infinity
                      pools that blend with the horizon, and direct access to
                      pristine white sand beaches. Indulge in fresh seafood at
                      our beachside restaurant, explore vibrant coral reefs, or
                      simply relax under swaying palm trees. This is coastal
                      luxury at its finest.
                    </p>
                  </div>
                </div>
              )}

              {/* Amenities Tab */}
              {activeTab === "features" && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Features & Amenities
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30">
                      <Wifi className="w-5 h-5 text-primary" />
                      <span className="font-medium">Wi-Fi</span>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30">
                      <Wind className="w-5 h-5 text-primary" />
                      <span className="font-medium">Spa & Wellness</span>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30">
                      <Car className="w-5 h-5 text-primary" />
                      <span className="font-medium">Airport Transfer</span>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30">
                      <Coffee className="w-5 h-5 text-primary" />
                      <span className="font-medium">Room Service</span>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30">
                      <Dumbbell className="w-5 h-5 text-primary" />
                      <span className="font-medium">Water Sports</span>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30">
                      <Utensils className="w-5 h-5 text-primary" />
                      <span className="font-medium">Beachfront Dining</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Availability Tab */}
              {activeTab === "availability" && (
                <div>
                  <h1>Calender Containing Days Booked</h1>
                </div>
              )}

              {/* Maps Tab */}
              {activeTab === "maps" && (
                <div>
                  <h1>Containing Approximate Map location</h1>
                </div>
              )}

              {/* Reviews Tab  */}
              {activeTab === "reviews" && (
                <div>
                  <h1>Contains customer reviews</h1>
                </div>
              )}
            </div>
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow p-6 sticky top-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">
                  Ksh. 1200
                  <span className="text-gray-600 text-base"> per Day</span>
                </h3>

                <div className="mb-6 text-sm text-gray-600">
                  <div>South Coast, Msambweni</div>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mb-3"
                >
                  <Link to="/contact">
                    <CalendarCheck className="mr-2 w-5 h-5" />
                    Book Now
                  </Link>
                </Button>

                <p className="text-xs text-gray-500 mt-3">
                  Secure booking process • Instant confirmation
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={"text-green-600"}>Free</span>
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                Need help?{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-800">
                  Contact support
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="py-16 px-6 bg-secondary/20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Explore More Properties
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover our other exclusive locations across Africa and Europe
            </p>
            <Button asChild size="lg">
              <Link to="/property">View All Properties</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
