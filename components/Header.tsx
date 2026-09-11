"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { locales, localeNames } from "@/lib/i18n/config";

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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open
          ? "bg-background/85 backdrop-blur-xl shadow-[0_1px_0_0_var(--line)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 md:h-[72px] md:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight"
          aria-label="Arion Logistics"
        >
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <rect width="26" height="26" rx="7" fill="var(--accent)" />
            <path
              d="M7.2 18.5 13 7.5l5.8 11h-2.9l-1.2-2.4h-3.4l-1.2 2.4H7.2Zm5.1-4.6h1.4L13 12.5l-.7 1.4Z"
              fill="#fff"
            />
          </svg>
          Arion Logistics
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
          <div className="relative hidden md:block">
            <label className="sr-only" htmlFor="lang-select">
              {nav.languageLabel}
            </label>
            <select
              id="lang-select"
              value={locale}
              onChange={(e) => {
                window.location.href = `/${e.target.value}${pathWithout}`;
              }}
              className="h-9 cursor-pointer appearance-none rounded-full border border-line bg-surface pl-3.5 pr-8 text-[13px] text-foreground outline-none transition-colors hover:border-foreground/30"
            >
              {locales.map((l) => (
                <option key={l} value={l}>
                  {localeNames[l]}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              aria-hidden="true"
            >
              <path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          <Link
            href={`/${locale}/jobs`}
            className="hidden h-9 items-center rounded-full bg-accent px-4.5 text-[13px] font-medium text-white transition-colors hover:bg-accent-ink md:inline-flex"
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
        className={`md:hidden ${open ? "block" : "hidden"} h-[calc(100dvh-4rem)] overflow-y-auto bg-background px-5 pb-10 pt-4`}
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
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-[15px] font-medium text-white"
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
                className={`rounded-full border px-3.5 py-1.5 text-[13px] ${
                  l === locale
                    ? "border-foreground bg-foreground text-background"
                    : "border-line text-muted"
                }`}
              >
                {localeNames[l]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
