import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function DonateCancelPage() {
  const t = await getTranslations("payments.cancel");

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-sm font-medium text-muted">{t("kicker")}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-4 text-muted leading-relaxed">{t("body")}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild>
          <Link href="/donate">{t("retry")}</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/">{t("home")}</Link>
        </Button>
      </div>
    </div>
  );
}
