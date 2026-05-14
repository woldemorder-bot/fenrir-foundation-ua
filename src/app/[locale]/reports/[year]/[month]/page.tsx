import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ locale: string; year: string; month: string }> };

const months = ["03", "04", "05"] as const;

function isValidReportParams(year: string, month: string) {
  return year === "2026" && (months as readonly string[]).includes(month);
}

export function generateStaticParams() {
  return months.map((month) => ({ year: "2026", month }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, month } = await params;
  if (!isValidReportParams(year, month)) return { title: "Report" };

  const t = await getTranslations("pages.reportMonth");
  return { title: `${t("title")} · ${month}.${year}` };
}

export default async function ReportMonthPage({ params }: Props) {
  const { year, month } = await params;
  if (!isValidReportParams(year, month)) notFound();

  const t = await getTranslations("pages.reportMonth");
  const tc = await getTranslations("common");
  const locale = await getLocale();

  const mvpNote =
    locale === "en"
      ? "MVP: PDF viewer/download, invoice photos, and thank-you gallery will ship per the spec."
      : "MVP: тут буде PDF viewer / завантаження, фото накладних та блок подяк (за ТЗ).";

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-balance text-4xl font-semibold tracking-tight">
        {t("title")}: {month}.{year}
      </h1>
      <p className="mt-4 text-muted leading-relaxed">{tc("pdfPlaceholder")}</p>
      <div className="mt-8 rounded-xl border border-border bg-card/30 p-6 text-sm text-muted">
        {mvpNote}
      </div>
      <Button className="mt-6" variant="secondary" type="button">
        {tc("openPdf")}
      </Button>
    </div>
  );
}
