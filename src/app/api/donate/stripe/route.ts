import { NextResponse } from "next/server";
import Stripe from "stripe";
import { guardDonateRequest } from "@/lib/api-guard";
import { createOrderId, parseDonateBody } from "@/lib/donate";
import { env, requireStripe } from "@/lib/env";

export async function POST(request: Request) {
  if (!env.stripe.enabled) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = parseDonateBody(body);
  if (!parsed || parsed.gateway !== "stripe") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const guard = await guardDonateRequest(request, parsed.recaptchaToken);
  if (guard) return guard;

  const { secretKey } = requireStripe();
  const stripe = new Stripe(secretKey);
  const orderId = createOrderId("st");
  const localePrefix = parsed.locale === "en" ? "/en" : "";
  const siteUrl = env.siteUrl.replace(/\/$/, "");

  const productName = parsed.projectSlug
    ? `Fenrir Foundation — ${parsed.projectSlug}`
    : "Fenrir Foundation UA — donation";

  const metadata = {
    orderId,
    email: parsed.email,
    note: parsed.note ?? "",
    projectSlug: parsed.projectSlug ?? "",
  };

  if (parsed.recurring) {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: parsed.email,
      line_items: [
        {
          price_data: {
            currency: "uah",
            product_data: { name: productName },
            unit_amount: parsed.amount * 100,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      metadata,
      success_url: `${siteUrl}${localePrefix}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}${localePrefix}/donate/cancel`,
      locale: parsed.locale === "en" ? "en" : "auto",
    });

    return NextResponse.json({ orderId, url: session.url });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: parsed.email,
    line_items: [
      {
        price_data: {
          currency: "uah",
          product_data: { name: productName },
          unit_amount: parsed.amount * 100,
        },
        quantity: 1,
      },
    ],
    metadata,
    success_url: `${siteUrl}${localePrefix}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}${localePrefix}/donate/cancel`,
    locale: parsed.locale === "en" ? "en" : "auto",
  });

  return NextResponse.json({ orderId, url: session.url });
}
