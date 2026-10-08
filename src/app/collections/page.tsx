import { PageHeader } from "@/components/layout/PageHeader";
import { CollectionNav } from "@/components/product/CollectionNav";
import { ListingGuide } from "@/components/product/ListingGuide";
import { ProductListing } from "@/components/product/ProductListing";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCollections, getProducts } from "@/lib/catalog";
import { IMAGES } from "@/lib/data/catalog";
import { allCreationsGuide } from "@/lib/data/guides";
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
      <PageHeader title="All Creations" align="start" crumbs={[{ name: "All Creations", path: "/collections" }]}>
        <CollectionNav
          active="/collections"
          items={[{ href: "/collections", name: "All" }, ...collections.map((c) => ({ href: `/collections/${c.slug}`, name: c.name }))]}
        />
      </PageHeader>
      <ProductListing products={products} />
      <ListingGuide guide={allCreationsGuide} />
      <JsonLd data={itemListJsonLd("All Creations", products)} />
    </div>
  );
}
