/**
 * Formats a given URL string to ensure it has a protocol (defaults to https://)
 * and a trailing slash (for directories).
 *
 * @param url The URL string to format.
 * @returns A fully formatted URL string.
 */
export function formatUrl(url: string): string {
  if (!url || url.trim() === "") {
    return "";
  }

  let processedUrl = url.trim();

  // Add protocol if missing
  if (!processedUrl.startsWith("http://") && !processedUrl.startsWith("https://")) {
    processedUrl = `https://${processedUrl}`;
  }

  try {
    const urlObj = new URL(processedUrl);

    // Check if the pathname should have a trailing slash
    // A pathname should have a trailing slash if it's not empty and doesn't represent a file
    // We consider it a file if the last segment of the pathname contains a dot,
    // assuming it's a file extension.
    const pathname = urlObj.pathname;
    const lastPathSegment = pathname.split("/").pop();
    const hasFileExtension = lastPathSegment && lastPathSegment.includes(".");

    if (pathname !== "/" && !pathname.endsWith("/") && !hasFileExtension) {
      urlObj.pathname = `${pathname}/`;
    }

    return urlObj.toString();
  } catch (e) {
    // If URL construction fails, return the original trimmed URL
    return processedUrl;
  }
}
