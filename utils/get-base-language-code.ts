import { SupportedLanguageCode } from "~/types";

/**
 * Extracts the base language code from a dialect-specific language code.
 * For example: "en_gb" -> "en", "es" -> "es"
 * This is useful for services like Wikipedia that use base language codes.
 * Used in both the tests and the SearchService component (in the searchbar in the widget that directs to Wikipedia)
 * 
 * @param languageCode - The full language code (e.g., "en", "en_gb", "es")
 * @returns The base language code (e.g., "en", "es")
 */
export const getBaseLanguageCode = (languageCode: SupportedLanguageCode): string => {
  // If the language code contains an underscore, extract the part before it
  // Otherwise, return the code as-is
  // TODO: maybe change the wikipedia testnpm
  const underscoreIndex = languageCode.indexOf("-");
  return underscoreIndex > 0 ? languageCode.substring(0, underscoreIndex) : languageCode;
};

