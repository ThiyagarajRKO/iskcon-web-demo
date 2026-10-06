import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { CollectionNav } from "@/components/product/CollectionNav";
import introStyles from "@/components/product/ListingIntro.module.css";
import { ProductListing } from "@/components/product/ProductListing";
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
        align="start"
        crumbs={[
          { name: "All Creations", path: "/collections" },
          { name: collection.name, path: `/collections/${collection.slug}` },
        ]}
      >
        <CollectionNav collections={collections} active={collection.slug} />
      </PageHeader>
      {products.length > 0 ? (
        <ProductListing products={products} />
      ) : (
        <p className="container" style={{ textAlign: "center", paddingBlock: 48 }}>
          New pieces are being prepared for this collection.
        </p>
      )}
      <section className={introStyles.intro} aria-labelledby="about-collection">
        <h2 id="about-collection">About {collection.name}</h2>
        <p>{collection.description}</p>
      </section>
      <JsonLd data={itemListJsonLd(collection.name, products)} />
    </div>
  );
}
