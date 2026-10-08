import { notFound } from "next/navigation";
import { CategoryView } from "@/components/product/CategoryView";
import { categoryTabs, resolveTab } from "@/lib/categories";
import { getCollection, getCollections, getProducts, getProductsByCollection } from "@/lib/catalog";
import { clip, pageMetadata } from "@/lib/seo";

export const dynamicParams = true;
export const revalidate = 300;

export async function generateStaticParams() {
  const [collections, products] = await Promise.all([getCollections(), getProducts()]);
  return collections.flatMap((c) => {
    const inCollection = products.filter((p) => p.collection === c.slug);
    // Skip the first tab ("View All"): it is the parent route.
    return categoryTabs(c, inCollection)
      .slice(1)
      .map((t) => ({ slug: c.slug, sub: t.href.split("/").pop()! }));
  });
}

async function load(slug: string, sub: string) {
  const [collection, all] = await Promise.all([getCollection(slug), getProductsByCollection(slug)]);
  if (!collection) return undefined;
  const tab = resolveTab(collection, all, sub);
  return tab && { collection, all, tab };
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]/[sub]">) {
  const { slug, sub } = await params;
  const data = await load(slug, sub);
  if (!data) return {};
  const { collection: c, tab } = data;
  return pageMetadata({
    title: `${tab.name} — ${c.name}`,
    description: clip(`${tab.name} from ${c.name}. ${c.description}`),
    path: `/collections/${c.slug}/${sub}`,
    image: tab.products[0]?.images[0] ?? c.image,
  });
}

export default async function CollectionTabPage({ params }: PageProps<"/collections/[slug]/[sub]">) {
  const { slug, sub } = await params;
  const data = await load(slug, sub);
  if (!data) notFound();
  const { collection, all, tab } = data;

  return <CategoryView collection={collection} all={all} products={tab.products} tab={{ slug: sub, name: tab.name }} />;
}
