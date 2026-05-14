import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { newsArticles, newsTitles } from "@/content/news";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function NewsIndexPage() {
  const t = await getTranslations("pages.news");
  const ta = await getTranslations("article");
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "uk";

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-balance text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-4 max-w-3xl text-pretty text-muted leading-relaxed">{t("lead")}</p>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {newsArticles.map((a) => (
          <Card key={a.slug} className="overflow-hidden">
            <div className={`h-28 bg-gradient-to-br ${a.coverTone}`} />
            <CardHeader>
              <div className="text-xs text-muted">{a.date}</div>
              <CardTitle className="text-base leading-snug">{newsTitles[a.slug][lang]}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="ghost" className="px-0" asChild>
                <Link href={`/news/${a.slug}`}>{ta("read")} →</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
