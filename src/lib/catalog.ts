import "server-only";
import { cache } from "react";
import type { Collection, Product } from "@/lib/types";
import { collections as sampleCollections, products as sampleProducts } from "@/lib/data/catalog";

/**
 * Catalog data access.
 * With API_URL set, data comes from the Node/Sequelize backend and is cached with ISR.
 * Without it, the bundled sample catalog is used so the storefront runs standalone.
 *
 * Expected backend endpoints:
 *   GET {API_URL}/collections          -> Collection[]
 *   GET {API_URL}/products             -> Product[]
 */
const API_URL = process.env.API_URL?.replace(/\/$/, "");
const REVALIDATE = Number(process.env.CATALOG_REVALIDATE || 300);

async function fromApi<T>(path: string, tag: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: REVALIDATE, tags: [tag] },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Catalog API ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export const getCollections = cache(async (): Promise<Collection[]> =>
  API_URL ? fromApi<Collection[]>("/collections", "collections") : sampleCollections,
);

export const getProducts = cache(async (): Promise<Product[]> =>
  API_URL ? fromApi<Product[]>("/products", "products") : sampleProducts,
);

export async function getCollection(slug: string) {
  return (await getCollections()).find((c) => c.slug === slug);
}

export async function getProduct(slug: string) {
  return (await getProducts()).find((p) => p.slug === slug);
}

export async function getProductsByCollection(slug: string) {
  return (await getProducts()).filter((p) => p.collection === slug);
}

export async function getNewArrivals(limit = 8) {
  return (await getProducts()).filter((p) => p.isNew).slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4) {
  const all = await getProducts();
  const same = all.filter((p) => p.collection === product.collection && p.slug !== product.slug);
  const rest = all.filter((p) => p.collection !== product.collection);
  return [...same, ...rest].slice(0, limit);
}

export async function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return (await getProducts()).filter((p) => {
    const hay = `${p.name} ${p.shortDescription} ${p.collection}`.toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}
