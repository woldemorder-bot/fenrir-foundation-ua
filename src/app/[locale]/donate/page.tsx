import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function DonatePage() {
  const t = await getTranslations("pages.donate");
  const td = await getTranslations("donatePage");
  const th = await getTranslations("home.donate");
  const tc = await getTranslations("common");

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
          <p className="text-xs text-muted">{tc("wip")}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{th("title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="d-amount">{th("amount")}</Label>
              <Input id="d-amount" inputMode="numeric" placeholder="500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="d-email">{th("email")}</Label>
              <Input id="d-email" type="email" placeholder="you@domain.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="d-note">{th("note")}</Label>
              <Input id="d-note" placeholder="…" />
            </div>
            <Button className="w-full" type="button">
              {th("submit")}
            </Button>
            <p className="text-xs text-muted">{th("recurringHint")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
