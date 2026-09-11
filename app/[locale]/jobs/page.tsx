import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata, jobPostingJsonLd } from "@/lib/seo";
import { jobFacts, jobSlugs } from "@/lib/site";
import MagneticButton from "@/components/MagneticButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    ...pageMetadata(locale, "/jobs", dict.meta.jobs.title, dict.meta.jobs.description),
    title: { absolute: dict.meta.jobs.title },
  };
}

export default async function JobsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  const jsonLd = jobSlugs.map((slug) => jobPostingJsonLd(slug, locale, dict));

  return (
    <div className="pt-28 md:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <h1 className="max-w-[16ch] text-4xl font-semibold leading-[1.05] tracking-tighter md:text-7xl">
          {dict.jobsPage.title}
        </h1>
        <p data-hero-fade className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-muted md:text-lg">
          {dict.jobsPage.lead}
        </p>

        {/* Onboarding in three steps */}
        <h2 className="mt-14 text-2xl font-semibold tracking-tight md:text-3xl">
          {dict.steps.title}
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {dict.steps.items.map((step, i) => (
            <div
              key={step.title}
              data-reveal
              data-reveal-delay={String(i * 0.08)}
              className="rounded-3xl bg-surface p-6 md:p-7"
            >
              <span className="font-mono text-[13px] text-accent-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Open positions */}
        <h2 className="mt-16 text-[13px] font-medium uppercase tracking-[0.16em] text-muted">
          {dict.jobsPage.openPositions}
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {jobSlugs.map((slug, i) => (
            <Link
              key={slug}
              data-reveal
              data-reveal-delay={String(i * 0.08)}
              href={`/${locale}/jobs/${slug}`}
              className="group rounded-3xl border border-line bg-surface p-7 transition-colors hover:border-accent md:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    {jobFacts[slug].city}
                  </h3>
                  <p className="mt-1 text-[14px] text-muted">{jobFacts[slug].region}, Deutschland</p>
                </div>
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground/[0.06] transition-colors group-hover:bg-accent group-hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <p className="mt-5 text-[14px] leading-relaxed text-muted">
                {dict.jobsPage.locations[slug].intro}
              </p>
              <ul className="mt-4 space-y-1.5 text-[14px] text-foreground/80">
                {dict.jobsPage.locations[slug].shifts.map((shift) => (
                  <li key={shift} className="flex gap-2">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {shift}
                  </li>
                ))}
              </ul>
              <p className="mt-6 inline-flex items-center rounded-full bg-accent/10 px-3.5 py-1.5 text-[13px] font-medium text-accent-ink">
                16,20 €/h · {dict.jobsTeaser.netHint}
              </p>
            </Link>
          ))}
        </div>

        {/* Shared details */}
        <div className="mt-16 grid gap-x-12 gap-y-12 border-t border-line pt-12 md:grid-cols-2">
          <section data-reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {dict.jobsPage.payTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-foreground/85">
              {dict.jobsPage.pay.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <div className="space-y-12">
            <section data-reveal>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {dict.jobsPage.requirementsTitle}
              </h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-foreground/85">
                {dict.jobsPage.requirements.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section data-reveal>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {dict.jobsPage.benefitsTitle}
              </h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-foreground/85">
                {dict.jobsPage.benefits.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <p data-reveal className="mt-12 max-w-[70ch] rounded-2xl bg-surface p-6 text-[14px] leading-relaxed text-muted">
          {dict.jobsPage.contractNote} {dict.jobsPage.recruitNote}
        </p>
      </div>

      {/* Closing image + CTA */}
      <div className="relative mt-20 overflow-hidden">
        <div data-parallax="8" className="will-change-transform">
          <Image
            src="/images/courier.webp"
            alt={dict.jobsPage.title}
            width={1200}
            height={1490}
            sizes="100vw"
            className="h-[50vh] w-full scale-[1.15] object-cover object-[center_22%] md:h-[60vh]"
          />
        </div>
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-black/5 to-transparent">
          <div className="mx-auto flex w-full max-w-[1320px] flex-wrap items-end justify-between gap-6 px-5 pb-12 md:px-8 md:pb-16">
            <p className="max-w-[20ch] text-3xl font-semibold leading-[1.1] tracking-tighter text-white md:text-4xl">
              {dict.jobsTeaser.title}
            </p>
            <MagneticButton href={jobFacts.pommersfelden.applyUrl}>
              {dict.jobsPage.apply}
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
