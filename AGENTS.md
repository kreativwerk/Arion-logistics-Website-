<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Arion Logistics Website

- 7-sprachige Marketing-/Recruiting-Site (de Standard; en, sq, es, bg, ro, hu). Alle Texte in `lib/i18n/dictionaries/<locale>.ts` – bei Textänderungen IMMER alle 7 Dictionaries synchron halten (`Dict`-Interface in `lib/i18n/types.ts` erzwingt Struktur).
- Fakten zu Jobs/Standorten (Adressen, Lohn, Apply-URLs, datePosted/validThrough) zentral in `lib/site.ts`. Google-Jobs-JSON-LD wird in `lib/seo.ts` gebaut.
- Animationen laufen zentral über `components/AnimationProvider.tsx` per Daten-Attributen (`data-reveal`, `data-parallax`, `data-counter-value`, `data-hero-*`). Sektionen bleiben Server Components. AUSNAHME: Scroll-gesteuerte Stages und gepinnte ScrollTrigger MÜSSEN in einer eigenen Client-Komponente mit eigenem Cleanup leben (siehe `components/home/Process.tsx`, sticky statt pin), sonst crasht die Client-Navigation (removeChild-Fehler).
- Design: helles Apple-Style-System (Tokens in `app/globals.css`), ein Akzent: Marken-Orange #f19104 (exakt aus dem Logo; Text-Links: --accent-ink #b45309, große Zahlen: --accent-strong #d97706). MARKENVORGABE: Auf orangem Hintergrund IMMER weiße Schrift, niemals schwarz oder dunkel, eine bewusste dunkle Sektion (Digital). Vor UI-Arbeit die Skills unter `.claude/skills/` laden (design-taste-frontend, impeccable).
- `prefers-reduced-motion` muss bei jeder neuen Animation respektiert werden.
- KEINE Partner-Claims (weder Amazon noch UPS) in Texten – nur neutrale Formulierungen („eines der größten Zustellnetzwerke").
- Sektions-Rhythmus Startseite: weiß (Hero mit Live-Karte) → grau `bg-surface2` (Stats) → weiß (About) → grau (Services) → schwarz (Digital) → weiß (Process, scroll-gesteuert) → grau (Region, Höhenlinien) → ORANGE `bg-accent` mit weißer Schrift (PartnerTeaser) → weiß (Jobs) → schwarz `bg-ink` (Footer). Beim Ergänzen von Sektionen diesen Wechsel beibehalten.
- Mobile-Navigation: kein Hamburger im Header. Oben rechts nur der runde Flaggen-Button (`LanguageSwitcher compact`), Navigation über `components/MobileDock.tsx` (schwebender Menü-Button + WhatsApp, Sheet slidet von unten).
- BILDVORGABE: KEINE Fotos oder Videos von Menschen und keine KI-generierten Fotos/Videos (wirken wie AI Slop). Visuals werden im Code gezeichnet: Canvas-Szenen auf `components/motion/stage.ts` (`useStage`: DPR, Loop über verstrichene Zeit, Pause außerhalb des Viewports, Standbild bei reduced motion bzw. `?still`, `drawVan` für den weißen Transporter mit Orange-Streifen). Karten nutzen echte Koordinaten aus `components/motion/franken.ts`. Grundlage ist der Skill motion-pages (github.com/jiangyurong609/motion-pages).
- Depots, Startpunkte und Marken-Momente in Grafiken tragen das runde Arion-Logo (`drawLogo` in `stage.ts`, Geometrie aus `public/icon.svg`). Die Hero-Karte zoomt in einer Schleife Franken/Mittelfranken → Bayern → Deutschland; Umrisse aus Natural Earth (gemeinfrei) in `components/motion/germany.ts` – keine GADM/DIVA-GIS-Daten (nicht kommerziell nutzbar).
- Seitenfarbe beim Scrollen: Abschnitte deklarieren `data-bg` (mehrere Farben + `data-bg-at` für die Scroll-Story), AnimationProvider blendet die Body-Farbe und schaltet die Schrift per `.on-dark`/`.on-light` um (auf Orange immer weiß). Neue Startseiten-Abschnitte brauchen `data-bg`.
- Zahlen und Fakten in Grafiken nur aus echten Daten (`lib/site.ts`, Dictionaries) – keine erfundenen Werte in Diagrammen beschriften.
