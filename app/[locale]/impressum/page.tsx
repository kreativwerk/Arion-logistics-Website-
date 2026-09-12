import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: { absolute: dict.meta.imprint.title },
    robots: { index: false },
    alternates: alternatesFor(locale, "/impressum"),
  };
}

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="mx-auto max-w-[720px] px-6 pb-24 pt-28 md:px-12 md:pt-40">
      <h1 className="text-4xl font-semibold tracking-tighter md:text-5xl">
        {dict.legal.imprintTitle}
      </h1>
      {dict.legal.imprintBody.map((paragraph) =>
        paragraph.startsWith("## ") ? (
          <h2 key={paragraph} className="mt-10 text-xl font-semibold tracking-tight">
            {paragraph.slice(3)}
          </h2>
        ) : (
          <p key={paragraph.slice(0, 40)} className="mt-4 text-[15px] leading-relaxed text-foreground/85">
            {paragraph}
          </p>
        ),
      )}
    </div>
  );
}
