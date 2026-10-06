"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { Icon } from "@/components/ui/Icon";
import { Price } from "@/components/product/Price";
import { closePanel } from "@/lib/store";
import styles from "./SearchPanel.module.css";

type Result = { slug: string; name: string; price: number; image: string; alt: string };

const SUGGESTIONS = ["Shankha", "Blowing conch", "Cowrie", "Nautilus", "Silver"];

function ProductTiles({ items }: { items: Result[] }) {
  return (
    <ul className={styles.grid}>
      {items.map((r) => (
        <li key={r.slug}>
          <Link href={`/products/${r.slug}`} onClick={closePanel} className={styles.item}>
            <span className={styles.thumb}>
              <Image src={r.image} alt={r.alt} fill sizes="(min-width: 1024px) 15vw, 40vw" />
            </span>
            <span className={styles.name}>{r.name}</span>
            <Price inr={r.price} className={styles.price} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function SearchPanel({ open }: { open: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [featured, setFeatured] = useState<Result[]>([]);

  // Empty-state products: fetched once, the first time the panel opens.
  useEffect(() => {
    if (!open || featured.length > 0) return;
    const ctrl = new AbortController();
    fetch("/api/search", { signal: ctrl.signal })
      .then((r) => r.json() as Promise<{ results: Result[] }>)
      .then((d) => setFeatured(d.results))
      .catch(() => {
        /* aborted or offline — suggestions still render */
      });
    return () => ctrl.abort();
  }, [open, featured.length]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) return;
    const ctrl = new AbortController();
    const t = window.setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: ctrl.signal });
        const data = (await res.json()) as { results: Result[] };
        setResults(data.results);
      } catch {
        /* aborted or offline */
      } finally {
        setLoading(false);
      }
    }, 180);
    return () => {
      ctrl.abort();
      window.clearTimeout(t);
    };
  }, [query]);

  const hasQuery = query.trim().length >= 2;

  const submit = (q: string) => {
    if (!q.trim()) return;
    closePanel();
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <Drawer open={open} side="top" label="Search">
      <form
        role="search"
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          submit(query);
        }}
      >
        <Icon name="search" size={22} />
        <label htmlFor="site-search" className="visually-hidden">
          Search the collection
        </label>
        <input
          id="site-search"
          data-autofocus
          type="search"
          autoComplete="off"
          enterKeyHint="search"
          placeholder="Search for shells, conches, cowries…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />
      </form>

      {!hasQuery && (
        <div className={styles.suggest}>
          <p className="eyebrow">Trending searches</p>
          <ul className={styles.chips}>
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <button type="button" className={styles.chip} onClick={() => submit(s)}>
                  {s}
                </button>
              </li>
            ))}
          </ul>

          {featured.length > 0 && (
            <>
              <p className={`eyebrow ${styles.featuredTitle}`}>Most wanted</p>
              <ProductTiles items={featured} />
            </>
          )}
        </div>
      )}

      {hasQuery && (
        <div className={styles.results} aria-live="polite" aria-busy={loading}>
          {results.length === 0 && !loading ? (
            <p className={styles.empty}>No results for “{query.trim()}”.</p>
          ) : (
            <ProductTiles items={results} />
          )}
        </div>
      )}
    </Drawer>
  );
}
