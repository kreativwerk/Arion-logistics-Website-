import { Package, UsersThree, Van, MapPin } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/lib/i18n/types";

const icons = [Package, UsersThree, Van, MapPin];

export default function Stats({ dict }: { dict: Dict }) {
  return (
    <section className="bg-surface2">
      <div className="mx-auto max-w-[1320px] px-6 py-14 md:px-12 md:py-20">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {dict.stats.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={item.label} data-reveal data-reveal-delay={String(i * 0.08)}>
                <span
                  aria-hidden="true"
                  className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/12 text-accent"
                >
                  <Icon size={24} weight="duotone" />
                </span>
                <dd className="text-4xl font-semibold tracking-tighter md:text-5xl">
                  {item.prefix}
                  <span
                    data-counter-value={String(item.value)}
                    data-counter-decimals={String(item.decimals ?? 0)}
                  >
                    {item.value.toLocaleString("de-DE", {
                      minimumFractionDigits: item.decimals ?? 0,
                      maximumFractionDigits: item.decimals ?? 0,
                    })}
                  </span>
                  {item.suffix}
                </dd>
                <dt className="mt-2 text-[14px] text-muted">{item.label}</dt>
              </div>
            );
          })}
        </dl>
        <p data-reveal className="mt-8 text-[12px] text-muted/80">
          {dict.stats.note}
        </p>
      </div>
    </section>
  );
}
