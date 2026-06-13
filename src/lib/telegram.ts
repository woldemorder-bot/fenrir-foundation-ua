import { env } from "@/lib/env";
import type { DonationInsert } from "@/lib/donations-db";

function formatAmount(amount: number, currency: string) {
  if (currency === "UAH") {
    return new Intl.NumberFormat("uk-UA", {
      style: "currency",
      currency: "UAH",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return `${amount} ${currency}`;
}

export async function notifyDonationTelegram(donation: DonationInsert): Promise<void> {
  if (!env.telegram.enabled) return;

  const token = env.telegram.botToken!;
  const chatId = env.telegram.chatId!;

  const lines = [
    "🐺 <b>Новий донат — Fenrir Foundation</b>",
    "",
    `💰 <b>Сума:</b> ${formatAmount(donation.amount, donation.currency)}`,
    `💳 <b>Шлюз:</b> ${donation.gateway === "liqpay" ? "LiqPay" : "Stripe"}`,
    `📋 <b>Order:</b> <code>${donation.orderId}</code>`,
    donation.email ? `✉️ <b>Email:</b> ${donation.email}` : null,
    donation.projectSlug ? `📦 <b>Проєкт:</b> ${donation.projectSlug}` : null,
    donation.recurring ? "🔁 <b>Регулярний:</b> так" : null,
    donation.note ? `💬 ${donation.note}` : null,
    `📊 <b>Статус:</b> ${donation.status}`,
  ].filter(Boolean);

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join("\n"),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[telegram] send failed", res.status, body);
  }
}
