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
  // Mittelfranken
  { name: "Ansbach", lat: 49.3007, lon: 10.5719, kind: "city" },
  { name: "Schwabach", lat: 49.3292, lon: 11.0215, kind: "town" },
  { name: "Roth", lat: 49.2459, lon: 11.0911, kind: "town" },
  { name: "Weißenburg", lat: 49.0306, lon: 10.9717, kind: "town" },
  { name: "Gunzenhausen", lat: 49.1146, lon: 10.7543, kind: "town" },
  { name: "Dinkelsbühl", lat: 49.0697, lon: 10.3196, kind: "town" },
  { name: "Feuchtwangen", lat: 49.1676, lon: 10.3281, kind: "town" },
  { name: "Rothenburg", lat: 49.3772, lon: 10.1867, kind: "town" },
  { name: "Bad Windsheim", lat: 49.5021, lon: 10.4135, kind: "town" },
  { name: "Heilsbronn", lat: 49.3383, lon: 10.7903, kind: "town" },
  { name: "Lauf", lat: 49.5103, lon: 11.2772, kind: "town" },
  { name: "Hersbruck", lat: 49.5081, lon: 11.4307, kind: "town" },
  { name: "Neumarkt", lat: 49.2803, lon: 11.4597, kind: "town" },
];

/** Bavaria beyond Franconia: express destinations. */
export const bavaria: { name: string; lat: number; lon: number }[] = [
  { name: "München", lat: 48.1374, lon: 11.5755 },
  { name: "Augsburg", lat: 48.3705, lon: 10.8978 },
  { name: "Regensburg", lat: 49.0134, lon: 12.1016 },
  { name: "Ingolstadt", lat: 48.7665, lon: 11.4258 },
  { name: "Passau", lat: 48.5667, lon: 13.4319 },
  { name: "Landshut", lat: 48.5372, lon: 12.1521 },
  { name: "Rosenheim", lat: 47.8561, lon: 12.1289 },
  { name: "Kempten", lat: 47.7267, lon: 10.3139 },
  { name: "Hof", lat: 50.3135, lon: 11.9128 },
  { name: "Bayreuth", lat: 49.9456, lon: 11.5713 },
  { name: "Aschaffenburg", lat: 49.9737, lon: 9.1491 },
  { name: "Weiden", lat: 49.6768, lon: 12.1561 },
];

/** Germany: long-distance destinations. */
export const germanyCities: { name: string; lat: number; lon: number }[] = [
  { name: "Berlin", lat: 52.52, lon: 13.405 },
  { name: "Hamburg", lat: 53.5511, lon: 9.9937 },
  { name: "Köln", lat: 50.9375, lon: 6.9603 },
  { name: "Frankfurt", lat: 50.1109, lon: 8.6821 },
  { name: "Stuttgart", lat: 48.7758, lon: 9.1829 },
  { name: "Leipzig", lat: 51.3397, lon: 12.3731 },
  { name: "Dresden", lat: 51.0504, lon: 13.7373 },
  { name: "Hannover", lat: 52.3759, lon: 9.732 },
  { name: "Bremen", lat: 53.0793, lon: 8.8017 },
  { name: "Dortmund", lat: 51.5136, lon: 7.4653 },
  { name: "Erfurt", lat: 50.9848, lon: 11.0299 },
  { name: "Rostock", lat: 54.0924, lon: 12.0991 },
  { name: "Mannheim", lat: 49.4875, lon: 8.466 },
  { name: "Kassel", lat: 51.3127, lon: 9.4797 },
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
  // Mittelfranken: A6, A7, A9 and the federal roads
  { from: "Ansbach", to: "Heilsbronn", major: true },
  { from: "Heilsbronn", to: "Schwabach", major: true },
  { from: "Schwabach", to: "Nürnberg", major: true },
  { from: "Nürnberg", to: "Neumarkt", major: true },
  { from: "Nürnberg", to: "Lauf", major: true },
  { from: "Lauf", to: "Hersbruck" },
  { from: "Ochsenfurt", to: "Rothenburg", major: true },
  { from: "Rothenburg", to: "Feuchtwangen", major: true },
  { from: "Feuchtwangen", to: "Dinkelsbühl", major: true },
  { from: "Feuchtwangen", to: "Ansbach" },
  { from: "Rothenburg", to: "Bad Windsheim" },
  { from: "Bad Windsheim", to: "Ansbach" },
  { from: "Bad Windsheim", to: "Neustadt" },
  { from: "Ansbach", to: "Gunzenhausen" },
  { from: "Gunzenhausen", to: "Weißenburg" },
  { from: "Weißenburg", to: "Roth" },
  { from: "Roth", to: "Schwabach" },
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
  ["Pommersfelden", "Höchstadt", "Herzogenaurach", "Fürth", "Nürnberg", "Fürth", "Erlangen", "Herzogenaurach", "Höchstadt"],
  ["Pommersfelden", "Höchstadt", "Neustadt", "Bad Windsheim", "Ansbach", "Heilsbronn", "Schwabach", "Roth", "Schwabach", "Nürnberg", "Fürth", "Herzogenaurach", "Höchstadt"],
  ["Kitzingen", "Ochsenfurt", "Rothenburg", "Bad Windsheim", "Neustadt", "Scheinfeld", "Iphofen"],
];

/** Express runs across Bavaria and long-distance runs across Germany. */
export const expressRuns: { from: string; to: string }[] = [
  { from: "Pommersfelden", to: "München" },
  { from: "Pommersfelden", to: "Regensburg" },
  { from: "Pommersfelden", to: "Passau" },
  { from: "Pommersfelden", to: "Hof" },
  { from: "Pommersfelden", to: "Ingolstadt" },
  { from: "Kitzingen", to: "Augsburg" },
  { from: "Kitzingen", to: "Kempten" },
  { from: "Kitzingen", to: "Aschaffenburg" },
  { from: "Pommersfelden", to: "Rosenheim" },
];
export const longRuns: { from: string; to: string }[] = [
  { from: "Pommersfelden", to: "Berlin" },
  { from: "Pommersfelden", to: "Hamburg" },
  { from: "Pommersfelden", to: "Leipzig" },
  { from: "Pommersfelden", to: "Dresden" },
  { from: "Pommersfelden", to: "Rostock" },
  { from: "Pommersfelden", to: "Hannover" },
  { from: "Kitzingen", to: "Köln" },
  { from: "Kitzingen", to: "Frankfurt" },
  { from: "Kitzingen", to: "Stuttgart" },
  { from: "Kitzingen", to: "Dortmund" },
  { from: "Kitzingen", to: "Bremen" },
  { from: "Pommersfelden", to: "Erfurt" },
];

/** Camera framings the hero map zooms between. */
export const views = {
  franken: { lonMin: 9.85, lonMax: 11.65, latMin: 48.95, latMax: 50.15 },
  bayern: { lonMin: 8.9, lonMax: 13.9, latMin: 47.2, latMax: 50.65 },
  deutschland: { lonMin: 5.7, lonMax: 15.1, latMin: 47.2, latMax: 55.1 },
};

export const townByName = new Map(towns.map((t) => [t.name, t]));
