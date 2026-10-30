# Medien

Die Website verwendet keine Fotos oder Videos von Menschen und keine
KI-generierten Fotos oder Videos mehr. Alle Visuals der Startseite sind
Canvas-Animationen im Code (`components/home/*`, Laufzeit in
`components/motion/stage.ts`):

| Abschnitt | Visual | Komponente |
| --- | --- | --- |
| Hero | Live-Karte: Touren in Franken/Mittelfranken, Zoom auf Express-Linien in Bayern und Fernlinien in Deutschland | `HeroMap.tsx` |
| Leistungen | Paketstapel im Lager / Direktfahrt A→B mit Zeitring | `ServiceArt.tsx` |
| Digital | Tourenoptimierung: Wirrwarr → geplante Route | `RouteOptimizer.tsx` |
| So arbeiten wir | Scroll-Story: Planung → Zustellung → Reporting | `Process.tsx` |
| Region | Höhenlinien-Landschaft mit Landstraße | `RegionContours.tsx` |

Verbleibende Rasterbilder: `public/images/autobahn.webp` (Partner-Seite,
nur Fahrzeug) und `public/images/og.jpg` (Social-Media-Vorschau, ein
Screenshot der Startseite ohne Personen).

Prüfen ohne Animation: `?still` an die URL hängen; die Scroll-Story lässt
sich mit `?p=0.5` auf einen Fortschritt festsetzen.
