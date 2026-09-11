import type { JobSlug } from "@/lib/site";

export interface StatItem {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface JobLocationText {
  /** Short intro line used on cards and the job detail page. */
  intro: string;
  /** Human-readable shift description lines. */
  shifts: string[];
}

export interface Dict {
  meta: {
    home: { title: string; description: string };
    jobs: { title: string; description: string };
    /** {city} is replaced with the location name. */
    jobDetail: { title: string; description: string };
    partner: { title: string; description: string };
    contact: { title: string; description: string };
    imprint: { title: string };
    privacy: { title: string };
  };
  nav: {
    services: string;
    jobs: string;
    partner: string;
    contact: string;
    menuOpen: string;
    menuClose: string;
    skipToContent: string;
    languageLabel: string;
  };
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    subtitle: string;
    ctaJobs: string;
    ctaPartner: string;
    imageAlt: string;
  };
  stats: { items: StatItem[]; note: string };
  services: {
    eyebrow: string;
    title: string;
    lead: string;
    kepTitle: string;
    kepText: string;
    kepImageAlt: string;
    expressTitle: string;
    expressText: string;
    expressImageAlt: string;
  };
  digital: {
    title: string;
    lead: string;
    bullets: { title: string; text: string }[];
    appNote: string;
    appCta: string;
    imageAlt: string;
  };
  steps: {
    title: string;
    items: { title: string; text: string }[];
  };
  jobsTeaser: {
    eyebrow: string;
    title: string;
    lead: string;
    perHour: string;
    netHint: string;
    cardCta: string;
    allCta: string;
  };
  region: { quote: string; caption: string; imageAlt: string };
  partner: {
    title: string;
    lead: string;
    points: { title: string; text: string }[];
    cta: string;
    imageAlt: string;
  };
  jobsPage: {
    title: string;
    lead: string;
    openPositions: string;
    payTitle: string;
    pay: string[];
    hoursTitle: string;
    requirementsTitle: string;
    requirements: string[];
    benefitsTitle: string;
    benefits: string[];
    contractNote: string;
    apply: string;
    details: string;
    locations: Record<JobSlug, JobLocationText>;
    /** Countries we actively recruit from. */
    recruitNote: string;
  };
  partnerPage: {
    title: string;
    lead: string;
    body: string[];
    cta: string;
  };
  contact: {
    title: string;
    lead: string;
    emailLabel: string;
    locationsLabel: string;
    jobsHint: string;
    jobsHintCta: string;
  };
  footer: {
    tagline: string;
    company: string;
    legal: string;
    imprint: string;
    privacy: string;
    rights: string;
  };
  legal: {
    imprintTitle: string;
    imprintBody: string[];
    privacyTitle: string;
    privacyBody: string[];
  };
  notFound: { title: string; text: string; cta: string };
}
