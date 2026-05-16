"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { parseConsentCookie, CONSENT_COOKIE } from "@/lib/consent";

type Props = {
  gtmId?: string;
};

function hasAnalyticsConsent(): boolean {
  if (typeof document === "undefined") return false;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
  if (!match) return false;
  const parsed = parseConsentCookie(match.split("=")[1]);
  return Boolean(parsed?.analytics);
}

export function AnalyticsScripts({ gtmId }: Props) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(hasAnalyticsConsent());

    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent<{ analytics: boolean }>).detail;
      setEnabled(Boolean(detail?.analytics));
    };

    window.addEventListener("fenrir-consent", onConsent);
    return () => window.removeEventListener("fenrir-consent", onConsent);
  }, []);

  if (!gtmId || !enabled) return null;

  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
    </>
  );
}
