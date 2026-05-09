interface ImageTransformOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "limit";
}

const CLOUDINARY_IMAGE_UPLOAD = "/image/upload/";

function optimizeCloudinaryImage(
  src: string,
  { width = 1200, height, crop = "limit" }: ImageTransformOptions = {},
) {
  if (!src.includes("res.cloudinary.com") || !src.includes(CLOUDINARY_IMAGE_UPLOAD)) {
    return src;
  }

  const [base, path] = src.split(CLOUDINARY_IMAGE_UPLOAD);
  if (!base || !path) return src;

  const hasExistingTransform = path.split("/")[0]?.includes(",");
  if (hasExistingTransform) return src;

  const transforms = ["f_auto", "q_auto", `c_${crop}`, `w_${width}`];
  if (height) transforms.push(`h_${height}`);

  return `${base}${CLOUDINARY_IMAGE_UPLOAD}${transforms.join(",")}/${path}`;
}

export function resolveImageSrc(
  image: string | File | null | undefined,
  options?: ImageTransformOptions,
): string | undefined {
  if (!image) return undefined;
  if (typeof image === "string") return optimizeCloudinaryImage(image, options);
  return URL.createObjectURL(image);
}
