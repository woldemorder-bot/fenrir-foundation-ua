"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const mainNav = [
  { href: "/", key: "home" as const },
  { href: "/projects", key: "projects" as const },
  { href: "/news", key: "news" as const },
  { href: "/reports", key: "reports" as const },
  { href: "/partners", key: "partners" as const },
  { href: "/contacts", key: "contacts" as const },
];

const aboutSub = [
  { href: "/about", key: "about" as const },
  { href: "/about/team", key: "team" as const },
  { href: "/about/founder", key: "founder" as const },
];

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent transition-colors",
        scrolled && "border-border/70 bg-background/70 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="group flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-lg bg-primary/15 ring-1 ring-primary/25">
            <span className="text-sm font-black tracking-tight text-primary">F</span>
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold tracking-tight">Fenrir Foundation</span>
            <span className="text-xs text-muted">UA</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href}>{t(item.key)}</Link>
            </Button>
          ))}

          <div className="group relative">
            <Button variant="ghost" className="gap-1">
              {t("about")}
              <span className="text-xs text-muted">▾</span>
            </Button>
            <div className="invisible absolute right-0 top-full z-50 mt-2 w-56 translate-y-1 rounded-xl border border-border bg-card/95 p-2 opacity-0 shadow-lg backdrop-blur transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {aboutSub.map((s) => (
                <Button key={s.href} variant="ghost" className="w-full justify-start" asChild>
                  <Link href={s.href}>{t(s.key)}</Link>
                </Button>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="secondary" className="hidden sm:inline-flex" asChild>
            <Link href="/get-help">{t("getHelp")}</Link>
          </Button>
          <Button asChild>
            <Link href="/donate">{t("donate")}</Link>
          </Button>

          <div className="hidden items-center gap-1 rounded-md border border-border bg-card/40 px-1 py-1 sm:flex">
            <Button variant={locale === "uk" ? "secondary" : "ghost"} size="sm" asChild>
              <Link href={pathname} locale="uk">
                UA
              </Link>
            </Button>
            <Button variant={locale === "en" ? "secondary" : "ghost"} size="sm" asChild>
              <Link href={pathname} locale="en">
                EN
              </Link>
            </Button>
          </div>

          <Button
            variant="secondary"
            size="icon"
            className="lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background/95 px-4 py-4 backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {mainNav.map((item) => (
              <Button key={item.href} variant="ghost" className="justify-start" asChild>
                <Link href={item.href}>{t(item.key)}</Link>
              </Button>
            ))}
            <div className="my-2 border-t border-border" />
            {aboutSub.map((s) => (
              <Button key={s.href} variant="ghost" className="justify-start" asChild>
                <Link href={s.href}>{t(s.key)}</Link>
              </Button>
            ))}
            <div className="my-2 border-t border-border" />
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/get-help">{t("getHelp")}</Link>
            </Button>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1" variant="secondary" asChild>
                <Link href={pathname} locale="uk">
                  UA
                </Link>
              </Button>
              <Button className="flex-1" variant="secondary" asChild>
                <Link href={pathname} locale="en">
                  EN
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
