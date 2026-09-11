import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/types";
import { jobFacts, jobSlugs } from "@/lib/site";
import MagneticButton from "@/components/MagneticButton";

export default function JobsTeaser({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-6 py-20 md:grid-cols-[1fr_1.2fr] md:gap-16 md:px-12 md:py-32">
        <div>
          <p data-reveal className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
            {dict.jobsTeaser.eyebrow}
          </p>
          <h2
            data-reveal
            className="mt-3 max-w-[12ch] text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl"
          >
            {dict.jobsTeaser.title}
          </h2>
          <p data-reveal className="mt-5 max-w-[44ch] text-[16px] leading-relaxed text-muted md:text-lg">
            {dict.jobsTeaser.lead}
          </p>
          <div data-reveal className="mt-8 rounded-2xl bg-background p-6">
            <p className="text-5xl font-semibold tracking-tighter text-accent-strong md:text-6xl">
              16,20&nbsp;€
            </p>
            <p className="mt-1 text-[14px] text-muted">{dict.jobsTeaser.perHour}</p>
            <p className="mt-3 border-t border-line pt-3 text-[14px] text-muted">
              {dict.jobsTeaser.netHint}
            </p>
          </div>
          <div data-reveal className="mt-8 hidden md:block">
            <MagneticButton href={`/${locale}/jobs`} variant="secondary">
              {dict.jobsTeaser.allCta}
            </MagneticButton>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div data-reveal className="relative overflow-hidden rounded-3xl">
            <Image
              src="/images/courier.webp"
              alt={dict.jobsPage.title}
              width={1200}
              height={1490}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-72 w-full object-cover object-top md:h-96"
            />
          </div>
          {jobSlugs.map((slug, i) => (
            <Link
              key={slug}
              data-reveal
              data-reveal-delay={String(0.08 + i * 0.08)}
              href={`/${locale}/jobs/${slug}`}
              className="group flex items-center justify-between rounded-3xl border border-line bg-background p-6 transition-colors hover:border-accent md:p-7"
            >
              <div>
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {jobFacts[slug].city}
                </h3>
                <p className="mt-1 max-w-[44ch] text-[14px] text-muted">
                  {dict.jobsPage.locations[slug].intro}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="ml-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground/[0.06] transition-all duration-300 group-hover:bg-accent group-hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
          <div data-reveal className="md:hidden">
            <MagneticButton href={`/${locale}/jobs`} variant="secondary" className="w-full">
              {dict.jobsTeaser.allCta}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
