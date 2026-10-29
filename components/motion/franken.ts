/**
 * The delivery region, from real coordinates (WGS84). Drawn as a schematic
 * map: towns, the main roads between them, and the two Arion depots.
 */

export type Town = { name: string; lat: number; lon: number; kind: "city" | "depot" | "town" };

export const towns: Town[] = [
  { name: "Bamberg", lat: 49.8988, lon: 10.9028, kind: "city" },
  { name: "Würzburg", lat: 49.7913, lon: 9.9534, kind: "city" },
  { name: "Nürnberg", lat: 49.4521, lon: 11.0767, kind: "city" },
  { name: "Erlangen", lat: 49.5897, lon: 11.0078, kind: "city" },
  { name: "Schweinfurt", lat: 50.0492, lon: 10.2215, kind: "city" },
  { name: "Pommersfelden", lat: 49.7667, lon: 10.8167, kind: "depot" },
  { name: "Kitzingen", lat: 49.7363, lon: 10.1593, kind: "depot" },
  { name: "Adelsdorf", lat: 49.7083, lon: 10.8944, kind: "town" },
  { name: "Forchheim", lat: 49.7197, lon: 11.0581, kind: "town" },
  { name: "Höchstadt", lat: 49.7059, lon: 10.8115, kind: "town" },
  { name: "Neustadt", lat: 49.5797, lon: 10.6113, kind: "town" },
  { name: "Scheinfeld", lat: 49.6693, lon: 10.4636, kind: "town" },
  { name: "Gerolzhofen", lat: 49.9006, lon: 10.3488, kind: "town" },
  { name: "Ebrach", lat: 49.8513, lon: 10.4908, kind: "town" },
  { name: "Burgebrach", lat: 49.8279, lon: 10.7466, kind: "town" },
  { name: "Herzogenaurach", lat: 49.5675, lon: 10.8854, kind: "town" },
  { name: "Fürth", lat: 49.4771, lon: 10.9887, kind: "town" },
  { name: "Ochsenfurt", lat: 49.663, lon: 10.0716, kind: "town" },
  { name: "Dettelbach", lat: 49.8018, lon: 10.161, kind: "town" },
  { name: "Volkach", lat: 49.8636, lon: 10.2266, kind: "town" },
  { name: "Haßfurt", lat: 50.0346, lon: 10.5126, kind: "town" },
  { name: "Hallstadt", lat: 49.9293, lon: 10.8784, kind: "town" },
  { name: "Iphofen", lat: 49.7034, lon: 10.2608, kind: "town" },
  { name: "Wiesentheid", lat: 49.7946, lon: 10.3427, kind: "town" },
  { name: "Schlüsselfeld", lat: 49.7562, lon: 10.6197, kind: "town" },
  { name: "Baiersdorf", lat: 49.6608, lon: 11.0333, kind: "town" },
];

/** Road network (schematic): A3, A7, A70, A73 and the main federal roads. */
export const roads: { from: string; to: string; major?: boolean }[] = [
  // A3 Würzburg - Nürnberg
  { from: "Würzburg", to: "Kitzingen", major: true },
  { from: "Kitzingen", to: "Iphofen", major: true },
  { from: "Iphofen", to: "Scheinfeld", major: true },
  { from: "Scheinfeld", to: "Neustadt", major: true },
  { from: "Neustadt", to: "Herzogenaurach", major: true },
  { from: "Herzogenaurach", to: "Fürth", major: true },
  { from: "Fürth", to: "Nürnberg", major: true },
  // A73 Bamberg - Nürnberg
  { from: "Hallstadt", to: "Bamberg", major: true },
  { from: "Bamberg", to: "Forchheim", major: true },
  { from: "Forchheim", to: "Baiersdorf", major: true },
  { from: "Baiersdorf", to: "Erlangen", major: true },
  { from: "Erlangen", to: "Fürth", major: true },
  // A70 Schweinfurt - Bamberg, A7
  { from: "Schweinfurt", to: "Haßfurt", major: true },
  { from: "Haßfurt", to: "Hallstadt", major: true },
  { from: "Schweinfurt", to: "Volkach" },
  { from: "Würzburg", to: "Ochsenfurt" },
  { from: "Würzburg", to: "Dettelbach" },
  // Federal and state roads
  { from: "Dettelbach", to: "Kitzingen" },
  { from: "Dettelbach", to: "Volkach" },
  { from: "Volkach", to: "Gerolzhofen" },
  { from: "Kitzingen", to: "Wiesentheid" },
  { from: "Wiesentheid", to: "Gerolzhofen" },
  { from: "Wiesentheid", to: "Ebrach" },
  { from: "Ochsenfurt", to: "Kitzingen" },
  { from: "Gerolzhofen", to: "Ebrach" },
  { from: "Ebrach", to: "Burgebrach" },
  { from: "Burgebrach", to: "Bamberg" },
  { from: "Burgebrach", to: "Pommersfelden" },
  { from: "Pommersfelden", to: "Höchstadt" },
  { from: "Pommersfelden", to: "Schlüsselfeld" },
  { from: "Schlüsselfeld", to: "Scheinfeld" },
  { from: "Schlüsselfeld", to: "Ebrach" },
  { from: "Höchstadt", to: "Adelsdorf" },
  { from: "Adelsdorf", to: "Forchheim" },
  { from: "Adelsdorf", to: "Baiersdorf" },
  { from: "Höchstadt", to: "Herzogenaurach" },
  { from: "Höchstadt", to: "Neustadt" },
  { from: "Herzogenaurach", to: "Erlangen" },
];

