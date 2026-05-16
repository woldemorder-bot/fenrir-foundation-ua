"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  CONSENT_COOKIE,
  CONSENT_MAX_AGE,
  parseConsentCookie,
  serializeConsent,
} from "@/lib/consent";

function readConsent(): boolean | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
  if (!match) return null;
  const value = match.split("=")[1];
  const parsed = parseConsentCookie(value);
  return parsed ? parsed.analytics : null;
}

function writeConsent(analytics: boolean) {
  document.cookie = `${CONSENT_COOKIE}=${serializeConsent(analytics)}; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent("fenrir-consent", { detail: { analytics } }));
}

export function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === null);
  }, []);

  if (!visible) return null;

  const outerClass =
    "fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-background/95 p-4 shadow-lg backdrop-blur md:p-6";
  const innerClass =
    "mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between";

  return (
    <div role="dialog" aria-label={t("title")} className={outerClass}>
      <div className={innerClass}>
        <div className="max-w-2xl space-y-2">
          <p className="text-sm font-semibold">{t("title")}</p>
          <p className="text-sm text-muted leading-relaxed">{t("body")}</p>
          <Link href="/privacy" className="text-sm text-primary hover:underline">
            {t("privacyLink")}
          </Link>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              writeConsent(false);
              setVisible(false);
            }}
          >
            {t("essentialOnly")}
          </Button>
          <Button
            type="button"
            onClick={() => {
              writeConsent(true);
              setVisible(false);
            }}
          >
            {t("acceptAll")}
          </Button>
        </div>
      </div>
    </div>
  );
}
