"use client";

/**
 * Tiny external stores (cart, currency, UI panels) read through useSyncExternalStore.
 * No context providers: components re-render only for the slice they read,
 * and the server snapshot keeps static HTML identical to the first client render.
 */
import { useSyncExternalStore } from "react";
import { DEFAULT_CURRENCY, isCurrency, type CurrencyCode } from "@/lib/currency";

function createStore<T>(initial: T, storageKey?: string, validate?: (v: unknown) => v is T) {
  let state = initial;
  let hydrated = false;
  const listeners = new Set<() => void>();

  const hydrate = () => {
    if (hydrated || !storageKey || typeof window === "undefined") return;
    hydrated = true;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw != null) {
        const parsed: unknown = JSON.parse(raw);
        if (!validate || validate(parsed)) state = parsed as T;
      }
    } catch {
      /* storage unavailable (private mode) — keep defaults */
    }
  };

  return {
    get: () => state,
    set(next: T | ((prev: T) => T)) {
      state = typeof next === "function" ? (next as (p: T) => T)(state) : next;
      if (storageKey) {
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(state));
        } catch {
          /* ignore quota / private mode */
        }
      }
      listeners.forEach((l) => l());
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      // Hydrate lazily after mount, then notify so persisted state appears.
      if (!hydrated && storageKey) {
        hydrate();
        queueMicrotask(listener);
      }
      return () => listeners.delete(listener);
    },
    getServerSnapshot: () => initial,
  };
}

function useStore<T>(store: ReturnType<typeof createStore<T>>) {
  return useSyncExternalStore(store.subscribe, store.get, store.getServerSnapshot);
}

/* ---------------- Cart ---------------- */

export type CartLine = { slug: string; name: string; price: number; image: string; qty: number };

const isCart = (v: unknown): v is CartLine[] =>
  Array.isArray(v) && v.every((l) => l && typeof l.slug === "string" && typeof l.qty === "number");

const cartStore = createStore<CartLine[]>([], "shankha.cart.v1", isCart);

export const useCart = () => useStore(cartStore);

export const cart = {
  add(line: Omit<CartLine, "qty">, qty = 1) {
    cartStore.set((prev) => {
      const found = prev.find((l) => l.slug === line.slug);
      if (found) return prev.map((l) => (l.slug === line.slug ? { ...l, qty: Math.min(l.qty + qty, 10) } : l));
      return [...prev, { ...line, qty }];
    });
  },
  setQty(slug: string, qty: number) {
    cartStore.set((prev) =>
      qty <= 0 ? prev.filter((l) => l.slug !== slug) : prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(qty, 10) } : l)),
    );
  },
  remove(slug: string) {
    cartStore.set((prev) => prev.filter((l) => l.slug !== slug));
  },
};

export const cartCount = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty, 0);
export const cartTotal = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty * l.price, 0);

/* ---------------- Currency ---------------- */

const currencyStore = createStore<CurrencyCode>(DEFAULT_CURRENCY, "shankha.currency.v1", isCurrency);
export const useCurrency = () => useStore(currencyStore);
export const setCurrency = (c: CurrencyCode) => currencyStore.set(c);

/* ---------------- Panels (menu / search / bag) ---------------- */

export type Panel = "menu" | "search" | "bag" | "filters" | null;
const panelStore = createStore<Panel>(null);
export const usePanel = () => useStore(panelStore);
export const openPanel = (p: Panel) => panelStore.set(p);
export const closePanel = () => panelStore.set(null);
