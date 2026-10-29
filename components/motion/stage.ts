"use client";

import { useEffect, useRef } from "react";

/**
 * Runtime for the code-drawn motion on the site (no photos, no videos):
 * DPR-aware canvas sizing, a requestAnimationFrame loop driven by ELAPSED
 * time (never accumulated frame deltas), paused while the canvas is
 * off-screen, a single still frame under `prefers-reduced-motion` or `?still`,
 * and full cleanup on unmount.
 */

export type Scene = {
  /** Called on mount and on every size change, in CSS pixels. */
  resize?: (w: number, h: number) => void;
  /** Draw one frame. `t` is elapsed seconds (frozen in still mode). */
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;
  dispose?: () => void;
};

export type StageOptions = {
  /** Time used for the single frame in still mode. */
  stillTime?: number;
  /** Keep drawing while off-screen (needed for scroll-driven stages). */
  alwaysOn?: boolean;
};

export function isStillMode(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    new URLSearchParams(window.location.search).has("still")
  );
}

/** The page's Geist family as next/font registered it, for canvas text. */
export function fontFamily(mono = false): string {
  if (typeof document === "undefined") return "sans-serif";
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(mono ? "--font-geist-mono" : "--font-geist-sans")
    .trim();
  return v || (mono ? "ui-monospace, monospace" : "ui-sans-serif, system-ui, sans-serif");
}

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** Progress of `p` through the window [a, b], smoothstepped. */
export const seg = (p: number, a: number, b: number) => {
  const x = clamp((p - a) / (b - a));
  return x * x * (3 - 2 * x);
};
export const easeOut = (x: number) => 1 - Math.pow(1 - clamp(x), 3);
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

/** Deterministic PRNG so every load (and every screenshot) draws the same world. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export type Pt = { x: number; y: number };

/** Polyline sampled by arc length: position + heading at any distance. */
export class Path {
  readonly pts: Pt[];
  readonly cum: number[];
  readonly length: number;

  constructor(pts: Pt[]) {
    this.pts = pts;
    this.cum = [0];
    for (let i = 1; i < pts.length; i++) {
      this.cum.push(this.cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
    }
    this.length = this.cum[this.cum.length - 1];
  }

  at(s: number): { x: number; y: number; a: number } {
    const d = clamp(s, 0, this.length);
    let lo = 0;
    let hi = this.cum.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (this.cum[mid] < d) lo = mid;
      else hi = mid;
    }
    const a = this.pts[lo];
    const b = this.pts[hi];
    const span = this.cum[hi] - this.cum[lo] || 1;
    const k = (d - this.cum[lo]) / span;
    return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, a: Math.atan2(b.y - a.y, b.x - a.x) };
  }

  /** Stroke the stretch [s0, s1] of the path. */
  trace(ctx: CanvasRenderingContext2D, s0: number, s1: number) {
    if (s1 <= s0) return;
    const start = this.at(s0);
    ctx.moveTo(start.x, start.y);
    for (let i = 0; i < this.pts.length; i++) {
      if (this.cum[i] > s0 && this.cum[i] < s1) ctx.lineTo(this.pts[i].x, this.pts[i].y);
    }
    const end = this.at(s1);
    ctx.lineTo(end.x, end.y);
  }
}

/** Catmull-Rom smoothing so straight town-to-town legs read as roads. */
export function smooth(points: Pt[], steps = 10, closed = false): Pt[] {
  const p = closed ? [points[points.length - 1], ...points, points[0], points[1]] : [points[0], ...points, points[points.length - 1]];
  const out: Pt[] = [];
  for (let i = 1; i < p.length - 2; i++) {
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const t2 = t * t;
      const t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push({ x: f(p[i - 1].x, p[i].x, p[i + 1].x, p[i + 2].x), y: f(p[i - 1].y, p[i].y, p[i + 1].y, p[i + 2].y) });
    }
  }
  out.push(closed ? out[0] : points[points.length - 1]);
  return out;
}

/** Top-down delivery van: white body, orange brand stripe, dark windscreen. */
export function drawVan(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, size = 1, dark = false) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(size, size);
  ctx.shadowColor = dark ? "rgba(0,0,0,.5)" : "rgba(19,19,22,.22)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 2;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(-9, -4.5, 18, 9, 2.4);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = dark ? "rgba(255,255,255,.35)" : "rgba(19,19,22,.35)";
  ctx.lineWidth = 0.7;
  ctx.stroke();
  ctx.fillStyle = "#f19104";
  ctx.fillRect(-7, -4.5, 11, 1.6);
  ctx.fillStyle = "#24242a";
  ctx.beginPath();
  ctx.roundRect(4.6, -3.4, 2.6, 6.8, 1);
  ctx.fill();
  ctx.restore();
}

/**
 * Mount a scene on a canvas. Returns the ref to put on the <canvas>.
 * `create` runs once per mount; its scene is torn down on unmount.
 */
export function useStage(create: () => Scene, options: StageOptions = {}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const createRef = useRef(create);
  const { stillTime = 6, alwaysOn = false } = options;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scene = createRef.current();
    const still = isStillMode();
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const t0 = performance.now();

    const render = (t: number) => {
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      scene.draw(ctx, w, h, t);
    };

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      scene.resize?.(w, h);
      if (still) render(stillTime);
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible && !alwaysOn) return;
      render((now - t0) / 1000);
      raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(size);
    ro.observe(canvas);
    size();

    let io: IntersectionObserver | undefined;
    if (!still) {
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(loop);
      });
      io.observe(canvas);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
      scene.dispose?.();
    };
  }, [stillTime, alwaysOn]);

  return ref;
}
