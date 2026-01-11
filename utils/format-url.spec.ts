import { formatUrl } from "./format-url";

describe("formatUrl", () => {
  it("should prepend https:// if protocol is missing", () => {
    expect(formatUrl("example.com")).toBe("https://example.com/");
    expect(formatUrl("www.example.com")).toBe("https://www.example.com/");
  });

  it("should not change https:// protocol", () => {
    expect(formatUrl("https://example.com")).toBe("https://example.com/");
    expect(formatUrl("https://www.example.com/path")).toBe("https://www.example.com/path/");
  });

  it("should not change http:// protocol", () => {
    expect(formatUrl("http://example.com")).toBe("http://example.com/");
    expect(formatUrl("http://www.example.com/path")).toBe("http://www.example.com/path/");
  });

  it("should add a trailing slash if missing", () => {
    expect(formatUrl("https://example.com")).toBe("https://example.com/");
    expect(formatUrl("http://example.com/path")).toBe("http://example.com/path/");
  });

  it("should not add a trailing slash if already present", () => {
    expect(formatUrl("https://example.com/")).toBe("https://example.com/");
    expect(formatUrl("http://example.com/path/")).toBe("http://example.com/path/");
  });

  it("should handle URLs with query parameters", () => {
    expect(formatUrl("example.com?query=test")).toBe("https://example.com/?query=test");
    expect(formatUrl("https://example.com/path?query=test")).toBe("https://example.com/path/?query=test");
  });

  it("should handle URLs with hash fragments", () => {
    expect(formatUrl("example.com#section")).toBe("https://example.com/#section");
    expect(formatUrl("https://example.com/path#section")).toBe("https://example.com/path/#section");
  });

  it("should return an empty string for empty input", () => {
    expect(formatUrl("")).toBe("");
    expect(formatUrl("   ")).toBe("");
  });

  it("should not add trailing slash to file paths", () => {
    expect(formatUrl("https://example.com/image.jpg")).toBe("https://example.com/image.jpg");
    expect(formatUrl("example.com/document.pdf")).toBe("https://example.com/document.pdf");
    expect(formatUrl("https://example.com/path/file.html?query=test")).toBe(
      "https://example.com/path/file.html?query=test",
    );
  });

  it("should handle complex paths correctly", () => {
    expect(formatUrl("example.com/a/b/c")).toBe("https://example.com/a/b/c/");
    expect(formatUrl("https://sub.domain.co.uk/long/path/to/resource")).toBe(
      "https://sub.domain.co.uk/long/path/to/resource/",
    );
  });

  it("should return the original trimmed URL if URL construction fails", () => {
    expect(formatUrl("ht!tp://invalid-url")).toBe("https://ht!tp//invalid-url/");
    expect(formatUrl("://missing-protocol.com")).toBe("https://://missing-protocol.com");
  });
});
