import { PageDirection, SupportedLanguageCode } from "~/types";

/**
 * @class useTranslationClass
 * @classdesc Hook to provide a "React-Like" access to the component dictionary and a way to provide `defaultDictionary`
 */
export default class useTranslationClass {
  static contextDictionary: Dictionary = {};

  /** List of all RTL languages */
  static rtlLanguages = [SupportedLanguageCode.AR, SupportedLanguageCode.HE, SupportedLanguageCode.UA];

  /** The current language */
  static languageCode: SupportedLanguageCode = SupportedLanguageCode.EN;

  /**
   * Assign given `dictionary` as the current context dictionary
   * @param dictionary
   * @param [languageCode]
   */
  static setDictionary(
    dictionary: Record<string, string>,
    languageCode: SupportedLanguageCode = SupportedLanguageCode.EN
  ): void {
    useTranslationClass.contextDictionary = dictionary;
    useTranslationClass.languageCode = languageCode;
  }

  /**
   * Retrieve given `key` param from either `given` default dictionary or the `contextDictionary`
   * That has been set by the host project.
   *
   * @param key - The to retrieve the value from the dictionary
   * @param [dictionary] - A fallback dictionary
   */
  static t(key: string, dictionary: Dictionary): string {
    return useTranslationClass.contextDictionary[key] || dictionary[key];
  }

  static getDirection(language: SupportedLanguageCode): PageDirection {
    return this.rtlLanguages.includes(language) ? PageDirection.RTL : PageDirection.LTR;
  }
}

/**
 * Entry for the hook, retrieves the hook `interface` wnd applies default dictionary
 * @param [dictionary] is optional because we only add it in the root level component, and it's available in reference for the children
 */
function useTranslation(dictionary?: Dictionary): DictionaryAPI {
  if (dictionary && !Object.keys(useTranslationClass.contextDictionary).length) {
    useTranslationClass.setDictionary(dictionary);
  }

  return {
    t: (key) => useTranslationClass.t(key, useTranslationClass.contextDictionary),
    language: useTranslationClass.languageCode,
    direction: useTranslationClass.getDirection(useTranslationClass.languageCode),
  };
}

export { useTranslation };

type Dictionary = Record<string, string>;

type DictionaryAPI = {
  t: (key: string) => string;
  direction: PageDirection;
  language: SupportedLanguageCode;
};
