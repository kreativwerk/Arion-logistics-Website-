import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n/config";
import { site, jobFacts, applicantCountries, applyUrlFor, type JobSlug } from "@/lib/site";
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
      images: [{ url: `${site.url}/images/og.jpg`, width: 1200, height: 630 }],
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
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    logo: `${site.url}/logo.svg`,
    sameAs: [site.appUrl, site.whatsapp],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      email: site.email,
      contactType: "customer service",
      availableLanguage: ["de", "en", "sq", "es", "bg", "ro", "hu"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      postalCode: site.zip,
      addressLocality: site.city,
      addressRegion: "Bayern",
      addressCountry: "DE",
    },
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
 * Google-Jobs-ready JobPosting structured data. The description mirrors
 * the full job ad so foreign applicants see pay, shifts, housing and
 * commute details in their language; applicantLocationRequirements lists
 * the EU countries we recruit from.
 * https://developers.google.com/search/docs/appearance/structured-data/job-posting
 */
export function jobPostingJsonLd(slug: JobSlug, locale: Locale, dict: Dict) {
  const facts = jobFacts[slug];
  const loc = dict.jobsPage.locations[slug];
  const job = dict.jobDetail;
  const esc = (t: string) =>
    t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const h = (t: string) => `<p><strong>${esc(t)}</strong></p>`;
  const p = (items: string[]) => items.map((t) => `<p>${esc(t)}</p>`).join("");
  const ul = (items: string[]) => `<ul>${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;

  const description = [
    p([job.intro]),
    h(job.workplaceLabel),
    p([`${facts.city}, ${facts.region}`]),
    ul(loc.distances),
    h(job.requirementsTitle),
    ul(job.requirements),
    p([dict.jobsPage.recruitNote]),
    h(job.payTitle),
    p([job.payLead]),
    ul(job.payBullets),
    p([job.payNote]),
    h(job.dailyTitle),
    p([job.dailyIntro]),
    ul(job.dailyBullets),
    p([job.dailyNote, job.dailyGuarantee]),
    h(job.topTitle),
    p(job.topText),
    h(job.referralTitle),
    p(job.referralText),
    h(job.trainingTitle),
    p([job.trainingIntro]),
    ul(job.trainingBullets),
    p([job.trainingNote]),
    h(job.shiftsTitle),
    ul(loc.shifts),
    h(job.hoursTitle),
    p(job.hoursText),
    h(job.contractTitle),
    ul(job.contractBullets),
    h(job.housingTitle),
    p(job.housingIntro),
    p([job.housingCondTitle]),
    ul(job.housingBullets),
    p(job.housingNote),
    h(job.commuteTitle),
    p(job.commuteIntro),
    ul(job.commuteBullets),
    h(job.benefitsTitle),
    ul(job.benefits),
  ].join("");

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description,
    inLanguage: locale,
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
      name: site.legalName,
      sameAs: site.url,
      logo: `${site.url}/logo.svg`,
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
    applicantLocationRequirements: applicantCountries.map((code) => ({
      "@type": "Country",
      name: code,
    })),
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: facts.currency,
      value: {
        "@type": "QuantitativeValue",
        value: facts.hourlyGross,
        unitText: "HOUR",
      },
    },
    workHours: loc.shifts.join("; "),
    jobBenefits: job.benefits.join("; "),
    qualifications: job.requirements.join("; "),
    industry: "Logistics",
    occupationalCategory: "53-3033.00",
    url: `${site.url}/${locale}/jobs/${slug}`,
    applicationContact: {
      "@type": "ContactPoint",
      url: applyUrlFor(slug, locale),
      telephone: site.phone,
      email: site.email,
    },
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
