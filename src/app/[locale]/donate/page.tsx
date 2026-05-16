import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonateFormShell } from "@/components/payments/donate-form-shell";

export default async function DonatePage() {
  const t = await getTranslations("pages.donate");
  const td = await getTranslations("donatePage");
  const th = await getTranslations("home.donate");

  const blocks = [
    { title: td("uaTitle"), body: th("methodsUa") },
    { title: td("intlTitle"), body: th("methodsIntl") },
    { title: td("cryptoTitle"), body: th("crypto") },
    { title: td("recurringTitle"), body: td("recurringBody") },
    { title: td("legalTitle"), body: td("legalBody") },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-balance text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-4 max-w-3xl text-pretty text-muted leading-relaxed">{t("lead")}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="space-y-4">
          {blocks.map((b) => (
            <Card key={b.title}>
              <CardHeader>
                <CardTitle className="text-base">{b.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted leading-relaxed">{b.body}</CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{th("title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <DonateFormShell />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
