import type { Property } from "@/types/property";

export function buildPropertyFormData(property: Property): FormData {
  const formData = new FormData();

  // -------------------- Basic fields --------------------
  formData.append("name", property.name);
  if (property.slug) formData.append("slug", property.slug);
  formData.append("location", property.location);
  formData.append("tagline", property.tagline);
  formData.append("location_description", property.location_description);
  formData.append("country", property.country);
  formData.append("property_category", property.property_category);
  formData.append("price", property.price);
  formData.append("description", property.description);
  formData.append("bedrooms", (property.bedrooms ?? 0).toString());
  formData.append("bathrooms", (property.bathrooms ?? 0).toString());
  formData.append("square_meters", (property.square_meters ?? 0).toString());
  if (property.terrace_size) {
    formData.append("terrace_size", property.terrace_size.toString());
  }
  formData.append("max_guests", (property.max_guests ?? 1).toString());
  formData.append("min_nights", property.min_nights.toString());
  formData.append("check_in_time", property.check_in_time);
  formData.append("check_out_time", property.check_out_time);
  formData.append(
    "prepayment_percentage",
    property.prepayment_percentage.toString(),
  );
  formData.append("cancellation_days", property.cancellation_days.toString());
  formData.append("wifi_password", property.wifi_password);

  // -------------------- Background image --------------------
  if (property.background_image instanceof File) {
    formData.append("background_image", property.background_image);
  }

  // -------------------- Amenities --------------------
  formData.append("amenities", JSON.stringify(property.amenities ?? {}));

  // // -------------------- Property Images --------------------

  // 1. Get ONLY new images (those with File)
  const newImages = property.property_images.filter(
    (img) => img.image instanceof File,
  );

  // 2. Build metadata ONLY for new images
  const imagesMeta = newImages.map((img) => ({
    category: img.category,
    order: img.order,
  }));

  // 3. Append metadata
  formData.append("property_images", JSON.stringify(imagesMeta));

  // 4. Append actual files
  newImages.forEach((img) => {
    formData.append("images", img.image);
  });
  // const imagesMeta = property.property_images.map((img) => ({
  //   category: img.category,
  //   order: img.order,
  // }));
  // formData.append("property_images", JSON.stringify(imagesMeta));
  // property.property_images.forEach((img) => {
  //   if (img.image instanceof File) {
  //     formData.append("images", img.image);
  //   }
  // });

  // -------------------- Highligh Options --------------------
  // const highlightsMeta = (property.highlights ?? []).map((h) => ({
  //   title: h.title,
  // }));

  // -------------------- Highlights --------------------

// Get all highlights safely
const highlights = property.highlights ?? [];

// 1. Build metadata for ALL highlights (existing + new)
const highlightsMeta = highlights.map((h) => ({
  title: h.title,
  image: typeof h.image === "string" ? h.image : null, // keep existing URLs
}));

formData.append("highlights", JSON.stringify(highlightsMeta));

// 2. Send ONLY new highlight images as files
highlights.forEach((h) => {
  if (h.image instanceof File) {
    formData.append(`highlights_images`, h.image);
  }
});

  // const highlightsMeta = (property.highlights ?? []).map((h) => ({
  //   title: h.title,
  //   image: typeof h.image === "string" ? h.image : null, // include existing URL
  // }));

  // formData.append("highlights", JSON.stringify(highlightsMeta));

  // // (property.highlights ?? []).forEach((highlight) => {
  // //   if (highlight.image instanceof File) {
  // //     formData.append("highlights_images", highlight.image);
  // //   }
  // // });

  // (property.highlights ?? []).forEach((highlight) => {
  //   if (highlight.image instanceof File) {
  //     // If it's a new file upload
  //     formData.append(`highlights_images`, highlight.image);
  //   }
  //   // else if (typeof highlight.image === "string" && highlight.image) {
  //   //   // If it's an existing image URL, send a flag to keep it
  //   //   // formData.append(`keep_highlight_images`, highlight.image);
  //   // }
  // });

  // -------------------- Pricing Options --------------------
  const cleanedPricing = (property.pricing_options ?? []).map((pricing) => ({
    ...pricing,
    price_per_night:
      pricing.price_per_night === "" ? null : pricing.price_per_night,
    weekly_price: pricing.weekly_price === "" ? null : pricing.weekly_price,
  }));

  formData.append("pricing_options", JSON.stringify(cleanedPricing));

  // -------------------- Features --------------------
  formData.append("features", JSON.stringify(property.features ?? []));

  // -------------------- Contacts --------------------
  formData.append("contacts", JSON.stringify(property.contacts ?? []));

  return formData;
}
