import { useParams } from "react-router";
import AboutSection from "../../components/propertydetails/aboutsection";
import AmenitiesSection from "../../components/propertydetails/amenitiessection";
import ReadyToBook from "../../components/propertydetails/bookingsection";
import ExploreMore from "../../components/propertydetails/exploresection";
import GallerySection from "../../components/propertydetails/gallerysection";
import HeroCarousel from "../../components/propertydetails/herosection";
import PropertyHighlights from "../../components/propertydetails/highlightssection";
import PackagesSection from "../../components/propertydetails/packagessection";
import ReviewsSection from "../../components/propertydetails/reviewssection";
import StayDetails from "../../components/propertydetails/staydetailssection";
import {
  useProperties,
  usePropertyDetails,
  useReviews,
} from "@/services/property.service";
import { useEffect, useMemo } from "react";
import LoadingScreen from "@/components/loadingscreen";

export default function PropertyDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading: allPropertiesLoading } = useProperties();
  const {
    data: property,
    isLoading,
    isError,
    error,
  } = usePropertyDetails(slug!);
  const { useGetReviews } = useReviews();
  const { data: reviews, isLoading: reviewsLoading } = useGetReviews();
  const reviewList = useMemo(() => {
  if (!reviews?.results || !property?.id) return [];

  return reviews.results.filter(
    (review) => review.property === property.id
  );
}, [reviews, property]);


  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (allPropertiesLoading && !property) {
    return <LoadingScreen />;
  }
  if (reviewsLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>{error?.message || "Something went wrong"}</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-20">
        <p>Property not found</p>
      </div>
    );
  }

  return (
    <main>
      <HeroCarousel property={property} />
      <AboutSection property={property} />
      <PropertyHighlights highlights={property.highlights} />
      <StayDetails property={property} />
      <AmenitiesSection amenities={property?.amenities ?? {}} />
      <GallerySection gallery={property.property_images} />
      <ReviewsSection reviews={reviewList}  />
      <PackagesSection packages={property.pricing_options} />
      <ReadyToBook contacts={property.contacts} property={property} />
      <ExploreMore
        properties={data?.results || []}
        currentPropertyId={property.id}
      />
    </main>
  );
}
