<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Arion Logistics Website

- 7-sprachige Marketing-/Recruiting-Site (de Standard; en, sq, es, bg, ro, hu). Alle Texte in `lib/i18n/dictionaries/<locale>.ts` – bei Textänderungen IMMER alle 7 Dictionaries synchron halten (`Dict`-Interface in `lib/i18n/types.ts` erzwingt Struktur).
- Fakten zu Jobs/Standorten (Adressen, Lohn, Apply-URLs, datePosted/validThrough) zentral in `lib/site.ts`. Google-Jobs-JSON-LD wird in `lib/seo.ts` gebaut.
- Animationen laufen zentral über `components/AnimationProvider.tsx` per Daten-Attributen (`data-reveal`, `data-parallax`, `data-counter-value`, `data-hero-*`). Sektionen bleiben Server Components. AUSNAHME: Gepinnte ScrollTrigger (pin: true) MÜSSEN in einer eigenen Client-Komponente mit eigenem Cleanup leben (siehe `components/home/Steps.tsx`), sonst crasht die Client-Navigation (removeChild-Fehler).
- Design: helles Apple-Style-System (Tokens in `app/globals.css`), ein Akzent: Marken-Orange #f19104 (exakt aus dem Logo; Text-Links: --accent-ink #b45309, große Zahlen: --accent-strong #d97706). MARKENVORGABE: Auf orangem Hintergrund IMMER weiße Schrift, niemals schwarz oder dunkel, eine bewusste dunkle Sektion (Digital). Vor UI-Arbeit die Skills unter `.claude/skills/` laden (design-taste-frontend, impeccable).
- `prefers-reduced-motion` muss bei jeder neuen Animation respektiert werden.
- KEINE Partner-Claims (weder Amazon noch UPS) in Texten – nur neutrale Formulierungen („eines der größten Zustellnetzwerke").
- Sektions-Rhythmus Startseite: weiß (Hero) → grau `bg-surface2` (Stats) → weiß (About) → grau (Services) → schwarz (Digital) → weiß (Process) → Video (Region) → ORANGE `bg-accent` mit weißer Schrift (PartnerTeaser) → weiß (Jobs) → schwarz `bg-ink` (Footer). Beim Ergänzen von Sektionen diesen Wechsel beibehalten.
- Mobile-Navigation: kein Hamburger im Header. Oben rechts nur der runde Flaggen-Button (`LanguageSwitcher compact`), Navigation über `components/MobileDock.tsx` (schwebender Menü-Button + WhatsApp, Sheet slidet von unten).
- Videos in `public/videos/` sind Multi-Szenen-Loops (Higgsfield Cinema Studio Einzelclips, mit ffmpeg-static `xfade` geschnitten, ~1-2 MB). Einbindung nur über `components/AmbientVideo.tsx` (Poster-Fallback bei reduced motion).
- Mitarbeiter-Look in allen Bildern/Videos: neongelbe Warnweste mit ORANGENEM Rand über dunkelblauem Polo, Graphit-Van; Team international (u. a. albanische Zusteller:innen).
