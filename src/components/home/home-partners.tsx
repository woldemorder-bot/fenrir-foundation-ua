import { getTranslations } from "next-intl/server";
import { partnerSlots } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export async function HomePartners() {
  const t = await getTranslations("home.partners");

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">{t("title")}</h2>
            <p className="mt-3 text-muted">{t("subtitle")}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: partnerSlots }).map((_, idx) => (
            <Reveal key={idx} delay={0.02 * idx}>
              <div className="grid aspect-[4/3] place-items-center rounded-xl border border-border bg-card/30 text-xs text-muted">
                Logo {idx + 1}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
