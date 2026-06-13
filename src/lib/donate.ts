export const DONATE_MIN_UAH = 50;
export const DONATE_MAX_UAH = 1_000_000;

export type DonateGateway = "liqpay" | "stripe";

export type DonateRequestBody = {
  amount: number;
  email: string;
  note?: string;
  projectSlug?: string;
  gateway: DonateGateway;
  recurring?: boolean;
  locale: string;
  recaptchaToken?: string;
};

export function parseDonateBody(body: unknown): DonateRequestBody | null {
  if (!body || typeof body !== "object") return null;

  const b = body as Record<string, unknown>;
  const amount = Number(b.amount);
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const gateway = b.gateway === "liqpay" || b.gateway === "stripe" ? b.gateway : null;
  const locale = b.locale === "en" ? "en" : "uk";

  if (!gateway || !email || !Number.isFinite(amount)) return null;
  if (amount < DONATE_MIN_UAH || amount > DONATE_MAX_UAH) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;

  return {
    amount: Math.round(amount),
    email,
    note: typeof b.note === "string" ? b.note.slice(0, 500) : undefined,
    projectSlug:
      typeof b.projectSlug === "string" ? b.projectSlug.slice(0, 64) : undefined,
    gateway,
    recurring: Boolean(b.recurring),
    locale,
    recaptchaToken:
      typeof b.recaptchaToken === "string" ? b.recaptchaToken : undefined,
  };
}

export function createOrderId(prefix = "fenrir"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
