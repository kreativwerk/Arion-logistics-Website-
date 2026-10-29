"use client";

import { Path, drawVan, rng, useStage, type Pt } from "@/components/motion/stage";

/** Smooth value noise on a hashed lattice, summed into fbm. */
function makeNoise(seed: number) {
  const r = rng(seed);
  const perm = Array.from({ length: 512 }, () => r());
  const h = (x: number, y: number) => perm[(x * 73 + y * 151) & 511];
  const n = (x: number, y: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;
    const u = xf * xf * (3 - 2 * xf);
    const v = yf * yf * (3 - 2 * yf);
    const a = h(xi, yi);
    const b = h(xi + 1, yi);
    const c = h(xi, yi + 1);
    const d = h(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
  return (x: number, y: number) => n(x, y) * 0.55 + n(x * 2.1, y * 2.1) * 0.28 + n(x * 4.3, y * 4.3) * 0.17;
}

/**
 * Franconian hills as a topographic map: contour lines (marching squares
 * over drifting fbm noise), one country road with a van on it. A calm
 * backdrop for the region quote.
 */
export default function RegionContours({ label }: { label: string }) {
  const ref = useStage(
    () => {
      const noise = makeNoise(5);
      let road = new Path([{ x: 0, y: 0 }, { x: 1, y: 0 }]);
      let villages: Pt[] = [];
      let unit = 1;
      return {
        resize(w, h) {
          unit = Math.max(0.8, Math.min(1.3, w / 1200));
          const pts: Pt[] = [];
          for (let i = 0; i <= 80; i++) {
            const k = i / 80;
            pts.push({ x: -40 + (w + 80) * k, y: h * (0.42 + Math.sin(k * 5.2 + 0.6) * 0.1 + Math.sin(k * 11) * 0.025) });
          }
          road = new Path(pts);
          villages = [0.18, 0.47, 0.76].map((k) => road.at(road.length * k));
        },
        draw(ctx, w, h, t) {
          const cell = 16;
          const cols = Math.ceil(w / cell) + 1;
          const rows = Math.ceil(h / cell) + 1;
          const drift = t * 0.018;
          const field = new Float32Array(cols * rows);
          for (let j = 0; j < rows; j++) {
            for (let i = 0; i < cols; i++) {
              field[j * cols + i] = noise(i * cell * 0.0032 + drift, j * cell * 0.0032 - drift * 0.6);
            }
          }

          // Marching squares, one stroke per level.
          const levels = 11;
          for (let L = 1; L < levels; L++) {
            const iso = 0.12 + (L / levels) * 0.72;
            ctx.beginPath();
            for (let j = 0; j < rows - 1; j++) {
              for (let i = 0; i < cols - 1; i++) {
                const a = field[j * cols + i];
                const b = field[j * cols + i + 1];
                const c = field[(j + 1) * cols + i + 1];
                const d = field[(j + 1) * cols + i];
                const idx = (a > iso ? 8 : 0) | (b > iso ? 4 : 0) | (c > iso ? 2 : 0) | (d > iso ? 1 : 0);
                if (idx === 0 || idx === 15) continue;
                const x = i * cell;
                const y = j * cell;
                const lerpE = (p: number, q: number) => (iso - p) / (q - p || 1e-6);
                const top = { x: x + cell * lerpE(a, b), y };
                const right = { x: x + cell, y: y + cell * lerpE(b, c) };
                const bottom = { x: x + cell * lerpE(d, c), y: y + cell };
                const left = { x, y: y + cell * lerpE(a, d) };
                const segs: [Pt, Pt][] = [];
                switch (idx) {
                  case 1: case 14: segs.push([left, bottom]); break;
                  case 2: case 13: segs.push([bottom, right]); break;
                  case 3: case 12: segs.push([left, right]); break;
                  case 4: case 11: segs.push([top, right]); break;
                  case 5: segs.push([left, top], [bottom, right]); break;
                  case 6: case 9: segs.push([top, bottom]); break;
                  case 7: case 8: segs.push([left, top]); break;
                  case 10: segs.push([left, bottom], [top, right]); break;
                }
                for (const [p, q] of segs) {
                  ctx.moveTo(p.x, p.y);
                  ctx.lineTo(q.x, q.y);
                }
              }
            }
            ctx.strokeStyle = L % 4 === 0 ? "rgba(19,19,22,0.16)" : "rgba(19,19,22,0.07)";
            ctx.lineWidth = L % 4 === 0 ? 1.2 : 1;
            ctx.stroke();
          }

          // Country road with a white casing.
          ctx.beginPath();
          road.trace(ctx, 0, road.length);
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 9 * unit;
          ctx.lineCap = "round";
          ctx.stroke();
          ctx.beginPath();
          road.trace(ctx, 0, road.length);
          ctx.strokeStyle = "rgba(241,145,4,0.55)";
          ctx.lineWidth = 1.6 * unit;
          ctx.setLineDash([8 * unit, 10 * unit]);
          ctx.stroke();
          ctx.setLineDash([]);

          for (const v of villages) {
            // A handful of rooftops beside the road.
            ctx.fillStyle = "#131316";
            [10, 15, 8, 13, 9].forEach((dy, k) => {
              ctx.fillRect(v.x - 16 * unit + k * 7 * unit, v.y - (dy + 8) * unit, 5 * unit, 5 * unit);
            });
          }

          const s = (t * 70 * unit) % road.length;
          const van = road.at(s);
          drawVan(ctx, van.x, van.y, van.a, unit * 1.9);
        },
      };
    },
    { stillTime: 9 },
  );
  return <canvas ref={ref} role="img" aria-label={label} className="absolute inset-0 h-full w-full" />;
}
