import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { jobFacts, jobSlugs, site } from "@/lib/site";
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
    ...pageMetadata(locale, "/kontakt", dict.meta.contact.title, dict.meta.contact.description),
    title: { absolute: dict.meta.contact.title },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="mx-auto max-w-[880px] px-5 pb-24 pt-28 md:px-8 md:pt-40">
      <h1 className="text-4xl font-semibold leading-[1.05] tracking-tighter md:text-7xl">
        {dict.contact.title}
      </h1>
      <p data-hero-fade className="mt-5 max-w-[48ch] text-[17px] leading-relaxed text-muted md:text-lg">
        {dict.contact.lead}
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div data-reveal className="rounded-3xl border border-line bg-surface p-7 md:p-9">
          <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-muted">
            {dict.contact.emailLabel}
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 block break-all text-xl font-medium tracking-tight text-accent hover:underline md:text-2xl"
          >
            {site.email}
          </a>
        </div>
        <div data-reveal data-reveal-delay="0.08" className="rounded-3xl border border-line bg-surface p-7 md:p-9">
          <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-muted">
            {dict.contact.locationsLabel}
          </h2>
          <ul className="mt-3 space-y-1 text-xl font-medium tracking-tight md:text-2xl">
            {jobSlugs.map((slug) => (
              <li key={slug}>
                {jobFacts[slug].city}
                <span className="text-muted">, {jobFacts[slug].region}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div data-reveal className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-foreground p-7 text-background md:p-9">
        <p className="text-lg font-medium tracking-tight md:text-xl">{dict.contact.jobsHint}</p>
        <MagneticButton href={`/${locale}/jobs`}>{dict.contact.jobsHintCta}</MagneticButton>
      </div>

      <p data-reveal className="mt-10 text-[13px] text-muted">
        <Link href={`/${locale}/impressum`} className="hover:text-accent">
          {dict.footer.imprint}
        </Link>
        {" · "}
        <Link href={`/${locale}/datenschutz`} className="hover:text-accent">
          {dict.footer.privacy}
        </Link>
      </p>
    </div>
  );
}
