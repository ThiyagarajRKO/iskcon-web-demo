/** Display currencies. Base prices are stored in INR. Rates are indicative — load live rates from the backend. */
export const CURRENCIES = {
  INR: { label: "India (INR)", rate: 1, locale: "en-IN" },
  USD: { label: "United States (USD)", rate: 0.012, locale: "en-US" },
  GBP: { label: "United Kingdom (GBP)", rate: 0.0094, locale: "en-GB" },
  EUR: { label: "Europe (EUR)", rate: 0.011, locale: "de-DE" },
  AED: { label: "UAE (AED)", rate: 0.044, locale: "en-AE" },
  AUD: { label: "Australia (AUD)", rate: 0.018, locale: "en-AU" },
  CAD: { label: "Canada (CAD)", rate: 0.016, locale: "en-CA" },
  SGD: { label: "Singapore (SGD)", rate: 0.016, locale: "en-SG" },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;
export const DEFAULT_CURRENCY: CurrencyCode = "INR";

const formatters = new Map<CurrencyCode, Intl.NumberFormat>();

export function formatPrice(inr: number, code: CurrencyCode = DEFAULT_CURRENCY) {
  const c = CURRENCIES[code];
  let f = formatters.get(code);
  if (!f) {
    f = new Intl.NumberFormat(c.locale, {
      style: "currency",
      currency: code,
      maximumFractionDigits: code === "INR" ? 0 : 2,
      minimumFractionDigits: 0,
    });
    formatters.set(code, f);
  }
  const value = inr * c.rate;
  return f.format(code === "INR" ? value : Math.round(value));
}

export const isCurrency = (v: unknown): v is CurrencyCode => typeof v === "string" && v in CURRENCIES;
