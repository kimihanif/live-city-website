export function categoryFallback(_category: string | null | undefined): string | null {
  // Future: map categories to /category-defaults/<slug>.jpg.
  // For v1, return null and let the PH placeholder render.
  return null;
}

export function imageWithFallback(src: string | null | undefined, category?: string | null): string | null {
  if (src && src.trim().length > 0) return src;
  return categoryFallback(category);
}
