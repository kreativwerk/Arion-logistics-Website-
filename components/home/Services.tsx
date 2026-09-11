import Image from "next/image";
import type { Dict } from "@/lib/i18n/types";
import AmbientVideo from "@/components/AmbientVideo";

export default function Services({ dict }: { dict: Dict }) {
  return (
    <section id="services" className="scroll-mt-24 bg-surface2">
      <div className="mx-auto max-w-[1320px] px-6 py-20 md:px-12 md:py-32">
      <p
        data-reveal
        className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted"
      >
        {dict.services.eyebrow}
      </p>
      <h2
        data-reveal
        className="mt-3 max-w-[16ch] text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl"
      >
        {dict.services.title}
      </h2>
      <p data-reveal className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-muted md:text-lg">
        {dict.services.lead}
      </p>

      <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-12">
        <article
          data-reveal
          className="group relative overflow-hidden rounded-3xl bg-surface shadow-[0_1px_2px_rgba(19,19,22,0.05)] md:col-span-7"
        >
          <div className="overflow-hidden">
            <AmbientVideo
              src="/videos/depot.mp4"
              poster="/images/depot.webp"
              alt={dict.services.kepImageAlt}
              width={1800}
              height={1013}
              sizes="(min-width: 768px) 58vw, 100vw"
              className="h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] md:h-[380px]"
            />
          </div>
          <div className="p-7 md:p-9">
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {dict.services.kepTitle}
            </h3>
            <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-muted">
              {dict.services.kepText}
            </p>
          </div>
        </article>

        <article
          data-reveal
          data-reveal-delay="0.1"
          className="group relative flex flex-col overflow-hidden rounded-3xl bg-surface shadow-[0_1px_2px_rgba(19,19,22,0.05)] md:col-span-5"
        >
          <div className="overflow-hidden">
            <Image
              src="/images/express.webp"
              alt={dict.services.expressImageAlt}
              width={1200}
              height={1200}
              sizes="(min-width: 768px) 42vw, 100vw"
              className="h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] md:h-[380px]"
            />
          </div>
          <div className="p-7 md:p-9">
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {dict.services.expressTitle}
            </h3>
            <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-muted">
              {dict.services.expressText}
            </p>
          </div>
        </article>
      </div>
      </div>
    </section>
  );
}
