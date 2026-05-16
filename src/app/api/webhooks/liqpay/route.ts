import { NextResponse } from "next/server";
import { decodeLiqPayData, verifyLiqPayCallback } from "@/lib/liqpay";
import {
  isLiqPaySuccessStatus,
  parseLiqPayInfo,
  recordSuccessfulDonation,
} from "@/lib/donations-db";
import { env, requireLiqPay } from "@/lib/env";

export async function POST(request: Request) {
  if (!env.liqpay.enabled) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const form = await request.formData();
  const data = form.get("data");
  const signature = form.get("signature");

  if (typeof data !== "string" || typeof signature !== "string") {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const { privateKey } = requireLiqPay();
  if (!verifyLiqPayCallback(data, signature, privateKey)) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  const payload = decodeLiqPayData<{
    order_id?: string;
    payment_id?: number;
    status?: string;
    amount?: number;
    currency?: string;
    action?: string;
    info?: string;
  }>(data);

  if (!payload.order_id || !isLiqPaySuccessStatus(payload.status)) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const meta = parseLiqPayInfo(payload.info);
  const recurring = payload.action === "subscribe" || payload.status === "subscribed";

  try {
    const result = await recordSuccessfulDonation({
      orderId: payload.order_id,
      gateway: "liqpay",
      amount: Number(payload.amount) || 0,
      currency: payload.currency ?? "UAH",
      email: meta.email,
      note: meta.note,
      projectSlug: meta.projectSlug,
      recurring,
      status: payload.status ?? "success",
      externalId: payload.payment_id ? String(payload.payment_id) : undefined,
      rawPayload: payload,
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("[liqpay webhook]", err);
    return NextResponse.json({ error: "processing_failed" }, { status: 500 });
  }
}
