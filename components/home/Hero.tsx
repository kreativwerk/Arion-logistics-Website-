import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/types";
import MagneticButton from "@/components/MagneticButton";

export default function Hero({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden pt-28 md:pt-36">
      <div className="mx-auto w-full max-w-[1320px] px-5 md:px-8">
        <p
          data-hero-fade
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-muted"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {dict.hero.eyebrow}
        </p>
        <h1 className="max-w-[14ch] text-[13vw] font-semibold leading-[1.02] tracking-tighter text-balance sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block overflow-hidden pb-1">
            <span data-hero-line className="block will-change-transform">
              {dict.hero.title1}
            </span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span data-hero-line className="block will-change-transform">
              {dict.hero.title2}
            </span>
          </span>
        </h1>
        <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between">
          <p data-hero-fade className="max-w-[44ch] text-[17px] leading-relaxed text-muted md:text-lg">
            {dict.hero.subtitle}
          </p>
          <div data-hero-fade className="flex flex-wrap items-center gap-3">
            <MagneticButton href={`/${locale}/jobs`}>{dict.hero.ctaJobs}</MagneticButton>
            <MagneticButton href={`/${locale}/partner`} variant="secondary">
              {dict.hero.ctaPartner}
            </MagneticButton>
          </div>
        </div>
      </div>
      <div data-hero-img className="mt-10 will-change-transform md:mt-14">
        <Image
          src="/images/hero.webp"
          alt={dict.hero.imageAlt}
          width={2560}
          height={1086}
          priority
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
