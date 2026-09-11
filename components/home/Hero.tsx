import AmbientVideo from "@/components/AmbientVideo";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/types";
import MagneticButton from "@/components/MagneticButton";

/**
 * Diagonally split hero: copy on the left, photo on the right behind a
 * slanted edge that echoes the diagonal cut of the Arion logo mark. The
 * orange layer sits slightly wider than the photo layer, leaving a brand
 * stripe along the diagonal.
 */
export default function Hero({ locale, dict }: { locale: Locale; dict: Dict }) {
  // The last word of the second line carries the brand emphasis
  // ("Wir liefern." -> "liefern." in italic orange), in every locale.
  const words = dict.hero.title2.trim().split(" ");
  const accentWord = words.pop();
  const title2Rest = words.join(" ");

  return (
    <section className="relative overflow-hidden md:min-h-[100dvh]">
      <div className="grid md:min-h-[100dvh] md:grid-cols-[1.1fr_1fr]">
        {/* Copy */}
        <div className="flex flex-col justify-center px-6 pb-14 pt-32 md:py-40 md:pl-[max(3rem,calc((100vw-1320px)/2))] md:pr-14">
          <p
            data-hero-fade
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {dict.hero.eyebrow}
          </p>
          <h1 className="max-w-[14ch] text-5xl font-semibold leading-[1.02] tracking-tighter text-balance md:text-6xl lg:text-7xl xl:text-8xl">
            <span className="block overflow-hidden pb-1">
              <span data-hero-line className="block will-change-transform">
                {dict.hero.title1}
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.14em]">
              <span data-hero-line className="block leading-[1.1] will-change-transform">
                {title2Rest ? `${title2Rest} ` : ""}
                <em className="italic text-accent-strong">{accentWord}</em>
              </span>
            </span>
          </h1>
          <p
            data-hero-fade
            className="mt-6 max-w-[44ch] text-[17px] leading-relaxed text-muted md:text-lg"
          >
            {dict.hero.subtitle}
          </p>
          <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton href={`/${locale}/jobs`}>{dict.hero.ctaJobs}</MagneticButton>
            <MagneticButton href={`/${locale}/partner`} variant="secondary">
              {dict.hero.ctaPartner}
            </MagneticButton>
          </div>
        </div>

        {/* Diagonal photo */}
        <div data-hero-img className="relative h-[58vh] will-change-transform md:h-auto">
          {/* Brand stripe along the diagonal */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-accent [clip-path:polygon(0_10%,100%_0,100%_100%,0_100%)] md:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]"
          />
          <div className="absolute inset-0 [clip-path:polygon(0_12%,100%_2.5%,100%_100%,0_100%)] md:[clip-path:polygon(17%_0,100%_0,100%_100%,3%_100%)]">
            <AmbientVideo
              src="/videos/hero.mp4"
              poster="/images/courier.webp"
              alt={dict.hero.imageAlt}
              width={720}
              height={1280}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
