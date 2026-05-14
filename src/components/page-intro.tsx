import { getTranslations } from "next-intl/server";

export async function PageIntro({ namespace }: { namespace: string }) {
  const t = await getTranslations(namespace);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-balance text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-4 text-pretty text-muted leading-relaxed">{t("lead")}</p>
    </div>
  );
}
