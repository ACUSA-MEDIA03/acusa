// Client-side helper functions (for components)
const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  process.env.CLOUDINARY_CLOUD_NAME;

export const getCloudinaryUrl = (path: string) => {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${cleanPath}`;
};

export const getOptimizedImage = (
  path: string,
  width?: number,
  height?: number,
) => {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const transformations = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  transformations.push("c_fill", "q_auto", "f_auto");

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations.join(",")}/${cleanPath}`;
};
