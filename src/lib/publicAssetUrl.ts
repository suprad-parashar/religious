/** Prefix public asset paths when deployed under a subpath (e.g. GitHub Pages). */
export function publicAssetUrl(path: string) {
  if (!path || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
