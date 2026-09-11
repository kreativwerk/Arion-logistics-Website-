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
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
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

  const base =
    "inline-flex items-center justify-center rounded-full px-7 h-12 text-[15px] font-medium transition-colors duration-200 active:scale-[0.98] whitespace-nowrap";
  const styles =
    variant === "primary"
      ? "bg-accent font-semibold text-foreground hover:bg-[#e07f00]"
      : "bg-foreground/[0.06] text-foreground hover:bg-foreground/[0.12]";

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
