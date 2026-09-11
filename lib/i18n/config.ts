export const locales = ["de", "en", "sq", "es", "bg", "ro", "hu"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export const localeNames: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  sq: "Shqip",
  es: "Español",
  bg: "Български",
  ro: "Română",
  hu: "Magyar",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
