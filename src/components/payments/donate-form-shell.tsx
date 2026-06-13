import { env } from "@/lib/env";
import { DonateForm, type DonateFormConfig } from "@/components/payments/donate-form";
import { RecaptchaProvider } from "@/components/payments/recaptcha-provider";

type Props = {
  projectSlug?: string;
  showRecurring?: boolean;
  className?: string;
};

export function DonateFormShell(props: Props) {
  const config: DonateFormConfig = {
    liqpay: env.liqpay.enabled,
    stripe: env.stripe.enabled,
  };

  return (
    <RecaptchaProvider siteKey={env.recaptcha.siteKey}>
      <DonateForm config={config} {...props} />
    </RecaptchaProvider>
  );
}
