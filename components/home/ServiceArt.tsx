"use client";

import { Path, drawVan, easeOut, seg, useStage, type Pt } from "@/components/motion/stage";

const ORANGE = "#f19104";

/** Isometric projection of a (x, y, z) unit grid point. */
function iso(ox: number, oy: number, k: number) {
  return (x: number, y: number, z: number): Pt => ({ x: ox + (x - y) * 0.866 * k, y: oy + (x + y) * 0.5 * k - z * k });
}

/** One isometric parcel: three shaded faces plus a strip of orange tape. */
function parcel(ctx: CanvasRenderingContext2D, P: ReturnType<typeof iso>, x: number, y: number, z: number, s = 0.9) {
  const a = P(x, y, z + s);
  const b = P(x + s, y, z + s);
  const c = P(x + s, y + s, z + s);
  const d = P(x, y + s, z + s);
  const e = P(x + s, y, z);
  const f = P(x + s, y + s, z);
  const g = P(x, y + s, z);
  const face = (pts: Pt[], fill: string) => {
    ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
  };
  face([a, b, c, d], "#e9d3b0");
  face([b, e, f, c], "#cfae7c");
  face([d, c, f, g], "#dcc092");
  // Tape across the top, running down the front face.
  const t0 = P(x + s * 0.44, y, z + s);
  const t1 = P(x + s * 0.56, y, z + s);
  const t2 = P(x + s * 0.56, y + s, z + s);
  const t3 = P(x + s * 0.44, y + s, z + s);
  face([t0, t1, t2, t3], ORANGE);
  const t4 = P(x + s * 0.56, y + s, z);
  const t5 = P(x + s * 0.44, y + s, z);
  face([t3, t2, t4, t5], "#d97f02");
}

/** Parcel delivery: parcels drop onto a pallet, stack up, slide off to the van, repeat. */
function kepScene() {
  let P = iso(0, 0, 1);
  const slots: [number, number, number][] = [];
  for (let z = 0; z < 3; z++) for (let y = 0; y < 2; y++) for (let x = 0; x < 3; x++) slots.push([x, y, z]);
  return {
    resize(w: number, h: number) {
      // Stack top (z = 3) and pallet front (x + y = 5) both stay inside the frame.
      const k = Math.min(w / 7.5, h * 0.145);
      P = iso(w * 0.46, 3 * k + h * 0.1, k);
    },
    draw(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
      const cycle = 7.5;
      const c = (t % cycle) / cycle;
      // Pallet
      const pallet = [P(-0.1, -0.1, 0), P(3.0, -0.1, 0), P(3.0, 2.0, 0), P(-0.1, 2.0, 0)];
      ctx.beginPath();
      pallet.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.closePath();
      ctx.fillStyle = "#e4e3de";
      ctx.fill();

      const leave = seg(c, 0.8, 0.98);
      // Draw back-to-front so nearer parcels cover farther ones.
      const order = [...slots].sort((a, b) => a[2] - b[2] || a[0] + a[1] - (b[0] + b[1]));
      order.forEach(([x, y, z]) => {
        const i = slots.findIndex((s) => s[0] === x && s[1] === y && s[2] === z);
        const land = easeOut(seg(c, 0.04 + i * 0.026, 0.1 + i * 0.026));
        if (land <= 0) return;
        const drop = (1 - land) * 2.4;
        const off = leave * 6;
        ctx.globalAlpha = 1 - leave;
        parcel(ctx, P, x + 0.05 + off, y + 0.05, z * 0.95 + drop);
      });
      ctx.globalAlpha = 1;

      // The van backs in, waits, and drives off with the load.
      const vanIn = easeOut(seg(c, 0.66, 0.8));
      const vanOut = seg(c, 0.86, 1);
      const vp = P(4.3 + (1 - vanIn) * 3 + vanOut * 5, 1.2, 0);
      if (vanIn > 0 && vanOut < 1) drawVan(ctx, vp.x, vp.y, Math.atan2(0.5, 0.866), Math.min(w, h) / 125);
    },
  };
}

