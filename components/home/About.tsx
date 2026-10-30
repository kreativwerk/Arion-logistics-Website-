import type { Dict } from "@/lib/i18n/types";

export default function About({ dict }: { dict: Dict }) {
  return (
    <section data-bg="#fafaf9" className="mx-auto max-w-[1320px] px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-[760px] text-center">
        <h2
          data-reveal
          className="text-4xl font-semibold leading-[1.05] tracking-tighter text-balance md:text-6xl"
        >
          {dict.about.title}
        </h2>
        {dict.about.body.map((paragraph, i) => (
          <p
            key={paragraph.slice(0, 24)}
            data-reveal
            data-reveal-delay={String(i * 0.08)}
            className="mt-6 text-[16px] leading-relaxed text-muted md:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
