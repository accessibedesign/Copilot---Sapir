import { isUrlValid } from "./is-url-valid";

describe("isUrlValid", () => {
  // Valid absolute URLs
  it("accepts valid http URLs", () => {
    expect(isUrlValid("http://example.com")).toBe(true);
    expect(isUrlValid("http://example.com/path")).toBe(true);
  });

  it("accepts valid https URLs", () => {
    expect(isUrlValid("https://example.com")).toBe(true);
    expect(isUrlValid("https://example.com/path?query=123")).toBe(true);
  });

  // Valid relative URLs
  it("accepts relative paths starting with '/'", () => {
    expect(isUrlValid("/")).toBe(true);
    expect(isUrlValid("/some/path")).toBe(true);
    expect(isUrlValid("/path?query=1")).toBe(true);
  });

  // Invalid protocol
  it("rejects javascript: URIs", () => {
    expect(isUrlValid("javascript:alert(1)")).toBe(false);
  });

  it("rejects javascript: URIs with encoded payloads", () => {
    expect(isUrlValid("javascript:%61lert(1)")).toBe(false);
  });

  it("rejects data: URIs", () => {
    expect(isUrlValid("data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==")).toBe(false);
  });

  it("rejects file: URIs", () => {
    expect(isUrlValid("file:///etc/passwd")).toBe(false);
  });

  it("rejects tel: and mailto: URIs", () => {
    expect(isUrlValid("tel:+123456789")).toBe(false);
    expect(isUrlValid("mailto:user@example.com")).toBe(false);
  });

  it("rejects empty string or whitespace", () => {
    expect(isUrlValid("")).toBe(false);
    expect(isUrlValid("   ")).toBe(false);
  });

  it("rejects non-string input", () => {
    expect(isUrlValid(null as any)).toBe(false);
    expect(isUrlValid(undefined as any)).toBe(false);
    expect(isUrlValid({} as any)).toBe(false);
    expect(isUrlValid(123 as any)).toBe(false);
  });

  // Edge and weird cases
  it("rejects malformed URLs", () => {
    expect(isUrlValid("http://")).toBe(false);
    expect(isUrlValid("https://")).toBe(false);
  });

  it("handles URLs with credentials", () => {
    expect(isUrlValid("https://user:pass@example.com")).toBe(true);
  });

  it("rejects potentially confusing inputs", () => {
    expect(isUrlValid("https:javascript:alert(1)")).toBe(false); // tricky
    expect(isUrlValid("https://example.com\\@evil.com")).toBe(true); // parsed correctly
  });

  it("accepts long valid URLs", () => {
    const longUrl = `https://example.com/${  "a".repeat(2000)}`;
    expect(isUrlValid(longUrl)).toBe(true);
  });
});