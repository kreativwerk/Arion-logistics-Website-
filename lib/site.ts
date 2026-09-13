export const site = {
  name: "Arion Logistics",
  legalName: "Arion Logistics GmbH",
  url: "https://www.arion-logistics.de",
  email: "info@arion-logistics.de",
  street: "Industriestraße 12a",
  zip: "91325",
  city: "Adelsdorf",
  phone: "+49 911 13065352",
  phoneHref: "tel:+4991113065352",
  whatsapp: "https://wa.me/message/ENNQM7HQAM2GA1",
  appName: "CoDriver",
  appUrl: "https://dsp-codriver.de/start",
} as const;

export type JobSlug = "pommersfelden" | "kitzingen";

/** Language-independent facts per job location. Text lives in the dictionaries. */
export const jobFacts: Record<
  JobSlug,
  {
    slug: JobSlug;
    city: string;
    region: string;
    country: "DE";
    hourlyGross: number;
    currency: "EUR";
    applyUrl: string;
    datePosted: string;
    validThrough: string;
  }
> = {
  pommersfelden: {
    slug: "pommersfelden",
    city: "Pommersfelden",
    region: "Bayern",
    country: "DE",
    hourlyGross: 16.2,
    currency: "EUR",
    applyUrl: "https://dsp-codriver.de/arion-de.html",
    datePosted: "2026-09-11",
    validThrough: "2027-03-11",
  },
  kitzingen: {
    slug: "kitzingen",
    city: "Kitzingen",
    region: "Bayern",
    country: "DE",
    hourlyGross: 16.2,
    currency: "EUR",
    applyUrl: "https://dsp-codriver.de/arion-kitzingen-de.html",
    datePosted: "2026-09-11",
    validThrough: "2027-03-11",
  },
};

export const jobSlugs = Object.keys(jobFacts) as JobSlug[];

/** Realistic monthly net with daily allowance and bonuses, shown as "up to". */
export const netMonthlyMax = 2600;

/** Languages the external application form speaks; others fall back to English. */
const applyFormLangs = ["de", "en", "sq", "bg", "ro", "hu"] as const;

/** Application form in the visitor's language, pre-set to the location. */
export function applyUrlFor(slug: JobSlug, locale: string): string {
  const lang = (applyFormLangs as readonly string[]).includes(locale) ? locale : "en";
  return `https://dsp-codriver.de/apply.html?slug=arion&lang=${lang}&loc=${slug}`;
}
