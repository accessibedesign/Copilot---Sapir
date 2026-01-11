/**
 * a flag to indicate if the browser supports the `adoptedStyleSheets` API.
 */
export const isAdoptedStyleSheetsSupported =
  "adoptedStyleSheets" in Document.prototype && "replaceSync" in CSSStyleSheet.prototype;
