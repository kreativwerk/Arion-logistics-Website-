import "server-only";
import type { Dict } from "./types";
import type { Locale } from "./config";

const dictionaries: Record<Locale, () => Promise<{ default: Dict }>> = {
  de: () => import("./dictionaries/de"),
  en: () => import("./dictionaries/en"),
  sq: () => import("./dictionaries/sq"),
  es: () => import("./dictionaries/es"),
  bg: () => import("./dictionaries/bg"),
  ro: () => import("./dictionaries/ro"),
  hu: () => import("./dictionaries/hu"),
};

export async function getDictionary(locale: Locale): Promise<Dict> {
  return (await dictionaries[locale]()).default;
}
