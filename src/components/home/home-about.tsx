import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

export async function HomeAbout() {
  const t = await getTranslations("home.about");

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
          <Reveal className="lg:col-span-2">
            <h2 className="text-3xl font-semibold tracking-tight">{t("title")}</h2>
            <p className="mt-4 max-w-prose text-pretty text-muted leading-relaxed">{t("body")}</p>
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={0.05}>
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm text-muted">{t("statTrust")}</div>
                  <div className="mt-2 text-2xl font-semibold">{t("statTrustVal")}</div>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={0.1}>
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm text-muted">{t("statPartners")}</div>
                  <div className="mt-2 text-2xl font-semibold">{t("statPartnersVal")}</div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
