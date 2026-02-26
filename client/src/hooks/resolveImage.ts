export function resolveImageSrc(
  image: string | File | null | undefined,
): string | undefined {
  if (!image) return undefined;                 
  if (typeof image === "string") return image;  
  return URL.createObjectURL(image);       
}
