import type { Dict } from "@/lib/i18n/types";

/**
 * Pinned horizontal pan on desktop (wired by AnimationProvider via
 * data-hpan), a plain vertical stack on mobile.
 */
export default function Steps({ dict }: { dict: Dict }) {
  return (
    <section data-hpan className="overflow-hidden bg-background">
      <div
        data-hpan-track
        className="flex flex-col md:h-[100dvh] md:w-max md:flex-row md:items-center"
      >
        <div className="flex shrink-0 items-center px-5 pt-20 md:h-full md:w-[45vw] md:px-24 md:pt-0">
          <h2 className="max-w-[12ch] text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl">
            {dict.steps.title}
          </h2>
        </div>
        {dict.steps.items.map((step, i) => (
          <article
            key={step.title}
            data-reveal
            className="mx-5 mt-8 flex shrink-0 flex-col justify-between rounded-3xl bg-surface p-8 shadow-[0_1px_2px_rgba(19,19,22,0.05)] last:mb-20 md:mx-0 md:mb-0 md:mr-10 md:mt-0 md:h-[60vh] md:w-[420px] md:p-10 md:last:mb-0 md:last:mr-[20vw]"
          >
            <span className="font-mono text-[13px] text-accent-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">{step.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{step.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
