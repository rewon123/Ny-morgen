export const normalizeImageUrl = (url) => {
  if (!url || typeof url !== "string") {
    return url;
  }

  return url
    .trim()
    .replace("https://i.ibb.co.com/", "https://i.ibb.co/")
    .replace("http://i.ibb.co.com/", "https://i.ibb.co/")
    .replace("https://ibb.co.com/", "https://ibb.co/")
    .replace("http://ibb.co.com/", "https://ibb.co/");
};

export const isRemoteImageUrl = (url) => /^https?:\/\//i.test(url || "");

export const isImgBbImageUrl = (url) => {
  const normalizedUrl = normalizeImageUrl(url);

  try {
    const { hostname } = new URL(normalizedUrl);
    return hostname === "i.ibb.co" || hostname.endsWith(".ibb.co");
  } catch {
    return false;
  }
};

export const getSafeImageSrc = (url, fallback = "/images/men.webp") =>
  normalizeImageUrl(url) || fallback;

export const shouldBypassNextImageOptimization = (url) =>
  isImgBbImageUrl(url);
