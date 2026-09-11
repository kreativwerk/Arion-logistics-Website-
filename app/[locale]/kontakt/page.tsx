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
            className="mt-3 block break-all text-xl font-medium tracking-tight text-accent-ink hover:underline md:text-2xl"
          >
            {site.email}
          </a>
        </div>
        <div data-reveal data-reveal-delay="0.08" className="rounded-3xl border border-line bg-surface p-7 md:p-9">
          <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-muted">
            {dict.contact.phoneLabel}
          </h2>
          <a
            href={site.phoneHref}
            className="mt-3 block text-xl font-medium tracking-tight text-accent-ink hover:underline md:text-2xl"
          >
            {site.phone}
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#e07f00]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.8 6.8 0 0 1-3.4-3c-.3-.4 0-.6.2-.8l.4-.5c.1-.2.2-.3.3-.5v-.5L9.8 7.4c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2.1-.4 3.6a12 12 0 0 0 4.6 4.4c1.7.8 2.4.9 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.6-.5Z" />
            </svg>
            {dict.contact.whatsappCta}
          </a>
        </div>
        <div data-reveal data-reveal-delay="0.16" className="rounded-3xl border border-line bg-surface p-7 md:col-span-2 md:p-9">
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
        <Link href={`/${locale}/impressum`} className="hover:text-accent-ink">
          {dict.footer.imprint}
        </Link>
        {" · "}
        <Link href={`/${locale}/datenschutz`} className="hover:text-accent-ink">
          {dict.footer.privacy}
        </Link>
      </p>
    </div>
  );
}
