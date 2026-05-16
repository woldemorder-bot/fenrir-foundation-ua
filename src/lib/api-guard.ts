import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function guardDonateRequest(request: Request, recaptchaToken?: string) {
  const ip = getClientIp(request);
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  if (env.recaptcha.enabled) {
    if (!recaptchaToken) {
      return NextResponse.json({ error: "recaptcha_required" }, { status: 400 });
    }
    const result = await verifyRecaptcha(recaptchaToken);
    if (!result.ok) {
      return NextResponse.json({ error: "recaptcha_failed" }, { status: 400 });
    }
  }

  return null;
}
