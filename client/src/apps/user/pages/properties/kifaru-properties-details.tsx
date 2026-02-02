import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import * as LucideIcons from "lucide-react";
import {
  // Bath,
  // Bed,
  // Building2,
  // DoorClosed,
  // Dumbbell,
  MapPin,
  // Ruler,
  // ShowerHead,
  // Square,
  // User2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import Maps from "@/apps/user/components/property/maps";
import Reviews from "@/apps/user/components/property/reviews";
// import Availability from "@/apps/user/components/property/availability";
import { usePropertyDetails } from "@/services/property.service";
import LoadingScreen from "@/components/loadingscreen";
import type {
  Amenity,
  PricingOption,
  PropertyImage,
} from "@/services/property.types";
import { Badge } from "@/components/ui/badge";
import { PhotoGalleryModal } from "./photogallery";
import BookingCard from "../../components/property/bookingcard";

export default function KifaruPropertyDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError, error } = usePropertyDetails(slug!);
  // const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "description" | "amenities" | "reviews"
  >("description");
  // "description" | "features" | "availability" | "maps" | "reviews"

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animated, setAnimated] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const property = data;

  useEffect(() => {
    if (!property) return;
  }, [slug, property]);

  const tabs = ["description", "amenities", "reviews"] as const;
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
  const image =
    "https://res.cloudinary.com/drselhsl4/image/upload/v1764136940/Kifaru/backgrounds/ipshvpes7mlcg9mjc9qu.png";

  const galleryPhotos: PropertyImage[] = images.map((img) => ({
    id: img.id,
    image: img.image,
    category: img.category,
    order: img.order,
  }));

  const toggleAnimation = () => {
    if (isGalleryOpen) return;
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

  type LucideIconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

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
          // <div className="relative w-full  h-96 rounded-lg overflow-hidden bg-gray-100 md:aspect-auto">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden group cursor-pointer">
            <img
              // src={images[currentImageIndex]}
              src={images[currentImageIndex].image}
              alt={property.name}
              // onClick={() => setIsGalleryOpen(true)}
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

            <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>

            <button
              onClick={() => setIsGalleryOpen(true)}
              className="absolute bottom-4 right-4 cursor-pointer flex items-center gap-2 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg hover:bg-background transition-colors"
            >
              <LucideIcons.Image className="w-5 h-5 text-foreground" />
              <span className="text-sm font-medium text-foreground">
                Show all photos
              </span>
            </button>
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
                        ? "border-b-2 border-accent-500 text-accent"
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
                      {/* Bedrooms */}
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30">
                        <div className="flex items-center justify-center">
                          <LucideIcons.BedDouble className="w-12 h-12 text-primary" />
                        </div>
                        <div className="flex flex-col leading-tight">
                          <span className="text-xl font-semibold">
                            {property.bedrooms}
                          </span>
                          <span className="text-md text-muted-foreground">
                            Bedrooms
                          </span>
                        </div>
                      </div>

                      {/* Bathrooms */}
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30">
                        <div className="flex items-center justify-center">
                          <LucideIcons.Bath className="w-12 h-12 text-primary" />
                        </div>
                        <div className="flex flex-col leading-tight">
                          <span className="text-lg font-semibold">
                            {property.bathrooms}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Bathrooms
                          </span>
                        </div>
                      </div>

                      {/* Interior Size */}
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30">
                        <div className="flex items-center justify-center">
                          <LucideIcons.Ruler className="w-12 h-12 text-primary" />
                        </div>
                        <div className="flex flex-col leading-tight">
                          <span className="text-lg font-semibold">
                            {property.square_meters} m²
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Interior Size
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 mt-6">
                      About this space
                    </h3>
                    <p className="text-gray-600 text-md">
                      {property.description}
                    </p>
                  </div>
                  <div>
                    {property?.features && property.features.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-semibold mb-3 mt-6">
                          Features
                        </h3>

                        <div className="grid sm:grid-cols-2 gap-4">
                          {property.features.map((feature) => {
                            const iconName =
                              feature.icon as keyof typeof LucideIcons;
                            let IconComponent: LucideIconComponent;

                            // Ensure we only assign valid React components
                            if (
                              iconName &&
                              typeof LucideIcons[iconName] === "function" &&
                              "render" in LucideIcons[iconName] === false
                            ) {
                              IconComponent = LucideIcons[
                                iconName
                              ] as LucideIconComponent;
                            } else {
                              IconComponent = LucideIcons.Check;
                            }

                            return (
                              <div
                                key={feature.id}
                                className="flex gap-4 p-4 rounded-lg bg-secondary/30"
                              >
                                {/* Icon */}
                                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 text-primary">
                                  {React.createElement(IconComponent, {
                                    className: "w-5 h-5",
                                  })}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold">
                                      {feature.name}
                                    </span>

                                    <Badge
                                      variant={
                                        feature.feature_type === "indoor"
                                          ? "secondary"
                                          : "outline"
                                      }
                                      className="capitalize"
                                    >
                                      {feature.feature_type}
                                    </Badge>
                                  </div>

                                  <span className="text-sm text-muted-foreground">
                                    {feature.description}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Amenities Tab */}
              {activeTab === "amenities" && (
                <div>
                  <section className="mt-16">
                    {/* Section Header */}
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold">Packages & Pricing</h2>
                      <p className="text-muted-foreground mt-1">
                        Flexible options based on stay type and guest preference
                      </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {property.pricing_options.map((option: PricingOption) => (
                        <div
                          key={option.id}
                          className="flex flex-col rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition"
                        >
                          {/* Header */}
                          <div className="mb-4">
                            <h3 className="text-lg font-semibold capitalize">
                              {option.accommodation_type.replace("_", " ")}
                            </h3>

                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="text-xs px-2 py-1 rounded-full bg-secondary">
                                {option.stay_type.replace("_", " ")}
                              </span>
                              <span className="text-xs px-2 py-1 rounded-full bg-secondary">
                                {option.guest_type}
                              </span>
                            </div>
                          </div>

                          {/* Stay Rules */}
                          <div className="space-y-3 text-sm mb-4">
                            {option.number_of_guests && (
                              <div className="flex items-center gap-2">
                                <LucideIcons.Users className="w-4 h-4 text-primary" />
                                <span>
                                  <span className="font-medium">Guests:</span>{" "}
                                  {option.number_of_guests}
                                </span>
                              </div>
                            )}

                            <div className="flex items-center gap-2">
                              <LucideIcons.Moon className="w-4 h-4 text-primary" />
                              <span>
                                <span className="font-medium">
                                  Minimum nights:
                                </span>{" "}
                                {option.min_nights}
                              </span>
                            </div>

                            {option.max_nights && (
                              <div className="flex items-center gap-2">
                                <LucideIcons.Clock className="w-4 h-4 text-primary" />
                                <span>
                                  <span className="font-medium">
                                    Maximum nights:
                                  </span>{" "}
                                  {option.max_nights}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Meal Plan */}
                          <div className="mb-6 text-sm">
                            <p className="font-medium mb-2 flex items-center gap-2">
                              <LucideIcons.Utensils className="w-4 h-4 text-primary" />
                              Meal Plan
                            </p>

                            <div className="space-y-2 text-muted-foreground">
                              <div className="flex items-center gap-2">
                                {option.includes_breakfast ? (
                                  <LucideIcons.Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <LucideIcons.X className="w-4 h-4 text-red-500" />
                                )}
                                <span className="flex items-center gap-1">
                                  <LucideIcons.Coffee className="w-4 h-4" />
                                  Breakfast included
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                {option.includes_fullboard ? (
                                  <LucideIcons.Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <LucideIcons.X className="w-4 h-4 text-red-500" />
                                )}
                                <span className="flex items-center gap-1">
                                  <LucideIcons.Utensils className="w-4 h-4" />
                                  Full board included
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Pricing */}
                          <div className="mt-auto pt-4 border-t">
                            <div className="flex items-center gap-2">
                              <LucideIcons.Wallet className="w-5 h-5 text-primary" />
                              <p className="text-xl font-bold text-primary">
                                {option.price_per_night}
                                <span className="text-sm font-normal text-muted-foreground">
                                  {" "}
                                  / night
                                </span>
                              </p>
                            </div>

                            {option.weekly_price && (
                              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                <LucideIcons.CalendarDays className="w-4 h-4" />
                                Weekly: {option.weekly_price}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">
                      Features & Amenities
                    </h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {property.amenities.map((amenity: Amenity, i: number) => (
                        <div
                          key={i}
                          className="relative h-60 rounded-lg overflow-hidden shadow-lg group"
                        >
                          <img
                            src={amenity.image}
                            alt={amenity.label}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />

                          {/* Overlay for label */}
                          <div
                            className="absolute inset-0 flex items-center justify-center 
                        bg-black/40 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
                        transition-opacity duration-300"
                          >
                            <span className="text-white text-center font-semibold px-2">
                              {amenity.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
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
              {activeTab === "reviews" && <Reviews propertyId={property.id} />}\
              

              {/* review={}  */}
            </div>
          </div>

          {/* Booking Panel */}
          <BookingCard
            location={property.location}
            country={property.country}
            propertyContacts={property.contacts}
            name={property.name}
            slug={property.slug}
          />
        </div>
        <div className="py-16 px-6 bg-secondary/20 mt-20 ">
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
        <PhotoGalleryModal
          open={isGalleryOpen}
          onOpenChange={setIsGalleryOpen}
          photos={galleryPhotos}
        />
      </div>
    </div>
  );
}
