"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface HeaderProps {
  locale: Locale;
  nav: {
    services: string;
    jobs: string;
    partner: string;
    contact: string;
    menuOpen: string;
    menuClose: string;
    languageLabel: string;
  };
  ctaLabel: string;
}

/**
 * Desktop: solid header with nav, language dropdown and CTA.
 * Mobile: logo plus a round flag button only; navigation lives in the
 * floating MobileDock at the bottom of the screen.
 */
export default function Header({ locale, nav, ctaLabel }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pathWithout = pathname.replace(new RegExp(`^/${locale}`), "") || "";

  const links = [
    { href: `/${locale}#services`, label: nav.services },
    { href: `/${locale}/jobs`, label: nav.jobs },
    { href: `/${locale}/partner`, label: nav.partner },
    { href: `/${locale}/kontakt`, label: nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 md:bg-background/90 md:shadow-[0_1px_0_0_var(--line)] md:backdrop-blur-xl ${
        scrolled ? "bg-background/90 shadow-[0_1px_0_0_var(--line)] backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between px-6 md:h-24 md:px-12">
        <Link href={`/${locale}`} aria-label="Arion Logistics GmbH" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Arion Logistics GmbH" className="h-12 w-auto md:h-16" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher locale={locale} pathWithout={pathWithout} label={nav.languageLabel} />
          </div>
          <div className="md:hidden">
            <LanguageSwitcher
              locale={locale}
              pathWithout={pathWithout}
              label={nav.languageLabel}
              compact
            />
          </div>
          <Link
            href={`/${locale}/jobs`}
            className="hidden h-9 items-center rounded-full bg-accent px-4.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#e07f00] md:inline-flex"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
