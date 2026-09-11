import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { jobSlugs, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/jobs", "/partner", "/kontakt", ...jobSlugs.map((s) => `/jobs/${s}`)];
  const now = new Date();

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path.startsWith("/jobs") ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path.startsWith("/jobs") ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${site.url}/${l}${path}`]),
        ),
      },
    })),
  );
}
