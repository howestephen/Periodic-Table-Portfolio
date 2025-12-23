/**
 * Helper functions for Figma embeds
 */

/**
 * Gets a placeholder image URL for Figma items
 * You can replace this with an actual placeholder image in your public folder
 */
export function getFigmaPlaceholder(): string {
  // Option 1: Use a placeholder image from your public folder
  // Place an image at: public/images/figma-placeholder.jpg
  return "/images/figma-placeholder.jpg";
  
  // Option 2: Use a data URI placeholder (fallback if image doesn't exist)
  // return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%239366f3' width='400' height='300'/%3E%3Ctext fill='white' font-family='Arial' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EFigma Design%3C/text%3E%3C/svg%3E";
}

