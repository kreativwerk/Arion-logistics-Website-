"use client";

import { Path, drawVan, fontFamily, rng, smooth, useStage, type Pt } from "@/components/motion/stage";
import { projector, rivers, roads, tours, townByName, towns } from "@/components/motion/franken";

const ORANGE = "#f19104";
const INK = "#131316";

/** Deterministic hash of a road so its bend is identical in both directions. */
function bendOf(a: string, b: string) {
  const key = [a, b].sort().join("|");
  let hsh = 7;
  for (let i = 0; i < key.length; i++) hsh = (hsh * 31 + key.charCodeAt(i)) >>> 0;
  return ((hsh % 1000) / 1000 - 0.5) * 0.22;
}

/** A gently curved road between two projected towns. */
function roadPoints(a: string, b: string, P: (lat: number, lon: number) => Pt): Pt[] {
  const [first, second] = [a, b].sort();
  const A = townByName.get(first)!;
  const B = townByName.get(second)!;
  const pa = P(A.lat, A.lon);
  const pb = P(B.lat, B.lon);
  const dx = pb.x - pa.x;
  const dy = pb.y - pa.y;
  const bend = bendOf(a, b);
  const c = { x: (pa.x + pb.x) / 2 - dy * bend, y: (pa.y + pb.y) / 2 + dx * bend };
  const pts: Pt[] = [];
  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    const u = 1 - t;
    pts.push({ x: u * u * pa.x + 2 * u * t * c.x + t * t * pb.x, y: u * u * pa.y + 2 * u * t * c.y + t * t * pb.y });
  }
  return first === a ? pts : pts.reverse();
}

type Tour = { path: Path; stops: number[]; speed: number; offset: number };

/**
 * Hero world: a live schematic map of Franconia. White vans run example
 * tours out of the two depots along the real road network; every stop
 * they pass sends out an orange ring. All drawn in code.
 */
