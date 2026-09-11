import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n/config";
import { site, jobFacts, type JobSlug } from "@/lib/site";
import type { Dict } from "@/lib/i18n/types";

/** hreflang alternates for a path (e.g. "/jobs"), plus canonical. */
export function alternatesFor(locale: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${site.url}/${l}${path}`;
  }
  languages["x-default"] = `${site.url}/de${path}`;
  return {
    canonical: `${site.url}/${locale}${path}`,
    languages,
  };
}

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description?: string,
): Metadata {
  return {
    title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      title,
      description,
      url: `${site.url}/${locale}${path}`,
      siteName: site.name,
      type: "website",
      locale,
      images: [{ url: `${site.url}/images/depot.webp`, width: 1800, height: 1005 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    email: site.email,
    logo: `${site.url}/icon.svg`,
    sameAs: [site.appUrl],
    address: [
      { "@type": "PostalAddress", addressLocality: "Pommersfelden", addressRegion: "Bayern", addressCountry: "DE" },
      { "@type": "PostalAddress", addressLocality: "Kitzingen", addressRegion: "Bayern", addressCountry: "DE" },
    ],
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: locale,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

/**
 * Google-Jobs-ready JobPosting structured data.
 * https://developers.google.com/search/docs/appearance/structured-data/job-posting
 */
export function jobPostingJsonLd(slug: JobSlug, locale: Locale, dict: Dict) {
  const facts = jobFacts[slug];
  const loc = dict.jobsPage.locations[slug];
  const description = [
    `<p>${loc.intro}</p>`,
    `<p><strong>${dict.jobsPage.payTitle}</strong></p>`,
    `<ul>${dict.jobsPage.pay.map((p) => `<li>${p}</li>`).join("")}</ul>`,
    `<p><strong>${dict.jobsPage.hoursTitle}</strong></p>`,
    `<ul>${loc.shifts.map((s) => `<li>${s}</li>`).join("")}</ul>`,
    `<p><strong>${dict.jobsPage.requirementsTitle}</strong></p>`,
    `<ul>${dict.jobsPage.requirements.map((r) => `<li>${r}</li>`).join("")}</ul>`,
    `<p><strong>${dict.jobsPage.benefitsTitle}</strong></p>`,
    `<ul>${dict.jobsPage.benefits.map((b) => `<li>${b}</li>`).join("")}</ul>`,
    `<p>${dict.jobsPage.contractNote}</p>`,
  ].join("");

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: dict.jobsPage.title,
    description,
    datePosted: facts.datePosted,
    validThrough: `${facts.validThrough}T23:59:59+01:00`,
    employmentType: "FULL_TIME",
    directApply: true,
    identifier: {
      "@type": "PropertyValue",
      name: site.name,
      value: `arion-${slug}`,
    },
    hiringOrganization: {
      "@type": "Organization",
      name: site.name,
      sameAs: site.url,
      logo: `${site.url}/icon.svg`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: facts.city,
        addressRegion: facts.region,
        addressCountry: facts.country,
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: facts.currency,
      value: {
        "@type": "QuantitativeValue",
        value: facts.hourlyGross,
        unitText: "HOUR",
      },
    },
    jobBenefits: dict.jobsPage.benefits.join("; "),
    url: `${site.url}/${locale}/jobs/${slug}`,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
