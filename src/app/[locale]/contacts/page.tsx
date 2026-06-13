import { getLocale, getTranslations } from "next-intl/server";
import { getSiteSettings } from "@/sanity/lib/fetchers";
import { pickLocale } from "@/sanity/lib/i18n";

export default async function ContactsPage() {
  const [t, locale, settings] = await Promise.all([
    getTranslations("pages.contacts"),
    getLocale(),
    getSiteSettings(),
  ]);
  const contacts = settings?.contacts;

  const email = contacts?.email ?? "hello@fenrir.foundation";
  const phone = contacts?.phone ?? "+380 (00) 000 00 00";
  const address = pickLocale(contacts?.address, locale) ?? t("legalBody");

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-balance text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-4 text-pretty text-muted leading-relaxed">{t("lead")}</p>

      <dl className="mt-10 grid gap-4 rounded-xl border border-border bg-card/30 p-6">
        <div>
          <dt className="text-xs text-muted">{t("email")}</dt>
          <dd className="mt-1 font-medium">
            <a href={`mailto:${email}`} className="hover:underline">
              {email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">{t("phone")}</dt>
          <dd className="mt-1 font-medium">
            <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:underline">
              {phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">{t("legal")}</dt>
          <dd className="mt-1 whitespace-pre-line text-sm text-muted leading-relaxed">
            {address}
          </dd>
        </div>
      </dl>
    </div>
  );
}
