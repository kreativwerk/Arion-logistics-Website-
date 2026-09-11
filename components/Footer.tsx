import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/types";
import { site } from "@/lib/site";

/** The black closing block. */
export default function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const year = new Date().getFullYear();
  const link = "text-white/70 transition-colors hover:text-white";
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1320px] px-6 py-14 md:px-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="text-[17px] font-semibold tracking-tight">Arion Logistics GmbH</p>
            <p className="mt-3 max-w-[36ch] text-[14px] leading-relaxed text-white/60">
              {dict.footer.tagline}
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-white/60">
              {site.street}
              <br />
              {site.zip} {site.city}
            </p>
            <div className="mt-4 flex flex-col items-start gap-2 text-[14px]">
              <a href={`mailto:${site.email}`} className="text-accent hover:underline">
                {site.email}
              </a>
              <a href={site.phoneHref} className="text-accent hover:underline">
                {site.phone}
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <nav aria-label={dict.footer.company}>
            <p className="text-[13px] font-medium uppercase tracking-wide text-white/50">
              {dict.footer.company}
            </p>
            <ul className="mt-4 space-y-3 text-[14px]">
              <li>
                <Link href={`/${locale}/jobs`} className={link}>
                  {dict.nav.jobs}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/partner`} className={link}>
                  {dict.nav.partner}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/kontakt`} className={link}>
                  {dict.nav.contact}
                </Link>
              </li>
              <li>
                <a href={site.appUrl} rel="noopener noreferrer" target="_blank" className={link}>
                  {site.appName}
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label={dict.footer.legal}>
            <p className="text-[13px] font-medium uppercase tracking-wide text-white/50">
              {dict.footer.legal}
            </p>
            <ul className="mt-4 space-y-3 text-[14px]">
              <li>
                <Link href={`/${locale}/impressum`} className={link}>
                  {dict.footer.imprint}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/datenschutz`} className={link}>
                  {dict.footer.privacy}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-14 border-t border-white/10 pt-6 text-[13px] text-white/50">
          © {year} {site.legalName}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
