import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import * as LucideIcons from "lucide-react";
import {
  Bath,
  Bed,
  Building2,
  DoorClosed,
  Dumbbell,
  MapPin,
  Ruler,
  ShowerHead,
  Square,
  User2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import Maps from "@/apps/user/components/property/maps";
// import Reviews from "@/apps/user/components/property/reviews";
// import Availability from "@/apps/user/components/property/availability";
import Booking from "@/apps/user/components/property/booking";
import { usePropertyDetails } from "@/services/property.service";
import LoadingScreen from "@/components/loadingscreen";

export default function KifaruPropertyDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError, error } = usePropertyDetails(slug!);

  // const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"description" | "features">(
    "description",
  );
  // "description" | "features" | "availability" | "maps" | "reviews"

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animated, setAnimated] = useState(false);

  const property = data;

  useEffect(() => {
    if (!property) return;
  }, [slug, property]);

  const tabs = ["description", "features"] as const;

  // "availability",
  //   "maps",
  //   "reviews",
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (isError) return <p>{error.message}</p>;

  if (!property) {
    return <div className="text-center py-10">Property not found</div>;
  }

  const images = property.images;
  // const image = property.background_image;
  const image = "https://res.cloudinary.com/drselhsl4/image/upload/v1764136940/Kifaru/backgrounds/ipshvpes7mlcg9mjc9qu.png";

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
    <div className="container mx-auto px-4 py-6 md:py8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">{property.name}</h1>
          <div className="flex gap-2 mt-2 text-gray-600 text-sm md:text-base">
            {" "}
            <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />{" "}
            {property.location}, {property.country}
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        {images.length > 0 ? (
          <div className="relative w-full  h-96 rounded-lg overflow-hidden bg-gray-100 md:aspect-auto">
            <img
              // src={images[currentImageIndex]}
              src={images[currentImageIndex].image}
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
        style={{ backgroundImage: `url(${image})` }}
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
                    {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {property.highlights.map((highlight: any, i: number) => {
                        const Icon = (Icons as any)[highlight.icon];
                        return (
                          <div
                            key={i}
                            className="flex flex-col items-center gap-3 p-4 rounded-lg bg-secondary/30"
                          >
                            <Icon className="w-12 h-12 text-primary" />
                            <span className="font-medium">
                              {highlight.label}
                            </span>
                          </div>
                        );
                      })}
                    </div> */}
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-3 mt-6">
                      About this space
                    </h3>
                    <p className="text-gray-600">{property.long_description}</p>
                  </div>

                  {/* <div className="mt-6">
                    <h3 className="text-2xl font-semibold mb-3">
                      Background & Story
                    </h3>
                    <p className="text-gray-600">{property.background_story}</p>
                  </div> */}

                  {/* <div className="mt-6">
                    <h3 className="text-2xl font-semibold mb-3">
                      On Site contact
                    </h3>
                    <p className="text-gray-600">
                      {property.on_site_contact?.name}
                    </p>
                    <p className="text-gray-600">
                      {property.on_site_contact?.role}
                    </p>
                    <p className="text-gray-600">
                      {property.on_site_contact?.contact_number}
                    </p>
                  </div> */}
                </div>
              )}

              {/* Amenities Tab */}
              {activeTab === "features" && (
                <div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Accommodation & Capacity
                    </h3>
                    {/* <div>
                      {property.accommodation?.bedrooms && (
                        <div className="grid sm:grid-cols-2 gap-4">
                          {property.accommodation.bedrooms.map(
                            (
                              bedroom: {
                                name: string;
                                bed_type: string;
                                capacity: number | string;
                              },
                              index: number,
                            ) => (
                              <div
                                key={index}
                                className="p-5 rounded-lg bg-secondary/30 space-y-2"
                              >
                                <h4 className="text-lg font-semibold">
                                  {bedroom.name}
                                </h4>

                                <p className="flex items-center gap-3 p-2">
                                  <Bed /> {bedroom.bed_type}
                                </p>

                                <p className="flex items-center gap-3 p-2">
                                  <LucideIcons.Users /> Capacity:{" "}
                                  {bedroom.capacity}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </div> */}
                  </div>
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">
                      Features & Amenities
                    </h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {/* <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30">
                     <img src="https://res.cloudinary.com/drselhsl4/image/upload/v1764184137/Kifaru/amenities/nuhz8ilchupjdl13rrsq.jpg" loading="lazy" alt="Holistic Spa & Wellness" />
                    </div> */}
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
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">
                      Services offered
                    </h3>
                    {/* <div>
                      {property?.services && (
                        <div className="grid sm:grid-cols-2 gap-4">
                          {property.services.map(
                            (service: string, index: number) => (
                              <p
                                key={index}
                                className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30"
                              >
                                {service}
                              </p>
                            ),
                          )}
                        </div>
                      )}
                    </div> */}
                  </div>
                </div>
              )}

              {/* Availability Tab */}
              {/* {activeTab === "availability" && (
                <Availability bookedRanges={property.booked_dates} />
              )} */}

              {/* Maps Tab */}
              {/* {activeTab === "maps" && (
                <div className="z-">
                  <Maps
                    position={property.geolocation as [number, number]}
                    name={property.name}
                  />
                </div>
              )} */}

              {/* Reviews Tab  */}
              {/* {activeTab === "reviews" && <Reviews review={property.reviews} />} */}
            </div>
          </div>

          {/* Booking Panel */}
          <Booking
            price={property.price}
            location={property.location}
            country={property.country}
            // status={property.status}
          />
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
// const Icons: Record<string, any> = {
//   Users: User2,
//   DoorClosed,
//   Dumbbell,
//   Building2,
//   ShowerHead,
//   Square,
//   Bed,
//   Bath,
//   Ruler,
// };
