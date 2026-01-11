import useTranslationClass, { useTranslation } from "~/hooks/useTranslation";
import defaultDictionary from "~/components/widget/locale/en.json";
import { PageDirection, SupportedLanguageCode } from "~/types";
import { renderHook } from "@testing-library/preact";

describe("Tests `useTranslation` hook functionality", () => {
  beforeEach(() => {
    useTranslationClass.setDictionary(defaultDictionary);
  });
  it(`should return direction rtl for rtl languages (ar, he, ua)`, async () => {
    const lang = SupportedLanguageCode.AR;
    useTranslationClass.setDictionary(defaultDictionary, lang);
    const { result } = renderHook(() => useTranslation(defaultDictionary));
    expect(result.current.direction).toBe(PageDirection.RTL);
  });

  it(`should return language EN if no language was passed`, async () => {
    const { result } = renderHook(() => useTranslation(defaultDictionary));
    expect(result.current.language).toBe(SupportedLanguageCode.EN);
  });

  it(`should return the language that was passed`, async () => {
    const lang = SupportedLanguageCode.DE;
    useTranslationClass.setDictionary(defaultDictionary, lang);
    const { result } = renderHook(() => useTranslation(defaultDictionary));
    expect(result.current.language).toBe(SupportedLanguageCode.DE);
  });
});
