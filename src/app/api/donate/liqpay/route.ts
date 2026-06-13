import { NextResponse } from "next/server";
import { guardDonateRequest } from "@/lib/api-guard";
import { createOrderId, parseDonateBody } from "@/lib/donate";
import { env, requireLiqPay } from "@/lib/env";
import { buildLiqPayCheckout, type LiqPayParams } from "@/lib/liqpay";

export async function POST(request: Request) {
  if (!env.liqpay.enabled) {
    return NextResponse.json({ error: "liqpay_not_configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = parseDonateBody(body);
  if (!parsed || parsed.gateway !== "liqpay") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const guard = await guardDonateRequest(request, parsed.recaptchaToken);
  if (guard) return guard;

  const { publicKey, privateKey } = requireLiqPay();
  const orderId = createOrderId("lp");
  const localePrefix = parsed.locale === "en" ? "/en" : "";
  const siteUrl = env.siteUrl.replace(/\/$/, "");

  const description = parsed.projectSlug
    ? `Fenrir Foundation — проєкт ${parsed.projectSlug}`
    : "Fenrir Foundation UA — благодійна пожертва";

  const params: LiqPayParams = {
    public_key: publicKey,
    version: 3,
    action: parsed.recurring ? "subscribe" : "pay",
    amount: parsed.amount,
    currency: "UAH",
    description,
    order_id: orderId,
    result_url: `${siteUrl}${localePrefix}/donate/success?order=${orderId}`,
    server_url: `${siteUrl}/api/webhooks/liqpay`,
    language: parsed.locale === "en" ? "en" : "uk",
    info: JSON.stringify({
      email: parsed.email,
      note: parsed.note,
      projectSlug: parsed.projectSlug,
    }),
  };

  if (parsed.recurring) {
    params.subscribe = "1";
    params.subscribe_periodicity = "month";
    const start = new Date();
    start.setDate(start.getDate() + 1);
    params.subscribe_date_start = start.toISOString().slice(0, 10);
  }

  const checkout = buildLiqPayCheckout(params, privateKey);

  return NextResponse.json({
    orderId,
    ...checkout,
  });
}
