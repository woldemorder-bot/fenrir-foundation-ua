import { createHash } from "crypto";

export const LIQPAY_CHECKOUT_URL = "https://www.liqpay.ua/api/3/checkout";

export type LiqPayAction = "pay" | "subscribe";

export type LiqPayParams = {
  public_key: string;
  version: 3;
  action: LiqPayAction;
  amount: number;
  currency: "UAH";
  description: string;
  order_id: string;
  result_url: string;
  server_url: string;
  language?: "uk" | "en";
  subscribe?: "1";
  subscribe_date_start?: string;
  subscribe_periodicity?: "month" | "year";
  info?: string;
};

export function encodeLiqPayData(params: LiqPayParams): string {
  return Buffer.from(JSON.stringify(params)).toString("base64");
}

export function signLiqPayData(data: string, privateKey: string): string {
  const signature = createHash("sha1")
    .update(privateKey + data + privateKey)
    .digest("base64");
  return signature;
}

export function buildLiqPayCheckout(
  params: LiqPayParams,
  privateKey: string,
): { data: string; signature: string; checkoutUrl: string } {
  const data = encodeLiqPayData(params);
  const signature = signLiqPayData(data, privateKey);
  return { data, signature, checkoutUrl: LIQPAY_CHECKOUT_URL };
}

export function verifyLiqPayCallback(
  data: string,
  signature: string,
  privateKey: string,
): boolean {
  const expected = signLiqPayData(data, privateKey);
  return expected === signature;
}

export function decodeLiqPayData<T = Record<string, unknown>>(data: string): T {
  return JSON.parse(Buffer.from(data, "base64").toString("utf8")) as T;
}
