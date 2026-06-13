import type { LocalizedRichText, LocalizedString, Locale } from "./types";

const FALLBACK: Locale = "uk";

export function pickLocale(
  value: LocalizedString | undefined,
  locale: string,
): string | undefined {
  if (!value) return undefined;
  const primary = value[locale as Locale];
  if (primary) return primary;
  const fallback = value[FALLBACK];
  return fallback ?? undefined;
}

export function pickLocaleRich(
  value: LocalizedRichText | undefined,
  locale: string,
) {
  if (!value) return undefined;
  const primary = value[locale as Locale];
  if (primary && primary.length > 0) return primary;
  const fallback = value[FALLBACK];
  return fallback ?? undefined;
}
