"use client";

import { useEffect, useRef } from "react";
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
 *  data-hero-img          hero visual (scale settle)
 *  data-bg="#fff"         page colour once this section reaches the lower
 *                         third of the viewport (also exposed as --page-bg); the body colour blends between sections on
 *                         scroll. Several colours + data-bg-at="0 .4 .7"
 *                         split a tall section by its own scroll progress.
 *  (canvas motion lives in client components on components/motion/stage.ts;
 *  the scroll-scrubbed "So arbeiten wir" stage is components/home/Process.tsx
 *  and owns its own ScrollTrigger cleanup)
 *
 * Lenis lives once for the whole session; the per-page GSAP context is
 * rebuilt on every client-side navigation. ScrollTrigger positions are
 * re-measured again after fonts and images settle, so soft navigations
 * never leave content stuck in its hidden pre-animation state.
 */
/** Dark or brand orange (luminance below ~0.66) carries white text. */
function isDark(color: string) {
  const [r, g, b] = gsap.utils.splitColor(color) as number[];
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.66;
}

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useRef(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Smooth scrolling: one Lenis instance for the whole session.
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce.current) return;

    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Next resets window scroll on navigation, but Lenis keeps its own
  // position and would glide back. Sync both: top of page, or the hash
  // target for in-page links.
  useEffect(() => {
    const hash = window.location.hash;
    const target = hash ? document.querySelector(hash) : null;
    if (target) {
      lenisRef.current?.scrollTo(target as HTMLElement, { immediate: true, offset: -96 });
    } else {
      lenisRef.current?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // Per-page animations, rebuilt on every navigation.
  useEffect(() => {
    if (reduce.current) return;

    const lang = document.documentElement.lang || "de";
    let ctx: gsap.Context | undefined;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const refresh = () => ScrollTrigger.refresh();

    // Wait two frames so the new route is painted before measuring.
    const frame = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        ctx = gsap.context(() => {
          // Hero entrance
          const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
          const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
          if (heroLines.length) {
            tl.fromTo(
              heroLines,
              { yPercent: 115 },
              { yPercent: 0, duration: 1.1, stagger: 0.12, delay: 0.15 },
            );
          }
          if (document.querySelector("[data-hero-fade]")) {
            tl.fromTo(
              "[data-hero-fade]",
              { y: 24, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
              heroLines.length ? "-=0.55" : 0.1,
            );
          }
          if (document.querySelector("[data-hero-img]")) {
            tl.fromTo(
              "[data-hero-img]",
              { scale: 1.04, opacity: 0 },
              { scale: 1, opacity: 1, duration: 1.3, ease: "power3.out" },
              heroLines.length ? "-=0.7" : 0,
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
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
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

          // Scroll-driven page colour: sections go transparent and the body
          // blends from one section colour to the next around mid-viewport.
          const bgEls = gsap.utils.toArray<HTMLElement>("[data-bg]");
          if (bgEls.length) {
            document.documentElement.classList.add("bg-scroll");
            let stops: { y: number; color: string }[] = [];
            const measure = () => {
              const vh = window.innerHeight;
              stops = [];
              bgEls.forEach((el) => {
                const top = el.getBoundingClientRect().top + window.scrollY;
                const colors = (el.dataset.bg ?? "").split(/\s+/).filter(Boolean);
                const at = (el.dataset.bgAt ?? "").split(/\s+/).map(Number);
                colors.forEach((color, i) => {
                  const k = i === 0 ? 0 : at[i] ?? i / colors.length;
                  stops.push({ y: i === 0 ? top : top + k * (el.offsetHeight - vh) + vh / 2, color });
                });
              });
              stops.sort((a, b) => a.y - b.y);
            };
            const paint = () => {
              if (!stops.length) return;
              // Switch low in the viewport and quickly, so a section's own text
              // colour meets its own background for as long as possible.
              const line = window.scrollY + window.innerHeight * 0.68;
              let i = 0;
              while (i < stops.length - 1 && stops[i + 1].y <= line) i++;
              let color = stops[i].color;
              if (i > 0 || line >= stops[0].y) {
                const prev = stops[Math.max(0, i - 1)].color;
                const k = Math.min(1, Math.max(0, (line - stops[i].y) / (window.innerHeight * 0.14)));
                color = gsap.utils.interpolate(prev, stops[i].color, k) as string;
              }
              document.body.style.backgroundColor = color;
              // Text follows the page: light sections turn white on dark or
              // orange, dark sections turn ink on light (brand rule: white on orange).
              const pageDark = isDark(color);
              bgEls.forEach((el) => {
                const own = isDark((el.dataset.bg ?? "#fff").split(/\s+/)[0]);
                el.classList.toggle("on-dark", pageDark && !own);
                el.classList.toggle("on-light", !pageDark && own);
              });
              document.documentElement.style.setProperty("--page-bg", color);
            };
            ScrollTrigger.create({
              start: 0,
              end: "max",
              onUpdate: paint,
              onRefresh: () => {
                measure();
                paint();
              },
            });
          }

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
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
              onUpdate: () => {
                el.textContent = format.format(state.value);
              },
            });
          });

        });

        // Re-measure once late assets (fonts, images) have settled.
        document.fonts?.ready.then(refresh).catch(() => {});
        timeouts.push(setTimeout(refresh, 350), setTimeout(refresh, 1200));
      }),
    );

    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(frame);
      timeouts.forEach(clearTimeout);
      window.removeEventListener("load", refresh);
      ctx?.revert();
      document.documentElement.classList.remove("bg-scroll");
      document.querySelectorAll(".on-dark, .on-light").forEach((el) => el.classList.remove("on-dark", "on-light"));
      document.body.style.backgroundColor = "";
      document.documentElement.style.removeProperty("--page-bg");
    };
  }, [pathname]);

  return <>{children}</>;
}
