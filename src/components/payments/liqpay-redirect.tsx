"use client";

import { useEffect, useRef } from "react";

type Props = {
  checkoutUrl: string;
  data: string;
  signature: string;
};

export function LiqPayRedirect({ checkoutUrl, data, signature }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formRef.current?.submit();
  }, [data, signature]);

  return (
    <form ref={formRef} method="POST" action={checkoutUrl} className="hidden">
      <input type="hidden" name="data" value={data} />
      <input type="hidden" name="signature" value={signature} />
    </form>
  );
}
