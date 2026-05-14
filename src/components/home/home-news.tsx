import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { newsArticles, newsTitles } from "@/content/news";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export async function HomeNews() {
  const t = await getTranslations("home.news");
  const ta = await getTranslations("article");
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "uk";

  return (
    <section className="border-b border-border bg-card/10">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">{t("title")}</h2>
            <p className="mt-3 text-muted">{t("subtitle")}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <Button variant="secondary" asChild>
              <Link href="/news">{t("all")}</Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {newsArticles.slice(0, 3).map((a, idx) => (
            <Reveal key={a.slug} delay={0.05 * idx}>
              <Card className="h-full overflow-hidden">
                <div className={`h-28 bg-gradient-to-br ${a.coverTone}`} />
                <CardHeader>
                  <div className="text-xs text-muted">{a.date}</div>
                  <CardTitle className="text-base leading-snug">
                    {newsTitles[a.slug][lang]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="ghost" className="px-0" asChild>
                    <Link href={`/news/${a.slug}`}>{ta("read")} →</Link>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
