import { getLocale, getTranslations } from "next-intl/server";
import { homeStats } from "@/content/site";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

function formatUah(n: number, locale: string) {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }).format(n);
}

export async function HomeImpact() {
  const t = await getTranslations("home.impact");
  const locale = await getLocale();

  const items = [
    { k: "uah" as const, v: formatUah(homeStats.deliveredUah, locale) },
    { k: "drones" as const, v: String(homeStats.drones) },
    { k: "vehicles" as const, v: String(homeStats.vehicles) },
    { k: "units" as const, v: String(homeStats.units) },
  ];

  return (
    <section className="border-b border-border bg-card/10">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">{t("title")}</h2>
            <p className="mt-3 text-muted">{t("subtitle")}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, idx) => (
            <Reveal key={it.k} delay={0.05 * idx}>
              <Card>
                <CardContent className="p-6">
                  <div className="text-3xl font-semibold tracking-tight">{it.v}</div>
                  <div className="mt-2 text-sm text-muted leading-relaxed">{t(it.k)}</div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
