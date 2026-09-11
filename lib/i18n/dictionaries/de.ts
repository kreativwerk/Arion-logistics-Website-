import type { Dict } from "../types";

const de: Dict = {
  meta: {
    home: {
      title: "Arion Logistics | Paketzustellung & Kurierdienst in Bayern",
      description:
        "Arion Logistics stellt Pakete auf der letzten Meile zu, digital gesteuert und zuverlässig. Fahrer-Jobs ab 16,20 €/h in Pommersfelden und Kitzingen.",
    },
    jobs: {
      title: "Fahrer-Jobs (m/w/d) ab 16,20 €/h | Arion Logistics",
      description:
        "Werde Paketzusteller bei Arion Logistics: 16,20 €/h plus Leistungsbonus, bezahlte Einarbeitung, 20 Urlaubstage, Unterkunft möglich. Jetzt in Pommersfelden oder Kitzingen bewerben.",
    },
    jobDetail: {
      title: "Paketzusteller (m/w/d) in {city} | Arion Logistics",
      description:
        "Paketzusteller-Job in {city}: 16,20 €/h plus bis zu 14 € Bonus pro Tag, bezahlte Einarbeitung, Unterkunft möglich. Jetzt direkt online bewerben.",
    },
    partner: {
      title: "Partner werden | Arion Logistics",
      description:
        "Zuverlässige Zustellkapazität für Netzwerke und Versender: langjährige KEP-Erfahrung, digitale Prozesse und skalierbare Teams. Jetzt Kontakt aufnehmen.",
    },
    contact: {
      title: "Kontakt | Arion Logistics",
      description:
        "Kontakt zu Arion Logistics: Fragen zu Zustellung, Partnerschaften oder Jobs. Wir antworten schnell.",
    },
    imprint: { title: "Impressum | Arion Logistics" },
    privacy: { title: "Datenschutz | Arion Logistics" },
  },
  nav: {
    services: "Leistungen",
    jobs: "Jobs",
    partner: "Partner",
    contact: "Kontakt",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    skipToContent: "Zum Inhalt springen",
    languageLabel: "Sprache",
  },
  hero: {
    eyebrow: "Paketzustellung · Kurier · Express",
    title1: "Qualität und Flexibilität?",
    title2: "Wir liefern.",
    subtitle:
      "Paketzustellung und Express in Bayern. Digital gesteuert, fair bezahlt, jeden Tag zuverlässig.",
    ctaJobs: "Fahrer werden",
    ctaPartner: "Partner werden",
    imageAlt:
      "Modernes Zustellfahrzeug von Arion Logistics im Morgenlicht auf einem hellen Betriebshof",
  },
  stats: {
    items: [
      { value: 6500, label: "zugestellte Pakete am Tag" },
      { value: 100, label: "Mitarbeitende im Team" },
      { value: 75, suffix: "+", label: "eigene Fahrzeuge" },
      { value: 2, label: "Standorte in Bayern" },
    ],
    note: "Paketzustellung, Kurier- und Expressdienst in ganz Bayern.",
  },
  about: {
    title: "Logistik aus Franken. Gebaut wie ein Tech-Unternehmen.",
    body: [
      "Arion Logistics ist ein Logistikunternehmen aus Bayern. Wir stellen jeden Tag rund 6.500 Pakete auf der letzten Meile zu, pünktlich und dokumentiert.",
      "100 Mitarbeitende aus vielen Ländern, über 75 Fahrzeuge und ein eigenes In-house-Team für Recruiting und Marketing: Wir wachsen aus eigener Kraft, komplett digital gesteuert.",
    ],
  },
  process: {
    title: "So arbeiten wir.",
    items: [
      {
        title: "Planung",
        text: "Jede Tour wird digital geplant und minutengenau getaktet, bevor der erste Motor startet.",
      },
      {
        title: "Zustellung",
        text: "Feste Routen, Live-Status und dokumentierte Übergabe an der Tür.",
      },
      {
        title: "Reporting",
        text: "Auftraggeber sehen Qualität und Pünktlichkeit in Echtzeit statt im Monatsbericht.",
      },
    ],
  },
  services: {
    eyebrow: "Leistungen",
    title: "Zwei Dinge. Richtig gut.",
    lead: "Wir konzentrieren uns auf das, was wir am besten können: Pakete pünktlich zu Menschen bringen.",
    kepTitle: "Paketzustellung",
    kepText:
      "Letzte Meile für eines der größten Zustellnetzwerke der Welt. Feste Touren, klare Prozesse, minutengenau getaktet.",
    kepImageAlt: "Ordentlich beladene Zustellfahrzeuge vor einem modernen Logistikdepot",
    expressTitle: "Kurier & Express",
    expressText:
      "Direktfahrten und zeitkritische Sendungen in ganz Bayern. Ein Anruf, ein Fahrzeug, eine klare Zusage.",
    expressImageAlt: "Einzelnes Paket mit Versandetikett auf einer hellen Türschwelle",
  },
  digital: {
    title: "Digital bis ins letzte Paket.",
    lead: "Keine Zettelwirtschaft. Unsere Touren, Schulungen und Abrechnungen laufen komplett digital.",
    bullets: [
      {
        title: "Live-Scorecards",
        text: "Jeder im Team sieht seine Leistung transparent, in neun Sprachen.",
      },
      {
        title: "Digitales Onboarding",
        text: "Vom ersten Klick bis zur ersten Tour in drei Tagen, komplett bezahlt.",
      },
      {
        title: "Minutengenaue Zeiterfassung",
        text: "Jede Arbeitsminute zählt und wird abgerechnet. Ohne Ausnahme.",
      },
    ],
    appNote:
      "Alles läuft auf CoDriver, der Plattform, die wir selbst für Zustellteams entwickelt haben und die heute auch andere Unternehmen nutzen.",
    appCta: "CoDriver kennenlernen",
    imageAlt: "Fahrer prüft die Tourenplanung in einer App im Fahrzeug",
  },
  steps: {
    title: "In drei Tagen auf Tour.",
    items: [
      {
        title: "Bewerben",
        text: "Fünf Minuten online oder per WhatsApp. Du brauchst nur EU-Ausweis und EU-Führerschein.",
      },
      {
        title: "Einarbeitung",
        text: "Ein Tag Theorie, zwei Tage Praxis mit erfahrenen Kollegen. Voll bezahlt.",
      },
      {
        title: "Erste Tour",
        text: "Fester Stundenlohn ab Tag eins, Bonus ab durchschnittlicher Leistung.",
      },
    ],
  },
  jobsTeaser: {
    eyebrow: "Jobs",
    title: "Fahre für Arion.",
    lead: "Fairer Lohn, ehrliche Abrechnung und ein Team, das dich vom ersten Tag an mitnimmt.",
    perHour: "pro Stunde brutto",
    netHint: "plus bis zu 14 € Bonus netto pro Arbeitstag",
    cardCta: "Jetzt bewerben",
    allCta: "Alle Job-Details ansehen",
  },
  region: {
    quote: "Zuhause zwischen Bamberg, Würzburg und Nürnberg.",
    caption:
      "Unsere Touren starten in Pommersfelden und Kitzingen, mitten in Franken.",
    imageAlt:
      "Zustellfahrzeug auf einer Landstraße zwischen fränkischen Weinbergen",
  },
  partner: {
    title: "Kapazität, auf die Verlass ist.",
    lead: "Netzwerke und Versender arbeiten mit uns, weil wir liefern: pünktlich, dokumentiert und skalierbar.",
    points: [
      {
        title: "KEP-Erfahrung",
        text: "Wir bestehen jeden Tag in einem der anspruchsvollsten Zustellnetzwerke der Welt.",
      },
      {
        title: "Skalierbare Flotte",
        text: "Über 75 Fahrzeuge und eigenes In-house-Recruiting in sechs Ländern: Wir skalieren in Wochen, nicht Monaten.",
      },
      {
        title: "Volle Transparenz",
        text: "Digitale Prozesse und Reporting in Echtzeit statt Excel am Monatsende.",
      },
    ],
    cta: "Partner werden",
    imageAlt: "Reihe von Zustellfahrzeugen bei der Beladung am Depot",
  },
  jobsPage: {
    title: "Paketzusteller (m/w/d)",
    lead: "Zwei Standorte, ein Versprechen: fairer Lohn, ehrliche Zeiterfassung und ein Start ohne Hürden.",
    openPositions: "Offene Stellen",
    payTitle: "Dein Verdienst",
    pay: [
      "16,20 € brutto pro Stunde, im Schnitt 173 Stunden pro Monat",
      "Rund 2.803 € brutto monatlich, etwa 1.950 € netto in Steuerklasse 1",
      "14 € Bonus netto pro Arbeitstag ab durchschnittlicher Leistung, im Schnitt 295 € pro Monat",
      "50 € Wochenbonus für Top-Leistung",
      "100 € Prämie für jede geworbene Person, die mindestens einen Monat bleibt",
      "Gehaltsvorschuss in den ersten zwei Monaten möglich",
    ],
    hoursTitle: "Deine Arbeitszeiten",
    requirementsTitle: "Das brauchst du",
    requirements: [
      "EU-Pass oder EU-Ausweis",
      "Gültiger EU-Führerschein Klasse B",
    ],
    benefitsTitle: "Das bekommst du",
    benefits: [
      "Bezahlte Einarbeitung: ein Tag Theorie, zwei Tage Praxis",
      "20 bezahlte Urlaubstage pro Jahr",
      "Minutengenaue, transparente Zeiterfassung",
      "Unterkunft für 470 € pro Monat inklusive Nebenkosten möglich",
      "Fahrdienst zur Arbeit für 100 € pro Monat, falls nötig",
      "Team und Onboarding in mehreren Sprachen",
    ],
    contractNote:
      "Zunächst auf ein Jahr befristet mit sechs Monaten Probezeit, Übernahme angestrebt.",
    apply: "Jetzt bewerben",
    details: "Details ansehen",
    locations: {
      pommersfelden: {
        intro: "Rund 20 Minuten von Erlangen und Bamberg, 30 Minuten von Nürnberg.",
        shifts: [
          "Etwa 80 % der Touren: 10:30 bis 19:30 Uhr mit 45 Minuten Pause",
          "Etwa 20 % Splitschichten: 6:30 bis 13:00 Uhr und 18:00 bis 22:00 Uhr",
        ],
      },
      kitzingen: {
        intro: "Rund 20 Minuten von Würzburg, 35 Minuten von Schweinfurt.",
        shifts: [
          "Schichten 11:00 bis 20:00 Uhr oder 12:00 bis 21:00 Uhr",
          "Keine Splitschichten, keine Frühschichten",
        ],
      },
    },
    recruitNote:
      "Wir stellen auch Fahrerinnen und Fahrer aus Spanien, Bulgarien, Rumänien und Ungarn ein und helfen beim Start in Deutschland.",
  },
  partnerPage: {
    title: "Zustellkapazität für Ihr Netzwerk.",
    lead: "Arion Logistics fährt heute für eines der größten Zustellnetzwerke der Welt. Diese Qualität bieten wir auch Ihnen.",
    body: [
      "Wir bestehen täglich strenge Qualitäts- und Sicherheitsstandards: Scorecards, Audits und minutengenaue Nachweise gehören bei uns zum Alltag.",
      "Unsere Teams arbeiten komplett digital. Tourenplanung, Onboarding, Zeiterfassung und Reporting laufen über CoDriver, die Plattform, die wir selbst entwickelt haben.",
      "Sie brauchen zusätzliche Kapazität auf der letzten Meile, feste Touren oder Express-Direktfahrten in Bayern? Dann sprechen Sie mit uns.",
    ],
    offeringsTitle: "Das können Sie buchen",
    offerings: [
      {
        title: "Letzte-Meile-Kapazität",
        text: "Zusätzliche Fahrzeuge und Fahrer für Ihr Zustellnetz, auch kurzfristig und saisonal.",
      },
      {
        title: "Feste Touren",
        text: "Wiederkehrende Routen mit festem Team, fester Qualität und festem Preis.",
      },
      {
        title: "Express & Direktfahrt",
        text: "Zeitkritische Sendungen als Direktfahrt durch Bayern, auf Wunsch noch am selben Tag.",
      },
    ],
    stepsTitle: "So starten wir",
    steps: [
      {
        title: "Gespräch",
        text: "Wir klären Volumen, Gebiet und Anforderungen in einem kurzen Erstgespräch.",
      },
      {
        title: "Pilotphase",
        text: "Wir fahren einen definierten Zeitraum zur Probe, mit vollem Reporting.",
      },
      {
        title: "Skalierung",
        text: "Läuft der Pilot, erweitern wir Fahrzeuge, Touren und Gebiete Schritt für Schritt.",
      },
    ],
    cta: "Gespräch vereinbaren",
  },
  contact: {
    title: "Sprechen wir.",
    lead: "Ob Zustellung, Partnerschaft oder Job: Wir antworten schnell und unkompliziert.",
    emailLabel: "E-Mail",
    phoneLabel: "Telefon",
    whatsappCta: "WhatsApp Kontakt",
    addressLabel: "Anschrift",
    locationsLabel: "Standorte",
    jobsHint: "Du willst dich als Fahrer bewerben?",
    jobsHintCta: "Direkt zu den Jobs",
  },
  footer: {
    tagline: "Paketzustellung und Express aus Franken. Digital, fair, zuverlässig.",
    company: "Unternehmen",
    legal: "Rechtliches",
    imprint: "Impressum",
    privacy: "Datenschutz",
    rights: "Alle Rechte vorbehalten.",
  },
  legal: {
    imprintTitle: "Impressum",
    imprintBody: [
      "Angaben gemäß § 5 DDG:",
      "Arion Logistics GmbH",
      "Industriestraße 12a, 91325 Adelsdorf, Deutschland",
      "Telefon: +49 911 13065352 · E-Mail: info@arion-logistics.de",
      "Vertreten durch die Geschäftsführung. Registergericht, Handelsregisternummer und Umsatzsteuer-Identifikationsnummer werden nachgetragen.",
      "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: Arion Logistics GmbH, Industriestraße 12a, 91325 Adelsdorf.",
      "Plattform der EU-Kommission zur Online-Streitbeilegung: https://ec.europa.eu/consumers/odr. Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    ],
    privacyTitle: "Datenschutzerklärung",
    privacyBody: [
      "Verantwortlicher im Sinne der DSGVO: Arion Logistics GmbH, Industriestraße 12a, 91325 Adelsdorf, Telefon +49 911 13065352, E-Mail info@arion-logistics.de.",
      "Hosting: Diese Website wird bei Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA) gehostet. Beim Aufruf werden technisch notwendige Daten (IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Browsertyp) in Server-Logfiles verarbeitet, um die Website sicher und stabil bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO). Mit Vercel besteht ein Auftragsverarbeitungsvertrag; eine Übermittlung in die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln.",
      "Cookies und Tracking: Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Dienste.",
      "Kontaktaufnahme: Wenn Sie uns per E-Mail, Telefon oder WhatsApp kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. b und f DSGVO) und löschen sie, sobald sie nicht mehr erforderlich sind. Bei WhatsApp werden Daten auch durch Meta Platforms Ireland Ltd. verarbeitet; es gilt ergänzend deren Datenschutzerklärung.",
      "Bewerbungen: Unsere Stellenanzeigen verlinken auf ein externes Bewerbungsformular unter dsp-codriver.de. Für die dortige Verarbeitung gilt die Datenschutzerklärung des Anbieters.",
      "Ihre Rechte: Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15 bis 21 DSGVO) sowie das Recht auf Beschwerde bei einer Aufsichtsbehörde, z. B. beim Bayerischen Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach.",
      "Stand: September 2026.",
    ],
  },
  notFound: {
    title: "Seite nicht gefunden.",
    text: "Die angeforderte Seite existiert nicht oder wurde verschoben.",
    cta: "Zur Startseite",
  },
};

export default de;
