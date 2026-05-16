import { getLocale, getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { getSiteSettings } from "@/sanity/lib/fetchers";
import { pickLocale } from "@/sanity/lib/i18n";

export async function HomeDonate() {
  const [t, tc, locale, settings] = await Promise.all([
    getTranslations("home.donate"),
    getTranslations("common"),
    getLocale(),
    getSiteSettings(),
  ]);
  const donateButtons = settings?.donateButtons ?? [];

  return (
    <section className="border-b border-border bg-card/10">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight">{t("title")}</h2>
            <p className="mt-3 text-muted leading-relaxed">{t("subtitle")}</p>
            <p className="mt-4 text-sm text-muted leading-relaxed">{t("recurringHint")}</p>

            {donateButtons.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {donateButtons.map((btn, idx) => {
                  const label = pickLocale(btn.label, locale);
                  if (!label || !btn.url) return null;
                  return (
                    <Button
                      key={`${btn.url}-${idx}`}
                      asChild
                      variant={btn.variant === "secondary" ? "secondary" : "default"}
                    >
                      <a href={btn.url} target="_blank" rel="noreferrer">
                        {label}
                      </a>
                    </Button>
                  );
                })}
              </div>
            ) : null}

            <div className="mt-8 space-y-3 rounded-xl border border-border bg-background/30 p-5">
              <div className="text-sm font-semibold">{t("methods")}</div>
              <div className="text-sm text-muted leading-relaxed">{t("methodsUa")}</div>
              <div className="text-sm text-muted leading-relaxed">{t("methodsIntl")}</div>
              <div className="text-sm text-muted leading-relaxed">{t("crypto")}</div>
            </div>

            <p className="mt-6 text-xs text-muted">{tc("wip")}</p>
          </Reveal>

          <Reveal delay={0.06}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t("title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">{t("amount")}</Label>
                  <Input id="amount" inputMode="numeric" placeholder="500" name="amount" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input id="email" type="email" placeholder="you@domain.com" name="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note">{t("note")}</Label>
                  <Input id="note" placeholder="…" name="note" />
                </div>
                <Button className="w-full" type="button">
                  {t("submit")}
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
