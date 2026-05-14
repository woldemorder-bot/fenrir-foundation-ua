import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { projectSlugs } from "@/content/site";
import { newsArticles } from "@/content/news";

const base = "https://fenrir.foundation";

const staticPaths = [
  "/",
  "/about",
  "/about/team",
  "/about/founder",
  "/projects",
  "/news",
  "/reports",
  "/partners",
  "/donate",
  "/get-help",
  "/contacts",
  "/privacy",
  "/offer",
] as const;

function localize(locale: string, path: string) {
  if (locale === routing.defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      const locPath = localize(locale, path);
      entries.push({
        url: `${base}${locPath}`,
        changeFrequency: "weekly",
        priority: path === "/" ? 1 : 0.7,
      });
    }

    for (const slug of projectSlugs) {
      entries.push({
        url: `${base}${localize(locale, `/projects/${slug}`)}`,
        changeFrequency: "weekly",
        priority: 0.65,
      });
    }

    for (const article of newsArticles) {
      entries.push({
        url: `${base}${localize(locale, `/news/${article.slug}`)}`,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }

    for (const month of ["03", "04", "05"] as const) {
      entries.push({
        url: `${base}${localize(locale, `/reports/2026/${month}`)}`,
        changeFrequency: "monthly",
        priority: 0.55,
      });
    }
  }

  return entries;
}
