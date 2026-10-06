"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Drawer } from "@/components/ui/Drawer";
import { Icon } from "@/components/ui/Icon";
import { formatPrice } from "@/lib/currency";
import { closePanel, openPanel, useCurrency, usePanel } from "@/lib/store";
import type { Product } from "@/lib/types";
import styles from "./ProductListing.module.css";

/* ---------- Filter model ---------- */

const SORTS = [
  { id: "recommended", label: "Recommended" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
] as const;
type SortId = (typeof SORTS)[number]["id"];

/** Price bands in INR (base currency); labels render in the visitor's currency. */
const PRICE_BANDS = [
  { id: "u5k", min: 0, max: 5000 },
  { id: "5k-25k", min: 5000, max: 25000 },
  { id: "25k-100k", min: 25000, max: 100000 },
  { id: "o100k", min: 100000, max: Infinity },
] as const;

type Filters = { sort: SortId; price: string[]; inStock: boolean };
const EMPTY: Filters = { sort: "recommended", price: [], inStock: false };

const inBand = (p: Product, id: string) => {
  const b = PRICE_BANDS.find((x) => x.id === id);
  return !!b && p.price >= b.min && p.price < b.max;
};

function apply(products: Product[], f: Filters) {
  let list = products.filter(
    (p) => (!f.inStock || p.inStock) && (f.price.length === 0 || f.price.some((id) => inBand(p, id))),
  );
  if (f.sort === "newest") list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
  if (f.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (f.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  return list;
}

/* URL keeps filters shareable (?sort=…&price=…&stock=1) without making the static page dynamic. */
function readUrl(): Filters {
  const q = new URLSearchParams(window.location.search);
  const sort = SORTS.find((s) => s.id === q.get("sort"))?.id ?? "recommended";
  const price = (q.get("price") ?? "").split(",").filter((id) => PRICE_BANDS.some((b) => b.id === id));
  return { sort, price, inStock: q.get("stock") === "1" };
}

function writeUrl(f: Filters) {
  const q = new URLSearchParams(window.location.search);
  q.delete("sort");
  q.delete("price");
  q.delete("stock");
  if (f.sort !== "recommended") q.set("sort", f.sort);
  if (f.price.length) q.set("price", f.price.join(","));
  if (f.inStock) q.set("stock", "1");
  const qs = q.toString();
  window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
}

/* ---------- Component ---------- */

export function ProductListing({ products }: { products: Product[] }) {
  const panel = usePanel();
  const currency = useCurrency();
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [ready, setReady] = useState(false);

  // Apply filters from a shared URL once, after hydration (server HTML is the unfiltered list).
  useEffect(() => {
    const fromUrl = readUrl();
    const id = requestAnimationFrame(() => {
      setFilters(fromUrl);
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (ready) writeUrl(filters);
  }, [filters, ready]);

  const visible = useMemo(() => apply(products, filters), [products, filters]);
  const activeCount = filters.price.length + Number(filters.inStock) + Number(filters.sort !== "recommended");

  const bandLabel = (b: (typeof PRICE_BANDS)[number]) =>
    b.min === 0
      ? `Under ${formatPrice(b.max, currency, { decimals: 0 })}`
      : b.max === Infinity
        ? `${formatPrice(b.min, currency, { decimals: 0 })} and above`
        : `${formatPrice(b.min, currency, { decimals: 0 })} – ${formatPrice(b.max, currency, { decimals: 0 })}`;

  const countIn = (pred: (p: Product) => boolean) => products.filter(pred).length;

  const togglePrice = (id: string) =>
    setFilters((f) => ({ ...f, price: f.price.includes(id) ? f.price.filter((x) => x !== id) : [...f.price, id] }));

  return (
    <div className={styles.listing}>
      {visible.length > 0 ? (
        <ProductGrid products={visible} />
      ) : (
        <div className={styles.empty}>
          <p>No creations match these filters.</p>
          <button type="button" className="btn btn--outline" onClick={() => setFilters(EMPTY)}>
            Clear all filters
          </button>
        </div>
      )}

      {/* Sticks to the bottom of the viewport while the grid is on screen */}
      <div className={styles.dock}>
        <button type="button" className={styles.pill} onClick={() => openPanel("filters")} aria-haspopup="dialog">
          <Icon name="sliders" size={16} />
          Filters{activeCount > 0 && <span className={styles.pillCount}>({activeCount})</span>}
        </button>
      </div>

      <Drawer
        open={panel === "filters"}
        side="right"
        label="Filters"
        variant="sheet"
        title={<span className={styles.title}>Show filters</span>}
        footer={
          <div className={styles.footer}>
            {activeCount > 0 && (
              <button type="button" className={styles.clear} onClick={() => setFilters(EMPTY)}>
                Clear all
              </button>
            )}
            <button type="button" className="btn btn--block" onClick={closePanel}>
              Show {visible.length} {visible.length === 1 ? "product" : "products"}
            </button>
          </div>
        }
      >
        <Section title="Sort by" summary={filters.sort !== "recommended" ? SORTS.find((s) => s.id === filters.sort)?.label : undefined}>
          {SORTS.map((s) => (
            <Option
              key={s.id}
              type="radio"
              name="sort"
              label={s.label}
              checked={filters.sort === s.id}
              onChange={() => setFilters((f) => ({ ...f, sort: s.id }))}
            />
          ))}
        </Section>

        <Section title="Price" summary={filters.price.length ? `${filters.price.length} selected` : undefined}>
          {PRICE_BANDS.map((b) => {
            const n = countIn((p) => inBand(p, b.id));
            return (
              <Option
                key={b.id}
                type="checkbox"
                label={bandLabel(b)}
                count={n}
                disabled={n === 0}
                checked={filters.price.includes(b.id)}
                onChange={() => togglePrice(b.id)}
              />
            );
          })}
        </Section>

        <Section title="Availability" summary={filters.inStock ? "In stock" : undefined}>
          <Option
            type="checkbox"
            label="In stock only"
            count={countIn((p) => p.inStock)}
            checked={filters.inStock}
            onChange={() => setFilters((f) => ({ ...f, inStock: !f.inStock }))}
          />
        </Section>
      </Drawer>
    </div>
  );
}

function Section({ title, summary, children }: { title: string; summary?: string; children: React.ReactNode }) {
  return (
    <details className={styles.section}>
      <summary className={styles.sectionHead}>
        <span>
          {title}
          {summary && <span className={styles.summary}>{summary}</span>}
        </span>
        <Icon name="chevronDown" size={18} className={styles.chevron} />
      </summary>
      <fieldset className={styles.options}>
        <legend className="visually-hidden">{title}</legend>
        {children}
      </fieldset>
    </details>
  );
}

type OptionProps = {
  type: "radio" | "checkbox";
  name?: string;
  label: string;
  count?: number;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
};

function Option({ type, name, label, count, checked, disabled, onChange }: OptionProps) {
  return (
    <label className={styles.option} data-disabled={disabled || undefined}>
      <input type={type} name={name} checked={checked} disabled={disabled} onChange={onChange} />
      <span className={styles.mark} data-type={type} aria-hidden="true" />
      <span className={styles.optionLabel}>{label}</span>
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </label>
  );
}
