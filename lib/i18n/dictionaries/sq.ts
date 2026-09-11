import type { Dict } from "../types";

const sq: Dict = {
  meta: {
    home: {
      title: "Arion Logistics | Shpërndarje pakosh dhe shërbim korrier në Bavari",
      description:
        "Arion Logistics dorëzon pako në miljen e fundit, me menaxhim digjital dhe besueshmëri. Punë si shofer nga 16,20 €/orë në Pommersfelden dhe Kitzingen, Gjermani.",
    },
    jobs: {
      title: "Punë si shofer shpërndarjeje nga 16,20 €/orë në Gjermani | Arion Logistics",
      description:
        "Bëhu shofer shpërndarjeje te Arion Logistics: 16,20 €/orë plus bonus performance, trajnim i paguar, 20 ditë pushimi, mundësi strehimi. Apliko tani në Pommersfelden ose Kitzingen.",
    },
    jobDetail: {
      title: "Shofer shpërndarjeje pakosh në {city} | Arion Logistics",
      description:
        "Punë si shofer shpërndarjeje në {city}, Gjermani: 16,20 €/orë plus deri në 14 € bonus në ditë, trajnim i paguar, mundësi strehimi. Apliko online tani.",
    },
    partner: {
      title: "Bëhu partner | Arion Logistics",
      description:
        "Kapacitet i besueshëm shpërndarjeje për rrjete dhe dërgues: përvojë si Amazon DSP, procese digjitale dhe ekipe të shkallëzueshme. Na kontakto tani.",
    },
    contact: {
      title: "Kontakt | Arion Logistics",
      description:
        "Kontakto Arion Logistics: pyetje për shpërndarjen, partneritetet ose punën. Përgjigjemi shpejt.",
    },
    imprint: { title: "Shënim ligjor | Arion Logistics" },
    privacy: { title: "Privatësia | Arion Logistics" },
  },
  nav: {
    services: "Shërbimet",
    jobs: "Punë",
    partner: "Partnerë",
    contact: "Kontakt",
    menuOpen: "Hap menynë",
    menuClose: "Mbyll menynë",
    skipToContent: "Kalo te përmbajtja",
    languageLabel: "Gjuha",
  },
  hero: {
    eyebrow: "Amazon Delivery Service Partner",
    title1: "Logjistikë që",
    title2: "thjesht mbërrin.",
    subtitle:
      "Shpërndarje pakosh dhe dërgesa ekspres në Bavari. Menaxhim digjital, pagë e drejtë, besueshmëri çdo ditë.",
    ctaJobs: "Bëhu shofer",
    ctaPartner: "Bëhu partner",
    imageAlt:
      "Furgon modern shpërndarjeje i Arion Logistics në dritën e mëngjesit në një shesh të ndritshëm",
  },
  stats: {
    items: [
      { value: 16.2, decimals: 2, suffix: " €", label: "në orë që nga dita e parë" },
      { value: 2250, suffix: " €", label: "neto në muaj të mundshme" },
      { value: 20, label: "ditë pushimi të paguara në vit" },
      { value: 2, label: "qendra në Bavari" },
    ],
    note: "Shuma neto është shembull për klasën tatimore 1 në Gjermani, përfshirë bonusin e performancës.",
  },
  services: {
    eyebrow: "Shërbimet",
    title: "Dy gjëra. Të bëra mirë.",
    lead: "Përqendrohemi te ajo që dimë të bëjmë më mirë: t'ua çojmë pakot njerëzve në kohë.",
    kepTitle: "Shpërndarje pakosh",
    kepText:
      "Milja e fundit për një nga rrjetet më të mëdha të shpërndarjes në botë. Itinerare fikse, procese të qarta, gjithçka me minutë.",
    kepImageAlt: "Furgonë shpërndarjeje të ngarkuar me rregull para një depoje moderne logjistike",
    expressTitle: "Korrier dhe ekspres",
    expressText:
      "Udhëtime direkte dhe dërgesa urgjente në gjithë Bavarinë. Një telefonatë, një automjet, një zotim i qartë.",
    expressImageAlt: "Pako me etiketë dërgese në një prag të ndritshëm dere",
  },
  digital: {
    title: "Digjital deri te pakoja e fundit.",
    lead: "Pa letra. Itineraret, trajnimet dhe pagat tona funksionojnë plotësisht në mënyrë digjitale.",
    bullets: [
      {
        title: "Scorecard-e live",
        text: "Secili në ekip e sheh performancën e vet me transparencë, në nëntë gjuhë.",
      },
      {
        title: "Onboarding digjital",
        text: "Nga klikimi i parë te itinerari i parë brenda tri ditësh, plotësisht i paguar.",
      },
      {
        title: "Regjistrim i orarit me minutë",
        text: "Çdo minutë pune llogaritet dhe paguhet. Pa përjashtime.",
      },
    ],
    appNote:
      "Gjithçka funksionon me CoDriver, platformën që e ndërtuam vetë për ekipet e shpërndarjes dhe që sot e përdorin edhe kompani të tjera.",
    appCta: "Njihu me CoDriver",
    imageAlt: "Shoferi kontrollon planifikimin e itinerarit në një aplikacion brenda furgonit",
  },
  steps: {
    title: "Në itinerar brenda tri ditësh.",
    items: [
      {
        title: "Apliko",
        text: "Pesë minuta online ose me WhatsApp. Të duhet vetëm letërnjoftim i BE-së dhe patentë e BE-së.",
      },
      {
        title: "Trajnimi",
        text: "Një ditë teori, dy ditë praktikë me kolegë me përvojë. Plotësisht i paguar.",
      },
      {
        title: "Itinerari i parë",
        text: "Pagë fikse për orë që nga dita e parë, bonus nga performanca mesatare e lart.",
      },
    ],
  },
  jobsTeaser: {
    eyebrow: "Punë",
    title: "Drejto për Arion.",
    lead: "Pagë e drejtë, llogari e ndershme dhe një ekip që të mbështet nga dita e parë.",
    perHour: "bruto në orë",
    netHint: "plus deri në 14 € neto bonus për çdo ditë pune",
    cardCta: "Apliko tani",
    allCta: "Shiko të gjitha detajet",
  },
  region: {
    quote: "Në shtëpi mes Bambergut, Würzburgut dhe Nurembergut.",
    caption: "Itineraret tona nisen nga Pommersfelden dhe Kitzingen, në zemër të Frankonisë.",
    imageAlt: "Furgon shpërndarjeje në një rrugë fshati mes vreshtave të Frankonisë",
  },
  partner: {
    title: "Kapacitet ku mund të mbështetesh.",
    lead: "Rrjetet dhe dërguesit punojnë me ne sepse ne dorëzojmë: në kohë, të dokumentuar dhe të shkallëzueshëm.",
    points: [
      {
        title: "Përvojë DSP",
        text: "Çdo ditë provojmë veten në një nga rrjetet më kërkuese të shpërndarjes në botë.",
      },
      {
        title: "Flotë e shkallëzueshme",
        text: "Automjete dhe shoferë shtesë brenda javësh, jo muajsh. Rekrutojmë në gjashtë vende.",
      },
      {
        title: "Transparencë e plotë",
        text: "Procese digjitale dhe raportim në kohë reale në vend të tabelave në fund të muajit.",
      },
    ],
    cta: "Bëhu partner",
    imageAlt: "Rresht furgonësh shpërndarjeje duke u ngarkuar në depo",
  },
  jobsPage: {
    title: "Shofer shpërndarjeje pakosh",
    lead: "Dy qendra, një premtim: pagë e drejtë, regjistrim i ndershëm i orarit dhe nisje pa pengesa.",
    openPositions: "Vende të lira",
    payTitle: "Paga jote",
    pay: [
      "16,20 € bruto në orë, mesatarisht 173 orë në muaj",
      "Rreth 2.803 € bruto në muaj, afërsisht 1.950 € neto në klasën tatimore 1 në Gjermani",
      "14 € neto bonus për çdo ditë pune nga performanca mesatare e lart, mesatarisht 295 € në muaj",
      "50 € bonus javor për performancën më të lartë",
      "100 € shpërblim për çdo person të rekomanduar që qëndron të paktën një muaj",
      "Paradhënie e pagës e mundshme në dy muajt e parë",
    ],
    hoursTitle: "Orari yt i punës",
    requirementsTitle: "Çfarë të duhet",
    requirements: [
      "Pasaportë ose letërnjoftim i BE-së",
      "Patentë e vlefshme e BE-së, kategoria B",
    ],
    benefitsTitle: "Çfarë përfiton",
    benefits: [
      "Trajnim i paguar: një ditë teori, dy ditë praktikë",
      "20 ditë pushimi të paguara në vit",
      "Regjistrim orari transparent, me minutë",
      "Mundësi strehimi për 470 € në muaj me shpenzimet e përfshira",
      "Transport për në punë për 100 € në muaj nëse të nevojitet",
      "Ekip dhe onboarding në disa gjuhë",
    ],
    contractNote:
      "Fillimisht kontratë njëvjeçare me gjashtë muaj provë; synojmë të të mbajmë në ekip.",
    apply: "Apliko tani",
    details: "Shiko detajet",
    locations: {
      pommersfelden: {
        intro: "Rreth 20 minuta nga Erlangen dhe Bamberg, 30 minuta nga Nurembergu.",
        shifts: [
          "Rreth 80 % e itinerareve: 10:30 deri 19:30 me 45 minuta pushim",
          "Rreth 20 % turne të ndara: 6:30 deri 13:00 dhe 18:00 deri 22:00",
        ],
      },
      kitzingen: {
        intro: "Rreth 20 minuta nga Würzburgu, 35 minuta nga Schweinfurti.",
        shifts: [
          "Turne 11:00 deri 20:00 ose 12:00 deri 21:00",
          "Pa turne të ndara, pa turne të hershme",
        ],
      },
    },
    recruitNote:
      "Punësojmë edhe shoferë nga Spanja, Bullgaria, Rumania dhe Hungaria dhe të ndihmojmë të nisesh në Gjermani.",
  },
  partnerPage: {
    title: "Kapacitet shpërndarjeje për rrjetin tuaj.",
    lead: "Arion Logistics sot drejton për një nga rrjetet më të mëdha të shpërndarjes në botë. Të njëjtën cilësi jua ofrojmë edhe juve.",
    body: [
      "Si Amazon Delivery Service Partner kalojmë çdo ditë standarde të rrepta cilësie dhe sigurie: scorecard-et, auditimet dhe regjistrimet me minutë janë pjesë e rutinës sonë.",
      "Ekipet tona punojnë plotësisht në mënyrë digjitale. Planifikimi i itinerareve, onboarding-u, regjistrimi i orarit dhe raportimi funksionojnë me CoDriver, platformën që e ndërtuam vetë.",
      "Ju nevojitet kapacitet shtesë në miljen e fundit, itinerare fikse ose dërgesa ekspres direkte në Bavari? Atëherë flisni me ne.",
    ],
    cta: "Cakto një bisedë",
  },
  contact: {
    title: "Le të flasim.",
    lead: "Shpërndarje, partneritet ose punë: përgjigjemi shpejt dhe pa burokraci.",
    emailLabel: "Email",
    locationsLabel: "Qendrat",
    jobsHint: "Dëshiron të aplikosh si shofer?",
    jobsHintCta: "Direkt te punët",
  },
  footer: {
    tagline: "Shpërndarje pakosh dhe ekspres nga Frankonia. Digjitale, e drejtë, e besueshme.",
    company: "Kompania",
    legal: "Ligjore",
    imprint: "Shënim ligjor",
    privacy: "Privatësia",
    rights: "Të gjitha të drejtat e rezervuara.",
  },
  legal: {
    imprintTitle: "Shënim ligjor",
    imprintBody: [
      "Arion Logistics",
      "Adresa: do të shtohet.",
      "Email: info@arion-logistics.de",
      "Informacion sipas § 5 DDG (Gjermani). Përfaqësuesi i autorizuar, numri i regjistrit dhe numri i TVSH-së do të shtohen para publikimit.",
    ],
    privacyTitle: "Politika e privatësisë",
    privacyBody: [
      "Kjo faqe interneti përpunon të dhëna personale vetëm kur është teknikisht e nevojshme. Nuk vendosen cookie gjurmimi.",
      "Nëse na kontaktoni me email, të dhënat tuaja ruhen për trajtimin e kërkesës. Politika e plotë e privatësisë do të shtohet para publikimit.",
    ],
  },
  notFound: {
    title: "Faqja nuk u gjet.",
    text: "Faqja e kërkuar nuk ekziston ose është zhvendosur.",
    cta: "Kthehu në fillim",
  },
};

export default sq;
