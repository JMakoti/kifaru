// import type { Property } from "@/types/property";

// export function buildPropertyFormData(property: Property): FormData {
//   const formData = new FormData();

//   // Simple text fields
//   formData.append("name", property.name);
//   if (property.slug) formData.append("slug", property.slug);
//   formData.append("location", property.location);
//   formData.append("country", property.country);
//   formData.append("property_category", property.property_category);
//   formData.append("price", property.price);
//   formData.append("description", property.description);
//   formData.append("bedrooms", property.bedrooms.toString());
//   formData.append("bathrooms", property.bathrooms.toString());
//   formData.append("square_meters", property.square_meters.toString());
//   if (property.terrace_size) {
//     formData.append("terrace_size", property.terrace_size.toString());
//   }
//   formData.append("max_guests", property.max_guests.toString());
//   formData.append("min_nights", property.min_nights.toString());
//   formData.append("check_in_time", property.check_in_time);
//   formData.append("check_out_time", property.check_out_time);
//   formData.append(
//     "prepayment_percentage",
//     property.prepayment_percentage.toString(),
//   );
//   formData.append("cancellation_days", property.cancellation_days.toString());
//   formData.append("wifi_password", property.wifi_password);

//   // Background image — File upload
//   if (property.background_image) {
//     if (property.background_image instanceof File) {
//       formData.append("background_image", property.background_image);
//     }
//   }

//   // Amenities: labels as JSON, files as separate "amenity_images" entries
//   const amenityMeta = property.amenities.map((a) => ({ label: a.label }));
//   formData.append("amenities", JSON.stringify(amenityMeta));

//   property.amenities.forEach((amenity) => {
//     if (amenity.image instanceof File) {
//       formData.append("amenity_images", amenity.image);
//     }
//   });

//   // Property images: metadata as JSON, files as separate "images" entries
//   const imagesMeta = property.property_images.map((img) => ({
//     category: img.category,
//     order: img.order,
//   }));
//   formData.append("property_images", JSON.stringify(imagesMeta));

//   property.property_images.forEach((img) => {
//     if (img.image instanceof File) {
//       formData.append("images", img.image);
//     }
//   });

//   // Highlights as JSON
//   formData.append("highlights", JSON.stringify(property.highlights));

//   // Pricing options as JSON
//   formData.append("pricing_options", JSON.stringify(property.pricing_options));

//   // Features as JSON
//   formData.append("features", JSON.stringify(property.features));

//   // Contacts as JSON
//   formData.append("contacts", JSON.stringify(property.contacts));

//   return formData;
// }
