# Medienplan: Fahrzeuge weiß mit Arion-Logo

Ziel: Alle Fahrzeuge auf der Website sind weiße, aktuelle Mercedes-Benz Sprinter
mit dem Arion-Logo auf der Seite (siehe `public/images/fleet.webp` und
`public/images/express.webp`). Mitarbeiter-Look: neongelbe Warnweste mit
orangem Rand über dunkelblauem Polo.

## Referenzen bei Higgsfield

| Zweck | ID | Typ |
| --- | --- | --- |
| Arion-Logo (PNG, transparent) | `a9689a72-17af-42bd-845a-3b0f71d26a6b` | media_id |
| Flotte, 4 weiße Sprinter mit Logo | `4e310a20-253d-4861-adfb-56730e55844f` | job_id (Bild) |
| Einzelner weißer Sprinter, Landstraße | `7014e322-d013-4102-98d7-c17ca9f674fd` | job_id (Bild) |
| Recruiting-Paar (albanisch, Westen) | `e43fcf79-9b40-46bb-8c3f-709fc24b1ce2` | job_id (Bild) |

Bildmodell mit Logo-Treue: `gpt_image_2_5` (1 Credit, Standard-Qualität) mit
beiden Referenzen (Flotte + Logo) als `image_references`.
Videomodelle (Stand 09/2026): `kling3_0` std ohne Ton 5 s = 7,5 Credits,
`minimax_h3_max` 480p 5 s = 7,5 Credits, `seedance_2_5` 480p 5 s = 12,5 Credits.

## Noch offen (Guthaben nötig, ca. 60–80 Credits)

1. `public/videos/hero.mp4` (9:16, ~10 s Loop): weißer Sprinter mit Logo fährt
   durch fränkische Weinberge, goldene Stunde, nahtloser Loop.
2. `public/videos/region.mp4` (16:9, 3 Szenen): Landstraße, Luftaufnahme
   Weinberge, Dorf mit Kirche, jeweils weißer Sprinter mit Logo.
3. `public/videos/depot.mp4` (16:9, 2 Szenen): Beladung am Depot mit weißen
   Sprintern, dann Team vor weißem Sprinter.
4. Standbilder mit dunklen Fahrzeugen ersetzen: `region.webp` (Poster Hero +
   Region), `depot.webp` (Poster), `team.webp` (Jobs-Seite), `autobahn.webp`
   (Partner-Seite), `courier-f.webp` (Hintergrund-Van), `og.jpg`.

Poster-Bilder danach als Frame aus den neuen Videos exportieren
(`ffmpeg -ss 1 -i video.mp4 -frames:v 1 poster.png`) und per sharp zu WebP.
