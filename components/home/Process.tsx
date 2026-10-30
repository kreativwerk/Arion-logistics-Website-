"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dict } from "@/lib/i18n/types";
import { Path, clamp, drawLogo, drawVan, easeOut, fontFamily, isStillMode, lerp, rng, seg, useStage, type Pt } from "@/components/motion/stage";

gsap.registerPlugin(ScrollTrigger);

const ORANGE = "#f19104";
const INK = "#131316";
/** Step boundaries on the scroll progress (planning, delivery, reporting). */
const CUTS = [0.36, 0.7];

/** The district the tour runs through, in a virtual 1000 x 700 box. */
function buildDistrict() {
  const r = rng(42);
  const xs = [90, 210, 330, 450, 560, 680, 800, 910].map((x) => x + (r() - 0.5) * 24);
  const ys = [90, 200, 310, 420, 520, 620].map((y) => y + (r() - 0.5) * 20);
  const depot: Pt = { x: xs[0], y: ys[5] };

  // Stops on street intersections, then a nearest-neighbour tour.
  const picks = [[2, 4], [1, 2], [3, 1], [5, 0], [6, 2], [7, 1], [4, 3], [6, 4], [3, 5], [5, 5], [2, 0]];
  const stops = picks.map(([i, j]) => ({ x: xs[i], y: ys[j] }));
  const order: Pt[] = [];
  const left = [...stops];
  let cur = depot;
  while (left.length) {
    let best = 0;
    for (let k = 1; k < left.length; k++) {
      const d = Math.abs(left[k].x - cur.x) + Math.abs(left[k].y - cur.y);
      const db = Math.abs(left[best].x - cur.x) + Math.abs(left[best].y - cur.y);
      if (d < db) best = k;
    }
    cur = left.splice(best, 1)[0];
    order.push(cur);
  }

  // Streets are axis-aligned, so every leg goes along x first, then y.
  const pts: Pt[] = [depot];
  const stopAt: number[] = [];
  let len = 0;
  let prev = depot;
  for (const s of [...order, depot]) {
    const corner = { x: s.x, y: prev.y };
    len += Math.abs(corner.x - prev.x) + Math.abs(s.y - corner.y);
    pts.push(corner, s);
    if (s !== depot) stopAt.push(len);
    prev = s;
  }
  return { xs, ys, depot, order, path: new Path(pts), stopAt };
}

/**
 * "So arbeiten wir": a sticky, scroll-scrubbed stage. Scrolling plans a
 * tour (streets, stops, route), drives it (the van ticks off every stop)
 * and ends on the report the client sees. Captions crossfade per step.
 */
