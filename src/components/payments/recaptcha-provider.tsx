"use client";

import Script from "next/script";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type RecaptchaContextValue = {
  enabled: boolean;
  ready: boolean;
  execute: (action?: string) => Promise<string | null>;
};

const RecaptchaContext = createContext<RecaptchaContextValue>({
  enabled: false,
  ready: false,
  execute: async () => null,
});

export function useRecaptcha() {
  return useContext(RecaptchaContext);
}

type Props = {
  siteKey?: string;
  children: ReactNode;
};

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function RecaptchaProvider({ siteKey, children }: Props) {
  const enabled = Boolean(siteKey);
  const [ready, setReady] = useState(false);

  const execute = useCallback(
    async (action = "donate") => {
      if (!enabled || !siteKey || !ready || !window.grecaptcha) {
        return null;
      }
      return window.grecaptcha.execute(siteKey, { action });
    },
    [enabled, ready, siteKey],
  );

  const value = useMemo(
    () => ({ enabled, ready, execute }),
    [enabled, ready, execute],
  );

  return (
    <RecaptchaContext.Provider value={value}>
      {enabled && siteKey ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy="afterInteractive"
          onLoad={() => {
            window.grecaptcha?.ready(() => setReady(true));
          }}
        />
      ) : null}
      {children}
    </RecaptchaContext.Provider>
  );
}
