import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { newsArticles, newsTitles, type NewsSlug } from "@/content/news";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ locale: string; slug: string }> };

function isNewsSlug(value: string): value is NewsSlug {
  return (newsArticles as readonly { slug: string }[]).some((a) => a.slug === value);
}

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  if (!isNewsSlug(slug)) return {};

  const lang = locale === "en" ? "en" : "uk";
  const title = newsTitles[slug][lang];
  return { title, description: title };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug, locale } = await params;
  if (!isNewsSlug(slug)) notFound();

  const ta = await getTranslations("article");
  const lang = locale === "en" ? "en" : "uk";
  const title = newsTitles[slug][lang];

  const paragraphs =
    lang === "uk"
      ? [
          "Це MVP-сторінка новини: ISR + динамічні мета-теги будуть підключені разом із CMS (Sanity/Strapi).",
          "Тут з’явиться повний текст, галерея, цитати та посилання на зв’язані проєкти/звіти.",
        ]
      : [
          "This is an MVP article page: ISR + dynamic meta tags will ship with the CMS (Sanity/Strapi).",
          "Full body copy, gallery, quotes, and links to related projects/reports will live here.",
        ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <Button variant="ghost" className="-ml-3 mb-8 px-3" asChild>
        <Link href="/news">← {ta("back")}</Link>
      </Button>

      <header className="space-y-3">
        <p className="text-xs text-muted">
          {newsArticles.find((a) => a.slug === slug)?.date}
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight">{title}</h1>
      </header>

      <div className="prose prose-invert mt-10 max-w-none space-y-4 text-muted leading-relaxed">
        {paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </article>
  );
}
