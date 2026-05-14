import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("nav");
  const tf = await getTranslations("footer");

  const bottom = [
    { href: "/privacy", key: "privacy" as const },
    { href: "/offer", key: "offer" as const },
    { href: "/contacts", key: "contacts" as const },
  ];

  return (
    <footer className="border-t border-border bg-card/20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <div className="text-sm font-semibold">Fenrir Foundation UA</div>
          <p className="text-sm text-muted leading-relaxed">{tf("mission")}</p>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold">{t("projects")}</div>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <Link className="hover:text-foreground" href="/projects">
              {t("projects")}
            </Link>
            <Link className="hover:text-foreground" href="/reports">
              {t("reports")}
            </Link>
            <Link className="hover:text-foreground" href="/partners">
              {t("partners")}
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold">{t("donate")}</div>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <Link className="hover:text-foreground" href="/donate">
              {t("donate")}
            </Link>
            <Link className="hover:text-foreground" href="/get-help">
              {t("getHelp")}
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted leading-relaxed md:max-w-[70%]">{tf("boNotice")}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
            {bottom.map((b) => (
              <Link key={b.href} className="hover:text-foreground" href={b.href}>
                {t(b.key)}
              </Link>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-10 text-xs text-muted">
          © {new Date().getFullYear()} Fenrir Foundation UA · {tf("rights")}
        </div>
      </div>
    </footer>
  );
}
