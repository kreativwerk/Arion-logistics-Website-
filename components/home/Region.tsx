import type { Dict } from "@/lib/i18n/types";
import RegionContours from "@/components/home/RegionContours";

/** The region quote over a code-drawn topographic map of Franconia. */
export default function Region({ dict }: { dict: Dict }) {
  return (
    <section data-bg="#f0f0ee" className="relative h-[70vh] overflow-hidden bg-surface2 md:h-[85vh]">
      <RegionContours label={dict.region.caption} />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[var(--page-bg,#f0f0ee)] via-[color-mix(in_srgb,var(--page-bg,#f0f0ee)_70%,transparent)] to-transparent">
        <div className="mx-auto w-full max-w-[1320px] px-6 pb-14 md:px-12 md:pb-20">
          <blockquote data-reveal className="max-w-[24ch] text-3xl font-semibold leading-[1.1] tracking-tighter md:text-5xl">
            {dict.region.quote}
          </blockquote>
          <p data-reveal className="mt-4 text-[14px] text-muted md:text-[15px]">
            {dict.region.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
