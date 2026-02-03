import type { Property } from "@/types/property";

export function buildPropertyFormData(data: Property) {
  const fd = new FormData();

  // --- Primitive fields ---
  const primitiveFields: (keyof Property)[] = [
    "name",
    "location",
    "country",
    "property_category",
    "price",
    "description",
    "bedrooms",
    "bathrooms",
    "square_meters",
    "terrace_size",
    "max_guests",
    "min_nights",
    "check_in_time",
    "check_out_time",
    "prepayment_percentage",
    "cancellation_days",
    "wifi_password",
  ];

  primitiveFields.forEach((key) => {
    const value = data[key];
    if (value !== undefined && value !== null) {
      fd.append(key, String(value));
    }
  });

  // --- Background image ---
  if (data.background_image instanceof File) {
    fd.append("background_image", data.background_image);
  }

  // --- Amenities ---
  data.amenities.forEach((amenity, i) => {
    fd.append(`amenities[${i}][label]`, amenity.label);
    if (amenity.image instanceof File) {
      fd.append(`amenities[${i}][image]`, amenity.image);
    }
  });

  // --- Property Images ---
  data.property_images.forEach((img, i) => {
    fd.append(`property_images[${i}][category]`, img.category);
    fd.append(`property_images[${i}][order]`, String(img.order));
    if (img.image instanceof File) {
      fd.append(`property_images[${i}][image]`, img.image);
    }
  });

  // --- Nested arrays as JSON ---
  fd.append("features", JSON.stringify(data.features));
  fd.append("contacts", JSON.stringify(data.contacts));
  fd.append("highlights", JSON.stringify(data.highlights));
  fd.append("pricing_options", JSON.stringify(data.pricing_options));

  return fd;
}