export default function Process({ dict }: { dict: Dict }) {
  const track = useRef<HTMLElement>(null);
  const captions = useRef<HTMLDivElement>(null);
  const progress = useRef({ target: 0, value: 0 });

  useLayoutEffect(() => {
    if (!track.current) return;
    const still = new URLSearchParams(window.location.search);
    const pinned = still.get("p");
    if (pinned !== null) {
      progress.current.target = progress.current.value = clamp(parseFloat(pinned) || 0);
      setStep(progress.current.target);
      return;
    }
    const st = ScrollTrigger.create({
      trigger: track.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress.current.target = self.progress;
        setStep(self.progress);
      },
    });
    setStep(st.progress);
    return () => st.kill();

    function setStep(p: number) {
      const idx = p < CUTS[0] ? 0 : p < CUTS[1] ? 1 : 2;
      captions.current?.querySelectorAll<HTMLElement>("[data-step]").forEach((el) => {
        el.dataset.active = String(Number(el.dataset.step) === idx);
      });
      captions.current?.style.setProperty("--p", String(p));
      // The scroll cue leaves as soon as the story starts moving.
      track.current?.toggleAttribute("data-scrolled", p > 0.03);
    }
  }, []);

  const canvas = useStage(
    () => {
      const d = buildDistrict();
      let view = { s: 1, ox: 0, oy: 0 };
      const reduce = isStillMode();
      const bars = Array.from({ length: 12 }, (_, i) => 0.8 + rng(7 + i)() * 0.17);

      const resize = (w: number, h: number) => {
        const s = Math.min(w / 1000, h / 700) * 0.94;
        view = { s, ox: (w - 1000 * s) / 2, oy: (h - 700 * s) / 2 };
      };

      const draw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
        const pr = progress.current;
        pr.value = reduce ? pr.target : pr.value + (pr.target - pr.value) * 0.1;
        const p = pr.value;
        const { s, ox, oy } = view;
        const sans = fontFamily();
        const mono = fontFamily(true);

        // Reporting: the map steps back, the report card takes the stage.
        const back = seg(p, 0.7, 0.8);
        ctx.save();
        ctx.translate(ox, oy);
        ctx.scale(s, s);
        ctx.translate(lerp(0, -150, back), lerp(0, -60, back));
        ctx.scale(lerp(1, 0.62, back), lerp(1, 0.62, back));
        ctx.globalAlpha = lerp(1, 0.55, back);

        // City blocks between the streets, barely there.
        ctx.fillStyle = "rgba(19,19,22,0.028)";
        for (let i = 0; i < d.xs.length - 1; i++) {
          for (let j = 0; j < d.ys.length - 1; j++) {
            ctx.beginPath();
            ctx.roundRect(d.xs[i] + 12, d.ys[j] + 12, d.xs[i + 1] - d.xs[i] - 24, d.ys[j + 1] - d.ys[j] - 24, 8);
            ctx.fill();
          }
        }

        // Streets
        const streets = 0.4 + 0.6 * seg(p, 0, 0.1);
        ctx.strokeStyle = "#e4e3de";
        ctx.lineWidth = 9;
        ctx.lineCap = "round";
        for (const y of d.ys) {
          ctx.beginPath();
          ctx.moveTo(40, y);
          ctx.lineTo(lerp(40, 960, streets), y);
          ctx.stroke();
        }
        for (const x of d.xs) {
          ctx.beginPath();
          ctx.moveTo(x, 50);
          ctx.lineTo(x, lerp(50, 660, streets));
          ctx.stroke();
        }

        // Route, drawn during planning
        const plan = seg(p, 0.14, 0.33);
        ctx.beginPath();
        d.path.trace(ctx, 0, d.path.length * plan);
        ctx.strokeStyle = ORANGE;
        ctx.lineWidth = 4;
        ctx.lineJoin = "round";
        ctx.setLineDash([10, 9]);
        ctx.lineDashOffset = -t * 18;
        ctx.stroke();
        ctx.setLineDash([]);

        // Driven part of the route, solid
        const drive = seg(p, 0.38, 0.68);
        const at = d.path.length * drive;
        if (drive > 0) {
          ctx.beginPath();
          d.path.trace(ctx, 0, at);
          ctx.strokeStyle = ORANGE;
          ctx.lineWidth = 5;
          ctx.stroke();
        }

        // Stops: pop in, get their order number, turn into ticks once served
        d.order.forEach((stop, i) => {
          const pop = easeOut(seg(p, 0.05 + i * 0.011, 0.13 + i * 0.011));
          if (pop <= 0) return;
          const served = drive > 0 && at >= d.stopAt[i];
          const r = 15 * pop;
          if (served) {
            const age = (at - d.stopAt[i]) / 60;
            if (age < 1) {
              ctx.beginPath();
              ctx.arc(stop.x, stop.y, r + age * 26, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(241,145,4,${1 - age})`;
              ctx.lineWidth = 2;
              ctx.stroke();
            }
          }
          ctx.beginPath();
          ctx.arc(stop.x, stop.y, r, 0, Math.PI * 2);
          ctx.fillStyle = served ? ORANGE : "#ffffff";
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = served ? ORANGE : INK;
          ctx.stroke();
          if (served) {
            ctx.beginPath();
            ctx.moveTo(stop.x - 6, stop.y);
            ctx.lineTo(stop.x - 1.5, stop.y + 5);
            ctx.lineTo(stop.x + 7, stop.y - 5);
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 3;
            ctx.stroke();
          } else if (plan > i / d.order.length) {
            ctx.fillStyle = INK;
            ctx.font = `600 14px ${mono}`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(String(i + 1), stop.x, stop.y + 1);
            ctx.textAlign = "start";
            ctx.textBaseline = "alphabetic";
          }
        });

        // Depot: the round Arion mark
        drawLogo(ctx, d.depot.x, d.depot.y, 22);

        // Van
        if (p > 0.3) {
          const v = d.path.at(Math.max(at, 0.001));
          drawVan(ctx, v.x, v.y, v.a, 2.4);
        }
        ctx.restore();

        // Report card
        if (back > 0) {
          const cw = Math.min(w * 0.62, 440);
          const ch = cw * 0.72;
          const cx = w - cw - w * 0.06;
          const cy = h * 0.5 - ch / 2 + (1 - back) * 40;
          ctx.save();
          ctx.globalAlpha = back;
          ctx.shadowColor = "rgba(19,19,22,0.12)";
          ctx.shadowBlur = 40;
          ctx.shadowOffsetY = 18;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.roundRect(cx, cy, cw, ch, 24);
          ctx.fill();
          ctx.shadowColor = "transparent";

          // Punctuality bars rising day by day, a target line above the floor.
          const pad = cw * 0.08;
          const gx = cx + pad;
          const gy = cy + ch - pad;
          const gw = cw - pad * 2;
          const gh = ch - pad * 2.6;
          const lr = cw * 0.03;
          drawLogo(ctx, gx + lr, cy + pad * 1.1 - lr * 0.7, lr, false);
          ctx.fillStyle = "#55555e";
          ctx.font = `500 ${Math.round(cw * 0.032)}px ${sans}`;
          ctx.fillText(dict.process.items[2].title, gx + lr * 2.8, cy + pad * 1.1);
          ctx.strokeStyle = "#e4e4e7";
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 5]);
          ctx.beginPath();
          ctx.moveTo(gx, gy - gh * 0.75);
          ctx.lineTo(gx + gw, gy - gh * 0.75);
          ctx.stroke();
          ctx.setLineDash([]);
          const bw = gw / bars.length;
          bars.forEach((v, i) => {
            const grow = easeOut(seg(p, 0.76 + i * 0.012, 0.86 + i * 0.012));
            const bh = gh * v * grow;
            ctx.fillStyle = i === bars.length - 1 ? ORANGE : "#f6c27a";
            ctx.beginPath();
            ctx.roundRect(gx + i * bw + bw * 0.18, gy - bh, bw * 0.64, bh, [6, 6, 2, 2]);
            ctx.fill();
          });
          ctx.restore();
        }
      };

      return { resize, draw };
    },
    { alwaysOn: true },
  );

  return (
    <section
      ref={track}
      id="process"
      data-bg="#ffffff #fff3df #fafaf9"
      data-bg-at="0 0.36 0.7"
      className="group/process relative h-[380vh] bg-surface">
      <div className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
        <div
          ref={captions}
          className="order-2 px-6 pb-24 pt-2 md:order-1 md:pb-0 md:pl-[max(3rem,calc((100vw-1320px)/2))] md:pr-10 md:pt-0"
        >
          <h2 className="max-w-[12ch] text-3xl font-semibold leading-[1.05] tracking-tighter md:text-6xl">
            {dict.process.title}
          </h2>
          <ol className="relative mt-6 grid md:mt-12">
            {dict.process.items.map((step, i) => (
              <li
                key={step.title}
                data-step={i}
                data-active={i === 0}
                className="col-start-1 row-start-1 max-w-[40ch] opacity-0 transition-[opacity,translate] duration-500 ease-[cubic-bezier(.22,1,.36,1)] [translate:0_14px] data-[active=true]:opacity-100 data-[active=true]:[translate:0_0]"
              >
                <span className="font-mono text-[13px] text-accent-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-4xl">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted md:text-lg">{step.text}</p>
              </li>
            ))}
          </ol>
          {/* Progress rail */}
          <div aria-hidden="true" className="relative mt-8 h-[3px] max-w-[340px] overflow-hidden rounded-full bg-line md:mt-12">
            <div className="absolute inset-y-0 left-0 w-full origin-left scale-x-[var(--p,0)] bg-accent" />
          </div>
        </div>
        {/* Minimal scroll cue: a dot travelling down a hairline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-28 z-10 h-10 w-px overflow-hidden bg-foreground/15 transition-opacity duration-500 group-data-[scrolled]/process:opacity-0 md:bottom-10 md:left-1/2 md:right-auto md:top-auto md:h-12"
        >
          <span className="absolute left-1/2 top-0 h-2.5 w-[3px] -translate-x-1/2 rounded-full bg-accent motion-safe:animate-[scroll-cue_1.8s_cubic-bezier(.45,0,.55,1)_infinite]" />
        </div>
        <div className="relative order-1 min-h-0 flex-1 md:order-2 md:h-full">
          <canvas
            ref={canvas}
            role="img"
            aria-label={dict.process.items.map((s) => s.title).join(", ")}
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
