import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProducts, searchProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Search",
  // Search result pages are thin/duplicate content — keep them out of the index, but follow links.
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" },
};

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw)?.slice(0, 80) ?? "";
  const results = q ? await searchProducts(q) : [];
  const fallback = !q || results.length === 0 ? (await getProducts()).slice(0, 8) : [];

  return (
    <div className="page">
      <PageHeader
        title={q ? `Results for “${q}”` : "Search"}
        crumbs={[{ name: "Search", path: "/search" }]}
        intro={
          <p>
            {q
              ? `${results.length} ${results.length === 1 ? "creation" : "creations"} found.`
              : "Use the search in the header to find shells, conches and cowries."}
          </p>
        }
      />
      {results.length > 0 && <ProductGrid products={results} />}
      {fallback.length > 0 && (
        <>
          <h2 className="section-title" style={{ marginBottom: 40 }}>
            You May Also Like
          </h2>
          <ProductGrid products={fallback} />
        </>
      )}
    </div>
  );
}
