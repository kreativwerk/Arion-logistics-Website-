import Image from "next/image";
import type { Dict } from "@/lib/i18n/types";
import { site } from "@/lib/site";

/**
 * The one deliberate theme switch on the page: a dark "tech" block that
 * tells the digital story.
 */
export default function Digital({ dict }: { dict: Dict }) {
  return (
    <section className="bg-[#0c0c0f] text-white">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-12 md:py-32">
        <div className="relative order-2 overflow-hidden rounded-3xl md:order-1">
          <div data-parallax="6" className="will-change-transform">
            <Image
              src="/images/app.webp"
              alt={dict.digital.imageAlt}
              width={1400}
              height={1045}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full scale-[1.12] object-cover"
            />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h2
            data-reveal
            className="max-w-[16ch] text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl"
          >
            {dict.digital.title}
          </h2>
          <p data-reveal className="mt-5 max-w-[48ch] text-[16px] leading-relaxed text-white/65 md:text-lg">
            {dict.digital.lead}
          </p>
          <ul className="mt-9 space-y-6">
            {dict.digital.bullets.map((bullet, i) => (
              <li key={bullet.title} data-reveal data-reveal-delay={String(i * 0.08)} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent"
                >
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="m1 4.5 3 3L10 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <p className="font-medium">{bullet.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-white/55">{bullet.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p data-reveal className="mt-9 max-w-[52ch] border-t border-white/10 pt-6 text-[14px] leading-relaxed text-white/55">
            {dict.digital.appNote}
          </p>
          <a
            data-reveal
            href={site.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-[15px] font-medium text-accent transition-colors hover:text-white"
          >
            {dict.digital.appCta}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10m0 0L8 3m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
