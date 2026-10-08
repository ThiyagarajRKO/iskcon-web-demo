"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Drawer } from "@/components/ui/Drawer";
import { Icon } from "@/components/ui/Icon";
import { formatPrice } from "@/lib/currency";
import { closePanel, openPanel, useCurrency, usePanel } from "@/lib/store";
import type { Brand, Product } from "@/lib/types";
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

type Filters = { sort: SortId; price: string[]; inStock: boolean; brand: string };
const EMPTY: Filters = { sort: "recommended", price: [], inStock: false, brand: "" };

const inBand = (p: Product, id: string) => {
  const b = PRICE_BANDS.find((x) => x.id === id);
  return !!b && p.price >= b.min && p.price < b.max;
};

function apply(products: Product[], f: Filters) {
  let list = products.filter(
    (p) =>
      (!f.inStock || p.inStock) &&
      (!f.brand || p.brand === f.brand) &&
      (f.price.length === 0 || f.price.some((id) => inBand(p, id))),
  );
  if (f.sort === "newest") list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
  if (f.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (f.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  return list;
}

/* URL keeps filters shareable (?brand=…&sort=…&price=…&stock=1) without making the static page dynamic. */
function readUrl(brands: Brand[]): Filters {
  const q = new URLSearchParams(window.location.search);
  const sort = SORTS.find((s) => s.id === q.get("sort"))?.id ?? "recommended";
  const price = (q.get("price") ?? "").split(",").filter((id) => PRICE_BANDS.some((b) => b.id === id));
  const brand = brands.find((b) => b.slug === q.get("brand"))?.slug ?? "";
  return { sort, price, inStock: q.get("stock") === "1", brand };
}

function writeUrl(f: Filters) {
  const q = new URLSearchParams(window.location.search);
  q.delete("sort");
  q.delete("price");
  q.delete("stock");
  q.delete("brand");
  if (f.brand) q.set("brand", f.brand);
  if (f.sort !== "recommended") q.set("sort", f.sort);
  if (f.price.length) q.set("price", f.price.join(","));
  if (f.inStock) q.set("stock", "1");
  const qs = q.toString();
  window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
}

/* ---------- Component ---------- */

type ListingProps = {
  products: Product[];
  /** Image tiles above the grid; each one filters the grid to that brand. Brands with no products are hidden. */
  brands?: Brand[];
};

export function ProductListing({ products, brands = [] }: ListingProps) {
  const panel = usePanel();
  const currency = useCurrency();
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [ready, setReady] = useState(false);

  // Apply filters from a shared URL once, after hydration (server HTML is the unfiltered list).
  useEffect(() => {
    const fromUrl = readUrl(brands);
    const id = requestAnimationFrame(() => {
      setFilters(fromUrl);
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- read the URL once, on mount
  }, []);

  useEffect(() => {
    if (ready) writeUrl(filters);
  }, [filters, ready]);

  // Hide the floating pill once the footer is about to scroll into view.
  const [nearFooter, setNearFooter] = useState(false);
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(([e]) => setNearFooter(e.isIntersecting), { rootMargin: "0px 0px 80px 0px" });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const visible = useMemo(() => apply(products, filters), [products, filters]);
  const activeCount =
    filters.price.length + Number(filters.inStock) + Number(filters.sort !== "recommended") + Number(!!filters.brand);

  const bandLabel = (b: (typeof PRICE_BANDS)[number]) =>
    b.min === 0
      ? `Under ${formatPrice(b.max, currency, { decimals: 0 })}`
      : b.max === Infinity
        ? `${formatPrice(b.min, currency, { decimals: 0 })} and above`
        : `${formatPrice(b.min, currency, { decimals: 0 })} – ${formatPrice(b.max, currency, { decimals: 0 })}`;

  const countIn = (pred: (p: Product) => boolean) => products.filter(pred).length;
  const shownBrands = useMemo(() => brands.filter((b) => products.some((p) => p.brand === b.slug)), [brands, products]);
  const toggleBrand = (slug: string) => setFilters((f) => ({ ...f, brand: f.brand === slug ? "" : slug }));

  const togglePrice = (id: string) =>
    setFilters((f) => ({ ...f, price: f.price.includes(id) ? f.price.filter((x) => x !== id) : [...f.price, id] }));

  return (
    <div className={styles.listing}>
      {shownBrands.length > 0 && (
        <ul className={styles.brands} aria-label="Shop by brand">
          {shownBrands.map((b) => (
            <li key={b.slug}>
              <button
                type="button"
                className={styles.brand}
                aria-pressed={filters.brand === b.slug}
                onClick={() => toggleBrand(b.slug)}
              >
                <span className={styles.brandMedia}>
                  <Image src={b.image.src} alt="" fill sizes="(min-width: 1024px) 12vw, 36vw" quality={60} />
                </span>
                <span className={styles.brandName}>{b.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

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

      {/* Floats at the bottom of the viewport; fades out as the footer approaches */}
      <div className={styles.dock} data-hidden={nearFooter || undefined}>
        <button
          type="button"
          className={styles.pill}
          onClick={() => openPanel("filters")}
          aria-haspopup="dialog"
          tabIndex={nearFooter ? -1 : undefined}
        >
          <Icon name="sliders" size={16} />
          Filter &amp; Sort by{activeCount > 0 && <span className={styles.pillCount}>({activeCount})</span>}
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

        {shownBrands.length > 0 && (
          <Section title="Brand" summary={shownBrands.find((b) => b.slug === filters.brand)?.name}>
            {shownBrands.map((b) => (
              <Option
                key={b.slug}
                type="radio"
                name="brand"
                label={b.name}
                count={countIn((p) => p.brand === b.slug)}
                checked={filters.brand === b.slug}
                onChange={() => toggleBrand(b.slug)}
              />
            ))}
          </Section>
        )}

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
