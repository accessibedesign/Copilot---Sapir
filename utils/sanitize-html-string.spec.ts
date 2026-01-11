import { sanitizeHtmlString } from "./sanitize-html-string"; // Adjust the import path as necessary

describe("sanitizeHtmlString", () => {
  it("should remove tags that are not in the allowed list", () => {
    const input = '<script>alert("XSS");</script><b>Bold</b><i>Italic</i>';
    const output = sanitizeHtmlString(input);
    expect(output).toBe("<b>Bold</b><i>Italic</i>");
  });

  it("should preserve allowed tags and their attributes", () => {
    const input = '<a href="https://example.com">Link</a><b>Bold</b>';
    const output = sanitizeHtmlString(input);
    expect(output).toBe('<a href="https://example.com">Link</a><b>Bold</b>');
  });

  it('should remove attributes starting with "on" (event handlers)', () => {
    const input = '<a href="https://example.com" onclick="alert(\'XSS\')">Link</a>';
    const output = sanitizeHtmlString(input);
    expect(output).toBe('<a href="https://example.com" onclick="">Link</a>');
  });

  it("should remove dangerous protocols from href and src attributes", () => {
    const input = "<a href=\"javascript:alert('XSS')\">Link</a><img src=\"javascript:alert('XSS')\" />";
    const output = sanitizeHtmlString(input);
    expect(output).toBe('<a href="">Link</a><img src="">');
  });

  it("should handle complex nested structures and only keep allowed tags", () => {
    const input =
      '<div><p>Text <span style="color: red;">Styled</span> <iframe src="http://example.com"></iframe></p></div>';
    const output = sanitizeHtmlString(input);
    expect(output).toBe('<div><p>Text <span style="color: red;">Styled</span> </p></div>');
  });

  it("should remove any form action attributes", () => {
    const input = '<form action="submit.php"><input type="text"></form>';
    const output = sanitizeHtmlString(input);
    expect(output).toBe('');
  });

  it("should correctly handle self-closing tags like `<img>", () => {
    const input = '<img src="image.jpg" alt="image" /><br>';
    const output = sanitizeHtmlString(input);
    expect(output).toBe('<img src="image.jpg" alt="image"><br>');
  });

  it("should not alter allowed svg and path tags", () => {
    const input = '<svg><path d="M10 10 H 90 V 90 H 10 Z" /></svg>';
    const output = sanitizeHtmlString(input);
    expect(output).toBe('<svg><path d="M10 10 H 90 V 90 H 10 Z"></path></svg>');
  });

  it("should event listener attributes from all elements", () => {
    const input = "<div onclick=\"alert('XSS')\">Click me</div>";
    const output = sanitizeHtmlString(input);
    expect(output).toBe("<div onclick=\"\">Click me</div>");
  });

  it("should remove datauri in src attribute", () => {
    const input = '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmci">';
    const output = sanitizeHtmlString(input);
    expect(output).toBe('<img src="">');
  });

  it("should remove datauri in href attribute", () => {
    const input = '<a href="data:text/html;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmci">Link</a>';
    const output = sanitizeHtmlString(input);
    expect(output).toBe('<a href="">Link</a>');
  });

});
