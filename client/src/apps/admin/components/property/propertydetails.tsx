// import { useParams } from "react-router";

// import {
//   useProperties,
//   usePropertyDetails,
//   useReviews,
// } from "@/services/property.service";
// import { useEffect, useMemo } from "react";
// import LoadingScreen from "@/components/loadingscreen";
// import HeroCarousel from "@/apps/user/components/propertydetails/herosection";
// import AboutSection from "@/apps/user/components/propertydetails/aboutsection";
// import PropertyHighlights from "@/apps/user/components/propertydetails/highlightssection";
// import StayDetails from "@/apps/user/components/propertydetails/staydetailssection";
// import AmenitiesSection from "@/apps/user/components/propertydetails/amenitiessection";
// import GallerySection from "@/apps/user/components/propertydetails/gallerysection";
// import ReviewsSection from "@/apps/user/components/propertydetails/reviewssection";
// import PackagesSection from "@/apps/user/components/propertydetails/packagessection";
// import ReadyToBook from "@/apps/user/components/propertydetails/bookingsection";
// import ExploreMore from "@/apps/user/components/propertydetails/exploresection";

// export default function AdminPropertyDetails() {
//   const { slug } = useParams<{ slug: string }>();
//   const { data, isLoading: allPropertiesLoading } = useProperties();
//   const {
//     data: property,
//     isLoading,
//     isError,
//     error,
//   } = usePropertyDetails(slug!);
//   const { useGetReviews } = useReviews();
//   const { data: reviews, isLoading: reviewsLoading } = useGetReviews();
//   const reviewList = useMemo(() => {
//     if (!reviews?.results || !property?.id) return [];

//     return reviews.results.filter((review) => review.property === property.id);
//   }, [reviews, property]);

//   // Scroll to top when slug changes
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [slug]);

//   if (isLoading) {
//     return <LoadingScreen />;
//   }
//   if (allPropertiesLoading && !property) {
//     return <LoadingScreen />;
//   }
//   if (reviewsLoading) {
//     return <LoadingScreen />;
//   }

//   if (isError) {
//     return (
//       <div className="text-center py-20 text-red-500">
//         <p>{error?.message || "Something went wrong"}</p>
//       </div>
//     );
//   }

//   if (!property) {
//     return (
//       <div className="text-center py-20">
//         <p>Property not found</p>
//       </div>
//     );
//   }

//   return (
//     <main>
//       <div className="max-w-6xl mx-auto px-4">
//         <HeroCarousel property={property} />
//         <AboutSection property={property} />
//         <PropertyHighlights highlights={property.highlights} />
//         <StayDetails property={property} />
//         <AmenitiesSection amenities={property?.amenities ?? {}} />
//         <GallerySection gallery={property.property_images} />
//         <ReviewsSection reviews={reviewList} />
//         <PackagesSection packages={property.pricing_options} />
//         <ReadyToBook contacts={property.contacts} property={property} />
//         <ExploreMore
//           properties={data?.results || []}
//           currentPropertyId={property.id}
//         />
//       </div>
//     </main>
//   );
// }
