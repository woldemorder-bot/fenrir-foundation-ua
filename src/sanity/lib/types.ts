import type { PortableTextBlock } from "@portabletext/types";

export type Locale = "uk" | "en";

export type LocalizedString = {
  uk?: string | null;
  en?: string | null;
} | null;

export type LocalizedRichText = {
  uk?: PortableTextBlock[] | null;
  en?: PortableTextBlock[] | null;
} | null;

export type SiteSettings = {
  title?: string | null;
  description?: LocalizedString;
  heroBanner?: {
    badge?: LocalizedString;
    kicker?: LocalizedString;
    headline?: LocalizedString;
    subline?: LocalizedString;
    ctaPrimaryLabel?: LocalizedString;
    ctaPrimaryUrl?: string | null;
    ctaSecondaryLabel?: LocalizedString;
    ctaSecondaryUrl?: string | null;
  } | null;
  mission?: LocalizedRichText;
  donateButtons?: Array<{
    label?: LocalizedString;
    url?: string | null;
    variant?: "primary" | "secondary" | null;
  }> | null;
  contacts?: {
    email?: string | null;
    phone?: string | null;
    address?: LocalizedString;
  } | null;
};
