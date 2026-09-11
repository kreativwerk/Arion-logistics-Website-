"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Central GSAP wiring. Sections stay server components and opt in via
 * data attributes:
 *
 *  data-reveal            fade/slide in on scroll (optional data-reveal-delay)
 *  data-parallax="12"     scrubbed vertical parallax, in percent
 *  data-counter-value     count-up number (data-counter-decimals optional)
 *  data-hero-line         hero headline line (staggered clip reveal)
 *  data-hero-fade         hero secondary elements (fade up after headline)
 *  data-hero-img          hero image (scale settle)
 *  data-hpan / data-hpan-track   pinned horizontal pan (desktop only)
 */
export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    document.documentElement.classList.add("gsap-ready");

    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const lang = document.documentElement.lang || "de";

    const ctx = gsap.context(() => {
      // Hero entrance
      const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
      if (heroLines.length) {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo(
          heroLines,
          { yPercent: 115 },
          { yPercent: 0, duration: 1.1, stagger: 0.12, delay: 0.15 },
        )
          .fromTo(
            "[data-hero-fade]",
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
            "-=0.55",
          )
          .fromTo(
            "[data-hero-img]",
            { scale: 1.06, y: 40, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 1.4, ease: "power3.out" },
            "-=0.7",
          );
      }

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: parseFloat(el.dataset.revealDelay ?? "0"),
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        );
      });

      // Parallax
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax ?? "10");
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // Counters
      gsap.utils.toArray<HTMLElement>("[data-counter-value]").forEach((el) => {
        const target = parseFloat(el.dataset.counterValue ?? "0");
        const decimals = parseInt(el.dataset.counterDecimals ?? "0", 10);
        const format = new Intl.NumberFormat(lang, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = format.format(state.value);
          },
        });
      });

      // Pinned horizontal pan (desktop only)
      gsap.matchMedia().add("(min-width: 768px)", () => {
        const wrap = document.querySelector<HTMLElement>("[data-hpan]");
        const track = document.querySelector<HTMLElement>("[data-hpan-track]");
        if (!wrap || !track) return;
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
      document.documentElement.classList.remove("gsap-ready");
    };
  }, [pathname]);

  return <>{children}</>;
}
