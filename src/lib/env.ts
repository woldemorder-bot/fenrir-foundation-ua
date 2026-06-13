function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function optional(name: string): string | undefined {
  return process.env[name] || undefined;
}

export const env = {
  siteUrl: optional("NEXT_PUBLIC_SITE_URL") ?? "https://fenrir.foundation",

  liqpay: {
    publicKey: optional("LIQPAY_PUBLIC_KEY"),
    privateKey: optional("LIQPAY_PRIVATE_KEY"),
    enabled: Boolean(optional("LIQPAY_PUBLIC_KEY") && optional("LIQPAY_PRIVATE_KEY")),
  },

  stripe: {
    secretKey: optional("STRIPE_SECRET_KEY"),
    webhookSecret: optional("STRIPE_WEBHOOK_SECRET"),
    enabled: Boolean(optional("STRIPE_SECRET_KEY")),
  },

  recaptcha: {
    siteKey: optional("NEXT_PUBLIC_RECAPTCHA_SITE_KEY"),
    secretKey: optional("RECAPTCHA_SECRET_KEY"),
    enabled: Boolean(
      optional("NEXT_PUBLIC_RECAPTCHA_SITE_KEY") && optional("RECAPTCHA_SECRET_KEY"),
    ),
    minScore: Number(optional("RECAPTCHA_MIN_SCORE") ?? "0.5"),
  },

  gtmId: optional("NEXT_PUBLIC_GTM_ID"),

  supabase: {
    url: optional("NEXT_PUBLIC_SUPABASE_URL"),
    serviceRoleKey: optional("SUPABASE_SERVICE_ROLE_KEY"),
    enabled: Boolean(
      optional("NEXT_PUBLIC_SUPABASE_URL") && optional("SUPABASE_SERVICE_ROLE_KEY"),
    ),
  },

  telegram: {
    botToken: optional("TELEGRAM_BOT_TOKEN"),
    chatId: optional("TELEGRAM_CHAT_ID"),
    enabled: Boolean(optional("TELEGRAM_BOT_TOKEN") && optional("TELEGRAM_CHAT_ID")),
  },
};

export function requireLiqPay() {
  return {
    publicKey: required("LIQPAY_PUBLIC_KEY"),
    privateKey: required("LIQPAY_PRIVATE_KEY"),
  };
}

export function requireStripe() {
  return {
    secretKey: required("STRIPE_SECRET_KEY"),
  };
}

export function requireRecaptcha() {
  return {
    secretKey: required("RECAPTCHA_SECRET_KEY"),
    minScore: env.recaptcha.minScore,
  };
}
