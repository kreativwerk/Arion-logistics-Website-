import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
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
    ...pageMetadata(locale, "/partner", dict.meta.partner.title, dict.meta.partner.description),
    title: { absolute: dict.meta.partner.title },
  };
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="pt-28 md:pt-40">
      <div className="mx-auto max-w-[1320px] px-6 md:px-12">
        <h1 className="max-w-[18ch] text-4xl font-semibold leading-[1.05] tracking-tighter md:text-7xl">
          {dict.partnerPage.title}
        </h1>
        <p data-hero-fade className="mt-5 max-w-[54ch] text-[17px] leading-relaxed text-muted md:text-lg">
          {dict.partnerPage.lead}
        </p>
      </div>

      <div className="relative mt-14 overflow-hidden">
        <div data-parallax="8" className="will-change-transform">
          <Image
            src="/images/autobahn.webp"
            alt={dict.partner.imageAlt}
            width={1800}
            height={1013}
            sizes="100vw"
            priority
            className="h-[45vh] w-full scale-[1.15] object-cover md:h-[65vh]"
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-6 py-16 md:px-12 md:py-24">
        <div className="max-w-[880px]">
          {dict.partnerPage.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              data-reveal
              className="mt-6 text-[17px] leading-relaxed text-foreground/85 first:mt-0 md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Offerings */}
        <h2 data-reveal className="mt-20 text-3xl font-semibold tracking-tighter md:text-5xl">
          {dict.partnerPage.offeringsTitle}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {dict.partnerPage.offerings.map((offer, i) => (
            <div
              key={offer.title}
              data-reveal
              data-reveal-delay={String(i * 0.08)}
              className="rounded-3xl border border-line bg-surface p-7 transition-colors hover:border-accent md:p-8"
            >
              <span className="font-mono text-[13px] text-accent-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{offer.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{offer.text}</p>
            </div>
          ))}
        </div>

        {/* Why us */}
        <div className="mt-16 grid gap-8 border-t border-line pt-12 md:grid-cols-3">
          {dict.partner.points.map((point, i) => (
            <div key={point.title} data-reveal data-reveal-delay={String(i * 0.08)}>
              <h2 className="text-lg font-semibold tracking-tight">{point.title}</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{point.text}</p>
            </div>
          ))}
        </div>

        {/* How we start */}
        <h2 data-reveal className="mt-20 text-3xl font-semibold tracking-tighter md:text-5xl">
          {dict.partnerPage.stepsTitle}
        </h2>
        <ol className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-3">
          {dict.partnerPage.steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              data-reveal-delay={String(i * 0.08)}
              className="relative border-t-2 border-accent pt-5"
            >
              <h3 className="text-lg font-semibold tracking-tight">
                {i + 1}. {step.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>

        {/* Contact panel */}
        <div
          data-reveal
          className="mt-20 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-foreground p-8 text-background md:p-12"
        >
          <div>
            <p className="text-2xl font-semibold tracking-tight md:text-3xl">
              {dict.partnerPage.cta}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-[14px] text-background/70">
              <a href={site.phoneHref} className="hover:text-background">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="hover:text-background">
                {site.email}
              </a>
            </div>
          </div>
          <MagneticButton href={`mailto:${site.email}`}>{dict.partner.cta}</MagneticButton>
        </div>
      </div>
    </div>
  );
}
