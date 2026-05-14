import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projectSlugs, projects, type ProjectSlug } from "@/content/site";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

function formatUah(n: number, locale: string) {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }).format(n);
}

export async function HomeProjects() {
  const t = await getTranslations("home.projects");
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "uk";

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">{t("title")}</h2>
            <p className="mt-3 text-muted">{t("subtitle")}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projectSlugs.map((slug: ProjectSlug, idx) => {
            const p = projects[slug];
            const pct = Math.min(100, Math.round((p.raisedUah / p.goalUah) * 100));

            return (
              <Reveal key={slug} delay={0.04 * idx}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-base">{p.title[lang]}</CardTitle>
                    <p className="text-sm text-muted leading-relaxed">{p.short[lang]}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <div className="text-muted">
                        {t("raised")}:{" "}
                        <span className="font-medium text-foreground">
                          {formatUah(p.raisedUah, locale)}
                        </span>
                      </div>
                      <div className="text-muted">
                        {t("goal")}:{" "}
                        <span className="font-medium text-foreground">
                          {formatUah(p.goalUah, locale)}
                        </span>
                      </div>
                    </div>
                    <Progress value={pct} />
                    <div className="text-xs text-muted">{pct}%</div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="secondary" asChild className="w-full">
                      <Link href={`/projects/${slug}`}>{t("open")}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
