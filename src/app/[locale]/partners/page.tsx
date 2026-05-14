import { getTranslations } from "next-intl/server";
import { partnerSlots } from "@/content/site";

export default async function PartnersPage() {
  const t = await getTranslations("pages.partners");

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-balance text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-4 max-w-3xl text-pretty text-muted leading-relaxed">{t("lead")}</p>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: partnerSlots }).map((_, idx) => (
          <div
            key={idx}
            className="grid aspect-[4/3] place-items-center rounded-xl border border-border bg-card/30 text-xs text-muted"
          >
            Partner {idx + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
