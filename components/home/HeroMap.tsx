"use client";

import { Path, drawLogo, drawVan, fontFamily, lerp, rng, seg, smooth, useStage, type Pt } from "@/components/motion/stage";
import {
  bavaria,
  expressRuns,
  germanyCities,
  longRuns,
  rivers,
  roads,
  tours,
  townByName,
  towns,
  views,
} from "@/components/motion/franken";
import { germany, states } from "@/components/motion/germany";

const INK = "#131316";
/** World units: x = lon * K, y = -lat. K squashes longitude for mid-Germany. */
const K = Math.cos((51 * Math.PI) / 180);
const toWorld = (lat: number, lon: number): Pt => ({ x: lon * K, y: -lat });

/** Where every named place sits, in world units. */
const places = new Map<string, Pt>();
for (const t of towns) places.set(t.name, toWorld(t.lat, t.lon));
for (const c of [...bavaria, ...germanyCities]) places.set(c.name, toWorld(c.lat, c.lon));

/** Deterministic hash of a road so its bend is identical in both directions. */
function bendOf(a: string, b: string) {
  const key = [a, b].sort().join("|");
  let hsh = 7;
  for (let i = 0; i < key.length; i++) hsh = (hsh * 31 + key.charCodeAt(i)) >>> 0;
  return ((hsh % 1000) / 1000 - 0.5) * 0.22;
}

/** A quadratic curve between two places, `bend` as a share of the leg length. */
function curve(a: string, b: string, bend: number, n = 16): Pt[] {
  const [first, second] = [a, b].sort();
  const pa = places.get(first)!;
  const pb = places.get(second)!;
  const dx = pb.x - pa.x;
  const dy = pb.y - pa.y;
  const c = { x: (pa.x + pb.x) / 2 - dy * bend, y: (pa.y + pb.y) / 2 + dx * bend };
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    pts.push({ x: u * u * pa.x + 2 * u * t * c.x + t * t * pb.x, y: u * u * pa.y + 2 * u * t * c.y + t * t * pb.y });
  }
  return first === a ? pts : pts.reverse();
}

const roadPts = (a: string, b: string) => curve(a, b, bendOf(a, b));

/** Arcs bow out consistently so long runs read as flight-plan lines. */
const arcPts = (from: string, to: string) => {
  const pts = curve(from, to, from < to ? -0.18 : 0.18, 40);
  return pts;
};

type Tour = { path: Path; stops: number[]; offset: number };
type Run = { path: Path; offset: number; speed: number };
type Camera = { x: number; y: number; s: number };

/** Timeline of the zoom loop, in seconds: Franken -> Bayern -> Deutschland -> back. */
const CYCLE = 30;
const KEYS: { at: number; view: keyof typeof views }[] = [
  { at: 0, view: "franken" },
  { at: 10, view: "franken" },
  { at: 12.6, view: "bayern" },
  { at: 17, view: "bayern" },
  { at: 19.6, view: "deutschland" },
  { at: 25, view: "deutschland" },
  { at: 28.6, view: "franken" },
  { at: 30, view: "franken" },
];

/**
 * Hero world: a live map that starts on the Franconian delivery network
 * (vans running real tours out of Pommersfelden and Kitzingen), then pulls
 * back to show express runs across Bavaria and long-distance runs across
 * Germany, and dives back in. All drawn in code from real coordinates.
 */
