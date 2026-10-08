import type { Collection, Product } from "@/lib/types";

export const NEW_IN = { slug: "new-in", name: "New In" };

/** Tabs for a category: View All, New In (when there is anything new), then each sub-category that has products. */
export function categoryTabs(collection: Collection, products: Product[]) {
  const base = `/collections/${collection.slug}`;
  const subs = (collection.subcategories ?? []).filter((s) => products.some((p) => p.subcategory === s.slug));
  return [
    { href: base, name: "View All" },
    ...(products.some((p) => p.isNew) ? [{ href: `${base}/${NEW_IN.slug}`, name: NEW_IN.name }] : []),
    ...subs.map((s) => ({ href: `${base}/${s.slug}`, name: s.name })),
  ];
}

/** Resolves a tab slug ("new-in" or a sub-category) to its label and products. */
export function resolveTab(collection: Collection, products: Product[], sub: string) {
  if (sub === NEW_IN.slug) return { name: NEW_IN.name, products: products.filter((p) => p.isNew) };
  const s = collection.subcategories?.find((x) => x.slug === sub);
  return s ? { name: s.name, products: products.filter((p) => p.subcategory === s.slug) } : undefined;
}
