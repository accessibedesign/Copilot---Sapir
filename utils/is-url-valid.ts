/**
 * Validates that a string is a safe and structurally valid URL:
 * - Must use http or https protocol, or be a relative path starting with '/'
 * @param link - The URL or path string to validate
 * @returns True if the link is a valid and safe URL
 */
export const isUrlValid = (link: string): boolean => {
  if (typeof link !== "string" || link.trim().length === 0) return false;

  try {
    const url = new URL(link, location.origin);
    return url.protocol === "http:" || url.protocol === "https:";
    
  } catch {
    return false;
  }
};