/** Courier & express: one direct run from A to B, a timer ring closing as it goes. */
function expressScene() {
  let path = new Path([{ x: 0, y: 0 }, { x: 1, y: 0 }]);
  let A: Pt = { x: 0, y: 0 };
  let B: Pt = { x: 0, y: 0 };
  let unit = 1;
  return {
    resize(w: number, h: number) {
      unit = Math.min(w, h) / 300;
      A = { x: w * 0.16, y: h * 0.7 };
      B = { x: w * 0.82, y: h * 0.3 };
      const pts: Pt[] = [];
      for (let i = 0; i <= 60; i++) {
        const k = i / 60;
        pts.push({
          x: A.x + (B.x - A.x) * k,
          y: A.y + (B.y - A.y) * k + Math.sin(k * Math.PI * 2.2) * h * 0.09,
        });
      }
      path = new Path(pts);
    },
    draw(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
      const cycle = 4.2;
      const c = (t % cycle) / cycle;
      const run = easeOut(seg(c, 0.08, 0.72));

      ctx.beginPath();
      path.trace(ctx, 0, path.length);
      ctx.strokeStyle = "#e4e3de";
      ctx.lineWidth = 6 * unit;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      path.trace(ctx, 0, path.length * run);
      ctx.strokeStyle = ORANGE;
      ctx.lineWidth = 3 * unit;
      ctx.stroke();

      // Speed streaks behind the van
      const v = path.at(path.length * run);
      if (run > 0.02 && run < 0.98) {
        for (let k = 1; k <= 3; k++) {
          const back = path.at(Math.max(0, path.length * run - k * 14 * unit));
          ctx.beginPath();
          ctx.arc(back.x, back.y, (3.2 - k * 0.7) * unit, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(241,145,4,${0.5 - k * 0.13})`;
          ctx.fill();
        }
      }

      // A and B markers
      for (const [p, filled] of [[A, true], [B, run >= 0.99]] as const) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 9 * unit, 0, Math.PI * 2);
        ctx.fillStyle = filled ? ORANGE : "#ffffff";
        ctx.fill();
        ctx.lineWidth = 2.4 * unit;
        ctx.strokeStyle = ORANGE;
        ctx.stroke();
      }
      if (run >= 0.99) {
        const age = seg(c, 0.72, 0.95);
        ctx.beginPath();
        ctx.arc(B.x, B.y, (9 + age * 30) * unit, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(241,145,4,${1 - age})`;
        ctx.lineWidth = 2 * unit;
        ctx.stroke();
      }

      // Timer ring top-left: the promise, closing as the run completes.
      const rx = w * 0.18;
      const ry = h * 0.26;
      const rr = 26 * unit;
      ctx.beginPath();
      ctx.arc(rx, ry, rr, 0, Math.PI * 2);
      ctx.strokeStyle = "#e4e3de";
      ctx.lineWidth = 5 * unit;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(rx, ry, rr, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * run);
      ctx.strokeStyle = ORANGE;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      const ha = -Math.PI / 2 + Math.PI * 2 * run;
      ctx.lineTo(rx + Math.cos(ha) * rr * 0.6, ry + Math.sin(ha) * rr * 0.6);
      ctx.strokeStyle = "#131316";
      ctx.lineWidth = 2.4 * unit;
      ctx.stroke();

      drawVan(ctx, v.x, v.y, v.a, unit * 1.9);
    },
  };
}

export default function ServiceArt({ variant, label }: { variant: "kep" | "express"; label: string }) {
  const ref = useStage(variant === "kep" ? kepScene : expressScene, { stillTime: variant === "kep" ? 5.6 : 2.4 });
  return <canvas ref={ref} role="img" aria-label={label} className="h-full w-full" />;
}
