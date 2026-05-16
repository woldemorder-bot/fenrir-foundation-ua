import { NextResponse } from "next/server";
import Stripe from "stripe";
import { recordSuccessfulDonation } from "@/lib/donations-db";
import { env, requireStripe } from "@/lib/env";

export const runtime = "nodejs";

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return { skipped: true };

  const orderId = session.metadata?.orderId ?? session.id;
  const amount = (session.amount_total ?? 0) / 100;
  const currency = (session.currency ?? "uah").toUpperCase();

  return recordSuccessfulDonation({
    orderId,
    gateway: "stripe",
    amount,
    currency,
    email: session.customer_email ?? session.metadata?.email,
    note: session.metadata?.note,
    projectSlug: session.metadata?.projectSlug,
    recurring: session.mode === "subscription",
    status: "paid",
    externalId: session.payment_intent
      ? String(session.payment_intent)
      : session.id,
    rawPayload: { sessionId: session.id, mode: session.mode },
  });
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  if (invoice.billing_reason === "subscription_create") {
    return { skipped: true };
  }

  const orderId = `st-inv-${invoice.id}`;
  const amount = (invoice.amount_paid ?? 0) / 100;
  const currency = (invoice.currency ?? "uah").toUpperCase();
  const meta = invoice.metadata ?? {};

  return recordSuccessfulDonation({
    orderId,
    gateway: "stripe",
    amount,
    currency,
    email: invoice.customer_email ?? meta.email,
    note: meta.note,
    projectSlug: meta.projectSlug,
    recurring: true,
    status: "paid",
    externalId: invoice.id,
    rawPayload: { invoiceId: invoice.id, billing_reason: invoice.billing_reason },
  });
}

export async function POST(request: Request) {
  if (!env.stripe.enabled) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const { secretKey } = requireStripe();
  const stripe = new Stripe(secretKey);
  const webhookSecret = env.stripe.webhookSecret;

  if (!webhookSecret) {
    return NextResponse.json({ error: "webhook_not_configured" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const result = await handleCheckoutCompleted(
        event.data.object as Stripe.Checkout.Session,
      );
      return NextResponse.json({ received: true, ...result });
    }

    if (event.type === "invoice.paid") {
      const result = await handleInvoicePaid(event.data.object as Stripe.Invoice);
      return NextResponse.json({ received: true, ...result });
    }
  } catch (err) {
    console.error("[stripe webhook]", err);
    return NextResponse.json({ error: "processing_failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
