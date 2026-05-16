import { client } from "./client";
import { siteSettingsQuery } from "./queries";
import type { SiteSettings } from "./types";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch<SiteSettings | null>(
    siteSettingsQuery,
    {},
    {
      next: { revalidate: 60, tags: ["siteSettings"] },
    },
  );
}
