import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/types";
import MagneticButton from "@/components/MagneticButton";

export default function PartnerTeaser({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-32">
      <div className="max-w-[62ch]">
        <h2 data-reveal className="text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl">
          {dict.partner.title}
        </h2>
        <p data-reveal className="mt-5 text-[16px] leading-relaxed text-muted md:text-lg">
          {dict.partner.lead}
        </p>
      </div>
      <div className="mt-12 grid gap-x-10 gap-y-10 border-t border-line pt-10 md:grid-cols-3">
        {dict.partner.points.map((point, i) => (
          <div key={point.title} data-reveal data-reveal-delay={String(i * 0.08)}>
            <h3 className="text-lg font-semibold tracking-tight">{point.title}</h3>
            <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{point.text}</p>
          </div>
        ))}
      </div>
      <div data-reveal className="mt-12">
        <MagneticButton href={`/${locale}/partner`}>{dict.partner.cta}</MagneticButton>
      </div>
    </section>
  );
}