/** Rivers as town-anchored polylines: the Main and the Regnitz. */
export const rivers: [number, number][][] = [
  // Main: Ochsenfurt - Würzburg loop - Kitzingen - Volkach - Schweinfurt - Haßfurt - Bamberg
  [
    [49.663, 10.0716], [49.72, 9.98], [49.7913, 9.9534], [49.81, 10.02], [49.765, 10.12],
    [49.7363, 10.1593], [49.79, 10.17], [49.8636, 10.2266], [49.95, 10.2], [50.0492, 10.2215],
    [50.02, 10.37], [50.0346, 10.5126], [49.98, 10.66], [49.94, 10.82], [49.9293, 10.8784],
  ],
  // Regnitz: Bamberg - Forchheim - Erlangen - Fürth
  [
    [49.8988, 10.9028], [49.8, 10.98], [49.7197, 11.0581], [49.6608, 11.0333],
    [49.5897, 11.0078], [49.52, 10.99], [49.4771, 10.9887],
  ],
];

/** Example tours out of each depot (town sequences, back to the depot). */
export const tours: string[][] = [
  ["Pommersfelden", "Burgebrach", "Bamberg", "Hallstadt", "Bamberg", "Burgebrach"],
  ["Pommersfelden", "Höchstadt", "Adelsdorf", "Forchheim", "Baiersdorf", "Adelsdorf", "Höchstadt"],
  ["Pommersfelden", "Schlüsselfeld", "Scheinfeld", "Neustadt", "Höchstadt"],
  ["Kitzingen", "Dettelbach", "Volkach", "Gerolzhofen", "Wiesentheid"],
  ["Kitzingen", "Iphofen", "Scheinfeld", "Iphofen"],
  ["Kitzingen", "Ochsenfurt", "Würzburg", "Dettelbach"],
];

export const townByName = new Map(towns.map((t) => [t.name, t]));

/** Bounding box of the drawn area, slightly larger than the town spread. */
export const bounds = { lonMin: 9.85, lonMax: 11.2, latMin: 49.4, latMax: 50.1 };

/** Equirectangular projection fitted into a w x h box (contain x zoom), centred at (cx, cy). */
export function projector(w: number, h: number, pad: number, cx = 0.5, cy = 0.5, zoom = 1) {
  const k = Math.cos(((bounds.latMin + bounds.latMax) / 2) * (Math.PI / 180));
  const bw = (bounds.lonMax - bounds.lonMin) * k;
  const bh = bounds.latMax - bounds.latMin;
  const scale = Math.min((w - pad * 2) / bw, (h - pad * 2) / bh) * zoom;
  const ox = w * cx - (bw * scale) / 2;
  const oy = h * cy - (bh * scale) / 2;
  return (lat: number, lon: number) => ({
    x: ox + (lon - bounds.lonMin) * k * scale,
    y: oy + (bounds.latMax - lat) * scale,
  });
}
