import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/types";
import { site } from "@/lib/site";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1320px] px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="text-[17px] font-semibold tracking-tight">Arion Logistics</p>
            <p className="mt-3 max-w-[36ch] text-[14px] leading-relaxed text-muted">
              {dict.footer.tagline}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block text-[14px] text-accent hover:underline"
            >
              {site.email}
            </a>
          </div>
          <nav aria-label={dict.footer.company}>
            <p className="text-[13px] font-medium uppercase tracking-wide text-muted">
              {dict.footer.company}
            </p>
            <ul className="mt-4 space-y-3 text-[14px]">
              <li>
                <Link href={`/${locale}/jobs`} className="hover:text-accent">
                  {dict.nav.jobs}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/partner`} className="hover:text-accent">
                  {dict.nav.partner}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/kontakt`} className="hover:text-accent">
                  {dict.nav.contact}
                </Link>
              </li>
              <li>
                <a
                  href={site.appUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="hover:text-accent"
                >
                  {site.appName}
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label={dict.footer.legal}>
            <p className="text-[13px] font-medium uppercase tracking-wide text-muted">
              {dict.footer.legal}
            </p>
            <ul className="mt-4 space-y-3 text-[14px]">
              <li>
                <Link href={`/${locale}/impressum`} className="hover:text-accent">
                  {dict.footer.imprint}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/datenschutz`} className="hover:text-accent">
                  {dict.footer.privacy}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-14 border-t border-line pt-6 text-[13px] text-muted">
          © {year} {site.name}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
