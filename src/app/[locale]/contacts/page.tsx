import { getTranslations } from "next-intl/server";

export default async function ContactsPage() {
  const t = await getTranslations("pages.contacts");

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-balance text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-4 text-pretty text-muted leading-relaxed">{t("lead")}</p>

      <dl className="mt-10 grid gap-4 rounded-xl border border-border bg-card/30 p-6">
        <div>
          <dt className="text-xs text-muted">{t("email")}</dt>
          <dd className="mt-1 font-medium">hello@fenrir.foundation</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">{t("phone")}</dt>
          <dd className="mt-1 font-medium">+380 (00) 000 00 00</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">{t("legal")}</dt>
          <dd className="mt-1 text-sm text-muted leading-relaxed">{t("legalBody")}</dd>
        </div>
      </dl>
    </div>
  );
}
