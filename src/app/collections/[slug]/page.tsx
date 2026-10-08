import { notFound } from "next/navigation";
import { CategoryView } from "@/components/product/CategoryView";
import { getCollection, getCollections, getProductsByCollection } from "@/lib/catalog";
import { clip, pageMetadata } from "@/lib/seo";

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
  const [collection, products] = await Promise.all([getCollection(slug), getProductsByCollection(slug)]);
  if (!collection) notFound();

  return <CategoryView collection={collection} all={products} products={products} />;
}
