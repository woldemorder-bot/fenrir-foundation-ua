import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { projects, isProjectSlug, projectSlugs } from "@/content/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DonateFormShell } from "@/components/payments/donate-form-shell";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

function formatUah(n: number, locale: string) {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }).format(n);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  if (!isProjectSlug(slug)) return {};

  const lang = locale === "en" ? "en" : "uk";
  const title = projects[slug].title[lang];

  return { title, description: projects[slug].short[lang] };
}

export default async function ProjectPage({ params }: Props) {
  const { slug, locale } = await params;
  if (!isProjectSlug(slug)) notFound();

  const tp = await getTranslations("pages.project");
  const tc = await getTranslations("common");
  const lang = locale === "en" ? "en" : "uk";
  const p = projects[slug];
  const pct = Math.min(100, Math.round((p.raisedUah / p.goalUah) * 100));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/30">
        <div className="relative aspect-[21/9] bg-gradient-to-r from-primary/15 via-background to-accent/15">
          <Image
            src="/founder-placeholder.svg"
            alt=""
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {p.title[lang]}
            </h1>
            <p className="mt-3 max-w-2xl text-pretty text-sm text-muted md:text-base">
              {p.short[lang]}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:items-start">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">{tp("who")}</h2>
            <p className="text-muted leading-relaxed">
              {lang === "uk"
                ? "Тут буде опис цілей, ланцюга поставок і отримувачів (контент з CMS)."
                : "Goals, supply chain, and recipients will be managed in the CMS."}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">{tp("gallery")}</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl border border-border bg-card/30 text-center text-xs text-muted grid place-items-center"
                >
                  Photo {i + 1}
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">{tp("reports")}</h2>
            <div className="rounded-xl border border-border bg-background/30 p-4 text-sm text-muted">
              {tc("pdfPlaceholder")}
            </div>
            <Button variant="secondary" type="button">
              {tc("openPdf")}
            </Button>
          </section>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{tp("goal")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted">
                {tp("raised")}:{" "}
                <span className="font-medium text-foreground">{formatUah(p.raisedUah, locale)}</span>
              </div>
              <div className="text-sm text-muted">
                {tp("goal")}:{" "}
                <span className="font-medium text-foreground">{formatUah(p.goalUah, locale)}</span>
              </div>
              <Progress value={pct} />
              <div className="text-xs text-muted">{pct}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{tp("donate")}</CardTitle>
            </CardHeader>
            <CardContent>
              <DonateFormShell projectSlug={slug} showRecurring />
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
