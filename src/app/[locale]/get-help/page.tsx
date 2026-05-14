import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function GetHelpPage() {
  const t = await getTranslations("pages.getHelp");
  const tc = await getTranslations("common");

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-balance text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-4 text-pretty text-muted leading-relaxed">{t("lead")}</p>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="text-base">{t("formTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="unit">{t("unit")}</Label>
            <Input id="unit" placeholder={t("unitPh")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">{t("contact")}</Label>
            <Input id="contact" placeholder={t("contactPh")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="need">{t("need")}</Label>
            <Input id="need" placeholder={t("needPh")} />
          </div>
          <Button className="w-full" type="button">
            {t("submit")}
          </Button>
          <p className="text-xs text-muted">{tc("wip")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
