import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { getSiteSettings } from "@/sanity/lib/fetchers";
import { pickLocale } from "@/sanity/lib/i18n";

function WolfSilhouette() {
  return (
    <svg
      viewBox="0 0 600 420"
      className="h-[clamp(220px,40vw,420px)] w-full max-w-xl opacity-90"
      aria-hidden
    >
      <defs>
        <linearGradient id="wolf" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="oklch(0.78 0.14 75 / 0.95)" />
          <stop offset="1" stopColor="oklch(0.62 0.18 250 / 0.55)" />
        </linearGradient>
      </defs>
      <path
        fill="url(#wolf)"
        d="M120 310c40-90 55-150 120-205 20-16 45-28 70-32 10-2 20-2 30 0 25 4 50 16 70 32 65 55 80 115 120 205 8 18 12 38 12 58H108c0-20 4-40 12-58zm95-95c12-10 28-16 45-16s33 6 45 16c18 15 28 36 28 60 0 44-35 80-78 82-2 0-4 0-6 0h-4c-2 0-4 0-6 0-43-2-78-38-78-82 0-24 10-45 28-60zm45-120c-33 0-60 27-60 60s27 60 60 60 60-27 60-60-27-60-60-60zm165 40c-10-8-22-14-35-16 6 18 10 38 10 58 0 46-18 88-48 118 26-34 42-78 42-126 0-12-2-24-6-34zm-295 34c-4 10-6 22-6 34 0 48 16 92 42 126-30-30-48-72-48-118 0-20 4-40 10-58-13 2-25 8-35 16z"
      />
    </svg>
  );
}

export async function HomeHero() {
  const [t, locale, settings] = await Promise.all([
    getTranslations("home.hero"),
    getLocale(),
    getSiteSettings(),
  ]);
  const hero = settings?.heroBanner;

  const badge = pickLocale(hero?.badge, locale) ?? t("badge");
  const kicker = pickLocale(hero?.kicker, locale) ?? t("kicker");
  const title = pickLocale(hero?.headline, locale) ?? t("title");
  const subtitle = pickLocale(hero?.subline, locale) ?? t("subtitle");
  const ctaPrimary = pickLocale(hero?.ctaPrimaryLabel, locale) ?? t("ctaPrimary");
  const ctaSecondary = pickLocale(hero?.ctaSecondaryLabel, locale) ?? t("ctaSecondary");
  const ctaPrimaryUrl = hero?.ctaPrimaryUrl ?? "/donate";
  const ctaSecondaryUrl = hero?.ctaSecondaryUrl ?? "/projects";

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_0%,oklch(0.62_0.18_250/0.35),transparent_55%),radial-gradient(700px_circle_at_85%_30%,oklch(0.78_0.14_75/0.22),transparent_55%)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs text-muted backdrop-blur">
            <span className="size-1.5 rounded-full bg-primary" />
            {badge}
          </div>
          <p className="mt-5 text-sm font-medium text-primary">{kicker}</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-prose text-pretty text-base text-muted md:text-lg">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href={ctaPrimaryUrl}>{ctaPrimary}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={ctaSecondaryUrl}>{ctaSecondary}</Link>
            </Button>
          </div>
        </Reveal>

        <Reveal className="relative flex justify-center md:justify-end" delay={0.08}>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-accent/15 blur-2xl" />
            <WolfSilhouette />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
