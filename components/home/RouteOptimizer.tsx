"use client";

import { Path, drawVan, rng, seg, smooth, useStage, type Pt } from "@/components/motion/stage";

const ORANGE = "#f19104";

/** Nearest neighbour tour, then 2-opt until no crossing improves it. */
function optimise(depot: Pt, stops: Pt[]): Pt[] {
  const left = [...stops];
  const tour: Pt[] = [depot];
  let cur = depot;
  while (left.length) {
    let best = 0;
    left.forEach((p, i) => {
      if (Math.hypot(p.x - cur.x, p.y - cur.y) < Math.hypot(left[best].x - cur.x, left[best].y - cur.y)) best = i;
    });
    cur = left.splice(best, 1)[0];
    tour.push(cur);
  }
  tour.push(depot);
  const d = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y);
  for (let improved = true; improved; ) {
    improved = false;
    for (let i = 1; i < tour.length - 2; i++) {
      for (let k = i + 1; k < tour.length - 1; k++) {
        if (d(tour[i - 1], tour[k]) + d(tour[i], tour[k + 1]) < d(tour[i - 1], tour[i]) + d(tour[k], tour[k + 1]) - 0.01) {
          tour.splice(i, k - i + 1, ...tour.slice(i, k + 1).reverse());
          improved = true;
        }
      }
    }
  }
  return tour;
}

type Round = { depot: Pt; stops: Pt[]; messy: Pt[]; route: Path };

/**
 * Dark "digital" panel: a scatter of stops, first linked in arrival order
 * (a tangle), then re-planned into one clean tour that the van drives.
 * Three seeded rounds loop so it never repeats on screen back to back.
 */
export default function RouteOptimizer({ label }: { label: string }) {
  const ref = useStage(
    () => {
      let rounds: Round[] = [];
      let unit = 1;
      return {
        resize(w: number, h: number) {
          unit = Math.min(w, h) / 420;
          rounds = [3, 17, 29].map((seed) => {
            const r = rng(seed);
            const depot = { x: w * 0.14, y: h * 0.82 };
            const stops: Pt[] = [];
            while (stops.length < 16) {
              const p = { x: w * (0.1 + r() * 0.8), y: h * (0.12 + r() * 0.74) };
              if (stops.every((q) => Math.hypot(q.x - p.x, q.y - p.y) > Math.min(w, h) * 0.09)) stops.push(p);
            }
            const tour = optimise(depot, stops);
            return { depot, stops, messy: [depot, ...stops, depot], route: new Path(smooth(tour, 6)) };
          });
        },
        draw(ctx, w, h, t) {
          const cycle = 8;
          const round = rounds[Math.floor(t / cycle) % rounds.length];
          if (!round) return;
          const c = (t % cycle) / cycle;
          const fadeIn = seg(c, 0, 0.08);
          const fadeOut = 1 - seg(c, 0.93, 1);
          ctx.globalAlpha = fadeIn * fadeOut;

          // Faint grid, the "screen" the planner works on.
          ctx.strokeStyle = "rgba(255,255,255,0.05)";
          ctx.lineWidth = 1;
          const step = 36 * unit;
          for (let x = step / 2; x < w; x += step) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
          }
          for (let y = step / 2; y < h; y += step) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
          }

          // The tangle: stops in the order the parcels came in.
          const tangle = seg(c, 0.1, 0.34) * (1 - seg(c, 0.4, 0.55));
          if (tangle > 0) {
            const messy = new Path(round.messy);
            ctx.beginPath();
            messy.trace(ctx, 0, messy.length * Math.min(1, seg(c, 0.1, 0.34)));
            ctx.strokeStyle = `rgba(255,255,255,${0.32 * tangle})`;
            ctx.lineWidth = 1.4 * unit;
            ctx.stroke();
          }

          // The plan: one clean tour.
          const plan = seg(c, 0.42, 0.66);
          if (plan > 0) {
            ctx.beginPath();
            round.route.trace(ctx, 0, round.route.length * plan);
            ctx.strokeStyle = ORANGE;
            ctx.lineWidth = 3 * unit;
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.stroke();
          }

          const drive = seg(c, 0.68, 0.93);
          for (const s of round.stops) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, 5.5 * unit, 0, Math.PI * 2);
            ctx.fillStyle = plan >= 1 ? ORANGE : "#ffffff";
            ctx.fill();
          }

          ctx.fillStyle = ORANGE;
          ctx.beginPath();
          ctx.roundRect(round.depot.x - 10 * unit, round.depot.y - 10 * unit, 20 * unit, 20 * unit, 4 * unit);
          ctx.fill();
          ctx.fillStyle = "#0c0c0f";
          ctx.fillRect(round.depot.x - 3 * unit, round.depot.y - 3 * unit, 6 * unit, 6 * unit);

          if (drive > 0) {
            const v = round.route.at(round.route.length * drive);
            drawVan(ctx, v.x, v.y, v.a, unit * 1.8, true);
          }
          ctx.globalAlpha = 1;
        },
      };
    },
    { stillTime: 6.2 },
  );
  return <canvas ref={ref} role="img" aria-label={label} className="absolute inset-0 h-full w-full" />;
}
