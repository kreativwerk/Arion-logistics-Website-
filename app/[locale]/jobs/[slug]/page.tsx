import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata, jobPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { jobFacts, jobSlugs, site, type JobSlug } from "@/lib/site";
import MagneticButton from "@/components/MagneticButton";

export function generateStaticParams() {
  return locales.flatMap((locale) => jobSlugs.map((slug) => ({ locale, slug })));
}

function isJobSlug(value: string): value is JobSlug {
  return (jobSlugs as string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isJobSlug(slug)) return {};
  const dict = await getDictionary(locale);
  const city = jobFacts[slug].city;
  const title = dict.meta.jobDetail.title.replace("{city}", city);
  return {
    ...pageMetadata(
      locale,
      `/jobs/${slug}`,
      title,
      dict.meta.jobDetail.description.replace("{city}", city),
    ),
    title: { absolute: title },
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isJobSlug(slug)) notFound();
  const dict = await getDictionary(locale as Locale);
  const facts = jobFacts[slug];
  const loc = dict.jobsPage.locations[slug];

  const jsonLd = [
    jobPostingJsonLd(slug, locale, dict),
    breadcrumbJsonLd([
      { name: "Arion Logistics", url: `${site.url}/${locale}` },
      { name: dict.nav.jobs, url: `${site.url}/${locale}/jobs` },
      { name: facts.city, url: `${site.url}/${locale}/jobs/${slug}` },
    ]),
  ];

  const sections: { title: string; items: string[] }[] = [
    { title: dict.jobsPage.payTitle, items: dict.jobsPage.pay },
    { title: dict.jobsPage.hoursTitle, items: loc.shifts },
    { title: dict.jobsPage.requirementsTitle, items: dict.jobsPage.requirements },
    { title: dict.jobsPage.benefitsTitle, items: dict.jobsPage.benefits },
  ];

  return (
    <div className="pt-28 md:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[880px] px-5 pb-20 md:px-8">
        <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
          <Link href={`/${locale}/jobs`} className="hover:text-accent-ink">
            {dict.nav.jobs}
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{facts.city}</span>
        </nav>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl">
          {dict.jobsPage.title}
        </h1>
        <p className="mt-2 text-xl text-muted md:text-2xl">
          {facts.city}, {facts.region}
        </p>
        <p data-hero-fade className="mt-5 text-[16px] leading-relaxed text-muted">
          {loc.intro}
        </p>

        <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl bg-surface p-6">
          <p className="text-4xl font-semibold tracking-tighter text-accent-strong">16,20&nbsp;€</p>
          <div className="text-[14px] text-muted">
            <p>{dict.jobsTeaser.perHour}</p>
            <p>{dict.jobsTeaser.netHint}</p>
          </div>
          <div className="ml-auto">
            <MagneticButton href={facts.applyUrl}>{dict.jobsPage.apply}</MagneticButton>
          </div>
        </div>

        {sections.map((section) => (
          <section key={section.title} data-reveal className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{section.title}</h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-foreground/85">
              {section.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p data-reveal className="mt-12 text-[14px] leading-relaxed text-muted">
          {dict.jobsPage.contractNote} {dict.jobsPage.recruitNote}
        </p>

        <div data-reveal className="mt-10 flex flex-wrap gap-3 border-t border-line pt-10">
          <MagneticButton href={facts.applyUrl}>{dict.jobsPage.apply}</MagneticButton>
          <MagneticButton href={`/${locale}/kontakt`} variant="secondary">
            {dict.nav.contact}
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