export default function HeroMap({ label }: { label: string }) {
  const ref = useStage(() => {
    let P = projector(1, 1, 0);
    let base: HTMLCanvasElement | null = null;
    let tourList: Tour[] = [];
    let unit = 1;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.active = true;
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const resize = (w: number, h: number) => {
      const wide = w > h * 1.15;
      // Zoomed past "contain" so the network fills the panel; shifted right
      // to leave room for the diagonal brand edge on the left.
      P = projector(w, h, Math.min(w, h) * 0.05, wide ? 0.52 : 0.56, 0.54, wide ? 1.12 : 1.04);
      unit = Math.max(0.75, Math.min(1.25, Math.min(w, h) / 620));

      // Static layer: roads, towns, labels. Redrawn only on resize.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      base = document.createElement("canvas");
      base.width = Math.round((w + 40) * dpr);
      base.height = Math.round((h + 40) * dpr);
      const b = base.getContext("2d")!;
      b.setTransform(dpr, 0, 0, dpr, 20 * dpr, 20 * dpr);

      // Faint field texture so the map reads as land, not a blank page.
      const r = rng(11);
      b.fillStyle = "rgba(19,19,22,0.035)";
      for (let i = 0; i < 900; i++) {
        b.beginPath();
        b.arc(r() * (w + 40) - 20, r() * (h + 40) - 20, 0.9, 0, Math.PI * 2);
        b.fill();
      }

      for (const river of rivers) {
        const pts = river.map(([lat, lon]) => P(lat, lon));
        b.beginPath();
        smooth(pts, 8).forEach((p, i) => (i ? b.lineTo(p.x, p.y) : b.moveTo(p.x, p.y)));
        b.strokeStyle = "#dde3e7";
        b.lineWidth = 5 * unit;
        b.lineCap = "round";
        b.lineJoin = "round";
        b.stroke();
      }

      for (const pass of [false, true]) {
        for (const road of roads) {
          if (!!road.major !== pass) continue;
          const pts = roadPoints(road.from, road.to, P);
          b.beginPath();
          pts.forEach((p, i) => (i ? b.lineTo(p.x, p.y) : b.moveTo(p.x, p.y)));
          b.strokeStyle = road.major ? "#cfcec8" : "#e0dfda";
          b.lineWidth = (road.major ? 3.2 : 1.6) * unit;
          b.lineCap = "round";
          b.stroke();
        }
      }

      const sans = fontFamily();
      for (const town of towns) {
        const p = P(town.lat, town.lon);
        if (town.kind === "depot") continue;
        b.fillStyle = town.kind === "city" ? INK : "#8a8a92";
        b.beginPath();
        b.arc(p.x, p.y, (town.kind === "city" ? 3.2 : 2) * unit, 0, Math.PI * 2);
        b.fill();
        if (town.kind === "city") {
          b.font = `500 ${Math.round(12.5 * unit)}px ${sans}`;
          b.fillStyle = "#55555e";
          // Flip labels that would run off the right edge.
          const tw = b.measureText(town.name).width;
          const right = p.x + 7 * unit + tw < w - 8;
          b.fillText(town.name, right ? p.x + 7 * unit : p.x - 7 * unit - tw, p.y - 6 * unit);
        }
      }

      tourList = tours.map((names, i) => {
        const pts: Pt[] = [];
        const stops: number[] = [];
        const legs = [...names, names[0]];
        for (let k = 0; k < legs.length - 1; k++) {
          const leg = roadPoints(legs[k], legs[k + 1], P);
          pts.push(...(k ? leg.slice(1) : leg));
        }
        const path = new Path(pts);
        // A stop at every town the tour passes (the depot itself excluded).
        let acc = 0;
        for (let k = 0; k < legs.length - 1; k++) {
          const leg = new Path(roadPoints(legs[k], legs[k + 1], P));
          acc += leg.length;
          if (k < legs.length - 2) stops.push(acc);
        }
        return { path, stops, speed: (34 + (i % 3) * 7) * unit, offset: i * 97 };
      });
    };

    const draw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      // Pointer parallax (idle drift until a mouse appears).
      if (!pointer.active) {
        pointer.tx = Math.sin(t * 0.21) * 0.35;
        pointer.ty = Math.cos(t * 0.17) * 0.25;
      }
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const bx = -pointer.x * 8;
      const by = -pointer.y * 6;

      if (base) ctx.drawImage(base, -20 + bx, -20 + by, w + 40, h + 40);

      ctx.save();
      ctx.translate(bx * 1.6, by * 1.6);

      for (const tour of tourList) {
        const { path, stops, speed, offset } = tour;
        const s = (t * speed + offset) % path.length;

        // Planned route, faint.
        ctx.beginPath();
        path.trace(ctx, 0, path.length);
        ctx.strokeStyle = "rgba(241,145,4,0.16)";
        ctx.lineWidth = 1.4 * unit;
        ctx.setLineDash([2 * unit, 5 * unit]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Trail behind the van.
        const trail = 90 * unit;
        const steps = 12;
        for (let k = 0; k < steps; k++) {
          const a = s - trail + (trail / steps) * k;
          const b = a + trail / steps;
          if (b <= 0) continue;
          ctx.beginPath();
          path.trace(ctx, Math.max(0, a), b);
          ctx.strokeStyle = `rgba(241,145,4,${((k + 1) / steps) * 0.85})`;
          ctx.lineWidth = 2.4 * unit;
          ctx.lineCap = "round";
          ctx.stroke();
        }

        // Delivery pings at the stops this van just passed.
        for (const stop of stops) {
          const age = (s - stop) / speed;
          if (age < 0 || age > 1.6) continue;
          const p = path.at(stop);
          const k = age / 1.6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, (4 + k * 22) * unit, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(241,145,4,${(1 - k) * 0.9})`;
          ctx.lineWidth = 1.6 * unit;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3 * unit, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(241,145,4,${1 - k})`;
          ctx.fill();
        }

        const v = path.at(s);
        drawVan(ctx, v.x, v.y, v.a, unit * 1.05);
      }

      // Depots: orange squares with a slow breathing ring.
      const sans = fontFamily();
      for (const town of towns) {
        if (town.kind !== "depot") continue;
        const p = P(town.lat, town.lon);
        const k = (t * 0.45 + (town.name === "Kitzingen" ? 0.5 : 0)) % 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (8 + k * 26) * unit, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(241,145,4,${(1 - k) * 0.5})`;
        ctx.lineWidth = 1.2 * unit;
        ctx.stroke();
        ctx.fillStyle = ORANGE;
        ctx.beginPath();
        ctx.roundRect(p.x - 6.5 * unit, p.y - 6.5 * unit, 13 * unit, 13 * unit, 3 * unit);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.fillRect(p.x - 2 * unit, p.y - 2 * unit, 4 * unit, 4 * unit);

        ctx.font = `600 ${Math.round(13.5 * unit)}px ${sans}`;
        const tw = ctx.measureText(town.name).width;
        const lx = p.x + 12 * unit + tw + 20 < w ? p.x + 12 * unit : p.x - 12 * unit - tw;
        const ly = p.y + 20 * unit;
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.beginPath();
        ctx.roundRect(lx - 6 * unit, ly - 13 * unit, tw + 12 * unit, 19 * unit, 9.5 * unit);
        ctx.fill();
        ctx.fillStyle = INK;
        ctx.fillText(town.name, lx, ly);
      }
      ctx.restore();
    };

    return {
      resize,
      draw,
      dispose: () => window.removeEventListener("pointermove", onMove),
    };
  });

  return <canvas ref={ref} role="img" aria-label={label} className="absolute inset-0 h-full w-full" />;
}
