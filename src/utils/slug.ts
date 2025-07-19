export function fromSlug(slug: string): string {
  return slug
    .replace(/-/g, " ") // Replace dashes with spaces
    .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letters if needed
}
