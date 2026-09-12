import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Car,
  CalendarCheck,
  CheckCircle,
  Clock,
  FileText,
  GraduationCap,
  House,
  IdentificationCard,
  MapPin,
  Money,
  Timer,
  Trophy,
  UsersThree,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata, jobPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { applyUrlFor, jobFacts, jobSlugs, netMonthlyMax, site, type JobSlug } from "@/lib/site";
import MagneticButton from "@/components/MagneticButton";

export function generateStaticParams() {
  return locales.flatMap((locale) => jobSlugs.map((slug) => ({ locale, slug })));
}

function isJobSlug(value: string): value is JobSlug {
  return (jobSlugs as string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isJobSlug(slug)) return {};
  const dict = await getDictionary(locale);
  const city = jobFacts[slug].city;
  const title = dict.meta.jobDetail.title.replace("{city}", city);
  return {
    ...pageMetadata(
      locale,
      `/jobs/${slug}`,
      title,
      dict.meta.jobDetail.description.replace("{city}", city),
    ),
    title: { absolute: title },
  };
}

type IconType = typeof Money;

function Bullets({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 text-[15px] leading-relaxed text-foreground/85 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({
  icon: Icon,
  title,
  children,
  id,
}: {
  icon: IconType;
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} data-reveal className="scroll-mt-28 border-t border-line pt-10">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent"
        >
          <Icon size={22} weight="duotone" />
        </span>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      </div>
      <div className="mt-5 md:pl-13">{children}</div>
    </section>
  );
}

function Paragraphs({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <>
      {items.map((p) => (
        <p key={p} className={`text-[15px] leading-relaxed text-foreground/85 ${className}`}>
          {p}
        </p>
      ))}
    </>
  );
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isJobSlug(slug)) notFound();
  const dict = await getDictionary(locale as Locale);
  const facts = jobFacts[slug];
  const loc = dict.jobsPage.locations[slug];
  const job = dict.jobDetail;
  const applyUrl = applyUrlFor(slug, locale);
  const gross = facts.hourlyGross.toLocaleString(locale, { minimumFractionDigits: 2 });
  const net = netMonthlyMax.toLocaleString(locale);

  const jsonLd = [
    jobPostingJsonLd(slug, locale, dict),
    breadcrumbJsonLd([
      { name: "Arion Logistics", url: `${site.url}/${locale}` },
      { name: dict.nav.jobs, url: `${site.url}/${locale}/jobs` },
      { name: facts.city, url: `${site.url}/${locale}/jobs/${slug}` },
    ]),
  ];

  return (
    <div className="pt-28 md:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="mx-auto max-w-[1320px] px-6 md:px-12">
        <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
          <Link href={`/${locale}/jobs`} className="hover:text-accent-ink">
            {dict.nav.jobs}
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{facts.city}</span>
        </nav>
        <div className="mt-4 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <h1 className="max-w-[16ch] text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl">
              {job.title}
            </h1>
            <p data-hero-fade className="mt-4 inline-flex items-center gap-2 text-lg text-muted md:text-xl">
              <MapPin size={20} weight="duotone" className="text-accent" aria-hidden="true" />
              {facts.city}, {facts.region}
            </p>
            <p data-hero-fade className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-muted md:text-lg">
              {job.intro}
            </p>
          </div>

          {/* Pay card */}
          <div data-hero-fade className="rounded-3xl bg-ink p-7 text-white md:p-8">
            <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/60">
              {dict.jobsTeaser.upTo}
            </p>
            <p className="mt-1 text-5xl font-semibold tracking-tighter text-accent md:text-6xl">
              {net}&nbsp;€
            </p>
            <p className="mt-2 text-[14px] text-white/70">{dict.jobsTeaser.netIncl}</p>
            <p className="mt-4 border-t border-white/10 pt-4 text-[14px] text-white/70">
              <span className="font-semibold text-white">{gross} €</span> {job.grossPerHour}
            </p>
            <div className="mt-6">
              <MagneticButton href={applyUrl} icon external className="w-full">
                {job.apply}
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto mt-14 grid max-w-[1320px] gap-12 px-6 pb-20 md:mt-20 md:grid-cols-[1fr_320px] md:gap-16 md:px-12 md:pb-32">
        <div className="space-y-10">
          <Section icon={MapPin} title={job.workplaceLabel}>
            <p className="text-lg font-semibold tracking-tight">{facts.city}, {facts.region}</p>
            <Bullets items={loc.distances} className="mt-3" />
          </Section>

          <Section icon={IdentificationCard} title={job.requirementsTitle}>
            <Bullets items={job.requirements} />
            <p className="mt-4 text-[14px] leading-relaxed text-muted">{dict.jobsPage.recruitNote}</p>
          </Section>

          <Section icon={Money} title={job.payTitle}>
            <p className="text-lg font-semibold tracking-tight">{job.payLead}</p>
            <Bullets items={job.payBullets} className="mt-3" />
            <p className="mt-4 text-[14px] leading-relaxed text-muted">{job.payNote}</p>
          </Section>

          <Section icon={CalendarCheck} title={job.dailyTitle}>
            <p className="text-[15px] leading-relaxed text-foreground/85">{job.dailyIntro}</p>
            <Bullets items={job.dailyBullets} className="mt-3" />
            <p className="mt-4 text-[14px] leading-relaxed text-muted">{job.dailyNote}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-[14px] font-medium text-accent-ink">
              <CheckCircle size={18} weight="fill" aria-hidden="true" />
              {job.dailyGuarantee}
            </p>
          </Section>

          <div data-reveal className="grid gap-5 border-t border-line pt-10 md:grid-cols-2">
            <div className="rounded-3xl bg-surface2 p-6 md:p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/12 text-accent" aria-hidden="true">
                <Trophy size={22} weight="duotone" />
              </span>
              <h2 className="mt-4 text-xl font-semibold tracking-tight">{job.topTitle}</h2>
              <div className="mt-3 space-y-3">
                <Paragraphs items={job.topText} className="!text-[14px]" />
              </div>
            </div>
            <div className="rounded-3xl bg-surface2 p-6 md:p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/12 text-accent" aria-hidden="true">
                <UsersThree size={22} weight="duotone" />
              </span>
              <h2 className="mt-4 text-xl font-semibold tracking-tight">{job.referralTitle}</h2>
              <div className="mt-3 space-y-3">
                <Paragraphs items={job.referralText} className="!text-[14px]" />
              </div>
            </div>
          </div>

          <Section icon={GraduationCap} title={job.trainingTitle}>
            <p className="text-[15px] leading-relaxed text-foreground/85">{job.trainingIntro}</p>
            <Bullets items={job.trainingBullets} className="mt-3" />
            <p className="mt-4 text-[14px] leading-relaxed text-muted">{job.trainingNote}</p>
          </Section>

          <Section icon={Clock} title={job.shiftsTitle} id="schichten">
            <Bullets items={loc.shifts} />
          </Section>

          <Section icon={Timer} title={job.hoursTitle}>
            <div className="space-y-3">
              <Paragraphs items={job.hoursText} />
            </div>
          </Section>

          <Section icon={FileText} title={job.contractTitle}>
            <Bullets items={job.contractBullets} />
          </Section>

          <Section icon={House} title={job.housingTitle}>
            <div className="space-y-3">
              <Paragraphs items={job.housingIntro} />
            </div>
            <h3 className="mt-6 text-[13px] font-medium uppercase tracking-[0.14em] text-muted">
              {job.housingCondTitle}
            </h3>
            <Bullets items={job.housingBullets} className="mt-3" />
            <div className="mt-4 space-y-3">
              <Paragraphs items={job.housingNote} className="!text-[14px] !text-muted" />
            </div>
          </Section>

          <Section icon={Car} title={job.commuteTitle}>
            <div className="space-y-3">
              <Paragraphs items={job.commuteIntro} />
            </div>
            <Bullets items={job.commuteBullets} className="mt-3" />
          </Section>

          <Section icon={CheckCircle} title={job.benefitsTitle}>
            <ul className="grid gap-x-8 gap-y-3 text-[15px] leading-relaxed text-foreground/85 md:grid-cols-2">
              {job.benefits.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Questions + apply */}
          <div data-reveal className="rounded-3xl bg-accent p-7 text-white md:p-10">
            <h2 className="text-3xl font-semibold tracking-tighter md:text-4xl">{job.questionsTitle}</h2>
            <p className="mt-3 max-w-[44ch] text-[16px] leading-relaxed text-white/85">{job.questionsText}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2.5 rounded-full bg-[#25D366] pl-5 pr-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#1fb85a]"
              >
                <WhatsappLogo size={22} weight="fill" aria-hidden="true" />
                {job.whatsappCta}
              </a>
              <MagneticButton href={applyUrl} variant="inverse" icon external>
                {job.apply}
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Sticky summary (desktop) */}
        <aside className="hidden md:block">
          <div className="sticky top-32 rounded-3xl border border-line bg-surface p-6">
            <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
              {dict.jobsPage.openPositions}
            </p>
            <p className="mt-2 text-xl font-semibold tracking-tight">{facts.city}</p>
            <p className="mt-1 text-[14px] text-muted">{loc.intro}</p>
            <dl className="mt-5 space-y-3 border-t border-line pt-5 text-[14px]">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{job.payTitle}</dt>
                <dd className="font-medium">{gross} €/h</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{dict.jobsTeaser.upTo}</dt>
                <dd className="font-medium text-accent-ink">{net} €</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{job.contractTitle}</dt>
                <dd className="text-right font-medium">{job.contractBullets[0]}</dd>
              </div>
            </dl>
            <div className="mt-6">
              <MagneticButton href={applyUrl} icon external className="w-full">
                {job.apply}
              </MagneticButton>
            </div>
            <Link
              href={`/${locale}/kontakt`}
              className="mt-3 block text-center text-[14px] text-muted hover:text-accent-ink"
            >
              {dict.nav.contact}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
