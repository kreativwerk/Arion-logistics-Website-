"use client";

import { useEffect, useRef, useState } from "react";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

/** Round-flag language dropdown; navigation is a full reload so the
 *  locale-specific dictionaries and metadata are re-served. */
export default function LanguageSwitcher({
  locale,
  pathWithout,
  label,
}: {
  locale: Locale;
  pathWithout: string;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={label}
        className="flex h-9 cursor-pointer items-center gap-2 rounded-full border border-line bg-surface pl-2 pr-3 text-[13px] text-foreground transition-colors hover:border-foreground/30"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/flags/${locale}.svg`} alt="" className="h-5 w-5 rounded-full" />
        {localeNames[locale]}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-line bg-surface py-1.5 shadow-[0_12px_32px_rgba(19,19,22,0.12)]"
        >
          {locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <a
                href={`/${l}${pathWithout}`}
                className={`flex items-center gap-2.5 px-3.5 py-2 text-[13px] transition-colors hover:bg-background ${
                  l === locale ? "font-semibold" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/flags/${l}.svg`} alt="" className="h-5 w-5 rounded-full" />
                {localeNames[l]}
                {l === locale && (
                  <svg
                    className="ml-auto text-accent-ink"
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    aria-hidden="true"
                  >
                    <path d="m1 5 3.5 3.5L11 1" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
