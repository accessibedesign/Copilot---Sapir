import { getBaseLanguageCode } from "./get-base-language-code";
import { SupportedLanguageCode } from "~/types";

describe("getBaseLanguageCode", () => {
  it("should extract base language code from dialect codes", () => {
    expect(getBaseLanguageCode(SupportedLanguageCode.EN)).toBe("en");
    expect(getBaseLanguageCode(SupportedLanguageCode["en-CA"])).toBe("en");
    expect(getBaseLanguageCode(SupportedLanguageCode["en-GB"])).toBe("en");
  });

  it("should return the code as-is for non-dialect codes", () => {
    expect(getBaseLanguageCode(SupportedLanguageCode.ES)).toBe("es");
    expect(getBaseLanguageCode(SupportedLanguageCode.DE)).toBe("de");
    expect(getBaseLanguageCode(SupportedLanguageCode.FR)).toBe("fr");
    expect(getBaseLanguageCode(SupportedLanguageCode.HE)).toBe("he");
  });
});

