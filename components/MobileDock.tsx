"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { site } from "@/lib/site";

/**
 * Mobile-only floating dock: a blurred menu pill centered at the bottom
 * plus a WhatsApp button next to it. The menu sheet slides up from the
 * bottom edge.
 */
export default function MobileDock({
  locale,
  nav,
  ctaLabel,
}: {
  locale: Locale;
  nav: { services: string; jobs: string; partner: string; contact: string; menuOpen: string; menuClose: string };
  ctaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: `/${locale}#services`, label: nav.services },
    { href: `/${locale}/jobs`, label: nav.jobs },
    { href: `/${locale}/partner`, label: nav.partner },
    { href: `/${locale}/kontakt`, label: nav.contact },
  ];

  return (
    <div className="md:hidden">
      {/* Menu sheet */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] flex flex-col justify-end bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`rounded-t-[2rem] bg-background/95 px-6 pb-28 pt-6 shadow-[0_-20px_60px_rgba(12,12,15,0.25)] backdrop-blur-xl transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <span aria-hidden="true" className="mx-auto mb-5 block h-1.5 w-12 rounded-full bg-foreground/15" />
          <nav className="flex flex-col" aria-label="Mobile">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                className={`border-b border-line py-4 text-[24px] font-semibold tracking-tight transition-all duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
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
        </div>
      </div>

      {/* Dock */}
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[70] flex items-center justify-center px-6">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? nav.menuClose : nav.menuOpen}
          className="pointer-events-auto flex h-13 items-center gap-2.5 rounded-full border border-white/40 bg-white/60 pl-5 pr-6 text-[15px] font-semibold text-foreground shadow-[0_10px_30px_rgba(12,12,15,0.18)] backdrop-blur-xl transition-transform active:scale-[0.97]"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-[2px] w-full rounded-full bg-foreground transition-transform duration-300 ${open ? "top-1/2 rotate-45" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-foreground transition-transform duration-300 ${open ? "bottom-auto top-1/2 -rotate-45" : ""}`}
            />
          </span>
          {open ? nav.menuClose.split(" ")[0] : "Menü"}
        </button>
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="pointer-events-auto absolute right-6 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-transform active:scale-[0.95]"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.8 6.8 0 0 1-3.4-3c-.3-.4 0-.6.2-.8l.4-.5c.1-.2.2-.3.3-.5v-.5L9.8 7.4c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2.1-.4 3.6a12 12 0 0 0 4.6 4.4c1.7.8 2.4.9 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.6-.5Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
