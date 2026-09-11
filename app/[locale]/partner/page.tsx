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
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
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
            src="/images/depot.webp"
            alt={dict.partner.imageAlt}
            width={1800}
            height={1005}
            sizes="100vw"
            priority
            className="h-[45vh] w-full scale-[1.15] object-cover md:h-[65vh]"
          />
        </div>
      </div>

      <div className="mx-auto max-w-[880px] px-5 py-16 md:px-8 md:py-24">
        {dict.partnerPage.body.map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            data-reveal
            className="mt-6 text-[17px] leading-relaxed text-foreground/85 first:mt-0 md:text-lg"
          >
            {paragraph}
          </p>
        ))}

        <div className="mt-12 grid gap-8 border-t border-line pt-10 md:grid-cols-3">
          {dict.partner.points.map((point, i) => (
            <div key={point.title} data-reveal data-reveal-delay={String(i * 0.08)}>
              <h2 className="text-lg font-semibold tracking-tight">{point.title}</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{point.text}</p>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticButton href={`mailto:${site.email}`}>{dict.partnerPage.cta}</MagneticButton>
          <a href={`mailto:${site.email}`} className="text-[15px] text-accent hover:underline">
            {site.email}
          </a>
        </div>
      </div>
    </div>
  );
}
