import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { notifyDonationTelegram } from "@/lib/telegram";

export type DonationGateway = "liqpay" | "stripe";

export type DonationInsert = {
  orderId: string;
  gateway: DonationGateway;
  amount: number;
  currency: string;
  email?: string;
  note?: string;
  projectSlug?: string;
  recurring?: boolean;
  status: string;
  externalId?: string;
  rawPayload?: unknown;
};

export function parseLiqPayInfo(info?: string): {
  email?: string;
  note?: string;
  projectSlug?: string;
} {
  if (!info) return {};
  try {
    const parsed = JSON.parse(info) as Record<string, string>;
    return {
      email: parsed.email,
      note: parsed.note,
      projectSlug: parsed.projectSlug,
    };
  } catch {
    return {};
  }
}

const LIQPAY_SUCCESS = new Set(["success", "sandbox", "subscribed"]);

export function isLiqPaySuccessStatus(status?: string): boolean {
  return Boolean(status && LIQPAY_SUCCESS.has(status));
}

export async function recordSuccessfulDonation(
  input: DonationInsert,
): Promise<{ saved: boolean; duplicate: boolean }> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    console.warn("[donations] Supabase not configured, skipping save");
    await notifyDonationTelegram(input);
    return { saved: false, duplicate: false };
  }

  const row = {
    order_id: input.orderId,
    gateway: input.gateway,
    amount: input.amount,
    currency: input.currency,
    email: input.email ?? null,
    note: input.note ?? null,
    project_slug: input.projectSlug ?? null,
    recurring: input.recurring ?? false,
    status: input.status,
    external_id: input.externalId ?? null,
    raw_payload: input.rawPayload ?? null,
  };

  const { error } = await supabase.from("donations").insert(row);

  if (error) {
    if (error.code === "23505") {
      return { saved: false, duplicate: true };
    }
    console.error("[donations] insert failed", error);
    throw error;
  }

  await notifyDonationTelegram(input);
  return { saved: true, duplicate: false };
}
