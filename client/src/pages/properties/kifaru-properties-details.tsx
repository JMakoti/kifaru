import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import * as LucideIcons from "lucide-react";
import {
  Bath,
  Bed,
  Building2,
  CalendarCheck,
  DoorClosed,
  Dumbbell,
  MapPin,
  Ruler,
  ShowerHead,
  Square,
  User2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import palmTree from "../../assets/palmtree.png";
import properties from "../../components/data/properties.json";
import Maps from "@/components/property/maps";
import Reviews from "@/components/property/reviews";

export default function KifaruPropertyDetails() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "description" | "features" | "availability" | "maps" | "reviews"
  >("description");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animated, setAnimated] = useState(false);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [date] = useState(new Date());

  // Find the property based on the route param
  const property = properties.find(
    (prop) => prop.slug.toString() === propertyId
  );

  useEffect(() => {
    if (!property) return;
    const expandedBookedDates = (
      check_in: string,
      check_out: string
    ): Date[] => {
      const checkinDate = new Date(check_in);
      const checkoutDate = new Date(check_out);
      const dates: Date[] = [];

      let currentDate = new Date(checkinDate);
      while (currentDate <= checkoutDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return dates;
    };

    const expanded = property.booked_dates.flatMap(
      (range: { check_in: string; check_out: string }) =>
        expandedBookedDates(range.check_in, range.check_out)
    );
    setBookedDates(expanded);
    setLoading(false);
  }, [propertyId, property]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const tabs = [
    "description",
    "features",
    "availability",
    "maps",
    "reviews",
  ] as const;

  if (!property) {
    return <div className="text-center py-10">Property not found</div>;
  }

  const images = property.images;

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

  const isBooked = (day: Date) =>
    bookedDates.some((b) => b.toDateString() === day.toDateString());

  return (
    <div className="container mx-auto px-4 py-6 md:py8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">{property.name}</h1>
          <div className="flex gap-2 mt-2 text-gray-600 text-sm md:text-base">
            {" "}
            <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" /> {property.location}, {property.country}
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        {images.length > 0 ? (
          <div className="relative w-full  h-96 rounded-lg overflow-hidden bg-gray-100 md:aspect-auto">
            <img
              src={images[currentImageIndex]}
              alt={property.name}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6 overflow-x-auto">
              <nav className="flex space-x-6 md:space-x-8 min-w-max md:min-w-0">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Panels */}
            <div className="mb-8">
              {/* Description Tab */}
              {activeTab === "description" && (
                <div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Highlights</h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {property.highlights.map((highlight: any, i: number) => {
                        const Icon = (Icons as any)[highlight.icon];
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30"
                          >
                            <Icon className="w-5 h-5 text-primary" />
                            <span className="font-medium">
                              {highlight.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-3">
                      About this space
                    </h3>
                    <p className="text-gray-600">{property.long_description}</p>
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
                    {property.amenities.map((amenity: any, i: number) => {
                      const Icon = (LucideIcons as any)[amenity.icon];
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30"
                        >
                          {Icon ? (
                            <Icon className="w-5 h-5 text-primary" />
                          ) : null}
                          <span className="font-medium">{amenity.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Availability Tab */}
              {activeTab === "availability" && (
                <div className="flex gap-4 justify-between">
                  {/* Current Month Calendar */}
                  <div className="w-1/2">
                    <h2 className="text-center text-lg font-semibold mb-2">
                      {date.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </h2>
                    <Calendar
                      value={date}
                      defaultView="month"
                      tileDisabled={({ date }) => isBooked(date)}
                      tileClassName={({ date }) =>
                        isBooked(date) ? "booked-date" : "available-date"
                      }
                      activeStartDate={
                        new Date(date.getFullYear(), date.getMonth(), 1)
                      }
                      showNavigation={false}
                    />
                  </div>

                  {/* Next Month Calendar */}
                  <div className="w-1/2">
                    <h2 className="text-center text-lg font-semibold mb-2">
                      {new Date(
                        date.getFullYear(),
                        date.getMonth() + 1,
                        1
                      ).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </h2>
                    <Calendar
                      value={date}
                      defaultView="month"
                      tileDisabled={({ date }) => isBooked(date)}
                      tileClassName={({ date }) =>
                        isBooked(date) ? "booked-date" : "available-date"
                      }
                      activeStartDate={
                        new Date(date.getFullYear(), date.getMonth() + 1, 1)
                      }
                      showNavigation={false}
                    />
                  </div>
                </div>
              )}

              {/* Maps Tab */}
              {activeTab === "maps" && (
                <Maps
                  position={property.geolocation as [number, number]}
                  name={property.name}
                />
              )}

              {/* Reviews Tab  */}
              {activeTab === "reviews" && <Reviews />}
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

// Map icon strings to lucide-react icons
const Icons: Record<string, any> = {
  Users: User2,
  DoorClosed,
  Dumbbell,
  Building2,
  ShowerHead,
  Square,
  Bed,
  Bath,
  Ruler,
};
