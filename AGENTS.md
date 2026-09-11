<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Arion Logistics Website

- 7-sprachige Marketing-/Recruiting-Site (de Standard; en, sq, es, bg, ro, hu). Alle Texte in `lib/i18n/dictionaries/<locale>.ts` – bei Textänderungen IMMER alle 7 Dictionaries synchron halten (`Dict`-Interface in `lib/i18n/types.ts` erzwingt Struktur).
- Fakten zu Jobs/Standorten (Adressen, Lohn, Apply-URLs, datePosted/validThrough) zentral in `lib/site.ts`. Google-Jobs-JSON-LD wird in `lib/seo.ts` gebaut.
- Animationen laufen zentral über `components/AnimationProvider.tsx` per Daten-Attributen (`data-reveal`, `data-parallax`, `data-counter-value`, `data-hero-*`, `data-hpan`). Sektionen bleiben Server Components.
- Design: helles Apple-Style-System (Tokens in `app/globals.css`), ein Akzent: Marken-Orange #f19100 (Text-Links: --accent-ink #b45309, große Zahlen: --accent-strong #d97706 – WCAG!), eine bewusste dunkle Sektion (Digital). Vor UI-Arbeit die Skills unter `.claude/skills/` laden (design-taste-frontend, impeccable).
- `prefers-reduced-motion` muss bei jeder neuen Animation respektiert werden.
