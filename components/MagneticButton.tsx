"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";

/**
 * Apple-style magnetic CTA: the button leans toward the cursor and snaps
 * back with a spring. Pointer physics run through gsap.quickTo, never
 * through React state.
 */
export default function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
  icon = false,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "inverse";
  className?: string;
  /** Trailing arrow (up-right) inside a round contrasting badge. */
  icon?: boolean;
  /** Open in a new tab (external application forms). */
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const quick = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);

  const getQuick = useCallback(() => {
    if (!quick.current && ref.current) {
      quick.current = {
        x: gsap.quickTo(ref.current, "x", { duration: 0.4, ease: "power3.out" }),
        y: gsap.quickTo(ref.current, "y", { duration: 0.4, ease: "power3.out" }),
      };
    }
    return quick.current;
  }, []);

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse" || !ref.current) return;
      const q = getQuick();
      if (!q) return;
      const rect = ref.current.getBoundingClientRect();
      q.x((e.clientX - rect.left - rect.width / 2) * 0.3);
      q.y((e.clientY - rect.top - rect.height / 2) * 0.4);
    },
    [getQuick],
  );

  const onLeave = useCallback(() => {
    const q = getQuick();
    if (!q) return;
    q.x(0);
    q.y(0);
  }, [getQuick]);

  const base = `group inline-flex items-center justify-center gap-3 rounded-full h-12 text-[15px] font-medium transition-colors duration-200 active:scale-[0.98] whitespace-nowrap ${
    icon ? "pl-6 pr-1.5" : "px-7"
  }`;
  const styles =
    variant === "primary"
      ? "bg-accent font-semibold text-white hover:bg-[#e07f00]"
      : variant === "inverse"
        ? "bg-white font-semibold text-foreground hover:bg-white/90"
        : "bg-foreground/[0.06] text-foreground hover:bg-foreground/[0.12]";
  const badge =
    variant === "primary"
      ? "bg-white text-accent"
      : variant === "inverse"
        ? "bg-accent text-white"
        : "bg-foreground text-white";

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`${base} ${styles} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {icon && (
        <span
          aria-hidden="true"
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${badge}`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </Link>
  );
}
