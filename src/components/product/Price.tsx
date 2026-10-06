"use client";

import { formatPrice } from "@/lib/currency";
import { useCurrency } from "@/lib/store";

/** Server HTML renders INR; the visitor's chosen currency applies after hydration. */
export function Price({ inr, className }: { inr: number; className?: string }) {
  const currency = useCurrency();
  return (
    <span className={className} suppressHydrationWarning>
      {formatPrice(inr, currency)}
    </span>
  );
}
