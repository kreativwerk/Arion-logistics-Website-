"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Muted, looping slow-motion b-roll. Falls back to the poster image when
 * the visitor prefers reduced motion or the video cannot play.
 */
export default function AmbientVideo({
  src,
  poster,
  alt,
  width,
  height,
  className = "",
  sizes = "100vw",
}: {
  src: string;
  poster: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
}) {
  const [showVideo, setShowVideo] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowVideo(true);
    }
  }, []);

  useEffect(() => {
    if (showVideo) ref.current?.play().catch(() => setShowVideo(false));
  }, [showVideo]);

  if (!showVideo) {
    return (
      <Image src={poster} alt={alt} width={width} height={height} sizes={sizes} className={className} />
    );
  }

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      poster={poster}
      width={width}
      height={height}
      aria-label={alt}
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
