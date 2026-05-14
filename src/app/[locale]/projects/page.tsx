import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projectSlugs, projects } from "@/content/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

function formatUah(n: number, locale: string) {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }).format(n);
}

export default async function ProjectsIndexPage() {
  const t = await getTranslations("pages.projects");
  const th = await getTranslations("home.projects");
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "uk";

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-balance text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-4 max-w-3xl text-pretty text-muted leading-relaxed">{t("lead")}</p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {projectSlugs.map((slug) => {
          const p = projects[slug];
          const pct = Math.min(100, Math.round((p.raisedUah / p.goalUah) * 100));
          return (
            <Card key={slug}>
              <CardHeader>
                <CardTitle>{p.title[lang]}</CardTitle>
                <p className="text-sm text-muted leading-relaxed">{p.short[lang]}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-3 text-sm text-muted">
                  <span>
                    {formatUah(p.raisedUah, locale)} / {formatUah(p.goalUah, locale)}
                  </span>
                  <span>{pct}%</span>
                </div>
                <Progress value={pct} />
                <Button variant="secondary" asChild>
                  <Link href={`/projects/${slug}`}>{th("open")}</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
