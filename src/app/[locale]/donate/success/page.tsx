import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function DonateSuccessPage() {
  const t = await getTranslations("payments.success");

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-sm font-medium text-primary">{t("kicker")}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-4 text-muted leading-relaxed">{t("body")}</p>
      <Button className="mt-8" asChild>
        <Link href="/">{t("home")}</Link>
      </Button>
    </div>
  );
}
