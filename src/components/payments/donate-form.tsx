"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DONATE_MIN_UAH } from "@/lib/donate";
import { LiqPayRedirect } from "@/components/payments/liqpay-redirect";
import { useRecaptcha } from "@/components/payments/recaptcha-provider";
import { cn } from "@/lib/utils";

export type DonateFormConfig = {
  liqpay: boolean;
  stripe: boolean;
};

type LiqPayPayload = {
  data: string;
  signature: string;
  checkoutUrl: string;
};

type Props = {
  config: DonateFormConfig;
  projectSlug?: string;
  className?: string;
  showRecurring?: boolean;
};

const PRESETS = [350, 500, 1000, 2500];

const ERROR_KEYS = [
  "rate_limited",
  "recaptcha_required",
  "recaptcha_failed",
  "liqpay_not_configured",
  "stripe_not_configured",
  "invalid_body",
] as const;

export function DonateForm({
  config,
  projectSlug,
  className,
  showRecurring = true,
}: Props) {
  const t = useTranslations("payments");
  const locale = useLocale();
  const { enabled: recaptchaOn, execute: runRecaptcha } = useRecaptcha();

  const [amount, setAmount] = useState("500");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [gateway, setGateway] = useState<"liqpay" | "stripe">(
    config.liqpay ? "liqpay" : "stripe",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [liqpay, setLiqpay] = useState<LiqPayPayload | null>(null);

  const anyGateway = config.liqpay || config.stripe;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLiqpay(null);

    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount < DONATE_MIN_UAH) {
      setError(t("errors.minAmount", { min: DONATE_MIN_UAH }));
      return;
    }

    if (!email.trim()) {
      setError(t("errors.email"));
      return;
    }

    if (!anyGateway) {
      setError(t("errors.notConfigured"));
      return;
    }

    setLoading(true);

    try {
      const recaptchaToken = recaptchaOn ? await runRecaptcha("donate") : undefined;
      if (recaptchaOn && !recaptchaToken) {
        setError(t("errors.recaptcha"));
        setLoading(false);
        return;
      }

      const endpoint =
        gateway === "liqpay" ? "/api/donate/liqpay" : "/api/donate/stripe";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parsedAmount,
          email: email.trim(),
          note: note.trim() || undefined,
          projectSlug,
          gateway,
          recurring,
          locale,
          recaptchaToken,
        }),
      });

      const data = (await res.json()) as {
        error?: string;
        url?: string;
        data?: string;
        signature?: string;
        checkoutUrl?: string;
      };

      if (!res.ok) {
        const key = data.error ?? "generic";
        setError(
          ERROR_KEYS.includes(key as (typeof ERROR_KEYS)[number])
            ? t(`errors.${key}` as "errors.generic")
            : t("errors.generic"),
        );
        return;
      }

      if (gateway === "stripe" && data.url) {
        window.location.href = data.url;
        return;
      }

      if (gateway === "liqpay" && data.data && data.signature && data.checkoutUrl) {
        setLiqpay({
          data: data.data,
          signature: data.signature,
          checkoutUrl: data.checkoutUrl,
        });
        return;
      }

      setError(t("errors.generic"));
    } catch {
      setError(t("errors.generic"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {liqpay ? (
        <LiqPayRedirect
          checkoutUrl={liqpay.checkoutUrl}
          data={liqpay.data}
          signature={liqpay.signature}
        />
      ) : null}

      <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
        {!anyGateway ? (
          <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-muted">
            {t("notConfiguredHint")}
          </p>
        ) : null}

        {config.liqpay && config.stripe ? (
          <GatewayPicker gateway={gateway} onChange={setGateway} t={t} />
        ) : null}

        <AmountPresets amount={amount} setAmount={setAmount} t={t} />

        <div className="space-y-2">
          <Label htmlFor="donate-amount">{t("amount")}</Label>
          <Input
            id="donate-amount"
            inputMode="numeric"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="donate-email">{t("email")}</Label>
          <Input
            id="donate-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="donate-note">{t("note")}</Label>
          <Input
            id="donate-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="…"
          />
        </div>

        {showRecurring && anyGateway ? (
          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
            />
            <span className="text-muted leading-relaxed">{t("recurring")}</span>
          </label>
        ) : null}

        {error ? (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <Button className="w-full" type="submit" disabled={loading || !anyGateway}>
          {loading ? t("processing") : t("submit")}
        </Button>

        {recaptchaOn ? (
          <p className="text-[10px] leading-relaxed text-muted">{t("recaptchaNotice")}</p>
        ) : null}
      </form>
    </>
  );
}

function GatewayPicker({
  gateway,
  onChange,
  t,
}: {
  gateway: "liqpay" | "stripe";
  onChange: (g: "liqpay" | "stripe") => void;
  t: ReturnType<typeof useTranslations<"payments">>;
}) {
  return (
    <div className="space-y-2">
      <span className="text-sm font-medium">{t("gateway")}</span>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={gateway === "liqpay" ? "default" : "secondary"}
          onClick={() => onChange("liqpay")}
        >
          {t("gatewayLiqpay")}
        </Button>
        <Button
          type="button"
          size="sm"
          variant={gateway === "stripe" ? "default" : "secondary"}
          onClick={() => onChange("stripe")}
        >
          {t("gatewayStripe")}
        </Button>
      </div>
    </div>
  );
}

function AmountPresets({
  amount,
  setAmount,
  t,
}: {
  amount: string;
  setAmount: (v: string) => void;
  t: ReturnType<typeof useTranslations<"payments">>;
}) {
  return (
    <div className="space-y-2">
      <span className="text-sm font-medium">{t("presets")}</span>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <Button
            key={p}
            type="button"
            size="sm"
            variant={amount === String(p) ? "default" : "secondary"}
            onClick={() => setAmount(String(p))}
          >
            {p} ₴
          </Button>
        ))}
      </div>
    </div>
  );
}
