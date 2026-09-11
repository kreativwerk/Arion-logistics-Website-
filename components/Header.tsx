"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { locales, localeNames } from "@/lib/i18n/config";
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

export default function Header({ locale, nav, ctaLabel }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

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
        scrolled || open
          ? "bg-background/90 shadow-[0_1px_0_0_var(--line)] backdrop-blur-xl"
          : "bg-transparent"
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

          <Link
            href={`/${locale}/jobs`}
            className="hidden h-9 items-center rounded-full bg-accent px-4.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#e07f00] md:inline-flex"
          >
            {ctaLabel}
          </Link>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? nav.menuClose : nav.menuOpen}
            className="flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-full bg-foreground transition-transform duration-300 ${open ? "top-1/2 rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-foreground transition-transform duration-300 ${open ? "bottom-auto top-1/2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${open ? "block" : "hidden"} h-[calc(100dvh-5rem)] overflow-y-auto bg-background px-6 pb-10 pt-4`}
      >
        <nav className="flex flex-col" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 text-[22px] font-medium tracking-tight"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href={`/${locale}/jobs`}
          onClick={() => setOpen(false)}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-[15px] font-semibold text-white"
        >
          {ctaLabel}
        </Link>
        <div className="mt-8">
          <p className="mb-3 text-[13px] uppercase tracking-wide text-muted">{nav.languageLabel}</p>
          <div className="flex flex-wrap gap-2">
            {locales.map((l) => (
              <a
                key={l}
                href={`/${l}${pathWithout}`}
                className={`flex items-center gap-2 rounded-full border py-1.5 pl-2 pr-3.5 text-[13px] ${
                  l === locale
                    ? "border-foreground bg-foreground text-background"
                    : "border-line text-muted"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/flags/${l}.svg`} alt="" className="h-4.5 w-4.5 rounded-full" />
                {localeNames[l]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
