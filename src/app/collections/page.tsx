import { PageHeader } from "@/components/layout/PageHeader";
import { CollectionNav } from "@/components/product/CollectionNav";
import { ProductGrid } from "@/components/product/ProductGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCollections, getProducts } from "@/lib/catalog";
import { IMAGES } from "@/lib/data/catalog";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "All Creations — Conch Shells, Shankha & Cowries",
  description:
    "Browse every sacred conch, Shankha, blowing conch, cowrie and collector sea shell in the collection. Hand-selected in India and shipped worldwide.",
  path: "/collections",
  image: IMAGES.silverShankha,
});

export default async function CollectionsPage() {
  const [collections, products] = await Promise.all([getCollections(), getProducts()]);
  return (
    <div className="page">
      <PageHeader
        title="All Creations"
        crumbs={[{ name: "All Creations", path: "/collections" }]}
        intro={<p>Sacred conches, cowries and collector shells — each hand-selected and prepared in India.</p>}
      >
        <CollectionNav collections={collections} />
      </PageHeader>
      <ProductGrid products={products} />
      <JsonLd data={itemListJsonLd("All Creations", products)} />
    </div>
  );
}
