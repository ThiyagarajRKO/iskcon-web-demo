"use client";

import { CURRENCIES, isCurrency } from "@/lib/currency";
import { setCurrency, useCurrency } from "@/lib/store";
import styles from "./Footer.module.css";

export function CurrencySelect() {
  const currency = useCurrency();
  return (
    <label className={styles.currency}>
      <span>Ship to / Currency:</span>
      <select
        value={currency}
        onChange={(e) => isCurrency(e.target.value) && setCurrency(e.target.value)}
        aria-label="Shipping region and currency"
      >
        {Object.entries(CURRENCIES).map(([code, c]) => (
          <option key={code} value={code}>
            {c.label}
          </option>
        ))}
      </select>
    </label>
  );
}
