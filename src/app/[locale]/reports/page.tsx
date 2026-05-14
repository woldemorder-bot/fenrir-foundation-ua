import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const months = [
  { month: "05", labelUk: "Травень", labelEn: "May" },
  { month: "04", labelUk: "Квітень", labelEn: "April" },
  { month: "03", labelUk: "Березень", labelEn: "March" },
] as const;

export default async function ReportsIndexPage() {
  const t = await getTranslations("pages.reports");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  const lang = locale === "en" ? "en" : "uk";

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-balance text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-4 max-w-3xl text-pretty text-muted leading-relaxed">{t("lead")}</p>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {months.map((m) => (
          <Card key={m.month}>
            <CardHeader>
              <CardTitle className="text-base">
                2026 · {lang === "uk" ? m.labelUk : m.labelEn}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted leading-relaxed">{tc("pdfPlaceholder")}</p>
              <Button variant="secondary" asChild>
                <Link href={`/reports/2026/${m.month}`}>{tc("openPdf")}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
