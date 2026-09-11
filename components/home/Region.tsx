import type { Dict } from "@/lib/i18n/types";
import AmbientVideo from "@/components/AmbientVideo";

export default function Region({ dict }: { dict: Dict }) {
  return (
    <section className="relative overflow-hidden">
      <div data-parallax="6" className="will-change-transform">
        <AmbientVideo
          src="/videos/region.mp4"
          poster="/images/region.webp"
          alt={dict.region.imageAlt}
          width={1800}
          height={1200}
          className="h-[70vh] w-full scale-[1.12] object-cover md:h-[85vh]"
        />
      </div>
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/45 via-black/5 to-transparent">
        <div className="mx-auto w-full max-w-[1320px] px-6 pb-14 md:px-12 md:pb-20">
          <blockquote data-reveal className="max-w-[24ch] text-3xl font-semibold leading-[1.1] tracking-tighter text-white md:text-5xl">
            {dict.region.quote}
          </blockquote>
          <p data-reveal className="mt-4 text-[14px] text-white/75 md:text-[15px]">
            {dict.region.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
