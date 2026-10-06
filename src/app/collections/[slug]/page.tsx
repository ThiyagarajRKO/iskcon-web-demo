import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { CollectionNav } from "@/components/product/CollectionNav";
import { ProductGrid } from "@/components/product/ProductGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCollection, getCollections, getProductsByCollection } from "@/lib/catalog";
import { clip, itemListJsonLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = true;
export const revalidate = 300;

export async function generateStaticParams() {
  return (await getCollections()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const c = await getCollection(slug);
  if (!c) return {};
  return pageMetadata({
    title: `${c.name} — ${c.tagline}`,
    description: clip(c.description),
    path: `/collections/${c.slug}`,
    image: c.image,
  });
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const [collection, collections, products] = await Promise.all([
    getCollection(slug),
    getCollections(),
    getProductsByCollection(slug),
  ]);
  if (!collection) notFound();

  return (
    <div className="page">
      <PageHeader
        title={collection.name}
        crumbs={[
          { name: "All Creations", path: "/collections" },
          { name: collection.name, path: `/collections/${collection.slug}` },
        ]}
        intro={<p>{collection.description}</p>}
      >
        <CollectionNav collections={collections} active={collection.slug} />
      </PageHeader>
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p className="container" style={{ textAlign: "center" }}>
          New pieces are being prepared for this collection.
        </p>
      )}
      <JsonLd data={itemListJsonLd(collection.name, products)} />
    </div>
  );
}
