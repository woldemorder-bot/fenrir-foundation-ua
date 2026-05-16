export const CONSENT_COOKIE = "fenrir_consent";
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

export type ConsentState = {
  essential: true;
  analytics: boolean;
  updatedAt: string;
};

export function parseConsentCookie(value: string | undefined): ConsentState | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as ConsentState;
    if (typeof parsed.analytics !== "boolean") return null;
    return { essential: true, analytics: parsed.analytics, updatedAt: parsed.updatedAt };
  } catch {
    return null;
  }
}

export function serializeConsent(analytics: boolean): string {
  const state: ConsentState = {
    essential: true,
    analytics,
    updatedAt: new Date().toISOString(),
  };
  return encodeURIComponent(JSON.stringify(state));
}
