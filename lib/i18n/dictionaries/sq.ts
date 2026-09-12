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
        "Kapacitet i besueshëm shpërndarjeje për rrjete dhe dërgues: përvojë shumëvjeçare në pako, procese digjitale dhe ekipe të shkallëzueshme. Na kontakto tani.",
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
    eyebrow: "Pako · Korrier · Ekspres",
    title1: "Cilësi dhe fleksibilitet?",
    title2: "Ne dorëzojmë.",
    subtitle:
      "Shpërndarje pakosh dhe dërgesa ekspres në Bavari. Menaxhim digjital, pagë e drejtë, besueshmëri çdo ditë.",
    ctaJobs: "Bëhu shofer",
    ctaPartner: "Bëhu partner",
    trust: ["Apliko tani online", "Bëhu partner", "Pa detyrim dhe falas"],
    imageAlt:
      "Furgonë të bardhë Mercedes Sprinter të flotës Arion Logistics të rreshtuar para depos",
  },
  stats: {
    items: [
      { value: 6500, label: "pako të dorëzuara në ditë" },
      { value: 100, suffix: "+", label: "punonjës në ekip" },
      { value: 75, suffix: "+", label: "furgonë" },
      { value: 2, label: "qendra në Bavari" },
    ],
    note: "Shpërndarje pakosh, shërbim korrieri dhe ekspres në gjithë Bavarinë.",
  },
  about: {
    title: "Logjistikë nga Frankonia. E ndërtuar si kompani teknologjike.",
    body: [
      "Arion Logistics është një kompani logjistike nga Bavaria. Dorëzojmë çdo ditë rreth 6.500 pako në miljen e fundit, në kohë dhe të dokumentuara.",
      "mbi 100 punonjës nga shumë vende, mbi 75 furgonë dhe një ekip i yni për rekrutim dhe marketing: rritemi me forcat tona, plotësisht të drejtuar digjitalisht.",
    ],
  },
  process: {
    title: "Si punojmë.",
    items: [
      {
        title: "Planifikimi",
        text: "Çdo itinerar planifikohet digjitalisht dhe me minutë para se të ndizet motori i parë.",
      },
      {
        title: "Dorëzimi",
        text: "Itinerare fikse, status live dhe dorëzim i dokumentuar te dera.",
      },
      {
        title: "Raportimi",
        text: "Klientët shohin cilësinë dhe përpikërinë në kohë reale, jo në raportin mujor.",
      },
    ],
  },
  services: {
    eyebrow: "Shërbimet",
    title: "Shpërndarje dhe ekspres. Nga një dorë e vetme.",
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
    upTo: "deri në",
    netIncl: "neto në muaj, përfshirë shpenzimet ditore dhe bonuset",
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
        title: "Përvojë në pako",
        text: "Çdo ditë provojmë veten në një nga rrjetet më kërkuese të shpërndarjes në botë.",
      },
      {
        title: "Flotë e shkallëzueshme",
        text: "Mbi 75 furgonë dhe rekrutim i brendshëm në gjashtë vende: shkallëzojmë brenda javësh, jo muajsh.",
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
        distances: [
          "rreth 20 min nga Erlangen",
          "rreth 20 min nga Bamberg",
          "rreth 30 min nga Nurembergu",
        ],
        shifts: [
          "Rreth 80 % e turneve janë nga ora 10:30 deri 19:30 me 45 min pushim",
          "Rreth 20 % e turneve janë turne të ndara: 6:30 deri 13:00 dhe 18:00 deri 22:00",
          "Ndonjëherë ka edhe turne vetëm herët ose vetëm në mbrëmje",
        ],
      },
      kitzingen: {
        intro: "Rreth 20 minuta nga Würzburgu, 35 minuta nga Schweinfurti.",
        distances: [
          "rreth 20 min nga Würzburgu",
          "rreth 35 min nga Schweinfurti",
          "rreth 1 orë nga Nurembergu",
        ],
        shifts: [
          "Turnet fillojnë paradite",
          "Punon ose nga ora 11:00 deri 20:00 ose nga 12:00 deri 21:00",
          "Pa turne të ndara, pa turne të hershme",
        ],
      },
    },
    recruitNote:
      "Punësojmë edhe shoferë nga Spanja, Bullgaria, Rumania dhe Hungaria dhe të ndihmojmë të nisesh në Gjermani.",
  },
  jobDetail: {
    title: "Korrier / Shofer shpërndarjeje (m/f/d)",
    grossPerHour: "bruto në orë",
    workplaceLabel: "Vendi i punës",
    intro: "Kërkojmë korrierë dhe shoferë shpërndarjeje të besueshëm për ekipin tonë.",
    requirementsTitle: "Kushtet",
    requirements: [
      "Pasaportë e BE-së ose letërnjoftim i BE-së",
      "Patentë shoferi e BE-së",
    ],
    payTitle: "Pagesa",
    payLead: "16,20 € bruto në orë",
    payBullets: [
      "Mesatarisht rreth 173 orë pune në muaj",
      "Me 173 orë kjo bën 2.802,60 € bruto",
      "Në klasën tatimore 1 në Gjermani kjo bën rreth 1.950 € neto",
    ],
    payNote: "Numri real i orëve mund të ndryshojë. Në disa muaj ka më shumë orë, në të tjerë më pak.",
    dailyTitle: "Shtesë ditore",
    dailyIntro: "Me performancë të paktën mesatare merr shtesë:",
    dailyBullets: [
      "14 € neto për çdo ditë pune",
      "Me një numër mesatar orësh kjo bën rreth 295 € neto shtesë në muaj",
    ],
    dailyNote: "Kështu, me performancë të paktën mesatare dhe pa aksident, mund të arrish rreth 2.250 € neto në muaj në klasën tatimore 1 në Gjermani. Performanca vlerësohet çdo javë me një sistem me 5 kategori. Nëse je në një nga dy kategoritë më të ulëta, për atë javë nuk paguhet shtesa ditore.",
    dailyGuarantee: "Paga jote e dakorduar me kontratë paguhet gjithmonë.",
    topTitle: "Bonus për performancë të lartë",
    topText: [
      "Për performancë shumë të mirë ka bonuse shtesë.",
      "Në kategorinë „Fantastic Plus“ (kategoria 1) firma merr një bonus. Nëse edhe ti je në kategorinë më të lartë, merr shtesë 50 € bonus në javë.",
    ],
    referralTitle: "Bonus rekomandimi",
    referralText: [
      "Nëse rekomandon dikë për një punë tek ne dhe personi fillon dhe punon te ne të paktën 1 muaj, merr një bonus shtesë prej 100 €.",
      "Bonusi paguhet për çdo person të rekomanduar që fillon dhe qëndron të paktën një muaj.",
    ],
    trainingTitle: "Trajnim i paguar",
    trainingIntro: "Merr një trajnim fillestar plotësisht të paguar:",
    trainingBullets: [
      "Dita 1: trajnim teorik",
      "Dita 2 dhe 3: trajnim praktik me një shofer me përvojë",
    ],
    trainingNote: "Kështu futesh në punë hap pas hapi dhe e njeh punën direkt në praktikë.",
    shiftsTitle: "Turnet",
    hoursTitle: "Orari i punës",
    hoursText: [
      "Fillimin dhe mbarimin e orarit të punës e regjistron vetë.",
      "Koha e punës regjistrohet me saktësi minute. Koha jote reale e punës dokumentohet saktësisht.",
    ],
    contractTitle: "Pushimet dhe kontrata",
    contractBullets: [
      "20 ditë pushim të paguar në vit",
      "Kontrata është fillimisht për 1 vit",
      "6 muaj periudhë prove",
    ],
    housingTitle: "Strehimi",
    housingIntro: [
      "Nëse ke nevojë për strehim, ai mund të organizohet përmes një partneri të jashtëm.",
      "Strehimi është organizativisht i pavarur nga puna.",
    ],
    housingCondTitle: "Kushtet",
    housingBullets: [
      "470 € në muaj",
      "Energjia elektrike e përfshirë",
      "Maksimumi 2 persona për dhomë",
      "200 € depozitë e njëhershme",
      "Depozita kthehet me dorëzimin e rregullt të banesës",
      "Vetëm 1 muaj afat njoftimi për banesën",
    ],
    housingNote: [
      "Që fillimi të jetë më i lehtë financiarisht, në dy muajt e parë mund të japim me kënaqësi një paradhënie page. Kështu nuk duhet t’i paguash shpenzimet paraprakisht.",
      "Qiranë e transferon vetë me transfertë online te qiradhënësi i jashtëm.",
    ],
    commuteTitle: "Rruga për në punë",
    commuteIntro: [
      "Ideale është të kesh makinën tënde.",
      "Nëse në fillim nuk ke makinë, ka disa mundësi:",
    ],
    commuteBullets: [
      "Kolegët mund të të marrin me vete. Si i ndani shpenzimet mes jush, e vendosni vetë.",
      "Si ndihmë fillestare mund të vëmë në dispozicion një furgon vetëm për rrugën në punë dhe kthim.",
      "Kostoja është 100 € për person në muaj.",
    ],
    benefitsTitle: "Përfitimet e tua me një shikim",
    benefits: [
      "16,20 € bruto në orë",
      "rreth 2.802,60 € bruto me 173 orë",
      "rreth 1.950 € neto pagë bazë në klasën tatimore 1 në Gjermani",
      "rreth 295 € shtesë ditore me performancë të paktën mesatare",
      "rreth 2.250 € neto me performancë të paktën mesatare dhe pa aksident",
      "50 € bonus javor për performancë të lartë dhe kategorinë përkatëse të firmës",
      "100 € bonus për çdo person të rekomanduar që punon te ne të paktën 1 muaj",
      "Trajnim i paguar dhe praktikë fillestare",
      "Regjistrim i orarit me saktësi minute",
      "20 ditë pushim në vit",
      "Strehim i mundshëm për 470 € në muaj përfshirë energjinë elektrike",
      "Maksimumi 2 persona për dhomë",
      "Vetëm 1 muaj afat njoftimi për banesën",
      "200 € depozitë, që kthehet me dorëzimin e rregullt",
      "Paradhënie page në dy muajt e parë",
      "Mbështetje në organizimin e rrugës për në punë",
    ],
    questionsTitle: "Pyetje?",
    questionsText: "Na shkruaj direkt në WhatsApp. Përgjigjemi shpejt.",
    whatsappCta: "WhatsApp: shkruaj tani",
    apply: "Apliko tani",
  },
  partnerPage: {
    title: "Kapacitet shpërndarjeje për rrjetin tuaj.",
    lead: "Arion Logistics sot drejton për një nga rrjetet më të mëdha të shpërndarjes në botë. Të njëjtën cilësi jua ofrojmë edhe juve.",
    body: [
      "Kalojmë çdo ditë standarde të rrepta cilësie dhe sigurie: scorecard-et, auditimet dhe regjistrimet me minutë janë pjesë e rutinës sonë.",
      "Ekipet tona punojnë plotësisht në mënyrë digjitale. Planifikimi i itinerareve, onboarding-u, regjistrimi i orarit dhe raportimi funksionojnë me CoDriver, platformën që e ndërtuam vetë.",
      "Ju nevojitet kapacitet shtesë në miljen e fundit, itinerare fikse ose dërgesa ekspres direkte në Bavari? Atëherë flisni me ne.",
    ],
    offeringsTitle: "Çfarë mund të porositni",
    offerings: [
      { title: "Kapacitet për miljen e fundit", text: "Automjete dhe shoferë shtesë për rrjetin tuaj, edhe afatshkurtër dhe sezonal." },
      { title: "Itinerare fikse", text: "Rrugë të përsëritura me ekip fiks, cilësi fikse dhe çmim fiks." },
      { title: "Ekspres dhe direkt", text: "Dërgesa urgjente si udhëtim direkt nëpër Bavari, sipas dëshirës edhe në të njëjtën ditë." },
    ],
    stepsTitle: "Si fillojmë",
    steps: [
      { title: "Bisedë", text: "Sqarojmë volumin, zonën dhe kërkesat në një bisedë të parë të shkurtër." },
      { title: "Faza pilot", text: "Punojmë një periudhë prove të përcaktuar, me raportim të plotë." },
      { title: "Shkallëzim", text: "Nëse piloti funksionon, shtojmë automjete, itinerare dhe zona hap pas hapi." },
    ],
    cta: "Cakto një bisedë",
  },
  contact: {
    title: "Le të flasim.",
    lead: "Shpërndarje, partneritet ose punë: përgjigjemi shpejt dhe pa burokraci.",
    emailLabel: "Email",
    phoneLabel: "Telefon",
    whatsappCta: "Kontakt në WhatsApp",
    addressLabel: "Adresa",
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
      "Arion Logistics GmbH",
      "Industriestraße 12a, 91325 Adelsdorf, Gjermani",
      "Tel: +49 911 13065352 · Email: info@arion-logistics.de",
      "E përfaqësuar nga drejtuesit. Gjykata e regjistrit, numri i regjistrit tregtar dhe numri i TVSH-së do të shtohen.",
      "Versioni ligjërisht i detyrueshëm i këtij shënimi është ai gjermanisht.",
    ],
    privacyTitle: "Politika e privatësisë",
    privacyBody: [
      "Përgjegjës sipas GDPR: Arion Logistics GmbH, Industriestraße 12a, 91325 Adelsdorf, Gjermani, tel +49 911 13065352, email info@arion-logistics.de.",
      "Faqja mbahet te Vercel Inc. (SHBA); gjatë vizitës përpunohen në log-et e serverit vetëm të dhëna teknikisht të nevojshme (adresa IP, data dhe ora, faqja e kërkuar, lloji i shfletuesit) për ta ofruar faqen në mënyrë të sigurt. Nuk vendosen cookie dhe nuk përdoren shërbime analize apo gjurmimi.",
      "Nëse na kontaktoni me email, telefon ose WhatsApp, i përpunojmë të dhënat tuaja vetëm për trajtimin e kërkesës dhe i fshijmë kur nuk nevojiten më. Keni të drejtë për qasje, korrigjim, fshirje, kufizim, bartje dhe kundërshtim, si dhe për ankesë pranë një autoriteti mbikëqyrës.",
      "Versioni ligjërisht i detyrueshëm i kësaj politike është ai gjermanisht (/de/datenschutz). Përditësuar: shtator 2026.",
    ],
  },
  notFound: {
    title: "Faqja nuk u gjet.",
    text: "Faqja e kërkuar nuk ekziston ose është zhvendosur.",
    cta: "Kthehu në fillim",
  },
};

export default sq;
