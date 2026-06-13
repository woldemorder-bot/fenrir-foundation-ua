import { requireRecaptcha } from "@/lib/env";

type VerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

export async function verifyRecaptcha(
  token: string,
  expectedAction = "donate",
): Promise<{ ok: boolean; score?: number }> {
  const { secretKey, minScore } = requireRecaptcha();

  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = (await res.json()) as VerifyResponse;

  if (!data.success) {
    return { ok: false };
  }

  if (data.action && data.action !== expectedAction) {
    return { ok: false };
  }

  if (typeof data.score === "number" && data.score < minScore) {
    return { ok: false, score: data.score };
  }

  return { ok: true, score: data.score };
}