export default function HeroMap({ label }: { label: string }) {
  const ref = useStage(() => {
    let W = 1;
    let H = 1;
    let unit = 1;
    let anchorX = 0.56;
    const cams = {} as Record<keyof typeof views, Camera>;
    let tourList: Tour[] = [];
    const roadList = roads.map((r) => ({ pts: roadPts(r.from, r.to), major: !!r.major }));
    const riverList = rivers.map((r) => smooth(r.map(([lat, lon]) => toWorld(lat, lon)), 8));
    const outline = germany.map((ring) => ring.map(([lon, lat]) => toWorld(lat, lon)));
    const stateRings = states.map((st) => ({
      bayern: st.name === "Bayern",
      rings: st.rings.map((ring) => ring.map(([lon, lat]) => toWorld(lat, lon))),
    }));
    const r = rng(9);
    const express: Run[] = expressRuns.map((e) => ({ path: new Path(arcPts(e.from, e.to)), offset: r(), speed: 0.11 + r() * 0.05 }));
    const long: Run[] = longRuns.map((e) => ({ path: new Path(arcPts(e.from, e.to)), offset: r(), speed: 0.08 + r() * 0.04 }));
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.active = true;
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const fit = (v: (typeof views)[keyof typeof views], boost: number): Camera => {
      const bw = (v.lonMax - v.lonMin) * K;
      const bh = v.latMax - v.latMin;
      return {
        x: ((v.lonMin + v.lonMax) / 2) * K,
        y: -(v.latMin + v.latMax) / 2,
        s: Math.min((W * 0.9) / bw, (H * 0.9) / bh) * boost,
      };
    };

    const resize = (w: number, h: number) => {
      W = w;
      H = h;
      unit = Math.max(0.75, Math.min(1.25, Math.min(w, h) / 620));
      // Shifted right to leave room for the diagonal brand edge.
      anchorX = w > h * 1.15 ? 0.52 : 0.56;
      cams.franken = fit(views.franken, 1.04);
      cams.bayern = fit(views.bayern, 1);
      cams.deutschland = fit(views.deutschland, 1);

      // Tours in world units; van speed is set in screen pixels at Franken zoom.
      tourList = tours.map((names, i) => {
        const legs = [...names, names[0]];
        const pts: Pt[] = [];
        const stops: number[] = [];
        let acc = 0;
        for (let k = 0; k < legs.length - 1; k++) {
          const leg = roadPts(legs[k], legs[k + 1]);
          pts.push(...(k ? leg.slice(1) : leg));
          acc += new Path(leg).length;
          if (k < legs.length - 2) stops.push(acc);
        }
        return { path: new Path(pts), stops, offset: i * 0.37 };
      });
    };

    /** Camera at time t: log-scale zoom, centre eased with it so the zoom feels optical. */
    const cameraAt = (t: number): Camera => {
      const c = t % CYCLE;
      let i = 0;
      while (i < KEYS.length - 2 && KEYS[i + 1].at <= c) i++;
      const a = cams[KEYS[i].view];
      const b = cams[KEYS[i + 1].view];
      if (a === b) return a;
      const k = seg(c, KEYS[i].at, KEYS[i + 1].at);
      const s = Math.exp(lerp(Math.log(a.s), Math.log(b.s), k));
      const u = (1 / s - 1 / a.s) / (1 / b.s - 1 / a.s || 1);
      return { x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u), s };
    };

    const draw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      if (!pointer.active) {
        pointer.tx = Math.sin(t * 0.21) * 0.35;
        pointer.ty = Math.cos(t * 0.17) * 0.25;
      }
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      const cam = cameraAt(t);
      const ox = w * anchorX - pointer.x * 10;
      const oy = h * 0.54 - pointer.y * 8;
      const S = (p: Pt): Pt => ({ x: (p.x - cam.x) * cam.s + ox, y: (p.y - cam.y) * cam.s + oy });
      const line = (pts: Pt[], close = false) => {
        pts.forEach((p, i) => {
          const q = S(p);
          if (i) ctx.lineTo(q.x, q.y);
          else ctx.moveTo(q.x, q.y);
        });
        if (close) ctx.closePath();
      };

      // 1 = Franken close-up, 0 = all of Germany.
      const zl = Math.log(cam.s / cams.deutschland.s) / Math.log(cams.franken.s / cams.deutschland.s);
      const local = seg(zl, 0.6, 0.92);
      const majors = seg(zl, 0.35, 0.75);
      const bavariaLayer = seg(zl, 0.12, 0.4) * (1 - seg(zl, 0.72, 0.95));
      const germanyLayer = 1 - seg(zl, 0.12, 0.42);
      const sans = fontFamily();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Field texture
      const tex = rng(11);
      ctx.fillStyle = "rgba(19,19,22,0.035)";
      for (let i = 0; i < 700; i++) ctx.fillRect(tex() * w, tex() * h, 1.6, 1.6);

      // Germany and the states
      ctx.beginPath();
      outline.forEach((ring) => line(ring, true));
      ctx.fillStyle = `rgba(255,255,255,${0.55 * (1 - local)})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(19,19,22,${0.18 * (1 - local * 0.6)})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();
      for (const st of stateRings) {
        ctx.beginPath();
        st.rings.forEach((ring) => line(ring, true));
        if (st.bayern) {
          ctx.fillStyle = `rgba(241,145,4,${0.035 + 0.08 * (1 - local)})`;
          ctx.fill();
          ctx.strokeStyle = "rgba(241,145,4,0.45)";
          ctx.lineWidth = 1.6;
          ctx.setLineDash([6, 5]);
          ctx.stroke();
          ctx.setLineDash([]);
        } else {
          ctx.strokeStyle = `rgba(19,19,22,${0.09 * (1 - local)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Rivers and roads of the delivery area
      if (local > 0) {
        ctx.globalAlpha = local;
        for (const river of riverList) {
          ctx.beginPath();
          line(river);
          ctx.strokeStyle = "#dde3e7";
          ctx.lineWidth = 5 * unit;
          ctx.stroke();
        }
      }
      for (const pass of [false, true]) {
        const a = pass ? majors : local;
        if (a <= 0) continue;
        ctx.globalAlpha = a;
        ctx.beginPath();
        roadList.filter((rd) => rd.major === pass).forEach((rd) => line(rd.pts));
        ctx.strokeStyle = pass ? "#cfcec8" : "#e0dfda";
        ctx.lineWidth = (pass ? 3.2 : 1.6) * unit;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Express runs across Bavaria, long runs across Germany
      const runs = (list: Run[], alpha: number) => {
        if (alpha <= 0) return;
        for (const run of list) {
          ctx.beginPath();
          line(run.path.pts);
          ctx.strokeStyle = `rgba(241,145,4,${0.35 * alpha})`;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 6]);
          ctx.stroke();
          ctx.setLineDash([]);
          const k = (t * run.speed + run.offset) % 1;
          const head = run.path.length * k;
          ctx.beginPath();
          line(run.path.pts.filter((_, i) => run.path.cum[i] <= head && run.path.cum[i] >= head - run.path.length * 0.18));
          ctx.strokeStyle = `rgba(241,145,4,${0.9 * alpha})`;
          ctx.lineWidth = 2.6;
          ctx.stroke();
          const p = S(run.path.at(head));
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(241,145,4,${alpha})`;
          ctx.fill();
          if (k > 0.94) {
            const end = S(run.path.at(run.path.length));
            const age = (k - 0.94) / 0.06;
            ctx.beginPath();
            ctx.arc(end.x, end.y, 4 + age * 18, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(241,145,4,${(1 - age) * alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      };
      runs(express, Math.max(bavariaLayer, germanyLayer * 0.6));
      runs(long, germanyLayer);

      // Places and labels
      const label = (name: string, p: Pt, alpha: number, weight = 500) => {
        if (alpha <= 0.02) return;
        const q = S(p);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = INK;
        ctx.beginPath();
        ctx.arc(q.x, q.y, 3 * unit, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = `${weight} ${Math.round(12.5 * unit)}px ${sans}`;
        ctx.fillStyle = "#55555e";
        const tw = ctx.measureText(name).width;
        const right = q.x + 7 * unit + tw < w - 8;
        ctx.fillText(name, right ? q.x + 7 * unit : q.x - 7 * unit - tw, q.y - 6 * unit);
        ctx.globalAlpha = 1;
      };
      for (const town of towns) {
        if (town.kind === "depot") continue;
        const p = places.get(town.name)!;
        if (town.kind === "city") label(town.name, p, Math.max(local, majors * 0.8) * (1 - germanyLayer));
        else if (local > 0) {
          const q = S(p);
          ctx.fillStyle = `rgba(138,138,146,${local})`;
          ctx.beginPath();
          ctx.arc(q.x, q.y, 2 * unit, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      for (const c of bavaria) label(c.name, places.get(c.name)!, bavariaLayer + germanyLayer * (c.name === "München" ? 1 : 0));
      for (const c of germanyCities) label(c.name, places.get(c.name)!, germanyLayer);

      // Vans on their tours (close-up only)
      if (local > 0) {
        ctx.globalAlpha = local;
        const speed = (36 * unit) / cams.franken.s;
        for (const [i, tour] of tourList.entries()) {
          const { path, stops, offset } = tour;
          const s = (t * speed * (1 + (i % 3) * 0.18) + offset * path.length) % path.length;
          ctx.beginPath();
          line(path.pts);
          ctx.strokeStyle = "rgba(241,145,4,0.16)";
          ctx.lineWidth = 1.4 * unit;
          ctx.setLineDash([2 * unit, 5 * unit]);
          ctx.stroke();
          ctx.setLineDash([]);

          const trail = (90 * unit) / cams.franken.s;
          for (let k = 0; k < 12; k++) {
            const a = s - trail + (trail / 12) * k;
            if (a + trail / 12 <= 0) continue;
            const p0 = S(path.at(Math.max(0, a)));
            const p1 = S(path.at(a + trail / 12));
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.strokeStyle = `rgba(241,145,4,${((k + 1) / 12) * 0.85})`;
            ctx.lineWidth = 2.4 * unit;
            ctx.stroke();
          }

          for (const stop of stops) {
            const age = (s - stop) / (speed * 1.6);
            if (age < 0 || age > 1) continue;
            const p = S(path.at(stop));
            ctx.beginPath();
            ctx.arc(p.x, p.y, (4 + age * 22) * unit, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(241,145,4,${(1 - age) * 0.9})`;
            ctx.lineWidth = 1.6 * unit;
            ctx.stroke();
          }

          const v = path.at(s);
          const vp = S(v);
          drawVan(ctx, vp.x, vp.y, v.a, unit * 1.05);
        }
        ctx.globalAlpha = 1;
      }

      // Depots: the round Arion mark, breathing, labelled up close.
      for (const town of towns) {
        if (town.kind !== "depot") continue;
        const p = S(places.get(town.name)!);
        const k = (t * 0.45 + (town.name === "Kitzingen" ? 0.5 : 0)) % 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (8 + k * 26) * unit, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(241,145,4,${(1 - k) * 0.5})`;
        ctx.lineWidth = 1.2 * unit;
        ctx.stroke();
        drawLogo(ctx, p.x, p.y, lerp(7.5, 10.5, majors) * unit * (1 + Math.sin(t * 1.6 + p.x) * 0.04));

        if (majors > 0.05) {
          ctx.globalAlpha = majors;
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
          ctx.globalAlpha = 1;
        }
      }
    };

    return {
      resize,
      draw,
      dispose: () => window.removeEventListener("pointermove", onMove),
    };
  });

  return <canvas ref={ref} role="img" aria-label={label} className="absolute inset-0 h-full w-full" />;
}
