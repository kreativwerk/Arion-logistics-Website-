"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dict } from "@/lib/i18n/types";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned horizontal pan on desktop, plain vertical stack on mobile.
 *
 * The pin lives in this client component (not in AnimationProvider) on
 * purpose: ScrollTrigger's pin wraps the section in a spacer element, and
 * that wrapper must be reverted in THIS component's effect cleanup, which
 * React runs before it removes the DOM on route change. A provider-level
 * cleanup would run too late and crash client-side navigation.
 */
export default function Steps({ dict }: { dict: Dict }) {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(min-width: 768px)", () => {
        if (!wrap.current || !track.current) return;
        const distance = () => track.current!.scrollWidth - window.innerWidth;
        gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} className="overflow-hidden bg-surface">
      <div
        ref={track}
        className="flex flex-col md:h-[100dvh] md:w-max md:flex-row md:items-center"
      >
        <div className="flex shrink-0 items-center px-6 pt-20 md:h-full md:w-[45vw] md:pl-[max(3rem,calc((100vw-1320px)/2))] md:pr-24 md:pt-0">
          <h2 className="max-w-[12ch] text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl">
            {dict.process.title}
          </h2>
        </div>
        {dict.process.items.map((step, i) => (
          <article
            key={step.title}
            data-reveal
            className="mx-6 mt-8 flex shrink-0 flex-col justify-between rounded-3xl bg-surface2 p-8 last:mb-20 md:mx-0 md:mb-0 md:mr-10 md:mt-0 md:h-[60vh] md:w-[420px] md:p-10 md:last:mb-0 md:last:mr-[20vw]"
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
