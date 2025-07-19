import React from "react";
function fromSlug(slug: string): string {
  return slug
    .replace(/-/g, " ") // Replace dashes with spaces
    .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letters if needed
}
function toSlug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^\w\-]+/g, "") // Remove non-word characters
    .replace(/\-\-+/g, "-"); // Replace multiple dashes with single dash
}
function TestPage() {
  console.log(fromSlug("ethopian egg"), toSlug("ethopian egg"));
  return <div>TestPage</div>;
}

export default TestPage;
