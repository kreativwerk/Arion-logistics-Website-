# Arion Logistics Website

Moderne, Apple-inspirierte Website für Arion Logistics: Paketzustellung, Kurier & Express und Kurier & Express in Bayern. Gebaut für zwei Ziele: **Fahrer-Recruiting über Google Jobs** und **Gewinnung von Auftraggebern/Netzwerken**.

## Stack

- **Next.js 16** (App Router, TypeScript, React Server Components)
- **Tailwind CSS v4**
- **GSAP + ScrollTrigger** (Scroll-Animationen, gepinnte Horizontal-Sektion, Parallax, Counter) + **Lenis** Smooth Scrolling
- Mouse-Animationen: Magnetic Buttons via `gsap.quickTo`
- Alle Animationen respektieren `prefers-reduced-motion`
- Bilder: KI-generiert mit Higgsfield (Nano Banana Pro), Markenfarbe Orange #f19100, als WebP optimiert in `public/images/`

## Sprachen (i18n)

7 Sprachen über `app/[locale]/…` mit Routing per `proxy.ts` (Accept-Language-Detection):

`de` (Standard) · `en` · `sq` Albanisch · `es` Spanisch · `bg` Bulgarisch · `ro` Rumänisch · `hu` Ungarisch

Alle Texte liegen in `lib/i18n/dictionaries/<locale>.ts`. Neue Sprache = eine neue Datei + Eintrag in `lib/i18n/config.ts`.

## SEO / Google Jobs

- **JobPosting-Schema** (JSON-LD) je Standort auf `/jobs` und `/jobs/[slug]` – alle Google-Pflichtfelder valide (Gehalt 16,20 €/h, Ort, datePosted, validThrough, directApply)
- Organization-, WebSite- und BreadcrumbList-Schema
- hreflang-Alternates für alle 7 Sprachen + x-default, Canonicals, Open Graph, `sitemap.xml`, `robots.txt`, Web-Manifest
- **Wartung:** `datePosted`/`validThrough` in `lib/site.ts` regelmäßig aktualisieren (Google verlangt gültige Fristen). Straße/PLZ der Standorte dort ergänzen, sobald freigegeben.

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build (statisch vorgerendert)
```

## Deployment auf Vercel

1. Repo bei [vercel.com/new](https://vercel.com/new) importieren – Next.js wird automatisch erkannt, keine Konfiguration nötig.
2. Domain `arion-logistics.de` unter *Project → Settings → Domains* verbinden.
3. Nach dem ersten Deploy: Sitemap in der [Google Search Console](https://search.google.com/search-console) einreichen (`https://arion-logistics.de/sitemap.xml`) und Job-URLs per URL-Prüfung indexieren lassen.

## Offene Punkte vor Launch

- [ ] Impressum vervollständigen (Anschrift, Vertretungsberechtigte, Register-/USt-ID) in allen Dictionaries unter `legal`
- [ ] Datenschutzerklärung vollständig ergänzen
- [ ] Straße + PLZ der Standorte in `lib/site.ts` für noch besseres Google-Jobs-Ranking

## Claude-Skills

Unter `.claude/skills/` liegen die im Projekt genutzten Skills (grill-me/grilling, design-taste-frontend, impeccable, seo-audit, ai-seo) für zukünftige Sessions.
