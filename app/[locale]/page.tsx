import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import Digital from "@/components/home/Digital";
import Steps from "@/components/home/Steps";
import JobsTeaser from "@/components/home/JobsTeaser";
import Region from "@/components/home/Region";
import PartnerTeaser from "@/components/home/PartnerTeaser";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    ...pageMetadata(locale, "", dict.meta.home.title, dict.meta.home.description),
    title: { absolute: dict.meta.home.title },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Stats dict={dict} />
      <About dict={dict} />
      <Services dict={dict} />
      <Digital dict={dict} />
      <Steps dict={dict} />
      <Region dict={dict} />
      <PartnerTeaser locale={locale} dict={dict} />
      <JobsTeaser locale={locale} dict={dict} />
    </>
  );
}
