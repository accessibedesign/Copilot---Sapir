/**
 * Sanitizes HTML content by whitelisting only specific safe tags and removing all others.
 * @param html - The content to sanitize.
 */
export const sanitizeHtmlString = (html: string): string => {

  // List of allowed tags
  const allowedTags = ["a", "b", "br", "div", "em", "i", "img", "p", "path", "span", "strong", "svg", "u"];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Remove elements that are not in the allowedTags list
  for (const element of doc.querySelectorAll(`:not(body, html, ${allowedTags.join(",")})`)) {
    element.remove();
  }

  const attributeHandlers: [RegExp, (value: string) => string][] = [
    // Block 'javascript:' and 'data:' schemes for href and src attributes
    [/href|src/, (value: string) =>
        (value.startsWith("javascript:") || value.startsWith("data:") ? "" : value)],

    // Remove dangerous attributes such as 'on*' event handlers and 'action'
    [/^(on[^=]+|action)/i, () => ""],
  ];

// Remove dangerous attributes from all elements
  for (const element of doc.querySelectorAll("*")) {
    for (const attr of Array.from(element.attributes)) {
      for (const [pattern, handler] of attributeHandlers) {
        if (pattern.test(attr.name)) {
          attr.value = handler(attr.value);
        }
      }
    }
  }


  // Serialize the sanitized document back to an HTML string
  return doc.body.innerHTML;
};
